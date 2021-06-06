public class Rectangle extends Geometry{
	private double width;
	private double height;
	
	public Rectangle(){
	}
	
	public Rectangle( double width, double height ){
		this.width = width;
		this.height = height;
	}
	
	public Rectangle( double width, double height, String color, boolean filled ){
		super( color, filled );
		this.width = width;
		this.height = height;
	}
	
	/** return width */
	public double getWidth(){
		return width;
	}
	
	/** set a new width */
	public void setWidth(double width){
		this.width = width;
	}
	
	/** get height */
	public double getHeight(){
		return height;
	}
	
	/** set a new height */
	public void setHeight( double height ){
		this.height = height;
	}
	
	/** return area */
	public double getArea(){
		return width * height;
	}
	
	/** return perimeter */
	public double getPerimeter(){
		return 2 * ( width + height );
	}
	
	/** return a string representation of the object */
	public String toString(){
		return super.toString() + "\nwidth is : " + width + "\nheight is : " + height;
	}
}