# 实验六 Java面向对象基础(二)

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

## 2. 形状类对象数组
创建一个Geometry类型数组，定义三个元素，分别为Geometry，Circle和Rectangle，利用instanceof运算符，判断对象类型，如果是Geometry类型，输出对象的颜色，如果是Circle对象，输出对象的面积，如果是Rectangle对象，输出对象的周长，如果不是这三种类型，输出“Other Geometry”

## 3. 升级版ATM机
在前一次实验的模拟ATM机中建立的账户类Account基础上，建立两个子类，分别为信用卡帐户(CheckingAccount)和借记卡帐户(SavingAccount)，其中信用卡帐户具有属性透支限额(OverdraftLimit)，借记卡帐户则无法透支。

同时为Account帐户添加如下信息：
* String型成员变量name，用于存放客户名字
* 提供构造方法，能根据客户名字，其ID及存款额建立帐户
* 增加新成员变量transactions，用于存放帐户的所有交易，类型为ArrayList(关于ArrayList类的使用，可参见教材相关章节的描述，或参照Java API文档)，每个transaction都是Transaction类的一个实例，其定义如下表所示

```
**Transaction**
-date: java.util.Data
-type: char
-amount: double
-balance: double
-description: String
Transaction( type: char, amount: double, balance: double, description: String )
```

其中date表示交易产生的日期，type表示交易类型：’W’表示取款，‘D’表示存款，amount表示存款或取款交易的数额，balance表示交易后帐户的余额，description表示对帐户的描述,如交易网点代码等
* 修改原有withdraw()和deposit()方法，每次交易都需要往ArrayList transactions中添加一个交易

在实现三个类的基本功能基础上，实现两个测试方法：
分别建立Account, SavingAccount和CheckingAccount对象实例，并调用其toString()方法显示其信息
建立一个SavingAccount对象实例，年利率为1.5%，初始金额为1000元，id为1122，姓名为George，在此帐户中，分别执行三次存款和取款操作，金额自定，然后显示帐户的详情，以及每次交易的具体信息
建立一个CheckingAccount对象实例，在此帐户上执行三次刷卡操作，显示帐户余额情况