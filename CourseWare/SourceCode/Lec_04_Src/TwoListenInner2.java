import java.awt.*;
import java.awt.event.*;

public class TwoListenInner2{
	private Frame f;
	private TextField tf;
	
	public static void main( String[] args ){
		TwoListenInner that = new TwoListenInner();
		that.go();
	}
	
	public void go(){
		f = new Frame( "Two Listeners example" );
		f.add( "North", new Label( "Click and drag the mouse" ) );
		
		tf = new TextField( 30 );
		f.add( "South", tf );
		f.addMouseMotionListener( new MouseMotionHandler() {
			public void mouseDragged( MouseEvent e ){
				String s = "Mouse dragging: X = " + e.getX() + " Y = " + e.getY();
				tf.setText( s );
			}
		} );
		f.addMouseListener( new MouseEventHandler(){
			public void mouseEntered( MouseEvent e ){
				String s = "The mouse entered";
				tf.setText( s );
		}
		
			public void mouseExited( MouseEvent e ){
				String s = "The mouse has left the building";
				tf.setText( s );
			}
		} );
		f.setSize( 300, 200 );
		f.setVisible( true );
	}
	
	public class MouseMotionHandler extends MouseMotionAdapter{
	/*	public void mouseDragged( MouseEvent e ){
			String s = "Mouse dragging: X = " + e.getX() + " Y = " + e.getY();
			tf.setText( s );
		}*/
	}
	
	public class MouseEventHandler extends MouseAdapter{
	/*	public void mouseEntered( MouseEvent e ){
			String s = "The mouse entered";
			tf.setText( s );
		}
		
		public void mouseExited( MouseEvent e ){
			String s = "The mouse has left the building";
			tf.setText( s );
		}*/
	}
	
}