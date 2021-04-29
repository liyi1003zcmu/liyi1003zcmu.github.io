import java.util.*;

public class Quotient{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		
		System.out.println( "Please enter two integers: " );
		int number1 = input.nextInt();
		int number2 = input.nextInt();
		
		System.out.println( number1 + "/" + number2 + " is " + ( number1/number2 ) );

		System.out.println( "Execution continues..." );
	}
}