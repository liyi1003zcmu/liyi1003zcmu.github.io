import java.util.*;
import java.math.*;

public class Main{
	public static void main( String[] args ){
		int lnum;
		Scanner input = new Scanner( System.in );
		lnum = input.nextInt();
		
		System.out.println( lnum );
		/*
		BigInteger[] result = new BigInteger[ lnum ];
		
		for( int i = 0; i < lnum; i++ ){
			int nnum = input.nextInt();
			BigInteger sum = BigInteger.valueOf( 1 );
			for( int j = 0; j < nnum; j++ ){
				int t = input.nextInt();
				sum = sum.multiply( BigInteger.valueOf( t ) );
			}
			result[ i ] = sum;
		}		
		for( int i = 0; i < lnum; i++ )
			System.out.println( result[ i ] );
		*/
	}
}