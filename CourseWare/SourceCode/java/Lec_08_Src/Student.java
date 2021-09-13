import java.io.*;
public class Student implements Serializable{
	private int id;
	private String name;
	private transient int age;

	public Student(){}
	public Student(int id, String name, int age){
		this.id=id; this.name=name; this.age=age;
	}
	public int getId(){
		return id;
	}
	public String getName(){
		return name;
	}
	public int getAge(){
		return age;
	}
	public String toString(){
		return "id="+id+",name="+name+",age="+age;
	}
}