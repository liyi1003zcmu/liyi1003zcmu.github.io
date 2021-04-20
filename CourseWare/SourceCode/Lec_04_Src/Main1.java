import java.util.Scanner;             

public class Main1{
	public static void main(String[] args){
		int repeat;
		Scanner input=new Scanner(System.in);
		
		String str;
		str = input.nextLine();
		
		String outstr = new String();
		repeat = ( int )( str.charAt( 0 ) - '0' );
		
		for( int pos = 1; pos <= repeat; pos++ ){
			char c = str.charAt( pos );
			if( c >= 'a' && c <= 'z' )
				c = (char)('A' + c - 'a');
			else if( c >= 'A' && c <= 'Z' )
				c = (char)('a' + c - 'A');
			
			outstr = outstr + c;
		}
		
		System.out.println( outstr );		
	}
}
