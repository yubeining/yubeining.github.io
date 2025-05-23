---
title: redis
date: 2025-04-19
updated: 2025-04-19
categories: java
tags:
  - java
  - 笔记
top: 1
---

# Redis

### 1、内存淘汰策略

LRU（最近最少使用）：优先淘汰最长时间未被使用的键

LFU（最不经常使用）：优先淘汰使用频率最低的键

TTL：为键设置过期时间，过期后自动淘汰

Maxmemory（最大内存限制）：当内存超出限制时，根据指定的淘汰策略进行淘汰



### 2、持久化机制

#### RDB

把内存中所有数据记录到磁盘中，当redis实例故障重启后，从磁盘读取快照文件，恢复数据。

快照文件称为RDB文件，默认是保存在当前运行目录。

#### AOF

AOF持久化，redis处理的每一个写命令都会记录在AOF文件，可以看作命令日志文件



同时启用时，redis优先加载AOF文件来恢复数据，如果AOF文件不存在，则会尝试加载RDB文件



#### 对比

RDB定时对整个内存做快照，AOF记录每一次执行的命令。

RDB恢复速度很快但是消耗很多内存和大量CPU占用，AOF主要是磁盘IO资源

RDB可以容忍数据丢失，AOF对数据安全性要求较高



#### 如何实现数据尽可能少丢失又能兼顾性能

redis重启时，先加载RDB中的内容，然后再重放增量AOF日志，替代之前的AOF全量文件重放



### 3、redis介绍

#### 概念

redis是分布式的缓存中间件，是基于内存实现的kv数据结构的nosql数据库

因为是内存存储，所以读写速度非常快，也需要将数据持久化到磁盘上，避免数据丢失

#### 数据结构

#### 字符串(string)

键值对，支持各种二进制数据，简单高效。

适用场景：缓存、计数器、分布式锁、共享session、限速

#### 哈希表(hash)

键值对集合、用来存储多个值

适用场景：缓存、存储商品信息、用户信息

#### 列表(list)

有序的字符串列表、每个元素都是字符串。

可以在列表两端添加或删除元素，支持各种列表操作，比如插入、删除、查找。

适用场景：消息队列

#### 集合(set)

无序的字符串集合

可以添加、删除、查找元素，支持各种集合操作

适用场景：共同爱好

#### 有序集合(sorted set)

有序的字符串集合

适用场景：排行榜



支持分布式存储，可以将数据分散到多个节点上

支持高并发性，多个客户端可以同时访问

#### 通过expire来设置key的过期时间

定时去清理过期的缓存

有用户请求过来时，再判断这个请求所用到的缓存是否过期，过期就去底层系统得到新数据并更新缓存



### 5、redis集群

是一种分布式部署方式，解决单机redis无法满足高并发和数据量大的场景



有三种方案：主从复制、哨兵模式、redis分片集群



#### 主从同步

单节点redis并发能力是有上限的，要进一步提高redis并发能力，可以搭建主从集群，实现读写分离。一般是一主多从，主节点负责写数据，从节点负责读数据。主节点写入数据之后，需要把数据同步到从节点中



第一次建立连接，全量同步。第二次建立连接，增量同步

slave建立同步的操作，请求master数据同步，判断是否是第一次

master执行bgsave，生成RDB，发送RDB文件



增量同步：后续去repl_balog中获取offset的数据





#### 工作原理

使用数据分片，每个节点存储部分数据，让数据分散到各个节点上

每个节点有多个复制节点，主节点负责处理客户端请求，数据复制到从节点上

从节点负责数据备份，当主节点失效时接替主节点



#### 优点

方便进行横向扩展，增加新的节点即可增加系统的处理能力

可以自动将数据分散到各个节点上，数据分布均衡

各个节点可以并行处理请求，提高系统的并发能力



#### 哨兵机制

实现主从集群的自动故障恢复

如果master故障，哨兵会将一个slave提升为master。当故障实例恢复后也以新的master为主



### 6、redis速度快的原因

1、数据基于内存存储，读写快，没有磁盘IO开销

2、单线程模型，所有命令都是在一个线程中执行，避免线程切换的开销

3、异步的非阻塞IO模型，大量并发连接不降低性能



### 7、redis线程安全

redis本身是一个线程安全的kv数据库，因为redis的设计和实现采用了单线程模型

在单线程模型下，通过使用非阻塞I/O和事件循环机制，使得单个线程能够高效地处理大量的并发请求。



但是作为缓存或数据库等存储服务时，应用程序自身仍然需要考虑并发访问的线程安全性

但是如果有多个redis客户端同时执行操作指令，就无法保证原子性。可以对多个客户端的访问进行加锁



#### 引入多线程

redis的性能瓶颈主要来源于网络IO

多线程任务可以分摊redis同步IO读写负荷



#### 多线程实现机制

主线程负责接收建立连接请求，获取socket放入全局等待处理队列

主线程处理完读事件后，通过RR将这些连接分配给这些IO进程

主线程阻塞等待IO线程读取socket完毕





### 8、redis和zk比较

redis可以用setnx来实现分布式锁，zk可以基于同一级节点的唯一性或者有序节点的特性来实现分布式锁

由于redis读写性能比zk更好，在高并发场景中，zk实现分布式锁会存在性能瓶颈。所以redis更好



### 9、缓存的一些问题



#### mysql和redis数据一致性

redis是实现应用和mysql之间的一个读操作缓存层

命中缓存，从缓存中读取数据并返回前端

没有命中缓存，从数据库中加载数据返回前端，并写入redis中

方法：

采用主动更新的策略

先更新数据库，再删除缓存

极端情况下，使用最终一致性方案：

基于rocketMQ的可靠性消息通信、canal组件监控mysql中binlog日志，把更新后的数据同步到redis中





#### 缓存击穿

某一个key

对于设置过期时间key，缓存在某个时间点过期的时候，恰好有大量的并发请求，把数据库打挂



解决方法：

1、使用互斥锁：当缓存失效时，不立即去加载数据库，先设置一个互斥锁，当操作成功返回时再去进行加载数据库的操作并回设缓存

2、设置当前key逻辑过期：设置一个过期时间字段存入缓存，不给当前key设置过期时间，当查询的时候，从redis取出数据后判断时间是否过期，过期则开通另一个线程进行同步，当前线程正常返回数据，这个数据不是最新







#### 缓存穿透

查询一个不存在的数据，未命中缓存，每次都去数据库中查找

解决方法：

1、缓存空对象：

使用空值作为缓存

但是如果添加了该数据，缓存和存储的数据可能不一致



2、布隆过滤器

底层是一个大的数组，存放0或1.初始化为0

当一个key来了之后经过3次hash计算，标明一个key 的存在

但是会存在一个误判率5%



#### 缓存雪崩

大量的key

缓存集中在一段时间内失效

解决方法：

1、给过期时间加一个随机值

2、通过加锁或队列来控制数据库中写缓存的线程数量



### 10、redis主从结构

因为单节点redis并发能力有上限的，要进一步提高redis并发能力，就要搭建主从集群，实现读写分离



第一次建立连接的时候采用全量同步，其他大多数时候采用增量同步

如果repild相同，是全量同步，master将完整内存数据生成RDB，发送RDB到slave，slave清空本地数据，加载master的RDB

repild不同的话，做增量同步，salve与master的offset之间的差异，就是salve需要增量拷贝的数据



#### 主从复制原理





### 11、如何保证消费的幂等性

无论重复请求多少次，得到的结果都是一样的

1、写数据时，先根据主键查一下这条数据是否存在，如果已存在则update

2、数据库的唯一键约束也可以保证不会重复插入多条

3、写入redis，就没有问题 setnx操作是天然幂等性的



无论使用什么操作，只有两种方法：接口只允许调用一次，比如唯一约束、基于redis的锁机制；对数据的影响只会触发一次，比如状态机、乐观锁



### 12、如何保证redis高并发高可用

主从集群+哨兵模式

哨兵可以实现主从集群的自动故障恢复





