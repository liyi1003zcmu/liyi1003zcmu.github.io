import java.util.*;

public class GCDV2{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		System.out.print( "Enter the first number: " );
		int n1 = input.nextInt();
		System.out.print( "Enter the second number: " );
		int n2 = input.nextInt();
		
		int gcd = 1;
		
		int gn = ( n1 > n2 ) ? n1 : n2;
		int sn = ( n1 > n2 ) ? n2 : n1;
		while( sn > 0 ){
			if( gn % sn == 0 ){
				break;
			}
			int rem = gn % sn;
			gn = sn;
			sn = rem;
		}
		System.out.println( "GCD is : " + sn );
	}
}