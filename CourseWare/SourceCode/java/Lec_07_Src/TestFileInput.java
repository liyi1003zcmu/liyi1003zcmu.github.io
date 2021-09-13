import java.io.*;
public class TestFileInput{
	public static void main( String [] args ){
	FileInputStream fin = null;
	try{
		fin = new FileInputStream( "bbb.txt" );
		System.out.println( "Bytes available for read: " + fin.available() );
		
		int i = fin.read();
		while( i != -1 ){
			System.out.print( (char)i );
			i = fin.read();
		}
	}catch( FileNotFoundException ex ){
		ex.printStackTrace();
	}catch( IOException ex ){
		ex.printStackTrace();
	}finally{
		try{
			if( fin != null )
				fin.close();
		}catch( IOException ex ){
			ex.printStackTrace();
		}
	}
 }