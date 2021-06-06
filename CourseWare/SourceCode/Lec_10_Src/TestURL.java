import java.net.*;
import java.io.*;

public class TestURL{
	public static void main( String[] args ){
		String strURL = "http://www.zcmu.edu.cn";
		try{
			URL u = new URL( strURL );
			URLConnection uc = u.openConnection();
			BufferedReader in = new BufferedReader( new InputStreamReader( uc.getInputStream() ) );
			String inputLine;
			while( ( inputLine = in.readLine() ) != null ){
				System.out.println( inputLine );
			}
			in.close();
		}catch( Exception e ){
			e.printStackTrace();
		}
	}
}