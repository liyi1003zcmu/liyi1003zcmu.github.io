import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TestJDBC {
	public static void main(String[] args) throws SQLException,
			ClassNotFoundException {
		String user = "liyi";
		String pwd = "liyi0857";
		// 设定url
		String myjdbc = "jdbc:mysql://localhost:3306/studb";
		// 加载mysql驱动
		Class.forName("com.mysql.jdbc.Driver");
		// 创建连接会话
		Connection myConnection = DriverManager
				.getConnection(myjdbc, user, pwd);
		// 创建语句块对象
		Statement Myoperation = myConnection.createStatement();
		// 获取结果集对象
		ResultSet record = Myoperation.executeQuery("SELECT  *  FROM  stuinfo");
		while (record.next()) {
			// 输出结果集对象
			System.out.println(record.getInt("id") + ","
					+ record.getString("name") + "," + record.getInt("score"));
		}
		// 关闭结果集
		try {
			if (record != null)
				record.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (myConnection != null)
					myConnection.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
