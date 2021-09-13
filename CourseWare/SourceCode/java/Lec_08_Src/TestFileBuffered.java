import java.io.*;

public class  {
	 public static void main( String [] args ){
		BufferedReader br = null;
		BufferedWriter bw = null;
		try{
			br = new BufferedReader( new FileReader( "bbb.txt" ) );
			bw = new BufferedWriter( new FileWriter( "ddd.txt" ) );
			String str = null;
			while( ( str = br.readLine() ) != null ){
				bw.write( str );
				bw.newLine();
			}
			bw.flush();
		}catch( IOException ex ){
			ex.printStackTrace();
		}finally{
			try{
				if( bw != null )
					bw.close();
			}catch( IOException ex ){
				ex.printStackTrace();
			}
			try{
				if( br != null )
					br.close();
			}catch( IOException ex ){
				ex.printStackTrace();
			}
		}
	}
}
