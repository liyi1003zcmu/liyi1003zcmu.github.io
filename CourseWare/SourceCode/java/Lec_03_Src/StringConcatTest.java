public class StringConcatTest{
	public static void main( String[] args ){
		String s1 = "Hello";
		String s2 = "World";
		String s3 = s1.concat( s2 );
		String s4 = s1 + s2;
		String s5 = "New";
		s5 += s2;
		System.out.println( "s1 is " + s1 );
		System.out.println( "s2 is " + s2 );
		System.out.println( "s3 is " + s3 );
		System.out.println( "s4 is " + s4 );
		System.out.println( "s5 is " + s5 );
		
		int i = 3, j = 4;
		System.out.println( "i+j is " + i + j );
		System.out.println( "i+j is " + (i+j) );
	}
}