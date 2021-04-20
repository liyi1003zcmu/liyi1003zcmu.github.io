public class House implements Cloneable, Comparable{
	private int id;
	private double area;
	private java.util.Date builtTime;
	
	public House( int id, double area ){
		this.id = id;
		this.area = area;
		builtTime = new java.util.Date();
	}
	
	public int getId(){
		return id;
	}
	
	public double getArea(){
		return area;
	}
	
	public java.util.Date getBuiltTime(){
		return builtTime;
	}
	
	/** override protected clone method defined in Object class */
	/* shadowy copy*/
	public Object clone() throws CloneNotSupportedException{
		return super.clone();
	}
	/* deep copy*/
	/*
	public Object clone() throw CloneNotSupportedException{
		House houseClone = (House)super.clone();
		houseClone.whenBuilt = (java.util.Date)(whenBuilt.clone());
		return houseClone;
	}//ver-1

	public Object clone(){
		try{
			House houseClone = (House)super.clone();
			houseClone.whenBuilt = (java.util.Date)(whenBuilt.clone());
			return houseClone;
		}catch(CloneNotSupportedException ex){
			return null;
		}
	}//ver-2
	*/
	
	public String toString(){
		return "Id is " + id + "\nArea is " + area;
	}
	/** implement compareTo method */
	public int compareTo( Object o ){
		if( area > ( ( House ) o ).getArea() )
			return 1;
		else if( area < ( ( House ) o ).getArea() )
			return -1;
		else
			return 0;
	}

	public static void main( String[] args ){
		House house1 = new House( 1, 88 );
		//House house2 = house1;
		House house2 = new House( 2, 104 );
		try{
			House house3 =  (House)house1.clone();
		}
		catch( Exception e ){}
		System.out.println( Max.max( house1, house2 ) );
	}
}