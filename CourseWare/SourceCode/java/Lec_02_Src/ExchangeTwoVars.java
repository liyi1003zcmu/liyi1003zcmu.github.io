public class ExchangeTwoVars{
	public static void main( String[] args ){
		int n1 = 40;
		int n2 = 50;
		
		System.out.println( "Before exchange: n1=" + n1 + ", n2=" + n2 );
		
		int temp = n1;
		n1 = n2;
		n2 = temp;
		
		
		/*
		n1 = n1 + n2;
		n2 = n1 - n2;
		n1 = n1 - n2;
		*/
		
		/*
		n1 = n1 ^ n2;
		n2 = n1 ^ n2;
		n1 = n1 ^ n2;
		*/
		System.out.println( "After exchange: n1=" + n1 + ", n2=" + n2 );
	}
}