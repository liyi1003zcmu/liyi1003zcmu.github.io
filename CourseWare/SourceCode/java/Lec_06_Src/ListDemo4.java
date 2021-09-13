import java.util.*;
public class ListDemo{
	public static void printView( List arrayList ){
		Iterator it = arrayList.iterator();
		while( it.hasNext() )
			System.out.print( " " + it.next() );
		System.out.println( "" );
	}
	public static void main( String[] args ){
		List list = new ArrayList();
		Geometry c1 = new Circle( 1.0 );
		Geometry c2 = new Circle( 2.0 );
		Geometry r1 = new Rectangle( 2.0, 3.0 );
		Geometry r2 = new Rectangle( 3.0, 4.0 );
		list.add( c1 );
		list.add( c2 );
		list.add( r1 );
		list.add( r2 );
		System.out.println( "初始化list: " );
		printView( list );
		Collections.shuffle( list );
		System.out.println( "随机排列后list: " + list );
		printView( list );
		Collections.sort( list );
		System.out.println( "排序后list: " + list );
		printView( list );
		Collections.reverse( list );
		System.out.println( "逆序排列后list: " + list );
		printView( list );
		List newlst = new ArrayList( list.size() );
		//List newlst = new ArrayList(
		Arrays.asList( new Object[list.size()] ) );
		Collections.copy( newlst, list );
		System.out.println( "复制后newlist: " + list );
		printView( newlst);
	}
}