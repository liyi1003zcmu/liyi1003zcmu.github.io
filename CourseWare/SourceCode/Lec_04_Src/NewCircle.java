import ppp.*;
import ppp.ppp_son.*;

public class NewCircle extends NewPoint implements NewShow{
	double radius;
	
	public NewCircle( double px, double py, double radius ){
		super( px, py );
		this.radius = radius;
	}
	
	public double getArea(){
		return Math.PI * radius * radius;
	}
	
	public String showNew( String s ){
		return s;
	}
	
	public static void main( String[] args ){
		NewCircle c1 = new NewCircle( 3.0, 4.0, 5 );
		System.out.println( c1.showNew( "A Circle " ) + " area = " + c1.getArea() );
	}
}