"use strict";
var apiClientIds = ["82f991a3e8e7949"];
var loadingImageURI = "./img/loading.gif";

var album;
var images = [];
var currentImage = -1;

//Performs ajax to get album
function getAlbum(albumId){
    return $.ajax(
        "https://api.imgur.com/3/album/" + albumId,
        {
            accepts:"application/json",
            crossDomain: true,
            method: "GET",
            headers:{
                Authorization: "Client-ID " + getApiClientId()
            }
        }
    );
}

function getApiClientId(){
    return apiClientIds[Math.floor(Math.random() / (1 / apiClientIds.length))];
}

function setImageIndex(direction){
    if(direction == 0){
        if(currentImage <= -1){
            return;
        }else{
            currentImage -= 1;
        }
    }else if(direction == 1){
        if(currentImage >= album.images.length){
            return;
        }else{
            currentImage += 1;
        }
    }
    presentImage();
}

function presentImage(){
    if(currentImage == -1){
        
    }else{
        setupImage(album.images[currentImage].link);
        document.getElementById("imageTitle").innerHTML =   album.images[currentImage].title;
        document.getElementById("description").innerHTML =   album.images[currentImage].description;
        
        document.getElementById("albumTitle").display = "none";
        document.getElementById("imageTitle").display = "block";
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
        setImageIndex(0);
    }else if(eventIn.keyCode == 39){
        //Do stuff when right key is pressed.
        setImageIndex(1);
    }
    
}

function setupPage(){
    var deferredAlbum = getAlbum("RaZPU");
    deferredAlbum.done(function(receivedAlbum){
        album = receivedAlbum.data;
        
        document.getElementById("albumTitle").innerHTML = album.title;
        setupImage("http://i.imgur.com/" + album.cover + "h.png");
    });
    deferredAlbum.fail(function(){
        
    });
    
    document.getElementById("imageDisplay").src = loadingImageURI;
    document.getElementById("imageDisplay").width = "100";
    document.getElementById("imageDisplay").height = "100";
}

window.load = setupPage();