public class TestPass2{
    public static void main( String[] args ){
        Circle4 myCircle = new Circle4( 1.0 );
        int n = 5;
        printAreas( myCircle, n );
        System.out.println( "Radius is " + myCircle.getRadius() );
        System.out.println( "Number is " + n );
    }
    public static void printArea( Circle4 c, int times ){
        System.out.println( "Radius \t\t Areas " );
        while( times >=1 ){
            System.out.println( c.getRadius() + "\t\t" + c.getArea() );
            c.setRadius( c.getRadius() - 1.0 );
            times--;
        }
    }
}