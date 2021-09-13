public class Geometry{
	private String color = "white";
	private boolean filled;
	private java.util.Date dateCreated;
	
	/** construct a default geometry object*/
	public Geometry(){
		dateCreated = new java.util.Date();
	}
	
	/** construct a geometry object with specified color and filled value */
	public Geometry( String color, boolean filled ){
		dateCreated = new java.util.Date();
		this.color = color;
		this.filled = filled;
	}
	
	/** return color */
	public String getColor(){
		return color;
	}
	
	/** set a new color */
	public void setColor( String color ){
		this.color = color;
	}
	
	/** return filled */
	public boolean isFilled(){
		return filled;
	}
	
	/** set a new filled */
	public void setFilled( boolean filled ){
		this.filled = filled;
	}
	
	/** get dateCreated */
	public java.util.Date getDateCreated(){
		return dateCreated;
	}
	
	/** return a string representation of the object */
	public String toString(){
		return "Geometry created on " + dateCreated + "\ncolor: " + color + "\nfilled is: " + filled;
	}

	abstract public double getArea();

	abstract public double getPerimeter();
	
}