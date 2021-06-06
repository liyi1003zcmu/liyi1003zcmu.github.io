public class Test{
	public static double averageValue(ArrayList<? extends Number> list){
		double sum = 0;
		for(Number ele:list){
			sum+=ele;
		}
		return sum/list.size();
	}

	public static void main(String[] args){
		Integer[] i1 = {2, 3, 4, 5};
		Double[] d1 = {2.1, 3.2, 4.3, 6.4};
		System.out.println(Test.averageValue(i1));
		System.out.println(Test.averageValue(d1));
	}
}