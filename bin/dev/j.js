"use strict";
var apiClientIds = ["82f991a3e8e7949"];
var loadingImageURI = "./img/loading.gif";

var album = {
    title: "My FreeNAS server, Zippy.",
    description: "This is the description of the album.",
    images:[
        {
            title: "Cables",
            description: "This is the desctption for the cables",
            link: "./img/1573.png"
        },
        {
            title: "Hard-Drives",
            description: "This is the description for the hard-drives.",
            link: "./img/panorama.jpg"
        }
        
    ]
};

var images = [document.createElement("IMG")];

//Performs ajax to get album
function getAlbum(albumId){}

function getApiClientId(){
    return apiClientIds[Math.floor(Math.random() / (1 / apiClientIds.length))];
}

function presentImage(direction){
    if(direction == 0){
        //Load previous image.
        console.log("Presenting previous image."); 
    }else if(direction == 1){
        //Load next image.
        console.log("Presenting next image.");   
    }
}

function setupImage(imageURI){
    document.getElementById("imageDisplay").src = loadingImageURI;
    document.getElementById("imageDisplay").width = "100";
    document.getElementById("imageDisplay").height = "100";
    
    var image = document.createElement("IMG");
    image.setAttribute("src", imageURI);
    image.onload = function (){
        if(this.naturalWidth > this.naturalHeight){
            document.getElementById("imageDisplay").width = document.getElementById("imageHolderWidth").offsetWidth;
            document.getElementById("imageDisplay").style.height = "auto";
        }else{
            document.getElementById("imageDisplay").height = document.getElementById("imageHolderHeight").offsetHeight;
            document.getElementById("imageDisplay").style.width = "auto";
        }
        document.getElementById("imageDisplay").src = this.src;
    };
}

function manageKeyEvent(eventIn){
    if(eventIn.keyCode == 37){
        //Do stuff when left key is pressed.
        presentImage(0);
    }else if(eventIn.keyCode == 39){
        //Do stuff when right key is pressed.
        presentImage(1);
    }
    
}

function setupPage(){
    setupImage("./img/portrait.jpg");
}

window.onload = setupPage();