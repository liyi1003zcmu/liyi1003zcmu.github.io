import java.util.*;

public class MultiCatchDemo{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		try{
			System.out.println( "Please input a total amount: " );
			int totalNumber = input.nextInt();
			System.out.println( "Please input people number: " );
			int peopleNumber = input.nextInt();
			System.out.println( "Average pay is " + ( totalNumber / peopleNumber ) );
		}catch( InputMismatchException ex1 ){
			System.out.println( "Input must be an integer!" );
		}catch( ArithmeticException ex2 ){
			System.out.println( "Divisor cannot be zero"  );
		}catch( Exception ex3 ){
			System.out.println( "Exception occured: " + ex3.getMessage() );
		}
		
		System.out.println( "Execution continues..." );
	}
}