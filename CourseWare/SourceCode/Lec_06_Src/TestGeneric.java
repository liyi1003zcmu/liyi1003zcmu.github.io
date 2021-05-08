import java.util.*;

public class TestGeneric{
	public static void main( String[] args ){
		//Comparable c = new Date();
		Comparable< Date > c = new Date();
		System.out.println( c.compareTo( "red" ) );
	}
}