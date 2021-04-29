public class ThrowDemo{
	public static void main( String[] args){
		int number = 1;
		try{
			number = Integer.parseInt( args[ 0 ] );
		}catch( Exception e ){
			throw new ArrayIndexOutOfBoundsException( "Index exceeds boundary" );
			//System.out.println( "Illegal number" );
		}
		
		System.out.println( "Your number is : "+ number );
	}
}