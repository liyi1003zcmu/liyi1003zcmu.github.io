import java.text.*;
public class Circle{

	double radius;
	
	Circle(){
		radius = 1.0;
	}
	
	Circle( double r ){
		radius = r;
	}
	
	double getArea(){
		return radius * radius * Math.PI;
	}
	
	public static void main( String[] args ){
		
		DecimalFormat fmt = new DecimalFormat( "0.###" );
		
		Circle c1 = new Circle();
		System.out.println( "The area of a circle with radius " + c1.radius + " is " + fmt.format( c1.getArea() ) );
		
		Circle c2 = new Circle( 3.0 );
		System.out.println( "The area of a circle with radius " + c2.radius + " is " + fmt.format( c2.getArea() ) );
		
		c2.radius = 5.0;
		System.out.println( "The area of a circle with radius " + c2.radius + " is " + fmt.format( c2.getArea() ) );
	}
}