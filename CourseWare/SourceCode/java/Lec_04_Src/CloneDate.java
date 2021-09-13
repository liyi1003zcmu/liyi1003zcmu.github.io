public class CloneDate{
	public static void main( String[] args ){
		java.util.Date date1 = new java.util.Date();
		java.util.Date date2 = date1;
		java.util.Date date3 = ( java.util.Date )date1.clone();
		
		System.out.println( "date1 == date2? " + (date1 == date2 ) );
		System.out.println( "date1 == date3? " + (date1 == date3 ) );
		System.out.println( "date1.equals(date3)? " + date1.equals( date3 ) );
		System.out.println( "date1.equals(date2)? " + date1.equals( date2 ) );
	}

}