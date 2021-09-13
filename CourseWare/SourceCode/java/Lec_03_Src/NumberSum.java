import java.util.*;

public class NumberSum{
	public static void main( String[] args ){
		int data;
		int sum = 0;
		Scanner input = new Scanner( System.in );
		
		do{
			System.out.print( "Enter an integer (the input ends if it is 0): " );
			data = input.nextInt();
			sum += data;
		}while( data != 0 );
		
		System.out.println( "The sum is " + sum );
	}
}