import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.PreparedStatement;

public class StudentBiz {
	/**
	 * 查询所有数据
	 * 
	 * @throws Exception
	 */
	public void readDate() throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		// 得到数据源
		
		// 得到数据连接
		Connection conn = factory.getConnection();
		// 得到语句块
		Statement stmt = conn.createStatement();
		String sqlstr = "select * from stuinfo";
		// 得到结果集
		ResultSet rs = stmt.executeQuery(sqlstr);
		// 编历结果集,显示结果
		while (rs.next()) {
			System.out.print(rs.getString(1) + "\t");
			System.out.print(rs.getString(2) + "\t");
			System.out.print(rs.getString(3) + "\t");
			System.out.print(rs.getString(4) + "\t");
			System.out.println(" ");
		}
		JDBCUtils.close(rs, stmt, conn);
	}

	public void readDateByName(String name) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		// 得到数据连接
		Connection conn = factory.getConnection();
		// 得到语句块
		Statement stmt = conn.createStatement();
		String sqlstr = "select * from stuinfo where name='" + name + "'";
		// 得到结果集
		ResultSet rs = stmt.executeQuery(sqlstr);
		// 编历结果集,显示结果
		while (rs.next()) {
			System.out.print(rs.getString(1) + "\t");
			System.out.print(rs.getString(2) + "\t");
			System.out.print(rs.getString(3) + "\t");
			System.out.print(rs.getString(4) + "\t");
			System.out.println(" ");
		}
		JDBCUtils.close(rs, stmt, conn);
	}

	public void insertDateByName(String name,String classes,
			int score) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		// 得到数据连接
		Connection conn = factory.getConnection();
		// 拼写sql语句
		String sqlstr = "insert stuinfo(name,classes,score) values(?,?,?)";
		PreparedStatement psmt = conn.prepareStatement(sqlstr);
		psmt.setString(1, name);
		psmt.setString(2, classes);
		psmt.setInt(3, score);
		psmt.executeUpdate();
		JDBCUtils.close(psmt, conn);
		this.readDate();
	}

	public void updateDateByName(String name) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		// 得到数据连接
		Connection conn = factory.getConnection();
		// 得到语句块
		Statement stmt = conn.createStatement();
		String sqlstr = "update stuinfo set score=86 where name='" + name
				+ "'";
		stmt.executeUpdate(sqlstr);
		JDBCUtils.close(stmt, conn);
		this.readDateByName(name);
	}

	public void deleDateByName(String name) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		// 得到数据连接
		Connection conn = factory.getConnection();
		// 得到语句块
		Statement stmt = conn.createStatement();
		String sqlstr = "delete from stuinfo where name='" + name + "'";
		stmt.executeUpdate(sqlstr);
		JDBCUtils.close(stmt, conn);
		this.readDate();
	}
	
	public static void main(String[] args){
		StudentBiz td = new StudentBiz();
		try {
			td.deleDateByName("zah");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
