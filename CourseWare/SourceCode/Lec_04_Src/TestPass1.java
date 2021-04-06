public class TestPass1{
    public static void main( String[] args ){
        Circle myCircle = new Circle( 5.0 );
        printCircle( myCircle );
    }
    public stati void printCircle( Circle c ){
        System.out.println( "Area of a circle of radius " + c.getRadius() + " is " +
        (float)c.getArea() );
    }
}