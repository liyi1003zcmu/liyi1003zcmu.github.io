# 实验四 字符串

## 1. 实验目的

熟悉Java中字符串的概念，构造，能够灵活运用字符串类相应方法求解基本应用问题

## 2. 实验任务

### 2.1 编程完成以下题目

* 题目一(Lab4-1). 反转字符串
  从标准输入获取一行字符串，包含数字和字母，编写程序，将该行字符串反转后输出
  
* 题目二(Lab4-2). 文本中查找字符串
  从标准输入获取多行文本，行数自行指定，再输入要查找的字符串，输出要查找的字符串在文本中的位置，包含行号与每行中的下标位置，如无，则都显示-1
  
* 题目三(Lab4-3). 进制转换
  写一个程序，实现十六进制与十进制数之间的相互转换。

  程序提供两个选项，分别表示不同的转换，如

  ```shell
  1. 十六进制转换为十进制
  2. 十进制转换为十六进制
  ```

  - 十六进制转换为十进制时，用户输入为一十六进制字符串，其中字母大小写可通用，程序通过计算显示该十六进制数对应十进制数，如果其中含有非法十六进制字符，则提示输入无效，程序结束
  - 十进制转换为十六进制数时，用户输入为一整数，通过计算显示该 十进制数对应的十六进制字符串，用大写字母显示

  程序运行示例：

  十六进制转换为十进制
  ```shell
  Please enter your choice: 
  1. for hex to dec
  2. for dec to hex
  Input: 1
  Enter a hex string: 1F
  Decimal value for hex string 1F is 31.
  ```

  十进制转换为十六进制：
  
  ```shell
  Please enter your choice: 
  1. for hex to dec
  2. for dec to hex
  Input: 2
  Enter a hex string: 31
  Hex string for number 31 is 1F.
  ```
  
* 题目四(Lab4-4). 命令行计算器
  
  利用命令行参数String[] args 实现一命令行整数计算器，能够实现整数间加、减、乘、除四则运算，需要用到字符串转换为整数的函数，相关函数可自行上网寻找。

  如定义源代码为Calculator.java，编译运行后，在命令行运行格式为

  ```shell
  java Calculator op1 op op2
  ```

  其中 op1和op2为两个操作数，op为操作符，可在"+","-","x","/"中任选一个
  如运行时有

  ```shell
  java Calculator 3 + 4
  ```

  输出结果为
  
  ```shell
  3 + 4 = 7
  ```

  如运行时有
  
  ```shell
  java Calculator 440 - 439
  ```
  输出结果为

  ```shell
  440 - 439 = 1
  ```
  如运行时有

  ```shell
  java Calculator 20 x 50
  ```
  输出结果为
  
  ```shell
  20 x 50 = 1000
  ```

  如运行时有
  ```shell
  java Calculator 24 / 8
  ```

  输出结果为
  ```shell
  24 / 8 = 3
  ```