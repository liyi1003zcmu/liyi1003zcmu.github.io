public class Circle4{
	/** the radius of the circle **/
	private double radius = 1;
	
	/** the number of objects created **/
	private static int numberOfObjects = 0;
	
	/** construct a circle with default radius **/
	public Circle4(){
		this(1.0);
	}
	
	/** construct a circle with a specified radius **/
	public Circle4( double newRadius ){
		radius = newRadius;
		numberOfObjects++;
	}
	
	/** return radius **/
	public double getRadius(){
		return radius;
	}
	
	/** set a new radius **/
	public void setRadius( double newRadius ){
		radius = ( newRadius > 0 ) ? newRadius : 0;
	}
	
	/** return number of objects created **/
	public static int getNumberOfObjects(){
		return numberOfObjects;
	}
	
	/** return area of the circle **/
	public double getArea(){
		return radius * radius * Math.PI;
	}
}