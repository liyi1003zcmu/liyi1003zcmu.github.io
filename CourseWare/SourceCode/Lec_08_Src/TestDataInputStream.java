import java.io.*;
public class TestDataInputStream{
	public static void main( String [] args ){
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		DataOutputStream dos = new DataOutputStream( baos );
		try{
			dos.writeDouble( Math.random() );
			dos.writeBoolean( true );
			dos.writeChars( "hangzhou\t" );
			dos.writeUTF( "杭州欢迎你" );
			ByteArrayInputStream bais = new ByteArrayInputStream( baos.toByteArray() );
			System.out.println( bais.available() );
			DataInputStream dis = new DataInputStream( bais );
			System.out.println( dis.readDouble() );
			System.out.println( dis.readBoolean() );
			char[] temp = new char[ 200 ];
			
			int len = 0;
			char c = 0;
			while( ( c = dis.readChar() ) != '\t' ){
				temp[ len ] = c;
				len++;
			}
			String name = new String( temp, 0, len );
			System.out.println( name );
			System.out.println( dis.readUTF() );
			dos.close();
			dis.close();
		}catch( IOException ex ){
			ex.printStackTrace();
		}
	}
}