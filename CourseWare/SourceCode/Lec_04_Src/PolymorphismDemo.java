public class PolymorphismDemo{
	public static void main( String[] args ){
	// Display circle and rectangle properties
	displayObject( new Circle( 1, "red", false ) );
	displayObject( new Rectangle( 3, 4, "black", true ) );
	}
	
	public static void displayObject( Geometry geometry ){
		System.out.println( geometry.toString()  + "\nCreated on " + geometry.getDateCreated() + ".\nColor is " + geometry.getColor() );
	}
	
}