今天给大家分享的主题是一起来做类型体操

主要分为 4 个部分进行介绍，
第一部分是类型体操的背景，通过背景了解为什么要在项目中加入类型体操，
第二部分是了解类型体操的主要类型、运算逻辑、和类型套路
第三部分是类型体操实践，解析 Ts 内置高级类型，手写 ParseQueryString 复杂类型
第四部分是小结，综上分享，沉淀结论

## 背景

第一部分介绍的是什么是类型，什么又是类型安全，怎么实现类型安全？

不同的类型占据不同的内存，拿 boolean 和 number 举例，boolean 类型的变量会分配 4 个字节的内存，而 number 类型的变量会分配 8 个字节的内存，

另外，不同的类型可做的操作不同，number 类型可以做加减乘除运算，boolean 就不行。

综上，可以得到一个简单的结论就是，类型就是编程语言提供对不同内容的抽象定义。

了解了类型后，那么，什么是类型安全呢，一个简单的定义就是，类型安全就是只做该类型允许的操作。比如对于 boolean 类型，不允许加减乘除运算，只允许赋值 true、false。

当我们能做到类型安全时，可以大量的减少代码中潜在的问题，大量提供代码质量

那么，怎么做到类型安全？？

这里介绍两种类型检查机制，分别是动态类型检查和静态类型检查。

Javascript 就是典型的动态类型检查，它在编译时，没有类型信息，到运行时才检查，导致很多隐藏 bug

Typescript 作为 Javascript 的超集，采用的是静态类型检查，在编译时就有类型信息，检查类型问题，减少运行时的潜在问题。

上面介绍了类型的一些定义，都是大家熟悉的一些关于类型的背景介绍，这一章节回归到本次分享的主题概念，类型体操。

了解类型体操前，先介绍一些 3 种类型系统

第一种是简单类型系统，它只基于声明的类型做检查，比如一个加法函数，可以加整数也可以加小数，但在简单类型系统中，需要声明 2 个函数来做这件事情。

第二种是泛型类型系统，它支持类型参数，通过给参数传参，可以动态定义类型，让类型更加灵活，但是在一些需要类型参数逻辑运算的场景就不适用了，比如一个返回对象某个属性值的函数类型

第三种是类型编程系统，它不仅支持类型参数，还能给类型参数做各种逻辑运算，比如上面提到的返回对象某个属性值的函数类型，可以通过 keyof、T[K] 来逻辑运算得到函数类型

总结上述，类型体操就是类型编程，对类型参数做各种逻辑运算，以产生新的类型

之所以称之为体操，是因为它的复杂度，右侧是一个解析参数的函数类型，里面用到了很多复杂的逻辑运算，等先介绍了类型编程的运算方法后，再来解析这个类型的实现。

## 了解类型体操

第二部分是了解类型体操

类型体操的主要类型列举在图中。Ts 复用了 JS 的基础类型和复合类型，并新增元组（Tuple）、接口（Interface）、枚举（Enum）等类型，这些类型在日常开发过程中类型声明应该都很常用，不做赘述

重点介绍的是类型编程支持的运算逻辑

TypeScript 支持条件、推导、联合、交叉、对联合类型做映射等 9 种运算逻辑。

通过条件判断、推导返回新的类型。

条件判断和 js 逻辑相同，都是如果满足条件就返回 a 否则返回 b

推导则是类似 js 的正则匹配，都满足公式条件时，可以提取公式中的变量，直接返回或者再次加工就可以

联合代表可以是几个类型之一

交叉代表对类型做合并

映射则是通过索引查询 keyof，索引访问 t[k]，索引遍历 in，索引重映射 as，返回全新的 key、value 构成的新的映射类型

根据上面介绍的 9 种运算逻辑，这里我总结了 4 个类型套路

第一个是模式匹配做提取

通过类型 extends 一个模式类型，把需要提取的部分放到通过 infer 声明的局部变量里

举个例子，用模式匹配提取函数参数类型

首先用 extends 限制类型参数必须是 Function 类型

然后用 extends 为 参数类型匹配公式，当满足公式时，提取公式中的变量 Args

第二个类型套路是重新构造做变换

想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换

比如实现一个字符串类型的重新构造

首先限制参数类型必须是字符串类型，

然后用 extends 为参数类型匹配公式，提取公式中的变量 First Rest，并通过 Uppercase 封装，返回一个首字母大写的字符串字面量类型

第三个类型套路是递归复用做循环

Typescript 可以通过递归完成不确定数量的类型编程，达到循环的效果

比如通过递归实现数组类型反转

首先限制参数必须是数组类型

然后用 extends 匹配公式，如果满足条件，则调用自身，否则直接返回

实现了一个数组反转类型

第四个类型套路是数组长度做计数

类型编程本身是不支持做加减乘除运算的，可以通过递归构造指定长度的数组，然后取数组长度的方式来完成数值的加减乘除

比如通过数组长度实现类型编程的加法运算

首先通过递归创建一个可以生成任意长度的数组类型

然后创建一个加法类型，通过数组的长度来实现加法运算

## 类型体操实践

分享的第三部分是类型体操实践

前面分享了类型体操的概念及常用的运算逻辑

下面我们就用这些运算逻辑来解析 Ts 内置的高级类型

partial 把索引变为可选，Required 把索引变为必选、Readonly 把索引变为只读

这 3 个类型都是通过映射类型 keyof、T[K]的映射类型运算逻辑重新构造索引，来生成新的映射类型

第四个高级类型 Pick，首先限制第二个参数必须是对象的 key 值，然后通过 in 操作符遍历第二个参数，生成新的映射类型

第五个高级类型 Record，也是通过 in 操作符遍历联合类型 K，创建映射类型

第六个高级类型 Exclude，通过 extends 操作符，判断参数 1 能否赋值给参数 2，如果可以则返回 never，以此删除联合类型的一部分

第七个高级类型 Extract，和 Exclude 逻辑相反，判断参数 1 能否赋值给参数 2，如果不可以则返回 never，以此保留联合类型的一部分

第八个高级类型 Omit，通过高级类型 Pick、Exclude 组合，删除过滤索引

第九个高级类型 Awaited，用于获取 Promise 的 valueType，通过递归来获取未知层级的 Promise 的 value 类型

还有非常多高级类型，实现思路和上面介绍的类型套路大多一致，这里不一一赘述，

重点解析的是在背景章节介绍类型体操复杂度，举例说明的解析字符串参数的函数类型

如图示 demo 所示，这个函数是用于将指定字符串格式解析为对象格式。

比如获取字符串 a=1&b=2 中 a 的值

右侧写了一个常用的类型声明方式，参数类型为 string，返回类型为 Record string any，这时看到，res1.a 类型为 any，那么有没有办法，准确的知道 a 的类型是字面量类型 1 呢？

下面就通过类型体操的方式，来重写解析字符串参数的函数类型

首先限制参数类型是 string 类型，然后为参数匹配公式 a&b，如果满足公式，将 a 解析为 key value 的映射类型，将 b 递归 ParseQueryString 类型，继续解析，直到不再满足 a&b 公式。

最后，就可以得到一个精准的函数返回类型，res.a = 1

## 小结

综上分享，从 3 个方面介绍了类型体操，第一点是类型体操背景，了解了什么是类型，什么是类型安全，怎么实现类型安全

第二点是熟悉类型体操的主要类型、支持的逻辑运算，并总结了 4 个类型套路

第三点是类型体操实践，解析了 Ts 内置高级类型的实现，并手写了一些复杂函数类型

从中我们了解到需要动态生成类型的场景，必然是要用类型编程做一些运算，即使有的场景下可以不用类型编程，但是使用类型编程能够有更精准的类型提示和检查，减少代码中潜在的问题。

## 参考资料+源码

这里列举了本次分享的参考资料及示例源码，欢迎大家扩展阅读

以上
