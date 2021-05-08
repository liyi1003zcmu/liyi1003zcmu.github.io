import java.util.*;
class Snow{}
class Power extends Snow{}
class Light extends Powder{}
class Heavy extends Powder{}
class Crusty extends Snow{}
class Slush extends Snow{}

public class AddListInference{
	public static void main( String[] args ){
	List<Snow> snow = Arrays.asList( new Crusty(), new Slush(), new Powder() );
	//List<Snow> snow2 = Arrays.asList( new Light(), new Heavy() );
	List<Snow> snow3 = new ArrayList<Snow>();
	Collections.addAll( snow3, new Light(), new Heavy() );
	List<Snow> snow4 = Arrays.asList( new Light(), new Heavy() );
	System.out.println( snow4.size() );
	}
}