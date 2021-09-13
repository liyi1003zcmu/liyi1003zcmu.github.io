public class ProdTable{
	public static void main( String[] args ){
		for( int i = 1; i <= 9; i++ )
			for( int j = 1; j <= i; j++ ){
				System.out.print( i + "*" + j + "=" + i * j );
				if( j != i )
					System.out.print( "\t" );
				else
					System.out.println();
			}
			
		return;
	}
}