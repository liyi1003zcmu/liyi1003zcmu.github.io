import java.util.*;

public class TestArrayList{
	public static void main( String[] args ){
		ArrayList< String > list1 = new ArrayList< String >();
		
		list1.add( "Red" );
		list1.add( "Blue" );
		String s = list1.get( 0 );
		//String s2 = list1[0];
		list1.add( new Integer( 1 ) );
		
		//ArrayList< int > list2 = new ArrayList< int >();
		
		ArrayList< Integer > list2 = new ArrayList< Integer >();
		
		list2.add( 5 );
		
		ArrayList< Double > list3 = new ArrayList< Double >();
		list3.add( 3.3 ); //list3.add( new Double( 3.3 ) );
		list3.add( 18.8 );
		Double dObject = list3.get( 0 );
		double d = list3.get( 1 );
		System.out.println( "dObject: " + dObject + "\n" + " d: " + d );
	}
}