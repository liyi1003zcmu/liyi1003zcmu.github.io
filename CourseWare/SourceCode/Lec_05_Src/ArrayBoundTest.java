import java.io.*;

public class ArrayBoundTest{
	public static void main( String[] args ) throws IOException,FileNotFoundException{
		// int[] testInt = new int[ 10 ];
		// System.out.println( testInt[ 11 ] );
		
		DataInputStream input = new DataInputStream( new FileInputStream( "temp.dat" ) );
		System.out.println( input.readBoolean() );
		System.out.println( input.readByte() );
	}
}