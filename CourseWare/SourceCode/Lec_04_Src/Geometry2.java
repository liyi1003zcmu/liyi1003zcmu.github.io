interface Geometry2{
	abstract public double getArea();
	abstract public double getPerimeter();

	public static final int num = 0;
}

class Circle2 implements Geometry2, Comparable{
	double radius = 0.0;
	public double getArea(){
		return Math.PI * radius * radius;
	}
	public double getPerimeter(){
		return 2 * Math.PI * radius;
	}

	public int compareTo(Object obj){
		if( obj instanceof Circle2 ){
			if(this.radius > ((Circle2)obj).getRadius() )
				return 1;
			else
				return -1;
		}
	}

	public boolean equals(Object obj){
		if(this.radius == ((Circle2)obj).getRadius())
			return true;
		else
			return false;
	}
}

class Rectangle2 implements Geometry{
	double width, height;
	public double getArea(){
		return width*height;
	}
	public double getPerimeter(){
		return 2 * (width+height);
	}
	public boolean equals(Object obj){
		if(this.getArea() == ((Rectangle2)obj).getArea())
			return true;
		else
			return false;
	}
}

public class Test{
	public static void main(String[] args){
		Circle2 c1=new Circle2(1.0);
		Circle2 c2 = new Circle2(2.0);
		Rectangle r1 = new Rectangle2(1, 2);
		Geometry2[] geos = {
			c1, c2
		};

		c1.compareTo(r1);
		c1.equals(r1);
	}
}