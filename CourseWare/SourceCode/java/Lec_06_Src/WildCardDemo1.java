public class WildCardDemo1{
	public static void main( String[] args ){
		GenericStack< Integer > intStack = new GenericStack< Integer >();
		intStack.push( 1 );
		intStack.push( 2 );
		intStack.push( -2 );
		
		System.out.println( "Max number is " + max( intStack ) );
	}
	
	//public static double max( GenericStack<Integer> stack ){
	public static double max( GenericStack<Number> stack ){
		double max = stack.pop().doubleValue();
		
		while( !stack.isEmpty() ){
			double value = stack.pop().doubleValue();
			if( value > max )
				max = value;
		}
		
		return max;
	}
}