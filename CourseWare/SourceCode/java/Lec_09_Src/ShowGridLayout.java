import java.awt.*;
import javax.swing.*;

public class ShowGridLayout{
	public static void main( String[] args ){
		JFrame frame = new JFrame( "ShowGridLayout" );
		frame.setLayout( new GridLayout( 3, 2, 5, 5 ) );
		frame.add( new JLabel( "First Name" ) );
		frame.add( new JTextField( 8 ) );
		frame.add( new JLabel( "Last Name" ) );
		frame.add( new JTextField( 8 ) );
		frame.add( new JLabel( "Gender" ) );
		frame.add( new JTextField( 2 ) );
		frame.setSize( 400, 300 );
		frame.setLocationRelativeTo( null );
		frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame.setVisible( true );
	}
}