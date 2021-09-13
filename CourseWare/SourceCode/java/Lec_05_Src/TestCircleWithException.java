public class TestCircleWithException {
  public static void main(String[] args) {
    // try {
      // CircleWithException c1 = new CircleWithException(5);
      // CircleWithException c2 = new CircleWithException(-5);
      // CircleWithException c3 = new CircleWithException(0);
    // }
    // catch (IllegalArgumentException ex) {
      // System.out.println(ex);
    // }

    // System.out.println("Number of objects created: " +
      // CircleWithException.getNumberOfObjects());
	// } 
	
	try{
			CircleWithException c4 = new CircleWithException( 1 );
			c4.setRadius( -5 );
	}
	catch( InvalidRadiusException ex ){
		System.out.println( "The invalid radius is " + ex.getRadius() );
	}
	}
	
}