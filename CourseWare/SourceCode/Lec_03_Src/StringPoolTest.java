public class StringPoolTest{
	public static void main( String[] args ){
		String s1 = "hello";
		System.out.println( s1.hashCode() );
		System.out.println( "s1="+System.identityHashCode( s1 ) );
		s1 = "hello2";
		System.out.println( s1.hashCode() );
		System.out.println( "s1="+System.identityHashCode( s1 ) );
		String s2 = new String( "hello2" );
		System.out.println( s2.hashCode() );
		System.out.println( "s2="+System.identityHashCode( s2 ) );
		System.out.println( "s1==s2? " + (s1==s2) );
		System.out.println( "s1.equals(s2)? " + s1.equals( s2 ) );
		s2 = "hello";
		System.out.println( s2.hashCode() );
		System.out.println( "s2="+System.identityHashCode( s2 ) );
		
		
	}
}