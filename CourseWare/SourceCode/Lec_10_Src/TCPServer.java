import java.io.*;
import java.net.*;

public class TCPServer{
	public static void main( String[] args ){
		try{
			ServerSocket s = new ServerSocket( 8888 );
			while( true ){
				Socket s1 = s.accept();
				/*
				BufferedWriter wr = new BufferedWriter( new OutputStreamWriter( s1.getOutputStream() ) );
				wr.write( "Hello: " + s1.getInetAddress() + ": " + s1.getPort() );
				wr.close();
				*/
				
				BufferedReader br = new BufferedReader( new InputStreamReader( s1.getInputStream() ) );
				String str = br.readLine();
				System.out.println( "Client says: " + str );
				
				s1.close();
				
			}
		}
		catch( Exception e ){
			e.printStackTrace();
			System.out.println( "Program exits!" + e );
		}
	}
}