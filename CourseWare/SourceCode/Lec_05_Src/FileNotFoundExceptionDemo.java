import java.util.*;
import java.io.*;

public class FileNotFoundExceptionDemo{
	public static void main( String[] args ){
		Scanner input = new Scanner( System.in );
		
		System.out.println( "Please enter a file name: " );
		String fname = input.nextLine();
		
		try{
			Scanner inputFromFile = new Scanner( new File( fname ) );
			System.out.println( "File " + fname + " exists!" );
		}
		catch( FileNotFoundException ex ){
			System.out.println( "Exception " + fname + " not found! " );
		}
	}
}