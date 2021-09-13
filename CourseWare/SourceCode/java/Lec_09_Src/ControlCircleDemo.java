import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
public class ControlCircleDemo extends JFrame{
	private JButton largeBtn;
	private JButton shrinkBtn;
	private CirclePanel cpnl;
	public static void main( String [] args ){
		JFrame frame = new ControlCircleDemo();
		frame.setTitle( "ControlCircleDemo" );
		frame.setSize( 400, 300 );
		frame.setLocationRelativeTo( null );

		frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame.setVisible( true );
	}
	public ControlCircleDemo(){
		largeBtn = new JButton( "Enlarge" );
		shrinkBtn = new JButton( "Shrink" );
		cpnl = new CirclePanel();

		JPanel pnl = new JPanel();
		pnl.add( largeBtn );
		pnl.add( shrinkBtn );
		 
		this.add( pnl, BorderLayout.SOUTH );
		this.add( cpnl, BorderLayout.CENTER );
		 
		largeBtn.addActionListener( new EnlargeListener() );
		shrinkBtn.addActionListener( new ShrinkListener() );
	}
	
	class EnlargeListener implements ActionListener{
		public void actionPerformed( ActionEvent event ){
			cpnl.enlarge();
		}
	}
	
	class ShrinkListener implements ActionListener{
		public void actionPerformed( ActionEvent event ){
			cpnl.shrink();
		}
	}
}

class CirclePanel extends JPanel{
	private int radius = 1; 
	protected void paintComponent( Graphics g ){
		super.paintComponent( g );
		g.drawOval( getWidth() / 2 - radius, getHeight() / 2 - radius, 2 * radius, 2 * radius );
	}
 
	public void enlarge(){
		radius++;
		repaint();
	}
 
	public void shrink(){
		if( radius > 0 )
			radius--;
		repaint();
	}
}
