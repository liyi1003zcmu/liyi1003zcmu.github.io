public class Circle extends Geometry{
	private double radius;
	
	public Circle(){
		super();
	}
	
	public Circle( double radius ){
		this.radius = radius;
	}
	
	public Circle( double radius, String color, boolean filled ){
		super( color, filled );
		this.radius = radius;
		// setColor( color );
		// setFilled( filled );
		// this.color = color;
		// this.filled = filled;
	}
	
	/** return radius */
	public double getRadius(){
		return radius;
	}
	
	/** set a new radius */
	public void setRadius( double radius ){
		this.radius = radius;
	}
	
	/** return area */
	public double getArea(){
		return Math.PI * radius * radius;
	}
	
	/** return perimeter */
	public double getPerimeter(){
		return 2 * radius * Math.PI;
	}
	
	/** return diameter */
	public double getDiameter(){
		return 2 * radius;
	}
	
	/** print circle info */
	public void printCircle(){
		System.out.println( "The circle is created " + super.getDateCreated() + " and radius is " + radius );
	}
	
	/** return a string representation of the object */
	public String toString(){
		return super.toString() + "\nradius is : " + radius;
	}
	
	public String getColorCircle(){
		return super.getColor();
	}
	
	public boolean equals( Object obj ){
		if( obj instanceof Circle ){
			return radius == ((Circle)obj).radius;
		}
		else
			return false;
	}
	
}