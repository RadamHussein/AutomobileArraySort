function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

Automobile.prototype.logMe = function(value) {
    if (value == true) {
	var print = this.year + " " + this.make;
	print += " " + this.model + " " + this.type;
	console.log(print);
	}
    else {
	var print = this.year + " " + this.make;
	print += " " + this.model;
	console.log(print);
	}
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    /*your code here*/
    var swap = true;
    var j = 0;
    while (swap) {
	swap = false;
	j++;
    	    for (var i = 0; i < array.length - 1; i++) {
	    var result = comparator(array[i], array[i+1]);
            //console.log("result returned " + result + " on " + array[i] + " and " + array[i+1]);
		if (result == true) {
		    var temp = array[i];
		    array[i] = array[i+1];
		    array[i+1] = temp;
		    swap = true;
		}
    	    }
    }
    array.reverse();	
    return array;
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    /* your code here*/
    if (auto1.year > auto2.year) {
	return true;
    }	
    else if (auto1.year < auto2.year) {
	return false;
    }
    else {
	return true;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    /* your code here*/
    if (auto1.make.localeCompare(auto2.make) == -1) {
	return true;
    }
    else if (auto1.make.localeCompare(auto2.make) == 1) {
	return false;
    }
    else {
	return true;
    }
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
    /* your code here*/
    /*variables hold return values from helper function*/
    var auto1_rank = typeCompareHelper(auto1);
    var auto2_rank = typeCompareHelper(auto2);

    /*holds true or false. Will be the return value*/
    var result;

    if (auto1_rank < auto2_rank) {
	result = true;
    }
    else if (auto1_rank > auto2_rank) {
	result = false;
    }
    else {
	result = yearComparator(auto1, auto2);
    }
	
    return result;		 
}

/*This function compares the types of all automobile objects passed to it to strings which it returns a number from 1 to 5 based on the string that it matches.*/
function typeCompareHelper(auto){
    if (auto.type == "Roadster") {
	return 1;
    }
    else if (auto.type == "Pickup") {
	return 2;
    }
    else if (auto.type == "SUV") {
	return 3;
    }
    else if (auto.type == "Wagon") {
    	return 4;
    }
    else {
	return 5;
    }
}
/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */


/***Tests***/

/*
function testYearComparator(automobiles) {
    console.log("****Test yearComparator****");
    for (var i = 0; i < automobiles.length - 1; i++) {
	var result = yearComparator(automobiles[i], automobiles[i+1]);
    	console.log("A " + automobiles[i].year + automobiles[i].make + " is greater than a"
		+ automobiles[i+1].year + " " + automobiles[i+1].make);
    	console.log(result);
    }
}

function testMakeComparator(automobiles) {
    console.log("****Test makeComparator****");
    for (var i = 0; i < automobiles.length - 1; i++) {
	var result = makeComparator(automobiles[i], automobiles[i+1]);
	console.log("A " + automobiles[i].make + " is greater than a"
		+ automobiles[i+1].make);
	console.log(result);
    }
}

function testTypeComparator(automobiles) {
    console.log("****Test typeComparator****");
    for (var i = 0; i < automobiles.length - 1; i++) {
	var result = typeComparator(automobiles[i], automobiles[i+1]);
	console.log("A " + automobiles[i].type + " is greater than a " 
		+ automobiles[i+1].type);
	console.log(result);
    }
}

testYearComparator(automobiles);
testMakeComparator(automobiles);
testTypeComparator(automobiles);

console.log("results by year:");
var resultArr = sortArr(yearComparator, automobiles);
for (var i = 0; i < resultArr.length; i++) {
	console.log(resultArr[i].year + " " + resultArr[i].make);
	}

console.log("results by make:");
var makeArr = sortArr(makeComparator, automobiles);
for (var j = 0; j < makeArr.length; j++) {
	console.log(makeArr[j].make);
	}

console.log("results by type:");
resultArr = sortArr(typeComparator, automobiles);
for (var x = 0; x < resultArr.length; x++) {
	console.log(resultArr[x].type);
	}
*/

/*
console.log("*****");
console.log("The cars sorted by year are:");
console.log("year make model of the 'greatest' car");
var resultArr = sortArr(yearComparator, automobiles);
for (var i = 0; i < resultArr.length; i++) {
	resultArr[i].logMe(false);
	}
console.log("year make model of the 'least' car");
console.log();

console.log("The cars sorted by make are:");
console.log("year make model of the 'greatest' car");
resultArr = sortArr(makeComparator, automobiles);
for (var j = 0; j < resultArr.length; j++) {
	resultArr[j].logMe(false);
	}
console.log("year make model of the 'least' car");
console.log();

console.log("The cars sorted by type are:");
console.log("year make model type of the 'greatest' car");
resultArr = sortArr(typeComparator, automobiles);
for (var x = 0; x < resultArr.length; x++) {
	resultArr[x].logMe(true);
	}
console.log("year make model type of the 'least' car");
console.log("*****");
*/

//This function takes a typeComparator and passes that function to the print function
function getResults(typeComparator) {
    if (typeComparator == yearComparator) {
	var type = false;
	console.log("The cars sorted by year are:");
	printResults(typeComparator, automobiles, type);
    }
    else if (typeComparator == makeComparator) {
	var type = false; 
	console.log("The cars sorted by make are:");
	printResults(typeComparator, automobiles, type);
    }
    else {
	var type = true;
	console.log("The cars sorted by type are:");
	printResults(typeComparator, automobiles, type);
    }
}

//This function calls the sorting function and prints the sorted array
function printResults(typeComparator, automobiles, type) {
    var resultArr = sortArr(typeComparator, automobiles);
    resultArr.forEach(function(currentValue) {
	currentValue.logMe(type)
	});
}

//Call functions
console.log("*****");
getResults(yearComparator);
console.log();
getResults(makeComparator);
console.log();
getResults(typeComparator);
console.log("*****");


//automobiles.forEach(sortArr(yearComparator, automobiles).logMe(false));
