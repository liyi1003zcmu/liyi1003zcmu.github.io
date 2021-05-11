import java.io.*;

public class WriteDataFile{
	public static void main( String[] args ) throws IOException{
		File file = new File( "score.txt" );
		if( file.exists() ){
			System.out.println( "File already exists" );
			System.exit( 1 );
		}

		PrintWriter output = new PrintWriter( file );

		output.print( "John T Smith " );
		output.println( 90 );
		output.print( "Eric K Jones " );
		output.println( 85 );

		output.close();
	}
}