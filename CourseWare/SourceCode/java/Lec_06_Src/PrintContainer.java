import java.util.*;
public class PrintContainer{
	static Collection fill( Collection<String> col ){
		col.add( "cat" );
		col.add( "rat" );
		col.add( "fox" );
		col.add( "dog" );
		col.add( "dog" );
		return col;
	}
	public static void main( String[] args ){
		Collection<String> c1 = new ArrayList<String>();
		Collection<String> c2 = new LinkedList<String>();
		Collection<String> c3 = new HashSet<String>();
		Collection<String> c4 = new TreeSet<String>();
		fill( c1 ); fill( c2 ); fill( c3 ); fill( c4 );
		//Collection<String> c1 = fill(new ArrayList<String>() );
		//Collection<String> c2 = fill( new LinkedList<String>() );
		//Collection<String> c3 = fill( new HashSet<String>() );
		//Collection<String> c4 = fill( new TreeSet<String>() );
		System.out.println( c1 );
	}
}