import java.util.*;
public class ListDemo1{
	public static void main( String[] args ){
		Collection c1 = new ArrayList();
		
		for( int i = 0; i < 10; i++)
			c1.add( new Integer( i ) );
		System.out.println( "c1: " + c1 );
		
		Collection c2 = new ArrayList();
		c2.addAll( c1 );
		c2.remove( new Integer( 3 ) );
		c2.add( "hehe" );
		System.out.println( "c2: " + c2 );
		
		Iterator it = c2.iterator();
		while( it.hasNext() ){
			Object obj = it.next();
			System.out.println( "Iterator遍历c2 : "+ obj + "\t" );
		}
		// for( Object i : c2 )
		//System.out.println( "Iterator遍历c2 : " + i + "\t" );
	}
}