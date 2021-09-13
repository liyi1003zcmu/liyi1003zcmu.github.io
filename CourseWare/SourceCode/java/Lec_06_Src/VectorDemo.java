import java.util.*;
public class VectorDemo{
	public static void main( String[] args ){
		Vector v = new Vector();
		v.add( "one" );
		v.add( "two" );
		v.add( "three" );
		System.out.println( "初始化Vector: " + v.toString() );
		v.insertElementAt( "zero", 0 );
		v.insertElementAt( "oop", 3 );
		System.out.println( "插⼊元素后Vector: " +
		v.toString() );
		v.setElementAt( "three", 3 );
		v.setElementAt( "four", 4 );
		System.out.println( "修改元素后Vector: " +
		v.toString() );
		v.removeAllElements();
		System.out.println( "删除元素后Vector: " +
		v.toString() );
	}
}