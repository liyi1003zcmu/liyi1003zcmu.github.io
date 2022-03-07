# 实验三 Java数组

## 1. 实验目的

掌握Java中数组的表示、定义、以及基本使用方法和规则，熟悉数组常用操作，能够应用数组求解基本应用问题

## 2. 实验任务
### 2.1 编程完成以下题目

* 题目一(Lab3-1). 数数字
  随机生成100个两位整数，将所有整数除去重复数后按照从大到小的顺序输出，输出时以10个数为一行

  示例如下：

  ```shell
  $ java TestArray
  99 97 96 94 93 91 90 88 87 86
  85 84 83 82 81 80 79 78 77 76
  75 74 73 70 69 68 67 66 65 63
  61 59 58 56 55 54 53 52 51 50
  45 44 43 42 39 37 36 35 33 32
  31 30 28 27 26 25 24 23 22 21
  20 17 16 14 13 11 10
  ```

* 题目二(Lab3-2). 数组排序

  输入一组整数，其中第一个数表示输入数组的长度n，后n个数构成一长度为n的数组，现要求检查该数组是否已按降序排列，若是，输出信息，表明数组已按降序排列，否则，将数组按降序排列后输出

  如

  ```shell
  Enter your list: 8 10 1 5 16 61 9 11 1
  The list is not sorted.
  The sorted list is 
  61 16 11 10 9 5 1 1
  ```

  ```shell
  Enter your list: 10 21 11 9 7 5 4 4 3 1 1
  THe list is already sorted.
  ```

* 题目三(Lab3-3). 合并数组
  
  提示输入两个已排序数组，输入每个数组时，第一个值为数组长度n，后续n个值为该数组中的值。然后将两数组按顺序合并后输出，若有相同值，重复输出，不合并。

  如

  ```shell
  Enter list size and content: 5 1 5 16 61 111
  Enter list size and content: 4 2 4 5 6
  list1 is 1 5 16 61 111
  list2 is 2 4 5 6
  The merged list is 1 2 4 5 5 6 16 61 111
  ```



* 题目四(Lab3-4). 数组基本操作
  
  编写一程序，从标准输入中获得10个1-100之间的整数，以0作为输入的结束。给出用户选项，(1)输出最大值，(2)输出最大值的最小的下标，(3)对数组按从小到大排序后输出，(4)求数组中所有元素的平均值和均方差。针对用户输入的选项，输出相应的结果。
  
  程序要求提供友好的用户界面，输入和输出信息完整
  
  ```shell
  Enter 10 numbers: 1 2 3 4 5 6 7 8 9 10
  Menu:
  (1) Find the max
  (2) Find the minimun index of the max number
  (3) Sort the array
  (4) Compute the average and std.
  (5) Exit
  Please enter your choice: 1
  The max number in the array is 10
  Menu:
  (1) Find the max
  (2) Find the minimun index of the max number
  (3) Sort the array
  (4) Compute the average and std.
  (5) Exit
  Please enter your choice: 2
  The minimum index of the max number is 9
  Menu:
  (1) Find the max
  (2) Find the minimun index of the max number
  (3) Sort the array
  (4) Compute the average and std.
  (5) Exit
  Please enter your choice: 5
  Goodbye!
  ```