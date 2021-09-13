import java.io.*;
import java.net.*;

public class TestParamURL{
	public static void main( String[] args ){
		String strURL = "http://www.baidu.com/s";
		String param = "wd=java";
		System.out.println( sendGet( strURL, param ) );
	}
	
	/**
	* 以GET方式提交HTTP请求到服务器，并返回结果
	* @param url
	* @param param
	* @return
	*/
	public static String sendGet( String url, String param ){
		String result = "";
		try{
			String urlName = url + "?" + param;
			URL u = new URL( urlName );
			URLConnection connection = u.openConnection();
			connection.connect();
			BufferedReader in = new BufferedReader( new InputStreamReader( connection.getInputStream() ) );
			String line;
			while( ( line = in.readLine() ) != null ){
				result += "\n" + line;
			}
			in.close();
		}
		catch( Exception e ){
			System.out.println( "No result!" + e );
		}
		
		return result;
	}
	
	/**
	* 以POST方式提交HTTP请求到服务器，并返回结果
	* @param url
	* @param param
	* @return
	*/
	public static String sendPost( String url, String param ){
		String result = "";
		try{
			URL httpURL = new URL( url );
			HttpURLConnection httpConn = ( HttpURLConnection )httpURL.openConnection();
			
			httpConn.setDoOutput( true );
			httpConn.setDoInput( true );
			httpConn.setUseCaches( false );
			httpConn.setRequestProperty( "Content-type", "application/x-java-serialized-object" );
			httpConn.setRequestMethod( "POST" );
			
			PrintWriter out = new PrintWriter( httpConn.getOutputStream() );
			out.print( param );
			out.flush();
			out.close();
			
			BufferedReader in = new BufferedReader( new InputStreamReader( httpConn.getInputStream() ) );
			String line;
			while( ( line = in.readLine() ) != null ){
				result += "\n" + line;
			}
			in.close();
		}
		catch( Exception e ){
			System.out.println( "No Result!" + e );
		}
		
		return result;
	}
}