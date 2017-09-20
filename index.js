var addFormContent = document.getElementById("addFormContent");
var formContent = document.getElementById("form__content");
var autorName = document.getElementById("name");
var eventTheme = document.getElementById("event");
var date = document.getElementById("date");
var time = document.getElementById("time");
var textarea = document.getElementById("textarea");
var notes = document.getElementById("notes");
var sortFiled = document.getElementById("sortFiled");
var search = document.getElementById("search");
console.log(notes);

var notesArray = [];

function openForm() {
	formContent.classList.toggle("open");
}
addFormContent.onclick = openForm;

function dataForm(autorName, eventTheme, date, time, textarea) {
	this.autorName = autorName;
	this.eventTheme = eventTheme;
	this.date = date;
	this.time = time;
	this.textarea = textarea;
}

function createNote(arr) {
	if(autorName.value && eventTheme.value && date.value
		&& time.value && textarea.value) {
		var noteObj = new dataForm(autorName.value, eventTheme.value, date.value, time.value, textarea.value);
		arr.push(noteObj);
		
		/*arr.sort(function(a, b){
			if(a.autorName.toLowerCase() > b.autorName.toLowerCase()) {
				return 1
			}
			else { return -1 }
		});*/

		autorName.value = "";
		eventTheme.value = "";
		date.value = "";
		time.value = "";
		textarea.value = "";
	}
}

function createMarkup(autorName, eventTheme, date, time, textarea, index, arr) {
	var div = document.createElement("div");
	div.setAttribute("class", "notes__item");
	notes.appendChild(div);
	
	var ul = document.createElement("ul");
	div.appendChild(ul);

	var liClose = document.createElement("li");
	liClose.setAttribute("class", "notes__item-close");
	var btnClose = document.createElement("button");
	btnClose.textContent = "x";
	liClose.appendChild(btnClose);
	ul.appendChild(liClose);
	
	btnClose.onclick = function () {
		arr.splice(index, 1);
		createNotes(arr);
	}

	var liContent = document.createElement("li");
	liContent.setAttribute("class", "notes__item-content");
	var h3 = document.createElement("h3");
	h3.textContent = autorName;
	liContent.appendChild(h3);
	var pEv = document.createElement("p");
	var span = document.createElement("span");
	var span1 = document.createElement("span");
	span.setAttribute("class", "span__event");
	span.textContent = "Event" + ": ";
	span1.textContent = eventTheme;
	pEv.appendChild(span);
	pEv.appendChild(span1);
	liContent.appendChild(pEv);

	var pComment = document.createElement("p");
	pComment.textContent = textarea;
	liContent.appendChild(pComment);
	ul.appendChild(liContent);

	var liDateTime = document.createElement("li");
	liDateTime.setAttribute("class", "notes__item-date");
	var pDate = document.createElement("p");
	pDate.textContent = date + " " + time;
	liDateTime.appendChild(pDate);
	ul.appendChild(liDateTime);

	return div;
}

function createNotes(arr) {
	notes.innerHTML = "";
	arr.map(function(item, index, arr) {
		createMarkup(item.autorName, item.eventTheme, item.date, item.time, item.textarea, index, arr);
	});
}

formContent.onsubmit = function(e) {
	e.preventDefault();
	createNote(notesArray);
	createNotes(notesArray);
}

// Sort
function sortArr(arr, field) {
	arr.sort(function(a, b) {
		if(a[field] > b[field]) {
			return 1
		}
		else {
			return -1
		}
	})
}

function showSort(e) {
	var index = e.target.selectedIndex;
	var content = e.target.options[index].textContent;
	console.log(content);
	if (index == 1) {
		sortArr(notesArray, "autorName");
	} else if (index == 2) {
		sortArr(notesArray, "eventTheme");
	} else if (index == 3) {
		sortArr(notesArray, "date");
	} else if (index == 4) {
		sortArr(notesArray, "time");
	}
	console.log(notesArray);

	createNotes(notesArray);
}

sortFiled.onchange = showSort;

// Search & Filter
function filterFn (item, index, arr) {
	var text = search.value.toLowerCase();
	console.log(text);
	return arr.indexOf(item) > text;	
}

function filterArr(arr) {
	arr.filter(filterFn);
	createNotes(arr);
}

search.oninput = function () {
	filterArr (notesArray);
	console.log(notesArray);
}

/*var fruits = ["Apple", "Orange", "Banana", "Grape", "Potatoe", "Orange"];

function filterArr(e) {
	var text = e.target.value.toLowerCase();
	var result = notesArray.filter( function(item){
		return item.indexOf(text) = -1;
	});
	console.log(result);

}

search.oninput = filterArr;


var data = [{"id":1,"name":"Ernest","email":"ebishop0@myspace.com","isCustomer":false},
{"id":2,"name":"Michael","email":"mturner1@multiply.com","isCustomer":false},
{"id":3,"name":"Mildred","email":"mwelch2@google.it","isCustomer":false},
{"id":4,"name":"Jeremy","email":"jwilson3@hostgator.com","isCustomer":false},
{"id":5,"name":"Judy","email":"jellis4@ameblo.jp","isCustomer":true},
{"id":6,"name":"Judy","email":"jrogers5@ow.ly","isCustomer":false},
{"id":7,"name":"Chris","email":"cbennett6@nasa.gov","isCustomer":false},
{"id":8,"name":"Ruth","email":"rmason7@simplemachines.org","isCustomer":true},
{"id":9,"name":"Justin","email":"jmedina8@indiegogo.com","isCustomer":true},
{"id":10,"name":"Dennis","email":"dflores9@g.co","isCustomer":true}];

// Получили данные с сервера и записали их в переменную data
var customers = data.filter(function(value) {
  return value.id > 8;
});

console.log(customers);*/
