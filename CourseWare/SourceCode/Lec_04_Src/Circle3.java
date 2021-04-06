public class Circle3{
	private double radius;
	static int numberOfObjects = 0;
	
	Circle3(){
		radius = 1.0;
		numberOfObjects++;
	}
	
	Circle3( double r ){
		radius = r;
		numberOfObjects++;
	}
	
	static int getNumberOfObjects(){
		return numberOfObjects;
	}
	
	public double getRadius(){
		return radius;
	}
	
	public void setRadius( double r ){
		radius = r;
	}
	
	public double getArea(){
		return radius * radius * Math.PI;
	}
	
	public static void main( String[] args ){
		System.out.println( "Before creating objects ");
		System.out.println( "Number of circles created is " + Circle3.numberOfObjects );
		
		Circle3 c1 = new Circle3();
		
		System.out.println( "After creating c1 " );
		System.out.println( "c1: radius(" + c1.getRadius() + ") and number of circle objects (" + c1.numberOfObjects + ")" );

		Circle3 c2 = new Circle3( 5.0 );
		
		c1.setRadius( 9.0 );
		
		System.out.println( "After creating c2 and modifying c1 " );
		System.out.println( "c1: radius(" + c1.getRadius() + ") and number of circle objects (" + c1.numberOfObjects + ")" );
		
		System.out.println( "c2: radius(" + c2.getRadius() + ") and number of circle objects (" + c2.numberOfObjects + ")" );	
	}
}