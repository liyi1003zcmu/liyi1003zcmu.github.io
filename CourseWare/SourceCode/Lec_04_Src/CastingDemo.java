public class CastingDemo{
	public static void main( String[] args ){
		// create and initialize two objects
		Object obj1 = new Circle( 1 );
		Object obj2 = new Rectangle( 3, 4 );
		
		// display circle and rectangle
		displayObject( obj1 );
		System.out.println();
		displayObject( obj2 );
	}
	
	public static void displayObject( Object obj ){
		if( obj instanceof Circle ){
			System.out.println( "This is Circle\n");
			System.out.println( "The circle area is " + ((Circle)obj).getArea() );
			System.out.println( "The circle diameter is " + ((Circle)obj).getDiameter() );
		}
		else if( obj instanceof Rectangle ){
			System.out.println( "This is Rectangle\n" );
			System.out.println( "The rectangle area is " + ((Rectangle)obj).getArea() );
		}
	}
}