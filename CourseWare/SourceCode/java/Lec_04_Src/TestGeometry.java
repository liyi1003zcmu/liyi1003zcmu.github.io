public class TestGeometry{
	public static void main( String[] args ){
		Geometry geo = new Geometry();
		Rectangle rec = new Rectangle( 4.0, 5.0 );
		Circle cir = new Circle( 2.0 );
		
		System.out.println( geo.toString() );
		System.out.println( rec.toString() );
		System.out.println( rec.getArea() );
		System.out.println( rec.getPerimeter()  );
		System.out.println( cir.toString() );
		System.out.println( cir.getArea() );
		System.out.println( cir.getPerimeter() );
	}
}