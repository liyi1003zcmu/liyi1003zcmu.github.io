import java.util.*;
class Pet{
	String name;
	Pet(String name){
		this.name = name;
	}
	public String toString(){
		return name;
	}
	public boolean equals(Object o){
		return o instanceof Pet && name = ((Pet)o).name;
	}
}

public class ListDemo2{
	public static void main(String[] args){
		List<Pet> pets = new ArrayList<Pet>();
		Collections.addAll( pets, new Pet("哈士奇"), new Pet("阿拉斯加"), new Pet("波斯猫"));
		System.out.println("1:"+pets);
		pets.add(new Pet("萨摩耶"));
		System.out.println("2:"+pets);
		pets.remove(1);
		System.out.println("3:"+pets);
		System.out.println("4:"+pets.contains(new Pet("哈士奇")));
		System.out.println("5:"+pets.indexOf(new Pet("萨摩耶")));
		pets.add(1,new Pet("京巴"));
		System.out.println("6:"+pets);
		List<Pet> lovePets=pets.subList(0,2);
		System.out.println("7:"+lovePets);
		System.out.println("8:"+pets.containsAll(lovePets));
		List<Pet> copy=new
		ArrayList<Pet>(lovePets);
		System.out.println("9:"+copy);
		pets.retainAll(lovePets);
		System.out.println("10:"+pets);
	}
}