import java.io.*;
public class TestFileCStreamFast{
	public static void main( String [] args ){
		FileReader fr = null;
		FileWriter fw = null;
		char[] cbuf = new char[8192];
		try{
			fr = new FileReader( "bbb.txt" );
			fw = new FileWriter( "ccc.txt" );
			int read = fr.read( cbuf );
			while( read != -1 ){
				fw.write( cbuf );
				read = fr.read( cbuf );
			}
			fw.flush();
		}catch( FileNotFoundException ex ){
			ex.printStackTrace();
		}catch( IOException ex ){
			ex.printStackTrace();
		}finally{
			try{
				if( fw != null )
					fw.close();
			}catch( IOException ex ){
				ex.printStackTrace();
			}
			try{
				if( fr != null )
					fr.close();
			}catch( IOException ex ){
				ex.printStackTrace();
			}
		}
	}
}