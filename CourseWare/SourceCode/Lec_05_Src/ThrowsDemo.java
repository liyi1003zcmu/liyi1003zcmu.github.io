public class ThrowsDemo{
	public static void main( String[] args ){
		testThrows( args );
	}
	/*
	public static void testThrows( String[] tmp ){
		try{
			createThrow( tmp );
		}catch( Exception ex ){
			System.out.println( "Exception from createThrow" );
		}
	}*/
	
	
	public static void testThrows( String[] tmp ) throws Exception{
		createThrow( tmp );
	}
	
	
	public static void createThrow( String[] tmp ) throws Exception{
		int number = 0;
		number = Integer.parseInt( tmp[ 0 ] );
		System.out.println( "Number entered is " + number );
	}
}