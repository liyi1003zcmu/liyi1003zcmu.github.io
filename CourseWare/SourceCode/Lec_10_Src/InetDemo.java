import java.net.*;

public class InetDemo{
	public static void main( String[] args ){
		try{
			InetAddress inetadd = InetAddress.getLocalHost();
			
			System.out.println( inetadd.toString() );
			
			System.out.println( inetadd.getHostName() );
			
			System.out.println( inetadd.getHostAddress() );
		}
		catch( Exception e ){
			e.printStackTrace();
		}
	}
}