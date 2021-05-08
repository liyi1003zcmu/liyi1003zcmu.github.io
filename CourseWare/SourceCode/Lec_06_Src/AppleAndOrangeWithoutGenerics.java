import java.util.*;
class Apple{
	private static int counter;
	private int id = counter++;
	public int id(){
		return id;
	}
}
class Orange{}
public class AppleAndOrangeWithoutGenerics{
	public static void main( String[] args ){
		ArrayList apples = new ArrayList();
		for( int i = 0; i < 5; i++ )
			apples.add( new Apple() );
		apples.add( new Orange() );
		for( int i = 0; i < apples.size(); i++ )
			System.out.println( ((Apple)(apples.get( i ))).id() );
	}
}