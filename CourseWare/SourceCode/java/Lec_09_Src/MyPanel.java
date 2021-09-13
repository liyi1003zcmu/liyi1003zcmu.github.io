import java.awt.*;
import javax.swing.*;

public class MyPanel{
	public static void main( String[] args ){
		JFrame frame = new JFrame( "My Frame" );
		JButton btn = new JButton( "Click me" );
		JPanel pnl = new JPanel();
		pnl.setLayout( new BorderLayout() );
		pnl.add( btn, BorderLayout.CENTER );
		frame.setContentPane( pnl );
		frame.pack();
		frame.setVisible( true );
	}
}