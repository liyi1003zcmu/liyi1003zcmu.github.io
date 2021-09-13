public class TestArrayList{
	public static void main( String[] args ){
		// create a list to store cities
		java.util.ArrayList cityList = new java.util.ArrayList();
		
		// add some cities in the list
		cityList.add( "Beijing" );
		cityList.add( "Shanghai" );
		cityList.add( "Guangzhou" );
		cityList.add( "Hangzhou" );
		cityList.add( "Wuhan" );
		cityList.add( "Chengdu" );
		cityList.add( "Chongqing" );
		// now the cityList contains [ Beijing, Shanghai, Guangzhou, Hangzhou, Wuhan, Chengdu, Chongqing ]
		
		System.out.println( "List size? " + cityList.size() );
		System.out.println( "Is Shanghai in the list ? " + cityList.contains( "Shanghai" ) );
		System.out.println( "The location of Wuhan in the list? " + cityList.indexOf( "Wuhan" ) );
		System.out.println( "Is the list empty? " + cityList.isEmpty() );
		
		// insert a city at index 3
		cityList.add( 3, "Xian" );
		// now the cityList contains [ Beijing, Shanghai, Guangzhou, Xian, Hangzhou, Wuhan, Chengdu, Chongqing ]
		
		//remove a city from the list
		cityList.remove( "Chengdu" );
		// now the cityList contains [ Beijing, Shanghai, Guangzhou, Xian, Hangzhou, Wuhan, Chongqing ]
		
		//remove a city at index 1
		cityList.remove( 1 );
		// now the cityList contains [ Beijing, Guangzhou, Xian, Hangzhou, Wuhan, Chongqing ]
		
		
		//display the contents in the list
		System.out.println( "Display contents in the list " );
		System.out.println( cityList.toString() );
		
		System.out.println();
		//display the contents in the list in reverse order
		System.out.println( "Display contents in reverse order " );
		for( int i = cityList.size() - 1; i >= 0; i-- )
			System.out.print( cityList.get( i ) + " " );
		System.out.println();
	
	}
}