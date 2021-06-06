import java.io.*;
import java.net.*;

public class TCPClient{
	public static void main( String[] args ){
		try{
			while( true ){
				Socket s = new Socket( "127.0.0.1", 8888 );
				/*
				BufferedReader br = new BufferedReader( new InputStreamReader( s.getInputStream() ) );
				String str = br.readLine();
				System.out.println( "Server says: " + str );
				*/
								
				BufferedWriter bw = new BufferedWriter( new OutputStreamWriter( s.getOutputStream() ) );
				
				bw.write( "Hello: " + s.getInetAddress() + ": " + s.getPort() );
				bw.close();
				
			}
		}
		catch( UnknownHostException e ){
			System.err.println( "Connection to server failed!" );
			e.printStackTrace();
		}
		catch( IOException e ){
			e.printStackTrace();
		}
	}
}