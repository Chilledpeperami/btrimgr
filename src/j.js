"use strict";
var apiClientIds = ["82f991a3e8e7949"];
var loadingImageURI = "./img/loading.gif";

var album;
var images = [];
var currentImage = -1;

var imageWidth;
var imageHeight;

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
        document.getElementById("imageDisplay").src = this.src;
        resizeImage();
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

function resizeImage(){
    imageHeight = document.getElementById("imageHolderHeight").offsetHeight;
    imageWidth = document.getElementById("imageHolderWidth").offsetWidth;
    
    var imageDisplay = document.getElementById("imageDisplay");
    
    
    var limitByWidth;
    
    if(imageDisplay.naturalWidth > imageDisplay.naturalHeight){
        if((imageWidth) * (imageDisplay.naturalHeight/imageDisplay.naturalWidth) > imageHeight){
            limitByWidth=false;
        }else{
            limitByWidth=true;
        }
    }else{
        if((imageHeight) * (imageDisplay.naturalWidth/imageDisplay.naturalHeight) > imageWidth){
            limitByWidth=true;
        }else{
            limitByWidth=false;
        }
    }
    
    if(limitByWidth){
        imageDisplay.width = imageWidth;
        imageDisplay.height = (imageWidth) * (imageDisplay.naturalHeight/imageDisplay.naturalWidth);
    }else{
        imageDisplay.height = imageHeight;
        imageDisplay.width = (imageHeight) * (imageDisplay.naturalWidth/imageDisplay.naturalHeight);
    }
}

function setupPage(){
    var deferredAlbum = getAlbum("p0Cdu");
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