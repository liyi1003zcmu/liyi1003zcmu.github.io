public class GenericStack1<E>{
	private E[] list;
	private int length;//数组长度
	private int count;//当前元素数目
	
	public GenericStack1(){
		length = 10;
		list = (E[])(new Object[ length ]);
	}
	
	public GenericStack1( int length ){
		this.length = length;
		list = (E[])(new Object[ length ]);
	}
	
	public int getSize(){
		return list.length;
	}
	
	public E peek(){
		return list[count-1];
	}
	
	public void push( E num ){
		list[count] = num;
		count++;
	}
	
	public E pop(){
		E num = list[ count - 1 ];
		count--;
		return num;
	}
	
	public boolean isEmpty(){
		return count==0;
	}
	
	public static void main( String[] args ){
		GenericStack1<Integer> stack = new GenericStack1<Integer>( 10 );
		stack.push(3);
		stack.push(2);
		int num = stack.pop();
	}
}