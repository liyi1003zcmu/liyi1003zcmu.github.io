import java.util.*;

public class TestVectorInteger{
	public static void main( String[] args ){
		Vector<Integer> vec = new Vector<Integer>();
		
		for( int i = 0; i < 10; i++ )
			vec.addElement( (int)(Math.random() * 10000 % 28 + 1 ) );
		
		for( int i = 0; i < 10; i++  )
			vec.addElement( Math.random() * 10000 % 28 + 58 );
		
		System.out.println( "vec.capacity: " + vec.capacity() );
		System.out.println( "vec.size: " + vec.size() );

		System.out.println( "vec is empty? " + vec.isEmpty() );
		
		System.out.println( "Vector contains 1? " + vec.contains( 3 ) );
		
		System.out.println( "Vector remove 18? " + vec.remove( 18 ) );
		
		vec.clear();
		System.out.println( "After vector clear, size is " + vec.size() );
		
	}
}