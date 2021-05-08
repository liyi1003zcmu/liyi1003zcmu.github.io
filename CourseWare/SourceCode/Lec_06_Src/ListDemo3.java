import java.util.*;
public class ListDemo3{
	public static void main( String[] args ){
		LinkedList linklst = new LinkedList();
		linklst.add( "F" );
		linklst.add( "B" );
		linklst.add( "D" );
		linklst.add( "E" );
		linklst.add( "C" );
		System.out.println( "初始化后linklst内容: " + linklst );
		linklst.add( "Z" );
		linklst.add( "A0" );
		linklst.add( "A1" );
		System.out.println( "添加后linklst内容: " + linklst );
		//执⾏删除
		linklst.remove( "F" );
		linklst.remove( 2 );
		System.out.println( "删除后linklst内容：” + linklst );
		linklst.removeFirst();
		linklst.removeLast();
		System.out.println( "删除后linklst内容：” + linklst );
		Object val = linklst.get( 2 );
		linklst.set( 2, (String)val + " Changed" );
		System.out.println( "修改后linklst内容：” +	linklst );
	}
}