function convertToRoman(num) {
 var romanNum = ["I","V","X","L","C","D","M"];
 var numTemp = [];
 var i = 0;
 var x = num.toString();
 while (i < x.length) {
   numTemp.push(x.slice(i, i+1));
   i++;
 }
 
}

convertToRoman(36);
