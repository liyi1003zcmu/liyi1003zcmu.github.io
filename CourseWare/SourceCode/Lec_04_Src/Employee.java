public class Employee{
	String empName;
	String empID;
	String empDepartment;
	int empYear = 0;
	char empGender;
	float empBaseSalary;
	int empAge;
	
	public String getName(){
		return empName;
	}
	public String getID(){
		return empID;
	}
	public String getDepartment(){
		return empDepartment;
	}
	public int getYear(){
		return empYear;
	}
	public char getGender(){
		return empGender;
	}
	public float getBaseSalary(){
		return empBaseSalary;
	}
	public int getAge(){
		return empAge;
	}
	
	public static void main( String[] args ){
		Employee emp1 = new Employee();
		emp1.toString();
	}
}
