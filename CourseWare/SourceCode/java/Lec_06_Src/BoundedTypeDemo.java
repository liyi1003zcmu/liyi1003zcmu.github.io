public class BoundedTypeDemo{
	public static void main( String[] args ){
		Rectangle rt = new Rectangle( 2, 2 );
		Circle cl = new Circle( 2.5 );
		
		System.out.println( "Circle equals Rectangle? " + BoundedTypeDemo.<Geometry>equalArea( rt, cl ) );
	}
	
	public static < E extends Geometry > boolean equalArea( E object1, E object2 ){
		return object1.getArea() == object2.getArea();
	}
}