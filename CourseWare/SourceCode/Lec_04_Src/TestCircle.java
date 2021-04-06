import java.text.*;

class Circle{

	double radius;
	
	Circle(){
		radius = 1.0;
	}
	
	Circle( double r ){
		radius = r;
	}
	
	double getRadius(){
		return radius;
	}
	
	double getArea(){
		return radius * radius * Math.PI;
	}
}

public class TestCircle{
	public static void main( String[] args ){
		
		DecimalFormat fmt = new DecimalFormat( "0.###" );
		
		Circle c1 = new Circle();
		System.out.println( "The area of circle with radius " + c1.radius + " is " + fmt.format( c1.getArea() ) ) ;
		
		Circle c2 = new Circle( 2.0 );
		System.out.println( "The area of circle with radius " + c2.radius + " is " + fmt.format( c2.getArea() ) );
		
		c2.radius = 5.0;
		System.out.println( "The area of circle with radius " + c2.radius + " is " + fmt.format( c2.getArea() ) );
	}
}