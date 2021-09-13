public class WildCardDemo2{
	public static void main( String[] args ){
		GenericStack< Integer > intStack = new GenericStack< Integer >();
		intStack.push( 1 );
		intStack.push( 2 );
		intStack.push( -2 );

		GenericStack< Double > dStack = new GenericStack< Double >();
		dStack.push( 1.1 );
		dStack.push( -1.2 );
		
		System.out.println( "Max number is " + max( intStack ) );
		
		System.out.println( "Max number is " + max( dStack ) );
		//print( intStack );
	}
	
	public static double max( GenericStack<? extends Number > stack ){
		double max = stack.pop().doubleValue();
		
		while( !stack.isEmpty() ){
			double value = stack.pop().doubleValue();
			if( value > max )
				max = value;
		}
		
		return max;
	}
	
	public static void print( GenericStack< ? > stack ){
		while( !stack.isEmpty() ){
			System.out.println( stack.pop() );
			//System.out.print( stack.pop() + " " );
		}
	}
}