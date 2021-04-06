public class Foo2{
  int i = 2;
  static int k = 5;
  
  public static void main( String[] args ){
    Foo2 fo = new Foo2();
    int j = fo.i;
    fo.m1();
  }
  
  public void m1(){
    i = i + k + m2( i, k );
  }
  
  public static int m2( int i, int j ){
    return ( int )Math.pow( i, j );
  }
}