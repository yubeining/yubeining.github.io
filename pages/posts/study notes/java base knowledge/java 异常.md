---
title: java 异常
date: 2025-04-19
updated: 2025-04-19
categories: java
tags:
  - java
  - 笔记
top: 1
---

# 异常

### 1、Error和Exception 区别

Error类和Exception类的父类都是Throwable类

#### Error类

一般是系统、jvm的问题。

如：系统崩溃、虚拟机错误、内存空间不足、方法调用栈溢出（stackoverflow）、堆内存溢出（outofmemory）

仅靠程序本身无法恢复和预防



#### Exception类

程序可以处理的异常

分为运行时异常和受检查时异常



运行时异常：RuntimeException 及其子类

数组索引越界异常 ArrayIndexOutOfBoundsException

空指针异常 NullPointerException

数字操作异常 ArithemeticException  10/0

类型转换异常 ClassCastException

数字转换异常 NumberFormatException



除RuntimeException 之外所有的异常： 编译时异常，主要起到提醒作用



#### 运行时异常和受检异常的不同

运⾏时异常：如：空指针异常、指定的类找不到、数组越界、⽅法传递参数错误、数据类型转换错误。可以编译通过，但是⼀运⾏就停⽌了，程序不会⾃⼰处理；

Nullpointerexception indexoutofboundsexception 

受检查异常：要么⽤ try … catch… 捕获，要么⽤ throws 声明抛出，交给⽗类处理。

ioexception  classnotfoundexception



### 2、常见的异常类

NullPointerException：当应⽤程序试图访问空对象时，则抛出该异常。

SQLException：提供关于数据库访问错误或其他错误信息的异常。

IndexOutOfBoundsException：指示某排序索引（例如对数组、字符串或向量的排序）超出范围时抛出。

FileNotFoundException：当试图打开指定路径名表示的⽂件失败时，抛出此异常。

IOException：当发⽣某种 I/O 异常时，抛出此异常。此类是失败或中断的 I/O 操作⽣成的异常的通⽤类。

ClassCastException：当试图将对象强制转换为不是实例的⼦类时，抛出该异常。

IllegalArgumentException：抛出的异常表明向⽅法传递了⼀个不合法或不正确的参数

RuntimeException：运行时异常

ClassNotFoundException：找不到对应的类 异常

#### 

### 3 、throw和throws的区别

1、throw：在⽅法体内部，表示抛出异常，由⽅法体内部的语句处理；throw 是具体向外抛出异常的动作，所以它抛出的是⼀个异常实例；

2、throws：在⽅法声明后⾯，表示如果抛出异常，由该⽅法的调⽤者来进⾏异常的处理；表示出现异常的可能性，并不⼀定会发⽣这种异常。





### 4、finally相关问题

#### finally块中代码什么时候被执行

一定会被执行，在return之前执行

如果 try-finally 或者 catch-finally 中都有 return，那么 finally 块中的 return 将会覆盖别处的 return 语句，最终返回到调⽤者那⾥的是 finally 中 return 的值。



#### finally是不是一定会被执行到

不一定。有两种情况

1、当程序进入try块之前就出现异常，会直接结束，不会执行finally块中的代码

2、当程序在try块中强制退出时也不会执行，比如try块中执行exit方法



### 5、异常处理过程

异常处理是程序出现错误时，避免程序崩溃的一种机制

java对异常的默认处理方式：向上抛出



默认处理流程：

1、程序运行时出现异常，会自动创建一个异常对象，并将其抛出

2、异常对象会被传递给调用栈的第一个异常处理程序

3、如果无法处理，则向上抛出。

4、如果所有的异常处理程序都无法处理该异常，则程序终止运行，并将异常信息输出到控制台





#### try...catch捕获异常

好处：异常对象可以被捕获，后续的代码可以继续执行

格式：

try{

可能会出现异常的代码

}catch(异常名称 对象名){

异常的处理方案

}

执行流程：

1、执行try{}中的代码，看是否有异常对象产生

2、没有：catch就不会捕获，后续代码继续执行

3、 有：catch捕获异常对象，执行catch{}中的处理方案，后续代码继续执行





### 6、外中断和异常的区别

外中断是指由CPU执行指令以外的事件引起，如IO完成中断，表示设备输入//输出处理已经完成，处理器能发送下一个输入/输出请求。

而异常时由CPU执行指令的内部事件引起

