import java.util.*;

public class QuotientWithIf{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		
		System.out.println( "Please enter two integers: " );
		int number1 = input.nextInt();
		int number2 = input.nextInt();
		
		if( number2 != 0 ){
			System.out.println( number1 + "/" + number2 + " is " + ( number1/number2 ) );
		}
		else
			System.out.println( "Divisor cannot be zero! " );
	
	}
}