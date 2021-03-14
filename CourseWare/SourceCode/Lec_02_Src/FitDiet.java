import java.util.*;

public class FitDiet{
	public static void main( String[] args ){
		int day;
		Scanner input = new Scanner( System.in );
		System.out.println( "请输入今天是星期几：" );
		day = input.nextInt();
		
		switch( day ){
			case 1:
				System.out.println( "小白菜" );
				break;
			case 2:
				System.out.println( "方便面" );
				break;
			case 3:
				System.out.println( "大白菜" );
				break;
			case 4:
				System.out.println( "猪肉" );
				break;
			case 5:
				System.out.println( "牛肉" );
				break;
			case 6:
				System.out.println( "燕窝" );
				break;
			default:
				System.out.println( "什么都不吃!" );
				break;
		}

		return;
	}
}