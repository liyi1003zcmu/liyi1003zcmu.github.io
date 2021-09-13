# 实验七 Java面向对象基础(二)

## 1. 创建形状基础类
作一个绘图类应用，需要定义一系列可供选择的形状，如圆形、三角形、矩形等，为此，为这些形状定义一个父类，名为Geometry，圆形Circle, 矩形Rectangle都是作为其子类。

其中，这三个类的定义已经由课件绘出，请根据UML图完成此三个类的定义，请将每个类分别定义在单独的.java文件中。

* 对Geometry类而言，其date参数是一个java.util.Date类型，需导入java.util包。为该父类提供不带参和分别带1个、2个参数的构造方法。

* 对Circle和Rectangle两个子类，定义适当的构造方法，使之分别调用父类带参的和不带参的构造方法，两个子类还分别有getPerimeter()方法计算形状的周长，getArea()方法计算形状的面积

* 重写各类的toString()方法，要求：

在Geometry类中，输出形状的基本信息，如：
```
颜色: red
是否填充: yes
创建时间:  Tue Mar 28 10:18:10 GMT+08:00 2017
```
在Circle类中，输出信息包括以下内容，如：
```
形状: Circle
半径: 1.0
面积: 3.14159
周长: 6.28318
```
在Rectangle类中，输出信息包扩以下内容，如:
```
形状: Rectangle
面积: 12
周长: 14
```

定义测试类TestGeometry，保存在单独文件中。类的main方法实现中，分别新建三个类对象各一个，进行初始化后，分别调用其toString方法输出对象信息

## 2. 定义三角形类
根据Circle类和Rectangle类的实现，定义三角形类Triangle，实现相关方法，代码实现在相应的.java文件中

## 3. 形状类对象数组
创建一个Geometry类型数组，定义四个元素，分别为Geometry，Circle，Rectangle和Triangle，利用instanceof运算符，判断对象类型，如果是Geometry类型，输出对象的颜色，如果是Circle对象，输出对象的面积，如果是Rectangle对象，输出对象的周长，如果是Triangle对象，输出创建的时间，如果不是这三种类型，输出“Other Geometry”

## 4. 定义交通工具类
设计并实现一个Vehicle类及其子类，用于表示不同类型的交通工具，同样构建父类数组，内含若干子类对象，输出数组中元素信息