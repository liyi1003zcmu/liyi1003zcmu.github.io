# 实验七 Java面向对象基础(三)

## 1. 啮齿动物家族
有几种动物名词，啮齿动物(Rodent)，老鼠(Mouse)，鼹鼠(Gerbil)，金黄大颊鼠(Hamster)，自行搜索相关知识，建立类的层次结构，其中层次中的类至少有一个为抽象类。

已知内容包括：

```shell
1.  啮齿动物的主要习性有：寻找食物(findFood)，吃食物(chewFood)，不同的啮齿动物要找的食物不同，吃不同食物的方法也不同。

2.  对于不同的啮齿动物，都需要重写两种习性方法，以表明不同啮齿动物的不同行为习性。其中，寻找食物方法返回找到的食物名称，吃食物方法显示内容为：动物名+”吃“+找到的食物名

3.  在主方法中创建一个啮齿动物数组，建立不同种类的啮齿动物，让每个动物吃它们找到的食物
```

根据以上描述建立类的层次结构，实现各个类，并在测试类中实现主方法，完成要求的所有功能

## 2. 用接口形式实现啮齿动物家族所要求的功能

## 3. 会飞的鼠是啮齿动物?

鼯鼠(Pteromyini)也称“飞鼠”，也是啮齿动物中的一种，请在前一题中以接口表示的基础上，扩展其表示能力，通过实现另一会飞的接口，实现鼯鼠类，并在主方法生成的对象数组中增加一鼯鼠对象，对于数组中的对象，当其类型为鼯鼠时，除了吃找到的食物外，还可表演“飞行”。

## 4. 实现Comparable接口

参考以下代码：

```java
public class Max{
	public static Comparable max( Comparable o1, Comparable o2 ){
		if( o1.compareTo( o2 ) > 0 )
		    return o1;
		else
		    return o2;
	 }
	
	public static void main( String[] args ){
		String s1 = "abcdef";
		String s2 = "abcdee";
		String s3 = ( String )max( s1, s2 );
		System.out.println( s3 );
	}
}
```

定义方法，实现在对象数组中找到最大元素的功能，方法声明为

```java
public static Object max( Comparable[] a )
```

所有对象元素都是Comparable接口类型的对象，数组中对象比较采用compareTo方法

要求编写测试程序，分别在10个字符串(String)，10个整数(Integer)和10个日期类型(java.util.Data)中找到最大元素