import java.sql.*;

public class PPStatDemo{
	public static final String DBDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	public static final String DBUrl = "jdbc:sqlserver://127.0.0.1:1433;databaseName=Studb";
	public static final String DBUser = "lymanager";
	public static final String DBPasswd = "12345678";

	public static void main( String[] args ){
		Connection conn = null;
		PreparedStatement ppst = null;

		String sql = "INSERT into stuinfo(id, name, class, score)" + "VALUES(?,?,?,?)";
		try{
			Class.forName( DBDriver );
			conn = DriverManager.getConnection( DBUrl, DBUser, DBPasswd	);

			ppst = conn.prepareStatement( sql );

			ppst.setInt( 1, 32 );
			ppst.setString( 2, "—ÓÂ–" );
			ppst.setString( 3, "XY01" );
			ppst.setInt( 4, 98 );
			
			ppst.executeUpdate();
		}catch( ClassNotFoundException ex ){
			System.out.println( ex );
		}catch( SQLException ex ){
			System.out.println( ex );
		}finally{
			try{
				if( ppst != null )
					ppst.close();
				if( conn != null )
					conn.close();
			}catch( SQLException ex ){
				System.out.println( ex );
			}
		}
	}
}