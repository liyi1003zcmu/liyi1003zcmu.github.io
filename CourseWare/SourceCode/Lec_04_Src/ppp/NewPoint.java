package ppp;
public class NewPoint{
	double px, py;
	
	public NewPoint(){
		this( 0.0, 0.0 );
	}
	
	public NewPoint( double px, double py ){
		this.px = px;
		this.py = py;
	}
	
	public double getX(){
		return px;
	}
	
	public double getY(){
		return py ;
	}
	
	public String toString(){
		return "(" + px + "," + py + ")";
	}
}