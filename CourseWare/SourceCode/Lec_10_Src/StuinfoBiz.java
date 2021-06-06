import java.sql.*;

public class StuinfoBiz{
	public void readData() throws Exception{
		ConnectionFactory factory = new ConnectionFactory();
		
		Connection conn = factory.getConnection();
		
		Statement stmt = conn.createStatement();
		
		String sqlstr = "select * from stuinfo";
		
		ResultSet rs = stmt.executeQuery( sqlstr );
		
		while( rs.next() ){
			System.out.println( rs.getInt( 1 ) + "\t" + rs.getString( 2 ) + "\t" + rs.getString( 3 ));
		}
		
		JDBCUtil.close( rs, stmt, conn );
	}
	
	public void insertData( int id, String name, String address ) throws Exception{
		ConnectionFactory factory = new ConnectionFactory();
		
		Connection conn = factory.getConnection();
		
		Statement stmt = conn.createStatement();
		
		String sqlstr = "insert into stuinfo values(?,?,?)";
		
		PreparedStatement psmt = conn.prepareStatement( sqlstr );
		psmt.setInt( 1, id );
		psmt.setString( 2, name );
		psmt.setString( 3, address );
		psmt.executeUpdate();
		
		JDBCUtil.close( stmt, conn );
	}
	
	public void deleteData( String name ) throws Exception{
		ConnectionFactory factory = new ConnectionFactory();
		
		Connection conn = factory.getConnection();
		
		Statement stmt = conn.createStatement();
		
		String sqlstr = "delete from stuinfo where name ='" + name + "'";
		
		stmt.executeUpdate( sqlstr );
		
		JDBCUtil.close( stmt, conn );
	}
	
	public void updateData( int id, String name, String address ) throws Exception{
		ConnectionFactory factory = new ConnectionFactory();
		
		Connection conn = factory.getConnection();
		
		String sqlstr = "update stuinfo set id=?, address=? where name='" + name + "'";
		
		PreparedStatement psmt = conn.prepareStatement( sqlstr );
		
		psmt.setInt( 1, id );
		psmt.setString( 2, address );
		
		psmt.executeUpdate();
		
		JDBCUtil.close( psmt, conn );
	}
	
	public void selectdata( int id ) throws Exception{
		ConnectionFactory factory = new ConnectionFactory();
		
		Connection conn = factory.getConnection();
		
		Statement stmt = conn.createStatement();
		
		String sqlstr = "select * from stuinfo where id=" + id + "";
		
		ResultSet rs = stmt.executeQuery( sqlstr );
		
		while( rs.next() ){
			System.out.println( rs.getInt( 1 ) + "\t" + rs.getString( 2 ) + "\t" + rs.getString( 3 ) );
		}
		
		JDBCUtil.close( rs, stmt, conn );
	}
	
	public String[] selectData( String name ) throws Exception{
		ConnectionFactory factory = new ConnectionFactory();
		
		Connection conn = factory.getConnection();
		
		Statement stmt = conn.createStatement();
		
		String sqlstr = "select * from stuinfo where name='" + name + "'";
		
		ResultSet rs = stmt.executeQuery( sqlstr );
		
		String[] data = new String[ 3 ];
		
		while( rs.next() ){
				data[ 0 ] = rs.getString( 1 );
				data[ 1 ] = rs.getString( 2 );
				data[ 2 ] = rs.getString( 3 );
		}
		
		JDBCUtil.close( rs, stmt, conn );
		return data;
	}
}