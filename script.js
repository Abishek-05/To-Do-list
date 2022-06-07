function addfunc()
{
	tit = document.getElementById("title").value;
	if(tit == "")
	{
		alert("Title cannot be empty...Please enter some activity!");
		return;
	}
	desc = document.getElementById("description").value;
	
	//If some elements are already present, first store it
	if(localStorage.getItem("itemsJson") != null)
	{
		str = localStorage.getItem("itemsJson"); //JSON will return string
		itemsJsonarr = JSON.parse(str);
	}
	//Add new item to array and then set to local storage
	itemsJsonarr.push([tit,desc]);
	localStorage.setItem("itemsJson",JSON.stringify(itemsJsonarr));
	console.log("str",JSON.stringify(itemsJsonarr));
	console.log("Item added");

	document.getElementById("title").value="";
	document.getElementById("description").value="";
}
function buildTable(arr)
{
	tableBody.innerHTML="";
	for(i=0; i<arr.length; i++)
	{
		// if(arr[i][0] == "")
		if(arr[i][0] == null)
			continue;
		row=`<tr>
				<td>${i+1}</td>
				<td>${arr[i][0]}</td>
				<td>${arr[i][1]}</td>
				<td><button id="${i}" class="btn btn-sm delData" onclick="delfunc(id)">Delete</button></td>
		</tr>`
		tableBody.innerHTML += row;
	}
	console.log("Table built");
}
function delfunc(pos) //pos wrt to itemJsonarr
{
	itemsJsonarr.splice(pos,1); //Deleting from itemJsonarr
	localStorage.setItem("itemsJson",JSON.stringify(itemsJsonarr));

	//Redirect the changes in table
	buildTable(itemsJsonarr);
	console.log("Element deleted");
}
function clrfunc()
{
	if(confirm("Do you want to clear the list ? "))
	{
		localStorage.clear();
		tableBody.innerHTML="";
		itemsJsonarr=[];
		console.log("List cleared");
	}
}
function srchfunc()
{
	//The string which user is typing
	srchstr = document.getElementById("srch").value;
	//Iterate through itemsJsonarr to find matches
	newarr=[];
	for(var i=0; i<itemsJsonarr.length; i++)
	{
		curr_title = itemsJsonarr[i][0];
		curr_desc =  itemsJsonarr[i][1];
		if(curr_title.startsWith(srchstr,0))
			newarr.push(itemsJsonarr[i]);
		else
			// newarr.push(["",""]);
			newarr.push([null,null]);
	}
	buildTable(newarr);
}
itemsJsonarr = [];
//Populate table with local storage data....This is the first step always
if(localStorage.getItem("itemsJson") != null)
{
	content = localStorage.getItem("itemsJson");
	itemsJsonarr = JSON.parse(content);
	buildTable(itemsJsonarr);
}
tableBody= document.getElementById("tableBody");

//Adding elements on press of "add to list" button
add = document.getElementById("add");
add.addEventListener("click",addfunc);
add.addEventListener("click",() => {
	buildTable(itemsJsonarr);
});
//Call addfunc even if user presses "enter" button
document.addEventListener("keyup", function(event){
	if(event.key == "Enter")
	{
		addfunc();
		buildTable(itemsJsonarr);
	}
});

//Clear list upon press of clearlist
clr = document.getElementById("clearlist");
clr.addEventListener("click",clrfunc);

//Search feature
srch = document.getElementById("srch");//string which user is searching
srch.addEventListener("keyup",srchfunc);
