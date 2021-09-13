import java.io.*;
public class TestFileOutput{
	public static void main( String [] args ){
		FileOutputStream fout = null;
		try{
			fout = new FileOutputStream( "bbb.txt", true ); 
			fout.write( '$' );
			fout.write( "HelloWorld".getBytes() );
			fout.write( "你好".getBytes() );
			fout.flush();
		}catch( FileNotFoundException ex ){
			ex.printStackTrace();
		}catch( IOException ex ){
			ex.printStackTrace();
		}finally{
			if( fout != null ){
				try{
					fout.close();
				}catch( IOException ex ){
					ex.printStackTrace();
				}
			}
		}
	}
}