public class StringBufferTest{
	public static void main( String[] args ){
		String s1 = "Hello";
		System.out.println( "s1=" + System.identityHashCode( s1 ) );
		s1 = s1.concat( " World" );
		System.out.println( "s1=" + System.identityHashCode( s1 ) );
		
		StringBuffer sb1 = new StringBuffer( "Hello" );
		System.out.println( "sb1=" + System.identityHashCode( sb1 ) );
		sb1.append( " World" );
		System.out.println( "sb1=" + System.identityHashCode( sb1 ) );
		String s2 = sb1.toString();
		System.out.println( "s1==s2? " + s1==s2 );
		System.out.println( "s1.equals(s2)? " + s1.equals( s2 ) );
	}
}