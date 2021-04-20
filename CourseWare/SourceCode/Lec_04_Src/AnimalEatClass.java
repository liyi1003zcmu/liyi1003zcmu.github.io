abstract class Animal{
	public abstract String howToEat();
}

class Chicken extends Animal{
	public String howToEat(){
		return "Fry it";
	}
}

class Duck extends Animal{
	public String howToEat(){
		return "Roast it";
	}
}

public class AnimalEatClass{
	public static void main( String[] args ){
		Animal animal = new Chicken();
		System.out.println( eat( animal ) );
		
		animal = new Duck();
		System.out.println( eat( animal ) );
	}
	
	public static String eat( Animal animal ){
		return animal.howToEat();
	}
}