class Student{
	String name;
	int age;
	boolean isComputerMajor;
	char gender;
}

public class Test{
	public static void main( String[] args ){
		Student student = new Student();
		System.out.println( "Name is " + student.name );
		System.out.println( "Age is " + student.age );
		System.out.println( "Is Computer Major? " + student.isComputerMajor );
		System.out.println( "Gender is " + student.gender );		
	}
}