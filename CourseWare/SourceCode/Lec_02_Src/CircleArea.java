/**
    CircleArea: Compute the area of a circle with given radius
 */

 public class CircleArea{
     public static void main( String[] args ){
         // define the PI constant
         final double PI = 3.14159;

         // declare the radius variable
         double radius;

         // declare the area variable
         double area;

         // assign value to variable radius
         radius = 1.0;

         // assign value to variable area
         area = PI * radius * radius;

         System.out.println( "The area of circle with radius " + radius + " is " + area );
     }
 }