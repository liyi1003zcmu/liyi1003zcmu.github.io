import java.io.*;

public class TestDataOutputStream{
	public static void main( String [] args ){
		DataOutputStream dos = null;
		try{
			dos = new DataOutputStream( new FileOutputStream( "ccc.txt" ) );
			dos.writeUTF( "中国" );
			dos.writeBoolean( false );
			dos.writeLong( 1234567890L );
			System.out.println( "Write Finished!" );
		}catch( IOException ex ){
			ex.printStackTrace();
		}finally{
			try{
				if( dos != null )
					dos.close();
			}catch( IOException ex ){
				ex.printStackTrace();
			}
		}
	}
}