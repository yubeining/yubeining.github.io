---
title: rpc
date: 2025-04-19
updated: 2025-04-19
categories: java
tags:
  - java
  - 笔记
top: 1
---
# RPC框架项目

## 目标是实现方法的远程调用

## rpc

rpc三个核心consumer、provider、register

consumer经过注册中心调用provider中的方法

传统的方式是consumer调用httpclient请求，配置繁琐，而且配置写死不好改动

还需要自己序列化和反序列化的操作



使用rpc 只需要使用代理对象 引入服务调用就行

下载代码到本地添加依赖到项目中就可以使用

作为rpc框架，需要配置使用哪个服务器接收请求，比如说tomcat、netty、jetty

通过tomcat接收到请求，交给dispacherselvert执行：

（将consumer需要的方法内容传递给provider）

需要处理什么样的请求，需要接收：

接口名、方法的名字、方法的参数类型列表、方法的参数值列表

通过getinputstream反序列化创建invocation对象

反序列化默认采用jdk序列化方法

根据创建的对象从注册中心中找到对应的接口（使用接口不用具体的实现类，用接口依赖的比较少）

根据反射来完成对象方法的实现，通过序列化的方式返回给consumer



基础的rpc框架实现了，下面进行优化：



###### 注册中心提供远程注册服务

（consumer拿到调用方法的ip+port）

下一次调用的时候直接从redis中取即可

###### 动态代理实现

consumer不可能新建httpservlet服务繁琐配置

直接新建proxyfactory进行服务配置 建立连接

根据proxyfactory拿到序列化的实现

那些配置信息都写在代理对象中

然后返回结果

###### 服务注册和服务发现

consumer得到调用服务的url 存到consumer的地方

将url保存到redis中，下次调用的时候直接从redis中取即可

###### 负载均衡

需要连接哪个tomcat，从哪个tomcat上得到请求

使用随机算法对urls列表进行选取，拿取url

都是客户端负载均衡

###### 服务容错和服务尝试

处理异常、

调用失败再次尝试调用



## 注册中心

本地注册

使用hashmap存储请求 string class

register方法 将获得的请求以及实现内容存入hashmap中

get方法，拿到注册中心的请求

是在provider中首先注册的请求



redis作为注册中心，当provider新增节点或者改变的时候，

注册中心以及consumer本地缓存需要同步

redis消费订阅机制



如何发现provider节点挂了？

redis里的watch机制



## 动态代理实现

consumer方法太复杂

需要得到方法的代理对象

Rpcframework 新建proxyfactory

调用方法时直接调用代理对象

使用invoke方法 将原本的逻辑放到invoke方法中

proxyfactory处理httpclient、服务发现、负载均衡



## 服务注册和服务发现实现

服务提供者在启动的时候能够将服务存到注册中心上

消费者能从注册中心获得ip+port

编写一个url

实现远程注册类

将url存入map中

服务注册：

需要存放url

服务发现：

需要得到存放的url





## 负载均衡

从redis中得到url之后

应该发送给哪一个tomcat

将服务发现得到的urls列表进行随机算法的负载均衡



最小活跃数：选择一个负载最小的服务器



## 本地缓存

消费者去查url的时候，不需要每次都从注册中心中查询，

采用本地缓存的方法实现

将查到的ip+port保存到redis中

问题：和注册中心数据保存一致

redis消费订阅机制



## 服务容错和服务重试

服务容错：在服务调用的时候抛出异常，定义一个方法处理这个异常

高级容错--读取用户的配置 class+方法名 根据用户的配置信息处理容错

服务重试：调用服务失败的时候进行重试，重试次数不超过3次



### 问题：

1、为什么不能直接调用实现类？

有很多依赖，但是接口依赖比较少

2、consumer如何才能远程调用？

首先需要进行网络传输，启动服务器，接受请求

需要配置服务器，选择tomcat、netty、jetty中的一个

3、如何设计rpc协议

可以自定义请求头和请求体



数据头：RPC version 消费名 请求体

数据体：Invocation



RPC协议--数据格式+传输方式




















