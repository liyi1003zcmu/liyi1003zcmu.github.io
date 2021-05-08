public class GenericMethodDemo{
	public static void main( String[] args ){
		Integer[] integers = { 2, 3, 4 };
		String[] strings = { "Beijing", "Shanghai", "Guangzhou" };
		print( strings );
		//GenericMethodDemo.< Integer >print( integers );
		//GenericMethodDemo.< String >print( strings );
	}
	
	public static < E > void print( E[] list ){
		for( int i = 0; i < list.length; i++ ){
			System.out.println( list[ i ] + " " );
		System.out.println();
		}
	}
}