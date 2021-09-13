import java.net.*;

public class IdentifyHostIP{
	public static void main( String[] args ){
		try{
			InetAddress inetadd = InetAddress.getByName( "www.baidu.com" );
			System.out.println( "Host name: " + inetadd.getHostName() + "" );
			System.out.println( "IP Address: " + inetadd.getHostAddress() );
		}
		catch( Exception e ){
			e.printStackTrace();
		}
	}
}