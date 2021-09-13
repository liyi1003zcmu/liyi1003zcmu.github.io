import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class TestJDBCSQL {
	public static void main(String[] args) throws SQLException,
			ClassNotFoundException {
		String user = "lymanager";
		String pwd = "12345678";
		// 设定url
		String myjdbc = "jdbc:sqlserver://127.0.0.1:1433;databaseName=Studb;user=lymanager;password=12345678";
		// 加载mysql驱动
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
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
					+ record.getString("name") + "," + record.getString("class")+","+record.getInt("score"));
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
