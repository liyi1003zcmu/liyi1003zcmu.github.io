import java.awt.*;
import javax.swing.*;

public class MyFrameWithPanel{
	public static void main( String[] args ){
		JFrame frame = new JFrame( "My Frame" );
		Container cntp = frame.getContentPane();
		cntp.setBackground( Color.CYAN );
		JPanel pnl = new JPanel();
		pnl.setBackground( Color.YELLOW );
		JButton btn = new JButton( "Click me" );
		pnl.add( btn );
		cntp.add( pnl, BorderLayout.SOUTH );
		frame.setSize( 300, 200 );
		frame.setVisible( true );
	}
}