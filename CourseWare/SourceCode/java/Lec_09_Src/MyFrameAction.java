import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class MyFrameAction{
	public static void main( String[] args ){
		JFrame frame = new JFrame( "MyFrame" );
		JLabel label = new JLabel( "OK" );
		MyButton btn = new MyButton( "Click me" );
		btn.addActionListener( new EventMonitor());
	
		JPanel pnl = new JPanel();
		pnl.setBackground( Color.yellow );
		pnl.add( btn );
		Container cont = frame.getContentPane();
		cont.add( pnl, BorderLayout.SOUTH );
		frame.add( label );
		frame.setSize( 400, 300 );
		frame.setLocationRelativeTo( null );
		frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame.setVisible( true );
	}
}

class MyButton extends JButton implements ActionListener{
	public MyButton( String text ){
		super( text );
		addActionListener( this );
	}
	public void actionPerformed( ActionEvent event ){
		System.out.println( "Button Clicked" );
		System.exit( 0 );
	}
}