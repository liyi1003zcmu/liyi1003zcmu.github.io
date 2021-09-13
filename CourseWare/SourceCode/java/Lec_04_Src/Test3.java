public class Test3{
	public static void main( String[] args ){
		Circle4  myCircle = new Circle4( 5.0 );
		printCircle( myCircle );
	}
	
	public static void printCircle( Circle4 c ){
		System.out.println( "Area of a circle of radius " + c.getRadius() + " is " + ( float )c.getArea() );
	}
}
