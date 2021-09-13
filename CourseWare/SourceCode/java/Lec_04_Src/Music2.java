interface Instrument{
	static final int VALUE = 5;
	public abstract void play( Note n );
	public abstract void adjust();// automatically public
}

class Wind implements Instrument{
	public void play( Note n ){
		System.out.println( this + ".play()" + n );
	}
	/*public void adjust(){
		System.out.println( this + ".adjust()" );
	}*/
	public String toString(){
		return "Wind";
	}
}

class Percussion implements Instrument{
	public void play( Note n ){
		System.out.println( this + ".play()" + n );
	}
	public void adjust(){
		System.out.println( this + ".adjust()" );
	}
	public String toString(){
		return "Percussion";
	}
}

class Stringed implements Instrument{
	public void play( Note n ){
		System.out.println( this + ".play()"+ n );
	}
	public void adjust(){
		System.out.println( this + ".adjust()" );
	}
	public String toString(){
		return "Stringed";
	}
}

class Brass extends Wind{
	public String toString(){
		return "Brass";
	}
}

class WoodWind extends Wind{
	public String toString(){
		return "WoodWind";
	}
}

public class Music2{
	public static void main( String[] args ){
		Instrument[] orchestra = {
			new Wind(),
			new Percussion(),
			new Stringed(),
			new Brass(),
			new WoodWind()
		};
		Note n = new Note();
		tuneAll( orchestra, n );
	}
	
	public static void tuneAll( Instrument[] orch , Note n ){
		for( Instrument obj:orch )
	//	for( int i = 0; i < orch.length; i++ )
		//	tune( orch[i], n );
			tune( obj, n );
	}
	
	public static void tune( Instrument inst, Note n ){
		inst.play( n );
	}
}