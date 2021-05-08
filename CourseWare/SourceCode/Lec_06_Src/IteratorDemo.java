import java.util.*;
class Pet{
	String name;
	Pet( String name ){
		this.name = name;
	}
	public String toString(){
		return name;
	}
}

public class IteratorDemo{
	public static void main( String[] args ){
		List<Pet> pets = new ArrayList<Pet>();
		Collections.addAll( pets, new Pet( "哈⼠奇" ), new Pet( "波斯猫" ), new Pet( "巴哥" ) );
		Iterator<Pet> it = pets.iterator();
		while( it.hasNext() ){
			Pet p = it.next();
			System.out.print( p + " " );
		}
		System.out.println( "" );
		for( Pet p : pets )
			System.out.print( p + " " );
		System.out.println( "" );
		it = pets.iterator();
		for( int i = 0; i < pets.size(); i++ ){
			it.next();
			it.remove();
		}
		System.out.println( pets );
	}
}