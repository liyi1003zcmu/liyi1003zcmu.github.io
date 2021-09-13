import java.sql.*;
import java.io.*;

public class JDBCDemo{
	public static final String dbDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	public static final String dbURL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=Studb;";
	public static final String dbUser = "lymanager";
	public static final String dbPassword = "12345678";

	void jdbcTest(){
		Connection conn = null;
		Statement stat = null;
		ResultSet rst = null;

		try{
			Class.forName( dbDriver );
			conn = DriverManager.getConnection( dbURL, dbUser, dbPassword );
			if( conn != null )
				System.out.println( "Connection Established" );
			stat = conn.createStatement();

			byte[] buf = new byte[ 30 ];

			String name = null;
			String sql = null;

			while( true ){
				System.out.println( "Please input person's name to look up:" );
				int count = System.in.read( buf );
				name = new String( buf, 0, count - 1 );
				System.out.println( "Name is " + name );
				sql = "SELECT id, class, score from stuinfo WHERE name='" + "" + name + "'";
				rst = stat.executeQuery( sql );

				if( rst.next() ){
					do{
						System.out.println( "Name: " + name );
						int id = rst.getInt( 1 );
						System.out.println( "ID: " + id );
						String cls = rst.getString( 2 );
						System.out.println( "Class: " + cls );
						int sc = rst.getInt( 3 );
						System.out.println( "Score: " + sc );
					}while( rst.next() );
				}else{
					System.out.println( "Sorry, No record returned" );
				}
			}
		}catch( ClassNotFoundException ex ){
			System.out.println( ex );
		}catch( SQLException ex ){
			System.out.println( ex );
		}catch( IOException ex ){
			System.out.println( ex );
		}finally{
			try{
				if( rst != null )
					rst.close();
			}catch( SQLException ex ){
				System.out.println( ex );
			}

			try{
				if( stat != null )
					stat.close();
			}catch( SQLException ex ){
				System.out.println( ex );
			}

			try{
				if( conn != null )
					conn.close();
			}catch( SQLException ex ){
				System.out.println( ex );
			}
		}
	}

	public static void main( String[] args ){
		JDBCDemo demo = new JDBCDemo();
		demo.jdbcTest();
	}
}