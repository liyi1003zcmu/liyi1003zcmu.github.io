import java.util.*;

public class AddQuiz{
	public static void main( String[] args ){
			final int NUMBER_OF_QUESTIOS = 10; // Total number of questions
			int correctCount = 0; // count the number of correct answers
			int count = 0; // count the number of questions
			long startTime = System.currentTimeMillis();
			String output = "";
			Scanner input = new Scanner( System.in );
			
			while( count < NUMBER_OF_QUESTIOS ){
				// 1. Generate two random numbers.
				int num1 = (int)( Math.random() * 100 );
				int num2 = (int)( Math.random() * 100 );
				
				// 2. prompt the user to answer the questions
				System.out.print( "What is " + num1 + "+" + num2 + "? " );
				int answer = input.nextInt();
				
				if( num1 + num2 == answer ){
					System.out.println( "You are correct!" );
					correctCount++;
				}else{
					System.out.println( "Your answer is wrong\n" + num1 + "+" + num2 + "=" + ( num1+num2 ) );
				}
				count++;
				
				output += "\n" + num1 + "+" + num2 + "=" + answer + ((num1+num2==answer) ? " correct" : " wrong" );
			}
			long endTime = System.currentTimeMillis();
			long testTime = endTime - startTime;
			
			System.out.println( "\nCorrect count is " + correctCount + "\nTest time is " + testTime/1000 + " seconds\n" + output );
	}
}