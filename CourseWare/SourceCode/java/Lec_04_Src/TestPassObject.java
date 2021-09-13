public class TestPassObject{
		public static void main( String[] args ){
			Circle4 myCircle = new Circle4( 1 );
			
			// print areas for radius 1, 2, 3, 4, 5
			int n = 5;
			printAreas( myCircle, n );
			
			// see myCircle.radius and times 
			System.out.println( "Radius is " + myCircle.getRadius() );
			System.out.println( "Number is " + n );
		}
		
		public static void printAreas( Circle4 c, int times ){
			System.out.println( "Radius \t\t Areas " );
			while( times >= 1 ){
				System.out.println( c.getRadius() + " \t\t " + c.getArea() );
				c.setRadius( c.getRadius() - 1 );
				times--;
			}
		}
}