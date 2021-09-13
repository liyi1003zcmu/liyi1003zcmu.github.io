import java.io.*;

public class TestFileClass{
	public static void main( String[] args ){
		File file = new File( "test/Music.java" );
		System.out.println( "Does this file exists ? " + file.exists() );
		System.out.println( "The file has " + file.length() + " bytes " );
		System.out.println( "Can it be read? " + file.canRead() );
		System.out.println( "Can it be writeen? " + file.canWrite() );
		System.out.println( "Is it a directory? " + file.isDirectory() );
		System.out.println( "Is is a file? " + file.isFile() );
		System.out.println( "Is it absolute? " + file.isAbsolute() );
		System.out.println( "Is is hidden? " + file.isHidden() );
		System.out.println( "Absolute path is " + file.getAbsolutePath() );
		System.out.println( "Last modified on " + new java.util.Date( file.lastModified() ) );
	}
}