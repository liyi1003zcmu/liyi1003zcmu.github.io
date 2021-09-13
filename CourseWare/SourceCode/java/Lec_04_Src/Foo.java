public class Foo{
	int i = 5;
	static int k = 2;
	
	public static void main( String[] args ){
		int j = i;
		m1();
	}
	
	public void m1(){
		i = i + k * m2( i, k );
	}
	
	public static int m2( int i, int k ){
			return ( int )Math.pow( i, k );
	}
}