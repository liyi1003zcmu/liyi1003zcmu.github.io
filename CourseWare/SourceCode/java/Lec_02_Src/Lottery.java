import java.util.*;

public class Lottery{
	public static void main( String[] args ){
		int lotnum = ( int )( Math.random() * 100 );
		int lot1 = lotnum / 10;
		int lot2 = lotnum % 10;
		int guess;
		
		Scanner input = new Scanner( System.in );
		System.out.print( "请输入您的选择(0-99): " );
		guess = input.nextInt();
		
		if( guess >= 0 && guess <= 99)
			System.out.println( "数字有效" );
		
		int gue1 = guess / 10;
		int gue2 = guess % 10;
		
		System.out.println( "中奖号码为: " + lotnum );
		
		if( guess == lotnum )
			System.out.println( "恭喜您全猜中，获得奖金￥10000!" );
		else if( gue1 == lot2 && gue2 == lot1 )
			System.out.println( "恭喜您猜中了全部数字，但位置不对，获得奖金￥3000!" );
		else if( gue1 == lot1 || gue1 == lot2 || gue2 == lot1 || gue2 == lot2 )
			System.out.println( "恭喜您猜中了部分数字，获得奖金￥1000!" );
		else
			System.out.println( "不好意思，您没有猜中，欢迎下次再来!" );
		
		return;
	}
}