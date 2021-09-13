import java.io.*;
public class TestFileCStream{
	public static void main( String [] args ){
		FileReader fr = null;
		FileWriter fw = null;
		int c = 0;
		try{
			fr = new FileReader( "bbb.txt" );
			fw = new FileWriter( "ccc.txt" );
 
			while( (c = fr.read() ) != -1 ){
				fw.write( c );
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