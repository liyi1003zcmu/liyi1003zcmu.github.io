import java.util.*;

public class QuotientWithException{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		
		System.out.println( "Please enter two integers: " );
		int number1 = input.nextInt();
		int number2 = input.nextInt();
		
		try{
			if( number2 == 0 )
				throw new ArithmeticException( "Divisor cannot be zero" );
			
			System.out.println( number1 + "/" + number2 + " is " + (number1/number2) );
		}
		catch( ArithmeticException ex){
			ex.printStackTrace();
			System.out.println( ex );
			System.out.println( "Exception: an integer " + " cannot be divided by zero" );
		}
		
		System.out.println( "Execution continues..." );
	}
}