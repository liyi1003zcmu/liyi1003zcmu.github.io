# 实验三 Java语言基础(一)--补

## 1. 实验目的

加强Java基本程序设计能力，能够灵活运用各种控制结构及常用输入输出控制、字符串等求解基本应用问题

## 2. 实验任务

### 2.1 编程完成以下三题

* 题目一(Lab2-1). 计算素数

  计算并显示输出2到1000以内的所有素数，10个素数为一行，用tab控制对齐

  ```shell
  All prime numbers between 2 and 1000 are: 

  2       3       5       7       11      13      17      19      23      29
  31      37      41      43      47      53      59      61      67      71
  73      79      83      89      97      101     103     107     109     113
  127     131     137     139     149     151     157     163     167     173
  179     181     191     193     197     199     211     223     227     229
  233     239     241     251     257     263     269     271     277     281
  283     293     307     311     313     317     331     337     347     349
  353     359     367     373     379     383     389     397     401     409
  419     421     431     433     439     443     449     457     461     463
  467     479     487     491     499     503     509     521     523     541
  547     557     563     569     571     577     587     593     599     601
  607     613     617     619     631     641     643     647     653     659
  661     673     677     683     691     701     709     719     727     733
  739     743     751     757     761     769     773     787     797     809
  811     821     823     827     829     839     853     857     859     863
  877     881     883     887     907     911     919     929     937     941
  947     953     967     971     977     983     991     997
  ```


* 题目二(Lab2-2). 十进制整数与二进制整数互转

  写一个程序，给出用户两个选项，输入0实现十进制整数转换为二进制，输入1实现二进制整数转换为十进制。无论在哪种情况下，如果用户输入数值为-1，退出程序

  如

  ```shell
  Transform between decimal and Binary number. 
  0 is for transforming from decimal to binary.
  1 is for transforming from binary to decimal.
  Enter your choice (0-1):
  >> 0
  Enter a decimal number:  18
  The binary number for decimal number 18 is 10010.
  Enter your choice (0-1):
  >> 1
  Enter a binary number:  10010
  The decimal number for binary number 10010 is 18.
  Enter your choice (0-1):
  >> 1
  Enter a binary number: -1
  ByeBye.
  ```

* 题目三(Lab2-3). 石头、剪刀、布游戏
  
  实现与计算机的石头、剪刀、布游戏对战。以0、1、2分别代表石头、剪刀、布。计算机生成一个0到2之间的随机整数，由用户输入一个整数，显示当前游戏胜方。每次游戏持续若干轮，直到计算机或者人比对方胜出轮次多出3次以上为止

  如

  ```shell
  Welcome to Scissor, Rock and Paper.
  Sciccor(0), Rock(1), Paper(2).
  Please enter your choice: 
  >> 1
  The computer is Scissor. You are Rock. You won.
  You won 1 times. The computer won 0 times.
  Sciccor(0), Rock(1), Paper(2).
  Please enter your choice:
  >> 2
  The computer is Paper. You are Paper too. It is a draw.
  You won 1 times. The computer won 0 times.
  
  ...

  Sciccor(0), Rock(1), Paper(2).
  Please enter your choice:
  >> 0
  The computer is Paper. You are Scissor. You won.
  You won 5 times. The computer won 2 times. You won the game.
  ```