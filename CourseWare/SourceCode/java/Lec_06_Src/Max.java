public class Max{
	public static < E extends Comparable<E>> E max( E o1, E o2 ){
		if( o1.compareTo( o2 ) > 0 )
			return o1;
		else
			return o2;
	}
	
	// public static Comparable max( Comparable o1, Comparable o2 ){
		// if( o1.compareTo( o2 ) > 0 )
			// return o1;
		// else
			// return o2;
	// }
	
	public static void main( String[] args ){
		String s1 = "abcdef";
		String s2 = "abcdee";
		String s3 = ( String )max( s1, s2 );
		System.out.println( s3 );
		
		//System.out.println( max( "abcd", 23 ) );
		
	}
	
	// public static Comparable max( Comparable[] ca ){
		// Comparable max = ca[ 0 ];
		// for( int i = 1 ; i < ca.length; i++ ){
			// if( max.compareTo( ca[ i ] ) < 0 )
				// max = ca[ i ];
		// }
		// return max;
	// }
}