import java.util.*;

public class AddingGroups{
	public static void main( String[] args ){
		Collection<Integer> c = new ArrayList<Integer>( Arrays.asList( 1, 2, 3, 4, 5 ) );
		//Collection<Integer> c = new ArrayList<Integer>();
		Integer[] mInts = { 6, 8, 10, 12, 14 };
		c.addAll( Arrays.asList(mInts) );
		//往c中添加其它元素，⽤Collections类
		Collections.addAll( c, 16, 18, 20, 22, 24 );
		Collections.addAll( c, mInts );
		//将数组转换成List
		List<Integer> list = Arrays.asList( 99, 98, 97, 96, 95 );
		list.set( 1, 100 );
		list.add( 21 );//会有编译错误
	}
}