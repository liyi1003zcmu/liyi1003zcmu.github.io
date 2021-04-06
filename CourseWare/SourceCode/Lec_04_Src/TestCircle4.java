public class TestCircle4{
	/** main method **/
	public static void main( String[] args ){
		// create a circle with radius 5.0
		Circle4 myCircle = new Circle4( 5.0 );
		System.out.println( "The area of the circle with radius " + myCircle.getRadius() + " is " + myCircle.getArea() );
		
		// increase myCircle's radius by 10%
		myCircle.setRadius( myCircle.getRadius() * 1.1 );
		System.out.println( "The area of the circle wit radius " + myCircle.getRadius() + " is " + myCircle.getArea() );
		
		System.out.println( "The number of objects created is " +  myCircle.getNumberOfObjects() );
	}
}