---
title: spring
date: 2025-04-19
updated: 2025-04-19
categories: java
tags:
  - java
  - 笔记
top: 1
---

# Spring

### 1、介绍spring框架

#### 概念

spring：是整个生态，spring framework是整个spring生态的基石，为依赖注入、事务管理、web应用、数据访问等提供了核心支持。

是一个轻量级的容器框架，为了解决企业级应用开发的业务逻辑层和其他层的耦合问题
是一个ioc和aop的容器框架

特征是依赖注入

springboot：为快速启动且最小化配置的spring应用而设计，具有用于构建生产级别应用的一套固化的视图

通过一个自动配置和启动项解决了需要配置大量参数的问题

springcloud：是一整套基于springboot的微服务解决方案

springmvc：提供了一种分离式方法来开发web应用

bean：是指有spring容器管理的对象


#### 为什么要使用spring呢 有哪些好处
1、代码重用性：提供了bean的管理，AOP，bean可以通过注入的方式引用到其他bean中
提高代码复用率

2、配置性，通过配置文件或xml的方式定制应用

3、生态成熟，整合了很多其他开源技术库

#### 优点

1、轻量：基本版本大约2MB

2、控制反转：Spring通过控制反转实现了松散耦合

3、面向切面编程（AOP）：支持面向切面编程，并且把应用业务逻辑和系统服务分开

4、容器：Spring包含并管理应用中对象的生命周期和配置

5、MVC框架：

6、事务管理：提供一个持续的事务管理接口，可以扩展到上⾄本地事务下⾄全局事务（JTA）。

7、异常处理：提供方便的API把具体技术相关的异常转化为一致的unchecked异常



### 2、AOP以及代理方式

#### 概念 名词解释

面向切面编程。把系统分为两个部分：核心关注点和横切关注点。

业务处理的主要流程是核心关注点。权限认证、日志、事务处理等是横切关注点。

AOP作用在于把系统中的核心关注点和横切关注点分离开来

将与业务无关，但对多个对象产生影响的公共行为和逻辑，抽取并封装成一个可重用的模块

1、切面（Aspect）：在Spring AOP中 指定就是“切面类”，管理着增强的公共行为代码（通知）和切入方式（切点）
2、连接点（Join point）：指定就是被增强的业务方法
3、通知（Advice）：需要增加到业务方法中的公共代码，有很多种类型，分别可以在需要增加的业务方法不同位置进行执行（前置通知、后置通知、异常通知、返回通知、环绕） 
4、切入点（Pointcut）：由它决定哪些方法需要增强，哪些不需要
5、目标对象（Target Object）：增强的对象
6、织入（Weaving）：


#### 通知
1、前置通知（Before）：在目标方法被调用之前调用通知功能
2、后置通知（After）：在目标方法完成之后调用通知，此时不关心方法的输出是什么
3、返回通知（After-returning）：在目标方法成功执行之后调用通知
4、异常通知（After-throwing）：在目标方法抛出异常后调用通知
5、环绕通知（Around）：通知包裹了被通知的方法，在被通知的方法调用之前和调用之后执行自定义的行为


#### 代理模式

AOP思想的实现一般基于代理模式。

java一般采用JDK动态代理，但是JDK动态代理只能代理接口而不能代理类。

因此，Spring AOP基于两种情况进行切换，Spring AOP同时支持CGLIB、ASPECTJ、JDK动态代理

1、如果目标对象的实现类实现了接口，采用JDK动态代理来生产AOP代理类

2、如果目标对象的实现类没有实现接口，采用CGLIB来生产AOP代理类



#### 使用场景

日志记录、安全验证、事务管理、异常处理



#### 如何使用

导入maven依赖、

定义切面类：使用注解@Before @after 或xml配置来声明

配置AOP代理、编写切点表达式

 

### 3、bean的生命周期
从创建到销毁的整个过程
1、实例化：通过反射获取构造函数
2、属性赋值：解析自动装配 byname bytype constractor autowired
这个阶段解决了循环依赖的问题
3、初始化：调用xxxaware方法  调用初始化生命周期回调  如果bean实现aop 创建动态代理
4、销毁： 在spring容器关闭的时候进行调用 调用销毁生命周期回调  
 
#### 传统的java应用

生命周期很简单，使用java关键字new 进行 bean 的实例化，然后该bean就能够使用。bean不再使用时，进行垃圾回收



#### spring管理的bean

1、查找并加载需要被spring管理的bean，进行bean的实例化

2、容器根据使用的bean定义中的属性值和配置文件的属性值来设置bean实例中的属性，实现依赖注入

3、调用bean的初始化方法（1、处理@PostConstruct注解2、处理InitializingBean接口3、进行AOP）

4、容器关闭时，调用bean的销毁方法



#### bean的线程安全问题
单例bean的情况
spring没有对bean做任何安全处理，在无状态时是线程安全的，但有状态的时候不是线程安全的
如果在类中声明成员变量，并且有读写操作（有状态）
如果成员变量是声明在方法中，就是线程安全的

当多用户同时请求一个服务的时候，容器会给每一个请求分配一个线程，多个线程会并发执行该请求的业务逻辑。如果处理逻辑中有对该单列状态的修改，必须考虑线程同步问题

解决方法：

1、使用threadlocal private ThreadLocal<String> username;

 
2、使用同步控制：synchronized关键字

3、使用线程安全的数据结构：concurrentHashMap

4、设置为多例

#### 紧耦合和松耦合的区别
紧耦合：类之间高度依赖
松耦合：通过促进单一职责和关注点分离、依赖倒置的设计原则来实现



### 4、bean的作用域

1、singleton : 唯⼀ bean 实例，Spring 中的 bean 默认都是单例的；

2、prototype : 每次请求都会创建⼀个新的 bean 实例；

3、request：每⼀次 HTTP 请求都会产⽣⼀个新的 bean，该 bean 仅在当前 HTTP request 内有效；

4、session : 每⼀次 HTTP 请求都会产⽣⼀个新的 bean，该 bean 仅在当前 HTTP session 内有效；

5、global-session：全局 session 作⽤域，仅仅在基于 portlet 的 web 应⽤中才有意义，Spring5 已经没有了。



### 5、spring框架中的设计模式

1、⼯⼚设计模式 : Spring 使⽤⼯⼚模式通过 BeanFactory、ApplicationContext 创建 bean 对象；

2、代理设计模式 : Spring AOP 功能的实现；

3、单例设计模式 : Spring 中的 Bean 默认都是单例的；

4、模板⽅法模式 : Spring 中 jdbcTemplate、hibernateTemplate 等以 Template 结尾的对数据库操作的类，它们就使⽤到了模板模式；

5、包装器设计模式 : 我们的项⽬需要连接多个数据库，⽽且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源；

6、观察者模式：Spring 事件驱动模型就是观察者模式很经典的⼀个应⽤；

7、适配器模式：Spring AOP 的增强或通知(Advice)使⽤到了适配器模式、SpringMVC 中也是⽤到了适配器模式适配 Controller。



### 6、IOC的工作流程 

IOC控制反转，把对象的管理权限交给了容器，应用程序如果需要某个对象的实例，直接从IOC容器中获取
本来需要new Service 需要程序员自己创建，现在交给Spring的ioc去创建

优点：集中管理对象、方便维护、降低耦合度

工作流程：

1、配置文件加载：spring读取配置文件，根据配置文件内容来加载和实例化对象

2、实例化bean：根据配置文件中的信息实例化bean，创建对象并加入容器中进行管理

3、注入依赖：spring自动解析bean之间的依赖关系，并将依赖注入到对象中

4、生命周期管理：管理对象的生命周期，包括初始化、销毁操作

5、提供bean：提供了统一的接口，可以通过容器来获取bean的实例并使用

6、AOP增强：对bean进行增强和横向切面的功能
 


#### IOC的容器加载过程
1、实例化一个ApplicationContext的对象
2、调用bean工厂后置处理器完成扫描 
3、循环解析扫描出来的类信息
4、实例化一个BeanDefinition对象来存储解析出来的信息
5、把实例化好的 BeanDefinition 对象put到 beanDefinitionMap当中缓存起来，以便后面实例化bean
6、再次调用其他bean工厂后置处理器
7、 spring实例化单例的bean，实例化之前做验证，需要遍历所有扫描出来的类
依次判断这个bean是否lazy、是否prototype、是否abstract
8、推断构造方法
9、调用构造方法通过反射实例化对象，但不是一个完整的bean，对象的属性没有注入
10、spring处理合并后的beanDefinition
11、判断是否需要完成属性注入
12、如果要，开始注入
13、判断bean的类型 回调aware接口



### 7、循环依赖问题

#### 问题

其实就是循环引用，两个或两个以上的bean互相持有对方，最终形成闭环

#### 如何解决

通过三级缓存

第一级存储完整的bean实例对象，第二级缓存存储未初始化的bean，第三级缓存存储bean工厂，用来生成原始的bean对象，把bean的实例化和bean的依赖注入进行分离，通过不完整的bean实例解决单例循环依赖问题



#### 构造方法出现循环依赖怎么解决

spring框架不能解决对构造函数的依赖注入，可以使用@lazy懒加载，什么时候需要对象再进行对bean对象的创建



### 8、spring data

是spring的一个子项目，用于简化数据库访问，支持nosql和关系数据存储。主要目标是使数据库的访问变得方便

特点：

springdata支持nosql存储：

mongodb文档数据库、neo4j图形数据库、redis键值存储、habase列族数据库

支持的sql

jdbc、jpa

springdata减少了数据访问层dao的开发量。开发者唯一要做的，就是声明持久层的接口。





### 9、spring事务（ACID）

#### 事务特性

原子性：事务时最小的执行单位，不可分割。事务的原子性确保要么全部完成，要么完全不起作用

一致性：执行事务前后，数据保持一致

隔离性：并发访问数据库时，一个事务不被其他事务干扰，各并发事务之间是独立的

持久性：一个事务被提交之后，它对数据库中数据的改变是持久的



#### 事务隔离级别

多个事务同时执行时，事务之间互相隔离的程度

1、DEFAULT：使用数据库默认的事务隔离级别。

2、READ_UNCOMMITTED：最低的隔离级别，事务可以读取未提交的数据，可能导致脏读、不可重复读、幻读等问题。

3、READ_COMMITTED：事务只能读取已提交的数据，可以避免脏读问题，但可能导致不可重复读、幻读等问题。

4、REPEATABLE_READ：保证事务中查询的数据集合是一致的，可以避免脏读和不可重复读问题，但可能导致幻读问题。

5、SERIALIZABLE：最高的隔离级别，强制事务串行执行，避免脏读、不可重复读、幻读等问题，但可能导致性能下降。



#### 如何实现事务

使用@transactioal注解实现的

本质是通过AOP完成，对方法前后进行拦截。执行方法前开启事务，在执行完目标方法后根据执行情况提交或者回滚事务。

spring创建一个代理对象作为bean，当调用代理对象方法时，有注解就用事务管理器创建一个数据库连接，并执行当前方法。没有异常就直接提交事务，出现异常则回滚事务





spring事务隔离级别对应的就是数据库的隔离级别

spring事务的传播机制是基于数据库连接的，一个数据库连接不同的事务


#### @transactional底层原理

使用动态代理来为标注@transactional注解的类和方法生成代理对象，从而拦截目标方法调用，并进行事务处理。提供两种代理JDK动态代理和CGLIB代理

使用了拦截器 负责在目标方法执行前后进行事务开启和提交

可以对jdbc等多个数据访问框架进行统一的事务管理

开启事务时可以设置事务的隔离级别


### 10、spring 常用注入方式

1、构造器依赖注入：构造器依赖注入通过容器触发一个类的构造器来实现，该类有一系列参数，每个参数代表一个对其他类的依赖

2、Setter方法注入：Setter ⽅法注⼊是容器通过调⽤⽆参构造器或⽆参 static ⼯⼚⽅法实例化 bean 之后，调⽤该 bean 的 Setter ⽅法，即实现了基于 Setter 的依赖注⼊。

3、基于注解的注入：最好的解决⽅案是⽤构造器参数实现强制依赖，Setter ⽅法实现可选依赖



### 11、spring配置文件 

#### xml配置文件

使用xml格式来描述应用程序的组件及其之间的关系

在xml配置文件中，可以定义bean、注入bean属性、配置切面、声明切面所需的通知等

#### 注解配置文件

注解配置文件是在 Java 类中使用注解来配置应用程序的组件及其之间的关系。




### 12、IOC和DI的区别
ioc：由spring来创建对象，维护对象的关系
di：spring注入才能实现控制反转，di是ioc的实现

### 13、beanfactory的作用
主要职责是生产bean，通过调用getBean传入标识生产一个bean


### 13、beandefinition的作用
主要负责存储bean的定义信息：决定bean的生产方式
比如根据xml文件来生产bean
lazy，则不会在ioc加载的时候创建bean

### 14、beanfactory和applicationContext的区别
 都可以管理bean的生命周期
 applicationContext实现了beanfactory
 不生产bean而是通知 factoryBean来进行生产
applicationContext
1、会自动帮我把配置的bean注册进来
2、加载环境变量
3、实现事件监听
4、注册很多对外扩展点
beanfactory
优点：内存占用率小 


### 15、配置bean有哪几种方式
1、xml：<bean class="" id="">
2、注解 @Component
3、javaConfig @Bean 可以自己控制实例化过程
4、@Import 

### 16、单例bean的优势
不会每次都去创建新的对象
1、减少了新生成实例消耗包括两方面，反射创建会消耗性能、给对象分配内存也会
2、减少jvm垃圾回收
3、快速获取bean，单例操作除第一次生成其他都是从缓存中获取


### 17、spring实例化bean的几种方式
1、构造器反射
2、静态工厂
xml中指定方法 factory-method="xxx"
3、实例工厂方式（@Bean） factory-bean+factory-method
4、 实现FactoryBean 重写getObject 和 getObjectType方法

### 18、Spring bean自动装配
写xml 手动
@Autowired 自动


### 19、Spring 如何在并发下避免获取不完整的bean
实例化之后会产生bean，加入三级缓存中，但是没有赋值、没有初始化进行回调
在并发下其他线程如果没有从一级缓存中获取，会接着拿二级缓存、三级缓存 
Spring是通过双重检查锁解决的。两个同步锁synchronized，两次检查一级缓存
getSingleton和实例化的时候加锁，当线程一在创建bean的时候，线程二需要等锁释放才行
此时锁释放，线程二从一级、二级、三级缓存（加锁）中都拿不到，因为线程一将bean放入一级缓存
二三级缓存都清理掉了

为什么一级缓存不加到锁里面？
因为性能，避免已经创建好的bean阻塞等待


### 20、BeanDefinition 
用来描述Bean的生产信息，决定Bean如何进行生产
1、通过解析配置类，先读取配置BeanDefinitionReader
2、解析 Config @Bean @Import @Component 
配置类的解析器
3、扫描
根据包名，找到所有的.class文件
排除接口、抽象类
注册BeanDefinition 

# springmvc

### 1、mvc模式 Model — View — Controler

模型-视图-控制器，是springframework中的一个模块


model：程序主体部分。主要包含业务数据和业务逻辑，可拆分成拆分成业务层service和数据访问层repository。

view：呈现给用户的部分。可以支持不同的视图，比如fremark、velocity、jsp

controller：处理用户输入的数据。把传统mvc框架的controller控制器进行拆分，分成了前端控制器dispatcherservlet和后端控制器controller。



### 2、springmvc核心组件

#### **前端控制器**  DispatcherServlet

Spring MVC的入口函数。

接受请求，响应结果，相当于转发器。

DispatcherServlet 是整个流程控制的中⼼，由它调⽤其它组件处理⽤户的请求



#### 处理器映射器 HandlerMapping

负责根据用户请求找到（Handler）Controller，SpringMVC提供了不同的映射器实现不同的映射方式



#### 处理器适配器 HandlerAdapter

按照特定规则去执行Handler



#### 处理器 Handler

后端控制器，在 DispatcherServlet 的控制下 Handler 对具体的⽤户请求进⾏处理。

需要工程师根据业务需求开发Handler



#### 视图解析器 view resolver

进⾏视图解析，根据逻辑视图名解析成真正的视图（View ）。

View Resolver 负责将处理结果⽣成 View 视图，View Resolver ⾸先根据逻辑视图名解析成物理视图名即具体的⻚⾯地址，再⽣成 View 视图对象，最后对View 进⾏渲染将处理结果通过⻚⾯展示给⽤户。



#### 视图 view

View 是⼀个接⼝，实现类⽀持不同的 View 类型（jsp、freemarker...）





### 3、springmvc控制器的线程安全问题

springmvc控制器是单例模式，所以存在线程安全问题

#### 解决方案

1、避免使用共享的可变状态：不引入可变的实例变量，只依赖方法参数进行处理，可以避免线程安全问题的发生

2、使用方法局部变量：是线程私有的，不会收到并发访问的影响





### 4、springmvc执行流程

浏览器发送请求到前端服务器Dispatcher Servlet，Dispatcher Servlet根据请求到URL找到对应的Handler Mapping，Handler Mapping根据请求的URL找到对应的Controller，Controller执行业务逻辑处理 并返回ModelAndView，Dispatcher Servlet根据Controller返回的ModelAndView找到对应的View，View渲染数据，并返回给Dispatcher Servlet，Dispatcher Servlet将View返回给浏览器



前后端分离版本

1、用户发送请求到前端控制器DispatcherServlet

2、DispatcherServlet收到请求调用HandlerMapping

3、HandlerMapping找到具体的处理器，生成处理器对象及处理器拦截器，

再返回给DispatcherServlet

4、DispatcherServlet调用HandlerAdapter

5、handlerAdapter经过适配调用具体的处理器Controller

6、方法添加了@responseBody

7、通过HttpMessageConverter来返回结果转换为json并响应



### 5、如何解决跨域问题

通过实现WebMvcConfigurer接⼝然后重写addCorsMappings方法







# SpringBoot

### 1、如何配置和开启定时任务 @Scheduled注解

1、maven引入spring boot starter Task的依赖

2、创建一个带有@Component或@Service注解的类

3、该类方法上添加@Scheduled注解



可以在指定时间内或间隔内自动执行任务



### 2、介绍springboot

springboot框架是基于spring框架开发的，提供注解简化开发，避免了繁琐的配置和依赖管理，简化了spring应用程序开发的流程，也继承了spring的所有功能和API

spring组件一站式解决方案，简化了使用spring 的难度，节省了繁琐的配置，提供了各种启动器，开发者能快速上手。





#### 核心配置文件

bootstrap.properties和application.properties

application：主要用于springboot项目的自动化配置





bootstrap：

有一些应用场景：使⽤ Spring Cloud Config 配置中⼼时，这时需要在 bootstrap 配置⽂件中添加连接到配置中⼼的配置属性来加载外部配置中⼼的配置信息；

⼀些固定的不能被覆盖的属性；

⼀些加密/解密的场景；



#### 配置文件格式

properties 和 .yml，它们的区别主要是书写格式不同。

1、properties

app.user.name = javastack

2、yml

app: user: name: javastack

另外，.yml 格式不⽀持 @PropertySource 注解导⼊配置。

3、yaml

配置有序、支持数组，数组中的元素可以是基本数据类型也可以是对象





#### 核心注解

#### @SpringBootApplication

标记一个类为应用程序的主类



#### 包含以下三个注解

#### @SpringBootConfiguration

组合了@Configuration注解，实现配置文件的功能

#### @EnableAutoConfiguration

实现自动配置。

@import会去读取该项目和该项目引用的jar包的classpath路径下

告知springboot去寻找并加载classpath路径下的所有META-INF/spring.factories配置文件中定义的自动配置类。然后Spring Boot根据这些自动配置类中的规则来自动配置应用程序中需要使用的各种Bean和依赖。

#### @ComponentScan

spring组件扫描



#### 自动配置原理

导入非常多的自动配置类，给容器中导入这个场景需要的所有组件，并配置好这些组件，免去了手动编写配置注入功能组件等工作

给容器中自动配置类添加组件的时候，会从properties类中获取某些属性，只需要在配置文件中指定这些属性的值即可





#### 不需要独立容器运行

内置了tomcat、jetty容器





#### 优点

1、内嵌各种servlet容器，Tomcat、jetty等，只要打成jar包就能独立运行，所有的依赖包都在jar包内

2、简化配置、自动配置，xml配置过程中无代码生成



#### @springbootautoconfigure

包含许多针对springboot应用程序的自动配置类





#### 3、如何实现springboot应用程序的安全性

为了实现SpringBoot的安全性，我们使⽤spring-boot-starter-security依赖项，并且必须添加安全配置。它只需要很少的代码。配置类将必须扩WebSecurityConfigurerAdapter并覆盖其⽅法





#### 4、springbootstarterparent有什么用

执行打包操作的配置、自动化的资源过滤、自动化的插件配置





# SpringCloud

### 1、SOA、分布式、微服务之间有什么关系和区别？

SOA和微服务都属于分布式架构。

#### SOA

服务划分更多是基于功能或业务，耦合度较高

#### 微服务

微服务的粒度更细，将系统拆分成一组更小、更独立的服务

更强调单一职责，将系统拆分为小而自治的服务，每个服务都可以独立开发、部署、扩展、替换



微服务架构更全面，SOA相当于只有注册中心的微服务架构



### 2、微服务架构的使用情况

从单体应用演变而来，当业务增多

分工协作：

单体项目、项目启动慢，拆分之后提高开发效率和敏捷性，单个服务启动快，每个人负责单独的模块

并发能力：

整体集群，易造成系统资源浪费。拆分后是服务集群，充分利用服务器资源，只需要针对下单服务进行压测就可以

业务：

单体业务维护困难，牵一发动全身。拆分后根据功能垂直拆分，责任更加分明，维护更加精准

容错：

单体：单点故障，一个功能OOM导致整个应用都不可用。拆分后，弱依赖的服务出现故障，可以进行熔断

拆分后的业务出现故障，可以进行熔断，依然不影响主业务正常使用

扩展：

单体难以技术升级，拆分后可以采用任意新技术



但会带来一些缺点：

分布式：远程调用速度很慢，面临失败的风险

最终一致性：很难保证强一致性

运维复杂性： 

隐式接口：服务和服务通过接口来联系，当一个服务更改接口格式时，可能涉及到此接口的所有服务都需要做好调整



### 3、常用微服务组件

springcloud alibaba

注册中心：Nacos、zookeeper （维护服务提供者的远程地址，管理服务）

负载均衡：ribbon   （客户端的负载均衡器）

服务调用：openFeign dubbo  （远程服务调用更加优雅）

配置中心：nacos config 管理服务的配置

服务熔断：sentinel 保持应用高可用 防止出现服务雪崩，防止激增流量打垮冷系统

分布式事务：seata 高性能微服务分布式事务解决方案

服务网关：spring cloud gateway 为客户端提供统一的服务，一些跟业务本身功能无关的公共逻辑都可以放在网关实现：鉴权、日志、限流、跨域、路由转发

链路追踪：skywalking 实时追踪服务的监控状况，协助快速恢复





### 4、微服务中如何实现session共享

在不同微服务之间共享session，常见的方案是Spring session+redis来实现session共享

将所有微服务的session保存在redis上，当各个微服务对session有相关读写操作时，都去操作redis上的session



### 5、如何实现服务注册和发现

服务注册：服务提供者需要把自己的信息注册到nacos，由nacos来保存这些信息，比如服务名称、IP、端口

服务发现：消费者向nacos拉取服务列表信息，如果服务提供者有集群，则消费者会利用负载均衡算法，选择一个发起调用

服务监控：服务提供者会每隔30s向nacos发送心跳，报告健康状态，没有接受到，则剔除



# 注解

### 1、spring的常见注解

声明bean

#### @Component

可以将一个类声明为组件，表示是spring中的一个组件，可以通过依赖注入在其他组件中使用

#### @Service

用于标记一个服务类，表示业务逻辑层的组件，可以调用DAO层的代码来操作数据库

#### @Repository

用于标识一个类是数据访问层的DAO组件，负责访问数据库或其他持久化存储介质。可以进行异常转换和自动装配

#### @controller

用于标记一个控制器类。表示mvc架构中的控制器组件，用于处理http请求和响应，返回视图或数据



依赖注入相关

#### @autowired
可以更细粒度的控制属性的自动注入，默认按照属性的类型进行自动注入，如果类型匹配到多个，
再按照名字进行自动注入，不需要额外提供get、set方法

spring会自动在容器中查找与该注解标记相同的bean，并将bean注入到变量中，可以用在构造函数、setter方法、字段上
​注解的required属性默认为true表示必须找到相应的bean 否则抛出异常

autowired的自动装配过程
是通过bean的后置处理器进行解析的

#### @Resource



#### @Scope

设置作用域



#### @Configuration 作用和原理 加和不加有什么区别
1、@Configuration 用来代替xml配置方式spring.xml配置文件<bean>
2、没有这个注解也是可以配置@Bean
3、加注解会为配置类创建cglib动态代理，可以当这个方法调用的时候，去ioc容器中去获取这个bean，保证这一个bean的单例
4、  


#### @ComponentScan

#### @Bean 
方法调用是如何保证单例的
是因为@Configuration注解，
在创建bean的时候提供动态代理类，
帮我们增强到ioc容器当中进行查找


### 2、springmvc常见注解

#### @RequestMapping

用于映射请求路径

#### @RequestParam

参数绑定注解，用于绑定URL中的查询参数或请求体中的表单参数

#### @RequestBody

参数绑定注解，用于绑定请求体中的JSON或XML格式的数据

#### @postmapping

将HTTP POST请求映射到特定的方法上，并将该请求映射到指定的URL上

#### @getmapping

将HTTP GET请求映射到特定的方法上，并将该请求映射到指定的URL上



### 3、springboot核心注解

#### @springbootApplication

核心注解



### @autowired和@resource注解区别

都是spring中实现的依赖注入

autowired默认根据类型实现注入

默认required=true 

强制进行注入，如果没有这个bean，会报错

如果存在多个类型的bean实例，会导致注入失败



resource支持name type 两种注入方式

先根据name进行匹配，再根据type进行匹配



### spring 多线程事务该如何处理
比如需要批量导入数据到excel中，要么全部成功，要么全部失败

一个方案是每个线程去轮询感知其他线程的变化，如果有一个失败，直接回滚（不太行）







