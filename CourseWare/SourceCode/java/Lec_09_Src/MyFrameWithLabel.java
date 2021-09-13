import javax.swing.*;

public class MyFrameWithLabel{
	public static void main( String[] args ){
	JFrame frame = new JFrame( "Hello, MyFrame!" );
	JLabel label = new JLabel( "Hello, MyLabel!" );
	frame.add( label );
	frame.setSize( 400, 200 );
	frame.setLocationRelativeTo( null );
	frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
	frame.setVisible( true );
	}
}