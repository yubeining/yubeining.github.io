---
title: tomcat
date: 2025-04-19
updated: 2025-04-19
categories: java
tags:
  - java
  - 笔记
top: 1
---

# Tomcat

#### 1、springboot如何启动tomcat

引入依赖

启动时会先创建一个spring容器，利用@conditionalOnClass判断当前classpath中是否存在tomcat依赖，存在则生成一个启动Tomcat的bean。创建完成后，获取启动tomcat的bean对象，然后创建tomcat对象，再绑定端口



#### 2、tomcat为什么要使用自定义类加载器

如果只有一个类加载器，不能加载多个类。为部署的每个应用生成一个类加载器实例，每个应用使用自己的类加载器加载自己的类，达到应用之间的类隔离



#### 3、如何优化tomcat

按照JVM的方式进行调优，启动tomcat实际上启动了一个JVM

内存上：设计了一些缓存区提高吞吐量

线程：改变tomcat空闲时的线程数，调整调整minSpareThreads参数
调整maxThreads参数，设置Tomcat处理连接的最大线程数

调整IO模型：使用NIO、APR这种比BIO更加高效的IO模型