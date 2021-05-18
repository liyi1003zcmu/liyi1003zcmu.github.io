import java.awt.*;
import javax.swing.*;

public class ShowBorderLayout{
	public static void main( String[] args ){
		JFrame frame = new JFrame( "ShowBorderLayout" );
		frame.setLayout( new BorderLayout( 5, 10 ) );
		frame.add( new JButton( "East" ), BorderLayout.EAST );
		frame.add( new JButton( "West" ), BorderLayout.WEST );
		frame.add( new JButton( "Center" ), BorderLayout.CENTER );
		frame.add( new JButton( "North" ), BorderLayout.NORTH );
		frame.add( new JButton( "South" ), BorderLayout.SOUTH );
		frame.setSize( 400, 300 );
		frame.setLocationRelativeTo( null );
		frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame.setVisible( true );
	}
}