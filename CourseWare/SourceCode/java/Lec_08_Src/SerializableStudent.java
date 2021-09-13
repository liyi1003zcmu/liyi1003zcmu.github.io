import java.io.*;
public class SerializableStudent{
	public static void main(String [] args){
		ObjectOutputStream oos=null;
		try{
			oos=new ObjectOutputStream(new FileOutputStream("student.dat"));
			oos.writeObject(new Student(101,"张三",21));
			oos.flush();
			System.out.println("序列化成功！");
		}catch(IOException ex){
			e.printStackTrace();
		}finally{
			try{
				if(oos!=null)
					oos.close();
			}catch(IOException ex){
				ex.printStackTrace();
			}
		}
	}
}