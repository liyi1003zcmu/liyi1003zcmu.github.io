import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
    public Connection getConnection() {
    	String user = "liyi";
		String pwd = "810904";
		// …Ë∂®url
		String url = "jdbc:mysql://localhost:3306/studb?user=liyi&password=liyi";
        Connection con = null;
        try {
        	Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException ce) {
            System.out.println(ce);
        }
        try {
            con = DriverManager.getConnection(url, user, pwd);
        } catch (SQLException ce) {
            System.out.println(ce);
        }
        return con;
    }
}
