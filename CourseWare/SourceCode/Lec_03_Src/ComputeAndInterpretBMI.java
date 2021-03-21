import java.util.*;
import java.text.*;

public class ComputeAndInterpretBMI{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		
		System.out.print( "Enter weight in Kilograms: " );
		double weight = input.nextDouble();
		
		System.out.print( "Enter your height in centimeters: " );
		double height = input.nextDouble();
		height /= 100.0;
		
		double bmi = weight/( height * height );
		DecimalFormat df = new DecimalFormat( "#0.000" );
		System.out.println( "BMI is " + df.format( bmi ) );
		if( bmi < 18.5 )
			System.out.println( "偏瘦" );
		else if( bmi < 25 )
			System.out.println( "正常" );
		else if( bmi < 30 )
			System.out.println( "超重" );
		else
			System.out.println( "肥胖" );
	}
}