public abstract class Geometry{
	private String color = "white";
	private boolean filled;
	private java.util.Date dateCreated;
	
	protected Geometry(){
		dateCreated = new java.util.Date();
	}
	
	protected Geometry( String color, boolean filled ){
		this.color = color;
		this.filled = filled;
		dateCreated = new java.util.Date();
	}
	
	public String getColor(){
		return color;
	}
	
	public void setColor( String color ){
		this.color = color;
	}
	
	public boolean isFilled(){
		return filled;
	}
	
	public void setFilled( boolean filled ){
		this.filled = filled;
	}
	
	public java.util.Date getDateCreated(){
		return dateCreated;
	}
	
	public String toString(){
		return ( "Create on " + dateCreated + "\ncolor: " + color + " and filled: " + filled );
	}
	
	/** Abstract method getArea */
	public abstract double getArea();
	
	/** Abstract method getPerimeter */
	public abstract double getPerimeter();	
}