public class ExpressionValue{
	public static void main( String[] args ){
		int a = 10, b = 20, c = 25, d = 25;
		
		System.out.println( "a+b=" + ( a + b ) );
		System.out.println( "a-b=" + ( a - b ) );
		System.out.println( "a*b=" + ( a * b ) );
		System.out.println( "a/b=" + ( a / b ) );// a/b --> b/a
		System.out.println( "c%a=" + ( c % a ) );
		System.out.println( "a++=" + ( a++ ) + ", a=" + a );
		System.out.println( "b--=" + ( b-- ) + ", b=" + b );
		System.out.println( "++c=" + ( ++c ) + ", c=" + c );
		System.out.println( "--d=" + ( --d ) + ", d=" + d );
	}
}