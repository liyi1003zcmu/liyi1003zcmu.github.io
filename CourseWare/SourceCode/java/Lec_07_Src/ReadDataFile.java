import java.io.*;
import java.util.*;

public class ReadDataFile{
	public static void main( String[] args ) throws IOException {
		File file = new File( "score.txt" );
		Scanner input = new Scanner( file );

		while( input.hasNext() ){
			String firstName = input.next();
			String mi = input.next();
			String lastName = input.next();
			int score = input.nextInt();
			System.out.println( firstName + " " + mi + " " + lastName+ " " + score );
		}
		input.close();
	}
}