
import java.sql.*;

public class TestDatabase{
	private static String DBDriverStr = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	
	private static String DBUrl = "jdbc:sqlserver://localhost:1433;" + "databaseName=Studb;user=lymanager;password=123456;";
	
	public static void main( String[] args ){
		Connection con = null;
		Statement stmt = null;
		PreparedStatement pstmt = null;
		
		//Connection to Database
		try{
			Class.forName( DBDriverStr );
			con = DriverManager.getConnection( DBUrl );
			stmt = con.createStatement();
			System.out.println( "Connection Successful!" );
		}catch( ClassNotFoundException e ){
			e.printStackTrace();
		}catch( SQLException e ){
			e.printStackTrace();
		}
		
		//Execute Simple Query
		try{
			String queryStr = "select * from stuinfo";
			ResultSet rset = stmt.executeQuery( queryStr );
			
			System.out.println( "Id" + " " + "Name" + " "+ "Classes" + " " + "Score" );
			while( rset.next() ){
				System.out.println( rset.getInt( 1 ) + " " + rset.getString( 2 ) + " " + rset.getString( 3 ) + " " + rset.getString( 4 ) ); 
			}
		}catch( SQLException e ){
			e.printStackTrace();
		}
		
		//Execute Simple update
		/*
		try{
			String updateStr = "insert into stuinfo values( 22,'张成','378','87')";
			stmt.executeUpdate( updateStr );
		}catch( SQLException e ){
			e.printStackTrace();
		}*/
		
		//PreparedStatement
		try{
			String insertStr = "insert into stuinfo(id,name) values(?,?)";
			pstmt = con.prepareStatement( insertStr );
			pstmt.setString( 1, "37" );
			pstmt.setString( 2, "方文" );
			pstmt.executeUpdate();
			pstmt.setString( 1, "49" );
			pstmt.setString( 2, "万金" );
			pstmt.executeUpdate();
		}
		catch( SQLException e ){
			e.printStackTrace();
		}
		try{
			con.close();
		}catch( SQLException e ){
			e.printStackTrace();
		}
	}
}
