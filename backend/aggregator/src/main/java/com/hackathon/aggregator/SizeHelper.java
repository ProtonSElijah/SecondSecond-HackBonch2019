package com.hackathon.aggregator;

class SizeHelper {	
	public static String[] toSize(int[] array) {
		String minSize = null;
		String maxSize = null;
		int minPos = 0;
		int i = 0;
		while (minSize == null & i < array.length) {
			if (array[i] == 1) {
				switch (i) {
				case 0:
					minSize = "XXS";
					minPos = i;
					break;
				case 1: 
					minSize = "XS";
					minPos = i;
					break;
				case 2:
					minSize = "S";
					minPos = i;
					break;
				case 3:
					minSize = "M";
					minPos = i;
					break;
				case 4:
					minSize = "L";
					minPos = i;
					break;
				case 5:
					minSize = "XL";
					minPos = i;
					break;
				case 6:
					minSize = "XXL";
					minPos = i;
					break;		
				}
			}
			i++;
		}
		int j = minPos + 1;
		while (maxSize == null & j < array.length) {
			if (array[j] == 1) {
				switch (j) {
				case 0:
					maxSize = "XXS";
					break;
				case 1: 
					maxSize = "XS";
					break;
				case 2:
					maxSize = "S";
					break;
				case 3:
					maxSize = "M";
					break;
				case 4:
					maxSize = "L";
					break;
				case 5:
					maxSize = "XL";
					break;
				case 6:
					maxSize = "XXL";
					break;		
				}
			}
			j++;
		}
		return new String[] {minSize, maxSize};
	}	
}
