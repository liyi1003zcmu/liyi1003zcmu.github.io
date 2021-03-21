import java.util.*;

public class ArrayTest{
	public static void main( String[] args ){
		int[] narray = { 38, 60, 19, 27, 70, 54 };
		System.out.println( Arrays.toString( narray ) );
		System.out.println( Arrays.binarySearch( narray, 27 ) );
		
		int[] narray2 = Arrays.copyOf( narray, narray.length );
		//int[] narray2 = narray;

		System.out.println( narray2[ 5 ] + ", " + narray2.length );
		System.out.println( Arrays.equals( narray, narray2 ));
		System.out.println( narray.equals( narray2 ) );
		Arrays.sort( narray );
		System.out.println( Arrays.toString( narray ) );
		//System.out.println( narray.toString() );
	}
}