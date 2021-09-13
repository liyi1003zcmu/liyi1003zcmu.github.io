import java.util.*;
class Apple{
	private static int counter;
	private int id = counter++;
	public int id(){
		return id;
	}
}
class Orange{}
public class AppleAndOrangeWithSafeType{
	public static void main( String[] args ){
		ArrayList<Apple> apples = new ArrayList<Apple>();
		for( int i = 0; i < 5; i++ )
			apples.add( new Apple() );
		//apples.add( new Orange() );
		for( int i = 0; i < apples.size(); i++ )
			System.out.println( apples.get(i).id() );
		//增强型for循环
		for( Apple a : apples )
			System.out.println( a.id() );
		//利⽤迭代器
		Iterator it = apples.iterator();
		while( it.hasNext() )
			System.out.println( ((Apple)(it.next())).id() );
	}
}