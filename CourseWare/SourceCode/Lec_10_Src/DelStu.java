import java.util.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class DelStu extends JFrame{

	JLabel lb1 = new JLabel();
	JLabel lb2 = new JLabel();
	JTextField tfname = new JTextField();
	JButton btndel = new JButton();
	
	public DelStu(){
		try{
			init();
		}catch( Exception ex ){
			ex.printStackTrace();
		}
	}
	
	public static void main( String[] args ){
		DelStu delStu = new DelStu();
		delStu.setSize( new Dimension( 400, 320 ) );
		delStu.setLocationRelativeTo( null );
		delStu.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		delStu.setVisible( true );
	}
	
	private void init(){
		this.getContentPane().setLayout( null );
		lb1.setBorder( BorderFactory.createEtchedBorder() );
		lb1.setBounds( new Rectangle( 22, 23, 357, 262 ) );
		
		lb2.setText( "Please enter name to delete: " );
		lb2.setBounds( new Rectangle( 37, 44, 113, 29 ) );
		
		tfname.setBounds( new Rectangle( 150, 45, 174, 28 ) );
		
		btndel.setText( "OK" );
		btndel.setBounds( new Rectangle( 96, 114, 176, 34 ) );
		btndel.addActionListener( new DelStuActionListener() );
		
		this.getContentPane().add( lb1 );
		this.getContentPane().add( lb2 );
		this.getContentPane().add( tfname );
		this.getContentPane().add( btndel );
	}
	
	class DelStuActionListener implements ActionListener{
		public void actionPerformed( ActionEvent event ){
			String name = tfname.getText();
			StuinfoBiz sbiz = new StuinfoBiz();
			boolean flag = false;
			
			try{
				sbiz.deleteData( name );
				flag = true;
			}catch( Exception ex ){
			}
			
			if( flag )
				JOptionPane.showMessageDialog( null, "Delete Successful!" );
			else
				JOptionPane.showMessageDialog( null, "Delete failed", "Error", JOptionPane.ERROR_MESSAGE );
			
			tfname.setText( "" );
		}
	}	
}