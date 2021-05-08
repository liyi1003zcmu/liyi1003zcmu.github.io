import java.util.*;

public class GenericStack<E>{
	private ArrayList<E> list = new ArrayList<E>();
	
	public int getSize(){
		return list.size();
	}
	
	public E peek(){
		return list.get( getSize() - 1 );
	}
	
	public void push( E o ){
		list.add( o );
	}
	
	public E pop(){
		E o = list.get( getSize() - 1 );
		list.remove( getSize() - 1 );
		return o;
	}
	
	public boolean isEmpty(){
		return list.isEmpty();
	}
	
	public static void main( String[] args ){
		GenericStack<Integer> list1 = new GenericStack<Integer>();
		list1.push( 1 );
		list1.push( 3 );
		list1.push( 2 );
		list1.pop();
		
		GenericStack< String > list2 = new GenericStack< String >();
		list2.push( "Beijing" );
		list2.push( "Shanghai" );
		list2.push( "Guangzhou" );
	}
}