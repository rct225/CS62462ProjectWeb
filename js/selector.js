function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

var years = range(61, 1958);

var ranks = range(10, 1);

var myDiv1 = document.getElementById("f1");
// console.log(myDiv);

//Create array of options to be added
// var array = ["Volvo","Saab","Mercades","Audi"];

//Create and append select list
var selectList1 = document.createElement("select");
selectList1.id = "mySelect1";
// selectList1.onchange = myTest();
myDiv1.appendChild(selectList1);

//Create and append the options
for (var i = 0; i < years.length; i++) {
    var option = document.createElement("option");
    option.value = years[i];
    option.text = years[i];
    if (i == 0) {
        option.selected = true;
    }
    selectList1.appendChild(option);
}

var myDiv2 = document.getElementById("f2");
// console.log(myDiv);

//Create array of options to be added
// var array = ["Volvo","Saab","Mercades","Audi"];

//Create and append select list
var selectList2 = document.createElement("select");
selectList2.id = "mySelect2";
myDiv2.appendChild(selectList2);

//Create and append the options
for (var i = 0; i < years.length; i++) {
    var option = document.createElement("option");
    option.value = years[i];
    option.text = years[i];
    if ( i == years.length - 1) {
        option.selected = true;
    }
    selectList2.appendChild(option);
}

var myDiv3 = document.getElementById("f3");
// console.log(myDiv);

//Create array of options to be added
// var array = ["Volvo","Saab","Mercades","Audi"];

//Create and append select list
var selectList3 = document.createElement("select");
selectList3.id = "mySelect3";
myDiv3.appendChild(selectList3);

//Create and append the options
for (var i = 0; i < ranks.length; i++) {
    var option = document.createElement("option");
    option.value = ranks[i];
    option.text = ranks[i];
    if ( i == 0 ) {
        option.selected = true;
    }
    selectList3.appendChild(option);
}

var myDiv4 = document.getElementById("f4");
// console.log(myDiv);

//Create array of options to be added
// var array = ["Volvo","Saab","Mercades","Audi"];

//Create and append select list
var selectList4 = document.createElement("select");
selectList4.id = "mySelect4";
myDiv4.appendChild(selectList4);

//Create and append the options
for (var i = 0; i < ranks.length; i++) {
    var option = document.createElement("option");
    option.value = ranks[i];
    option.text = ranks[i];
    if (i ==  ranks.length - 1) {
        option.selected = true;
    }
    selectList4.appendChild(option);
}

