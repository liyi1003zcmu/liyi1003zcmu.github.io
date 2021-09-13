import java.io.*;
import java.net.*;

public class URLReader{
	public static void main( String[] args ){
		try{
			URL gis = new URL( "http://www.zcmu.edu.cn" );
			System.out.println( "Protocol: " + gis.getProtocol() );
			System.out.println( "Hostname: " + gis.getHost() );
			System.out.println( "Port: " + gis.getPort() );
			System.out.println( "File: " + gis.getFile() );
			System.out.println( "toString: " + gis.toString() );
			System.out.println( "=============================" );
			
			BufferedReader in = new BufferedReader( new InputStreamReader( gis.openStream(), "utf-8" ) );
			
			String line;
			while( ( line = in.readLine() ) != null ){
				System.out.println( line );
			}
			in.close();			
		}
		catch( MalformedURLException e ){
			e.printStackTrace();
		}
		catch( Exception e ){
			e.printStackTrace();
		}
	}
}