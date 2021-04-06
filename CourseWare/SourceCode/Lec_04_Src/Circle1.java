public class Circle1{
	double radius;
	
	Circle1(){
		radius = 1.0;
	}
	
	Circle1( double r ){
		radius = r;
	}
	
	double getArea(){
		return Math.PI * radius * radius;
	}
	
	public static void main( String[] args ){
		Circle1 c1 = new Circle1();
		Circle1 c2 = new Circle1();
	}
	
}