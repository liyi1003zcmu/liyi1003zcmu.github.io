public class ComparableRectangle extends Rectangle implements Comparable{
	public ComparableRectangle( double width, double height ){
		super( width, height );
	}
	
	public int compareTo( Object o ){
		if( getArea() > ( ( ComparableRectangle ) o ).getArea() ) 
			return 1;
		else if( getArea() < ( ( ComparableRectangle ) o ).getArea() ) 
			return -1;
		else
			return 0;
	}
	
	public static void main( String[] args ){
		ComparableRectangle rt1 = new ComparableRectangle( 4, 5 );
		ComparableRectangle rt2 = new ComparableRectangle( 3, 9 );
		System.out.println( Max.max( rt1, rt2 ) );
		//rt1.compareTo(rt2)
	}
}