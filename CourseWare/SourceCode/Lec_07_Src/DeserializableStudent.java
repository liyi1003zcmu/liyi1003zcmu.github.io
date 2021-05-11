import java.io.*;
public class DeserializableStudent{
	public static void main(String [] args){
		objectInputStream ois=null;
		try{
			ois=new ObjectInputStream(new FileInputStream("student.dat"));
			Student stu=(Student)ois.readObject();
			System.out.println(stu);
		}catch(IOException ex){
			ex.printStackTrace();
		}finally{
			try{
				if(ois!=null)
					ois.close();
			}catch(IOException ex){
				ex.printStackTrace();
			}
		}
	}
}