import java.awt.*;
import javax.swing.*;

public class MyFrame{
	public static void main( String[] args ){
		JFrame frame = new JFrame( "My Frame" );
		JButton btn = new JButton( "Click Me" );
		frame.getContentPane().add( btn, BorderLayout.CENTER );
		frame.pack();
		frame.setVisible( true );
	}
}