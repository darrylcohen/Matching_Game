var clicked = 0;
var endOfGame = 0;
var matches = 0;
var tilesClicked=[];
var pictures = ["baby", "bird", "boat", "butterfly", "cat", "chair", "dog", "family", "flower", "goat", "hat", "house", "lion", "plane", "train", "tree","apple","orange"];
var numClicks = 0;

setGrid(4);
function setGrid(x) {
	numClicks = 0;
	document.getElementById("score").innerText = 0;
	// document.getElementById("message").innerHTML="";
	// document.getElementById("message").style.visibility="hidden";
	if(x==4) {
		document.getElementById("bigContainer").style.width="60%";
	} else {
		document.getElementById("bigContainer").style.width="60%";
	}


	var size = x;
	endOfGame = size *2;
	var arr =[];
	for (i=1; i<=size*4; i++) {
		if(i%2==0) {
			arr[i-2] = i/2-1;
			arr[i-1]= i/2-1;

		}
	}
	arr = shuffle(arr);
	placeTiles (arr, size);
}
function shuffle (array) {
	var i = 0, j = 0, temp = null

	for (i = array.length - 1; i > 0; i -= 1) {
  		j = Math.floor(Math.random() * (i + 1))
  		temp = array[i]
	  	array[i] = array[j]
  		array[j] = temp
  	}
	return array;
}
function placeTiles(tiles, size) {
	var h;
	var w;
	if(size==4) {
		w=150;
		h=100;
	} else {
		w=110;
		h=75;
	}

	var myNode = document.getElementById("container");
	while (myNode.firstChild) {
  		myNode.removeChild(myNode.firstChild);
	}
	for(i=0;i<tiles.length;i++) {
		var div = document.createElement("div");
		var image;
		div.style.width=w+"px";
		div.style.height=h+"px";
		div.id="t"+i;

		var img = document.createElement("img");
		img.src="images/" + pictures[tiles[i]] + ".jpg";
		img.style.visibility="hidden";
		img.style.width="100%";
		img.id = i;
		img.style.height="100%";
		div.appendChild(img);

		div.style.margin = "4px";

		div.style.fontSize = "0.5%";
		div.style.backgroundColor = "lightBlue";
		div.style.border = "3px solid black";
		div.onclick = function () {checkSelection(this.children[0])};
		document.getElementById("container").appendChild(div);

	}
}
function checkSelection (img) {

	var match = false;
	var y = tilesClicked.length;
	if(y==0) {
		tilesClicked.push(img);

		img.style.visibility="visible";
	} else if(y==1) {
		if(img.id == tilesClicked[0].id) {
			return;
		}
		tilesClicked.push(img);
		numClicks++;

		img.style.visibility="visible";
		if (tilesClicked[0].src == img.src) {
			match=true;
			matches++;
			// if (matches == endOfGame) {
			// 	var message;
			// 	message = document.getElementById("message");
			// 	message.innerHTML="WELL DONE!!! You had " + numClicks + " guesses. Click one of the buttons to start again";
			// 	message.style.visibility="visible";
			//
			// }
		}

		document.getElementById("score").innerText = numClicks;
		setTimeout("reset("+match+")", 1500);

	}


}


function reset(match) {
	for(i=0; i < 2; i++ ) {
		var img = tilesClicked[i];
		if (match) {
//			img.src="";
			img.parentElement.onclick="";
//			img.parentElement.style.backgroundColor="initial";

		} else {
			img.style.visibility="hidden";
		}

	}
	while(tilesClicked.length > 0) {
    		tilesClicked.pop();
	}

}
