# 实验一 认识Java程序

## 1. 实验目的

熟练掌握Java程序运行环境配置方法，掌握Java程序运行基本概念，能够独立编译运行Java程序

## 2. 实验任务

### 2.1 配置Java运行环境

下载JDK，可以从[Oracle官网](https://oracle.com/java/)下载通用的Java SE版本，也可使用开源的[OpenJDK](https://openjdk.java.net)。

运行安装程序后，配置Java运行所需的环境变量。

在命令行中键入javac命令检查Java编译器版本

```shell
javac --version
```

在命令行中键入java命令检查Java虚拟机

```shell
java --version
```

如果以上两命令均能成功运行，表明Java环境已完成正确配置。

### 2.2 准备开发工具

* 可选择一款趁手的文本编辑器，如VS Code, Sublime Text, Atom, Notepad++等
* 也可选择集成开发环境IDE，如Eclipse, NetBeans, IntelliJ Idea等
* 开始不建议就用IDE，待到熟悉Java代码的编辑运行，有一定的编程基础，需要解决较为复杂的程序问题时，IDE能够帮助提高工作效率，在开始阶段，建议用文本编辑器训练自己的基础能力

### 2.3 编程完成以下四题

* 题目一(Lab1-1). 编程显示三句话，每一句分别占一行，不包括双引号。
  
  三句话分别为:

  “Welcome to Java!"
  "Learning Java Now."
  "Programming is fun!" 


* 题目二(Lab1-2). 编写程序按表格形式输出其中内容，不需要绘制表格边框:

| a | a^2 | a^3 | a^4 |
| ---- | ---- | ---- | ---- |
| 1 | 1 | 1 | 1 |
| 2 | 4 | 8 | 16 |
| 3 | 9 | 27 | 81 |
| 4 | 16 | 64 | 256 |


* 题目三(Lab1-3). 根据公式计算$\pi$

$
\pi = 4\times (1-\frac{1}{3}+\frac{1}{5}-\frac{1}{7}+\frac{1}{9}-\frac{1}{11}+\cdots)
$

程序中显示两行结果，分别为

$
\pi = 4\times (1-\frac{1}{3}+\frac{1}{5}-\frac{1}{7}+\frac{1}{9}-\frac{1}{11})
$

$
\pi = 4\times (1-\frac{1}{3}+\frac{1}{5}-\frac{1}{7}+\frac{1}{9}-\frac{1}{11}+\frac{1}{13})
$

请在代码中注释说明该如何得到正确的结果


* 题目四(Lab1-4). 编写程序绘制如下图案

<img src="./images/chap1/java.png" width="300"/>

## 3. 实验提交

实验提交截止时间为下次上课前一天24:00，按照实验说明里的要求提交到FTP相应目录下。