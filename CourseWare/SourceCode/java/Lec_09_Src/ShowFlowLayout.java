import java.awt.*;
import javax.swing.*;

public class ShowFlowLayout extends JFrame{
	public ShowFlowLayout(){
		Container cont = getContentPane();
		cont.setLayout( new FlowLayout( FlowLayout.CENTER, 5, 10 ) );
		cont.add( new Label( "First Name" ) );
		cont.add( new JTextField( 10 ) );
		cont.add( new JLabel( "Last Name" ) );
		cont.add( new JTextField( 10 ) );
		cont.add( new JLabel( "Gender" ) );
		cont.add( new JTextField( 2 ) );
	}

	public static void main( String[] args ){
		ShowFlowLayout frame = new ShowFlowLayout();
		frame.setTitle( "ShowFlowLayoutDemo" );
		frame.setSize( 200, 200 );
		frame.setLocationRelativeTo( null );
		frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame.setVisible( true );
	}
}