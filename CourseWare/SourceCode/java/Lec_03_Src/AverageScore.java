/*
	AverageScore: Display average score of class
*/

public class AverageScore{
	public static void main( String[] args ){
		int[] scores = new int[ 40 ];
		for( int i = 0; i < 40; i++ ){
			scores[ i ] = (int)( Math.random() * 1000 ) % 40 + 60;
		}
		
		// int[] scores = new int[]{90, 91, ..., 85, 87};
		
		int sum = 0;
		for( int i = 0; i < 40; i++ ){
			sum += scores[ i ];
		}
		
		double averageScore = sum * 1.0 / 40;
		System.out.println( "Average score of class is " + averageScore );
	}
}