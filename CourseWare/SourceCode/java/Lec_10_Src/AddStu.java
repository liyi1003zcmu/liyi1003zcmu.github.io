import java.sql.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class AddStu extends JFrame{

	JLabel lb1 = new JLabel();
	JLabel lb2 = new JLabel();
	JLabel lb3 = new JLabel();
	JLabel lb4 = new JLabel();
	
	JTextField tfname = new JTextField();
	JTextField tfid = new JTextField();
	JTextField tfadd = new JTextField();
	
	JButton btnadd = new JButton();
	JButton btnclr = new JButton();

	public AddStu(){
		try{
			init();
		}catch( Exception e ){
			e.printStackTrace();
		}
	}
	
	public static void main( String[] args ){
		AddStu frame1 = new AddStu();

		frame1.setSize( new Dimension( 400, 320 ) );
		frame1.setLocationRelativeTo( null );
		frame1.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
		frame1.setVisible( true );
	}
	
	private void init() throws Exception{
		getContentPane().setLayout( null );
		
		lb1.setBorder( BorderFactory.createEtchedBorder() );
		lb1.setBounds( new Rectangle( 27, 23, 339, 257 ) );
				
		lb2.setText( "id" );
		lb2.setBounds( new Rectangle( 36, 57, 50, 30 ) );
		
		lb3.setText( "name" );
		lb3.setBounds( new Rectangle( 40, 100, 35, 18 ) );
		
		lb4.setText( "addr" );
		lb4.setBounds( new Rectangle( 34, 129, 35, 24 ) );
		
		tfid.setBounds( new Rectangle( 78, 62, 118, 21 ) );		
		tfname.setBounds( new Rectangle( 77, 98, 119, 24 ) );
		tfadd.setBounds( new Rectangle( 77, 134, 272, 26 ) );
		
		btnadd.setText( "OK" );
		btnadd.setBounds( new Rectangle( 81, 233, 103, 25 ) );
		btnadd.addActionListener( new AddStuActionListener() );
		
		btnclr.setText( "Clear" );
		btnclr.setBounds( new Rectangle( 196, 232, 118, 26 ) );
				
		this.getContentPane().add( lb1 );
		this.getContentPane().add( lb2 );
		this.getContentPane().add( tfid);
		this.getContentPane().add( lb3 );
		this.getContentPane().add( tfname);
		this.getContentPane().add( lb4 );
		this.getContentPane().add( tfadd );
		this.getContentPane().add( btnadd );
		this.getContentPane().add( btnclr );
	}
	
	class AddStuActionListener implements ActionListener{
		public void actionPerformed( ActionEvent e ){
			String tid = tfid.getText();
			String tname = tfname.getText();
			String taddr = tfadd.getText();
			
			StuinfoBiz sbiz= new StuinfoBiz();
			int id = Integer.parseInt( tid );
			boolean flag = false;
			
			try{
				sbiz.insertData( id, tname, taddr );
				flag = true;
			}catch( Exception ex ){}
			if( flag )
				JOptionPane.showMessageDialog( null, "Insert Successful!" );
			else
				JOptionPane.showMessageDialog( null, "Insertion Failed!", "Error", JOptionPane.ERROR_MESSAGE );
			
			tfid.setText( "" );
			tfname.setText( "" );
			tfadd.setText( "" );
		}
	}
}