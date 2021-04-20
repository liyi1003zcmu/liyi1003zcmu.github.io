enum Note{
	C_NATURAL, C_SHARP, C_FLAT, D_NATURAL
};

/* 乐器 */
abstract class Instrument{
	private int num;
	public String toString(){ 
		return "Instrument";
	}
	
	public abstract void play( Note n );
	public abstract void adjust();
}

class Instrument{
	private int num;
	public String toString(){ 
		return "Instrument";
	}
	
	public void play( Note n ){};
	public void adjust(){};
}

/*管乐类*/
class Wind extends Instrument{
	public void play( Note n ){
		System.out.println( "Wind.play()" + n );
	}
	public void adjust(){
		System.out.println( "Wind.adjust()");
	}
	public String toString(){
		return "Wind";
	}
}

/*打击乐器*/
class Percussion extends Instrument{
	public void play( Note n ){
		System.out.println( "Percussion.play()" + n );
	}
	public void adjust(){
		System.out.println( "Percussion.adjust()" );
	}
	public String toString(){
		return "Percussion";
	}
}

/*弦乐*/
class Stringed extends Instrument{
	public void play( Note n ){
		System.out.println( "Stringed.play()" + n );
	}
	public void adjust(){
		System.out.println( "Stringed.adjust()" );
	}
	public String toString(){
		return "Stringed";
	}
}

/*铜管乐器*/
class Brass extends Wind{
	public void play( Note n ){
		System.out.println( "Brass.play()" + n );
	}
	public void adjust(){
		System.out.println( "Brass.adjust()" );
	}
}

/*木管乐器*/
class WoodWind extends Wind{
	public void play( Note n ){
		System.out.println( "WoodWind.play()" + n );
	}
	public String toString(){
		return "This is WoodWind";
	}
}

public class Music{
	public static void main( String[] args ){
		Instrument[] orchestra = {
			new Wind(),
			new Percussion(),
			new Stringed(),
			new Brass(),
			new WoodWind()
		};
		//Note n = new Note();
		Note n = C_NATURAL;
		tuneAll( orchestra, n );
	}
	
	public static void tuneAll( Instrument[] orch , Note n ){
		for( Instrument obj:orch )
			tune( obj, n );
	}
	
	public static void tune( Instrument inst, Note n ){
		inst.play( n );
	}
}