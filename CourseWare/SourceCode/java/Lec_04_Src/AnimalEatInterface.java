interface Edible{
	public String howToEat();
}

class Chicken implements Edible{
	public String howToEat(){
		return "Fry it";
	}
}

class Duck implements Edible{
	public String howToEat(){
		return "Roast it";
	}
}

class Broccoli implements Edible{
	public String howToEat(){
		return "Stir-fry it";
	}
}

public class AnimalEatInterface{
	public static void main( String[] args ){
		Edible stuff = new Chicken();
		System.out.println( eat( stuff ) );
		
		stuff = new Duck();
		System.out.println( eat( stuff ) );
		
		stuff = new Broccoli();
		System.out.println( eat( stuff ) );
	}
	
	public static String eat( Edible stuff ){
		return stuff.howToEat();
	}
}