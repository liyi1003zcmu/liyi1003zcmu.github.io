public class VariableScope{
	public static void main( String[] args ){
		int x = 10;
		{
			int y = 20;
			x++;
			y++;
			int x = 5;
		}
		x--;
		y--;
	}
}