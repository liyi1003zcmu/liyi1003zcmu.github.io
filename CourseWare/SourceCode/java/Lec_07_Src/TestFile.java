import java.io.*;

public class TestFile{
	public static void main( String[] args ){
		try{
			File f1 = new File( "." );
			File f2 = new File( "~" );
			File f3 = new File( "..", "Test" );
			File f4 = new File( "TestHaHa.txt" );
			File f5 = new File( "ctest/" );

			f4.createNewFile();
			f3.mkdir();
			System.out.println( "Path of f3 if " + f3.getPath() );
			if( f3.exists() )
				System.out.println( f3 + " is exist" );
			else{
				f3.createNewFile();
				System.out.println( "f3 is created" );
			}
		}catch( IOException ex ){
			ex.printStackTrace();
		}
	}
}