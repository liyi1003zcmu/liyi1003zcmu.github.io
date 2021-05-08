import java.util.*;

class Apple{
	private static int counter;
	private int id = counter++;
	public int id(){
		return id;
	}
}

class Granny extends Apple{}
class Gala extends Apple{}
class Fuji extends Apple{}
class SDApple extends Apple{}
class Braeburn extends Apple{}

public class AppleListDemo{
	public static void main( String[] args ){
	ArrayList<Apple> apples = new ArrayList<Apple>();
	apples.add( new Apple() );
	apples.add( new Granny() );
	apples.add( new Gala() );
	apples.add( new SDApple() );
	apples.add( new Braeburn() );
	//增强型for循环
	for( Apple a : apples )
		System.out.println( a.id() );
	//利⽤迭代器
	Iterator it = apples.iterator();
	while( it.hasNext() )
		System.out.println( ((Apple)(it.next())).id() );
	}
}