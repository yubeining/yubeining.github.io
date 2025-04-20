---
title: mysql
date: 2025-04-19
updated: 2025-04-19
categories: java
tags:
  - java
  - 笔记
top: 1
---

# MySql

### 1、数据库优化

1、使用合适的索引：创建适当的索引，可以加快查询速度和提高数据库性能

2、优化sql查询语句

3、调整数据库参数：内存缓冲区大小、并发连接数等

4、数据库分区：将大表拆分为多个分区，可以提高查询效率和管理数据的灵活性



### 2、聚集索引和非聚集索引

#### 聚集索引

聚集索引决定了数据在磁盘上的物理存储顺序，是根据索引的键值对表中的数据进行排序和存储的方式

一个表只有一个聚集索引，通常是主键索引。如果没有主键，将使用第一个唯一索引作为聚集索引。

可以加快按索引键值进行查找的速度，减少磁盘I/O的次数

#### 非聚集索引

独立于实际数据存储的情况下创建的索引结构，包含索引的键值和指向实际数据行的指针。

一个表可以有多个非聚集索引，可以基于不同的列创建

提供了更快的查找速度（不需要按照特定的顺序存储数据）



### 3、mysql常见锁类型


#### 共享锁（读锁）

多个事务可以同时持有共享锁，用于允许并发读取操作

但会阻塞独占锁的获取

#### 独占锁（写锁）

只有一个事务可以持有独占锁，用于防止其他事务读取或修改数据

会阻塞其他独占锁和共享锁的获取

#### 意向共享锁（表级锁）

表示一个事务想在表上获取共享锁

#### 意向独占锁（表级锁）

表示一个事务想在表上获取独占锁

#### 记录锁（行锁）

锁定表中的特定记录，实现对记录级别的并发控制

可以是共享锁或独占锁

#### 间隙锁

可以防止幻读的发生

#### next-key锁

记录锁和间隙锁的组合，用于实现可重复读事务级别

可以防止幻读和不可重复读的发生

在使用范围查询或索引键值重复的情况下自动加锁，用于解决索引键值冲突的问题

在索引上加锁，锁住范围内数据行和下一个索引值的间隙

语法：FOR UPDATE



### 4、索引

#### 作用

加速数据检索：减少数据库的扫描量，通过快速定位数据，加快查询操作的速度

提高数据的唯一性和完整性：通过在索引列上创建唯一索引或主键索引，可以保证数据的唯一性和完整性

排序数据：可以帮助数据库按照特定的顺序进行排序，从而提高排序操作的效率

#### 类型

B树索引：最常用的索引类型，可以快速定位需要查找的数据，支持范围查找、排序等操作

主键索引（特殊的B树索引）：用于唯一标识表中的每一行数据，主键索引是最常用的索引类型

哈希索引：将索引值进行哈希计算，将计算结果存储在哈希表中。快速定位到数据所在的位置，常用于map、set等数据结构

唯一索引：保证索引列的唯一性，一个表可以有多个唯一索引

全文索引：用于全文搜索，可以对文本数据进行高效的关键字搜索、模糊搜索

#### 创建

可以通过CREATE INDEX语句在表的列上创建索引，也可以在创建表时指定索引

#### 使用

可以通过EXPLAIN关键字来查看查询计划，判断是否使用了索引

#### 优缺点

优点：提高查询性能，加速数据检索；保证数据的唯一性和完整性；排序数据的效率高

缺点：占用磁盘空间；增加数据插入、更新和删除的成本；索引会随着数据的增删改而变得不连续，需要定期维护



#### 优化

1、选择合适的列添加索引，同时避免导致索引失效的操作，比如like、函数等

2、避免返回不必要的列，增加查询的效率

3、根据explain分析器适当优化sql结构，比如是否需要走全表扫描，避免子查询

4、分库分表：单表数据量大的情况下分库分表

5、读写分离：保证写操作的数据库承受更小的压力，缓解锁的竞争



#### 最左前缀原则

在使用索引进行查询时，只有在索引最左侧开始的连续一段字段才会被索引使用，不然不能用



#### 回表查询

通过二级索引找到对应的主键值，再通过主键值找到聚集索引中对应的整行数据



#### 索引创建原则

表中数据量过大，才会创建索引，并且添加索引的字段是查询比较频繁的字段



#### 什么情况下不走索引

数据量太小的话，索引反而会变慢

查询条件复杂的情况下，选择全局扫描

数据分布不均匀的话，需要读取大量数据块

没有合适的索引





所以，索引过多会影响性能，需要选择合适的数据类型和长度，经常进行读操作但写操作少的列适合建立索引





#### sql执行计划 explain

对sql语句进行语法分析，对sql语句进行查询重写，生成多个可能的执行计划





possible_key 当前sql可能会使用到的索引

key 当前sql实际命中的索引

Key_len 索引占用的大小

Extra 额外的优化建议

Type sql连接的类型 性能由好到差为null、system、const、ref、range、index、all

system 查询系统中的表

const根据主键查询

eq_ref 主键索引查询或唯一索引查询

ref 索引查询

range 范围查询

index 索引树扫描

all 全盘扫描





### 5、数据库查询的性能瓶颈及优化

查询语句的性能瓶颈：

1、复杂查询：当查询语句中包含多个表的连接、子查询、聚合函数等复杂操作时，查询性能可能会受到影响

2、没有正确使用索引：如果查询语句中的条件列没有创建索引或者不恰当，性能会下降

3、数据库结构设计不合理：表的关系设计不合理，或者字段类型选择不当，也会影响查询性能



优化方法：

1、优化查询语句：避免不必要的子查询、聚合操作

2、创建合适的索引：可以用EXPLAIN关键字来查看查询计划，判断是否用了索引

3、优化数据库结构：合理设计数据库表的关系和字段类型

4、数据库缓存：redis来缓存查询结果，减少数据库的访问次数，提高查询性能

5、连接池配置：控制连接数和最大等待时间



### 6、innodb

#### 底层原理

是一种acid事务型存储引擎，底层是B+树实现的

B+树是一种多路平衡树，每个节点存储多个值，非叶子结点存储索引，叶子结点存储数据，叶子结点用双向链表进行关联，使得全局扫描能力更强



#### B+树和B树区别

B树的非叶子结点和叶子结点都会存放数据，B+树所有数据都会出现在叶子结点，查询的时候，B+树查找效率更加稳定。

范围查询的时候，B+树效率更高







#### 事务型存储引擎

支持事务处理的数据库存储引擎，可以保证数据库中数据的完整性和一致性。

数据库操作要么全部成功，要么全部回滚。

支持ACID（原子性、一致性、隔离性、持久性）



#### 如何解决幻读问题

InnoDB通过MVCC（多版本并发控制）机制解决幻读问题

MVCC机制会为每个事务分配一个唯一的事务ID（Transaction ID），并为每条记录也分配一个唯一的版本号

InnoDB提供了两种方法：

1、使用间隙锁（Gap Lock）：在查询时，InnoDB会对查询结果的间隙加锁，以确保在该事务执行期间，其他事务无法在该间隙中插入新的数据。

2、使用Next-Key锁（Next-Key Lock）：在查询时，InnoDB会对查询结果及其相邻的间隙加锁，以确保在该事务执行期间，其他事务无法在该查询结果及其相邻的间隙中插入新的数据。





### 7、关系性数据库和非关系性数据库的区别

#### 数据组织方式

sql采用表格的形式组织数据，数据之间通过关系建立联系，可以一对一、一对多、多对多

nosql没有固定的关系，采用键值对的形式

#### 数据一致性

sql强调数据的一致性

nosql强调数据的可用性和分布式扩展性



### 8、数据库事务

#### mysql如何支持事务

通过innodb这样的一个支持ACID事务的存储引擎

ACID：原子性、一致性、隔离性、持久性

原子性：使用日志，如果操作失败，根据日志回滚到之前的状态

一致性：保证事务操作一致，事务开始前和结束后，数据库的状态一致

隔离性：使用锁实现。当一个事务执行时，其他事务无法访问该事务正在操作的数据，知道该事务结束并释放锁

持久性：使用日志记录事务的操作。数据库崩溃的情况，也可以通过回滚日志和重做日志来恢复数据



#### 如何判断事务是否提交

查询系统变量`tx_isolation`的值来判断当前事务的隔离级别

使用commit命令执行或者查看事务日志



#### 事务隔离级别

为了解决并发问题，当多个并发事务执行的时候，确保数据的一致性，所划分的事务隔离级别

读未提交：最低级别，所有操作对其他事务可见，但导致脏读、不可重复读、幻读

读已提交：保证事务提交后，其他事务才能读到修改的数据，解决脏读的问题，但还有不可重复读和幻读

可重复读：事务执行期间多次读取到同一数据，得到结果相同，但导致幻读

串行化：强制事务串行执行，避免所有并发问题



脏读：读取到事务未提交的数据

不可重复读：事务多次读取同一数据，结果不一致

幻读：事务执行两次相同查询，结果不一致

解决方法：采用合适的事务隔离级别，使用乐观锁或悲观锁，修改时，减少锁定的范围









### 9、数据量大的解决方案

1、垂直拆分：将大表拆分为多个小表

2、水平拆分：将数据分散到多个表中

3、数据库分区：大表拆成多个分区

4、数据库缓存：将不太更新但查询高的数据缓存到redis中

5、用合适的索引进行优化



### 10、日志

#### binlog

记录数据库增删改操作的日志文件，可以是用户直接对数据库进行的操作，也可以是系统自动进行的操作，如索引重建、数据库备份等

主要作用：

1、数据恢复：可以将数据库恢复到指定的时间点，以保证数据的完整性和可靠性。

2、数据复制：可以实现 MySQL 数据库的主从复制，将主库中的数据同步到从库中，以提高系统的可用性和性能。

3、数据分析：可以分析数据库中的操作记录，了解用户的行为和习惯，从而优化数据库的设计和性能。

4、安全审计：可以对数据库的操作进行监控和审计，防止非法操作和攻击。



#### redolog

保证数据的持久性。当数据被修改时，mysql会首先将修改操作记录到redolog中，然后再将数据更新到磁盘上。如果mysql崩了，可以通过redolog来恢复数据。



#### undolog

用于回滚事务。当一个事务被回滚时，会使用undolog中的数据将数据恢复到事务之前的状态



如何实现原子性：

1、事务开始时，InnoDB会为该事务分配一个Undo Log，并且在内存中创建一个Transaction ID（事务ID）

2、当事务执行UPDATE、DELETE、INSERT等修改数据的操作时，InnoDB会将修改前的数据记录到Undo Log中，这样就可以在事务回滚时恢复数据。

3、在事务提交之前，InnoDB会将所有修改操作记录到Redo Log中，并且将内存中的Transaction ID写入磁盘。

4、当事务回滚时，InnoDB会根据Undo Log中的数据恢复修改前的状态，并将Undo Log中的记录删除。

5、当系统崩溃时，InnoDB会根据Redo Log中的数据恢复修改后的状态，并根据Undo Log中的数据恢复修改前的状态，保证数据的一致性。



#### slow query log

用于记录执行时间超过一定阈值的sql语句，用于优化数据库性能



#### error log

用于记录 MySQL 的错误信息，包括 MySQL 启动和关闭过程中的错误信息以及运行时的错误信息







### 11、定位慢查询&分析



一个接口测试非常慢，压测大约5秒钟

采用运维工具skywalking检测出哪个接口，最终定位是sql的问题

#### 方案一

mysql中开启慢查询日志 slow_query_log=1

设置慢日志的时间 long_query_time=2

如果超过2s中的sql就会被记录到日志中

#### 方案二

使用explain命令查询sql语句执行计划

通过key和key_len检查是否命中了索引（索引本身是否会失效）

通过type字段查看sql是否有进一步的优化空间，是否存在全盘扫描或者全索引扫描

通过extra建议判断，是否出现了回表的情况。如果出现了，可以尝试添加索引或者返回字段来修复



### 12、数据库三范式

第一范式：强调列的原子性，每一列都是不可分割的原子数据项

第二范式：要求实体属性完全依赖于主关键字

第三范式：任何非主属性不依赖于其他非主属性



### 13、数据库主从复制涉及到的线程

主要涉及三个线程：binlog线程、I/O线程和sql线程

binlog线程：负责将主服务器上的数据更改写入二进制日志中

I/O线程：负责从主服务器上读取二进制日志，并重放其中的sql语句





### 14、mysql8.0版本更新了哪些？

支持json数据

支持窗口函数

优化innodb-提高读写和并发性能

增强安全性（密码过期、可以进行加密网络数据传输）

自适应哈希索引





### 15、mysql中死锁如何解决

是指两个或多个事务相互等待对方释放锁资源，导致事务无法继续执行的情况。



可以采用以下方法来解决死锁问题

#### 手动回滚

如果发生死锁，可以尝试手动回滚其中一个事务。

可以使用show engine innodb命令来查看当前死锁的状态，然后根据死锁信息中的事务ID手动回滚其中一个事务，以解除死锁

#### 重启mysql

会导致所有事务被中断，同时也会释放所有锁资源

#### 调整事务并发度

如果死锁问题经常发生，可以考虑调整事务并发度来避免死锁

#### 优化sql查询语句

可以使用索引来加速查询，或者避免使用长事务等方式来优化 SQL 查询语句





### 16、MyISAM

#### 介绍

支持主键索引、唯一索引、普通索引、全文索引

使用B树结构

#### 选择 MyISAM的原因

1、MyISAM 对于大量读操作和高并发读取性能较好，因为它采用表级锁定，而不是行级锁定。

2、MyISAM 对于存储和查询大量数据表时，可以占用比 InnoDB 更少的磁盘空间和内存，因为它不支持事务处理、外键约束和崩溃恢复等功能

3、MyISAM 的表结构相对简单，不支持事务处理和外键约束等复杂功能。



### 17、评估mysql一张表可以存储多少数据

1、数据行大小：每列



### 1、常用sql语句 语法

1、查看当前数据库所有表

show tables；

2、查看表结构

desc 表名；

show create table classes；

3、

创建班级表

Create table class(

Id int unsigned primary key not null,

Name varchar(10)

);

创建学生表

Create table students(

Id int unsigned primary key auto_increment not null,

Name varchar(20) default 0,

height decimal(5,2),

Gender enum('男','女','保密'),

Cls_id int unsigned default 0

);



4、修改表 添加字段

Alter table 表名 add 列表 类型；

alter table students add birthday datetime;



Alter table 表名 change 原名 新名 类型及约束；

Alter table students change birthday birth date time not null;



alter table 表名 modify 列名 类型及约束；

alter table students modify birth date not null;



alter table 表名 drop 列名;

Alter table students drop birthday;



删除表

drop table students;



查看表的创建

show create table 表名；

Show create table classes;



查询所有列

Select * from 表名；

select * from classes;

查询指定列

select 列1，列2 ...  from 表名；

select id, name from classes;



增加

Insert into 表名 values(...)

Insert into students values(0,'guo',181,1,20);



Insert into students(name,birth) values('wang','2016-3-2');



修改

Update students set gender=2 where id=5;



删除

Delete from 表名 where 条件

Delete from students where id=5;



创建数据库

Create database python6 charset=utf8;

Use python7;



Select id as ... from students



Select students.id,students.name,students.gender from students;



Select s.id,s.name,s.gender from students as s;



Select gender from students



查找编号大于3的学生

Select * from students where id>3;

查找编号不大于4的学生

Select * from students where id<=4;

查询姓名不是黄蓉的学生

Select * from students where name !='黄蓉';

查询没被删除的学生

Select * from students where is_delete=0;



查询姓黄的学生

select * from students where name like '黄%';

查询姓黄并且名是一个字的学生

select * from students where name like '黄_';



查询编号是1或3或8的学生

Select * from students where id in (1,3,8);

Select * from students where id between 3 and 8;

select * from students where id between 3 and 8 and gender=1;

Select * from students where height is null;

Select * from students where height is not null;

select * from students where height is not null and gender=1;



查询未删除男生信息，按学号降序

select * from students where gender=1 and is_delete=0 order by id desc;

查询未删除学生信息，按名称升序

Select * from students where is_delete=0 order by name;

显示所有的学生信息，按年龄从大到小排序，年龄相同按身高排序

select * from students order by age desc,height desc;



查询学生总数

select count(*) from students;

查询女生编号最大值

Select max(id) from students where gender=2;

查询未删除的学生最小编号

Select min(id) from students where is_delete=0;

查询男生的总年龄

Select sum(age) from students where gender=1;

查询未删除女生的编号平均值

Select avg(id) from students where is_delete=0 and gender=2;





Select gender from students group by gender;

分别统计性别为男/女的人年龄平均值

Select gender,avg(age) from students group by gender;

分别统计性别为男/女的人的个数

Select gender, count(*) from students group by gender;



查询前3行男生的信息

select * from students where gender=1 limit 0,3



使用内连接查询班级表与学生表

select * from students inner join classes on students.cls_id=class.id



使用左连接查询班级表与学生表

select * from students as s left join classes as c on s.cls_id=class.id



查询学生姓名和班级名称

Select s.name, c.name from students as s inner join classes as c on s.cls_id=c.id;



