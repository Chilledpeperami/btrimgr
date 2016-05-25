"use strict";
var apiClientIds = ["82f991a3e8e7949"];
var loadingImageURI = "./img/loading.gif";

var album;
var images = [];
var currentImage = -1;
var loadedImage = 0;
var currentlyLoading = false;

var imageWidth;
var imageHeight;

function getApiClientId(){
    return apiClientIds[Math.floor(Math.random() / (1 / apiClientIds.length))];
}

function setArrows(){
    if(currentImage == -1){
        document.getElementById("leftArrowImage").src = "./img/leftArrowDisabled.svg";
    }else if (currentImage >= album.images.length - 1){
        document.getElementById("rightArrowImage").src = "./img/rightArrowDisabled.svg";
    }else{
        document.getElementById("leftArrowImage").src = "./img/leftArrow.svg";
        document.getElementById("rightArrowImage").src = "./img/rightArrow.svg";
    }
}

function setImageIndex(direction){
    if(direction == 0){
        if(currentImage <= -1){
            return;
        }else{
            currentImage -= 1;
        }
    }else if(direction == 1){
        
    }else if(direction == 2){
        if(currentImage >= album.images.length - 1){
            return;
        }else{
            currentImage += 1;
        }
    }
    
    setArrows();
    aggressiveLoading();
    presentImage();
}

function presentImage(){
    if(currentImage == -1){
        if(album.nsfw){
            setupImage("./img/nsfw.svg");
        }else{
            setupImage("http://i.imgur.com/" + album.cover + "h.png");
        }
        document.getElementById("title").innerHTML = album.title;
        document.getElementById("description").innerHTML = SnuOwnd.getParser().render(album.images[currentImage].description);
    }else{
        setupImage(album.images[currentImage].link);
        document.getElementById("title").innerHTML = album.images[currentImage].title;
        document.getElementById("description").innerHTML = SnuOwnd.getParser().render(album.images[currentImage].description);
    }
}

function setupImage(imageURI){
    var imageIndex = currentImage;
    document.getElementById("imageDisplay").src = loadingImageURI;
    document.getElementById("imageDisplay").width = "100";
    document.getElementById("imageDisplay").height = "100";
    
    var image = document.createElement("IMG");
    image.setAttribute("src", imageURI);
    image.onload = function (){
        if(imageIndex == currentImage){    
            document.getElementById("imageDisplay").src = this.src;
            resizeImage();
        }
    };
}

function aggressiveLoading(){
    if(loadedImage < album.images_count && loadedImage < (currentImage + 5) && (currentlyLoading == false)){
        currentlyLoading = true;
        var image = document.createElement("IMG");
        image.setAttribute("src", album.images[loadedImage].link);
        image.onload = function(){
            currentlyLoading = false;
            aggressiveLoading();
        };
        loadedImage = loadedImage + 1;
    }
}

function manageKeyEvent(eventIn){
    if(eventIn.keyCode == 37){
        //Do stuff when left key is pressed.
        setImageIndex(0);
    }else if(eventIn.keyCode == 39){
        //Do stuff when right key is pressed.
        setImageIndex(2);
    }
    
}

function resizeImage(){
    imageHeight = document.getElementById("imageHolderHeight").offsetHeight;
    imageWidth = document.getElementById("imageHolderWidth").offsetWidth;
    
    var imageDisplay = document.getElementById("imageDisplay");
    
    var limitByWidth;
    
    //Determine by which dimension to limit the image 
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
        document.getElementById("imageTableData").width = imageWidth;
        imageDisplay.height = Math.floor((imageWidth) * (imageDisplay.naturalHeight/imageDisplay.naturalWidth));
    }else{
        imageDisplay.height = imageHeight;
        imageDisplay.width = Math.floor((imageHeight) * (imageDisplay.naturalWidth/imageDisplay.naturalHeight));
        document.getElementById("imageTableData").width = imageWidth;
    }
}

function setupPage(){
    
    var albumRequest = new XMLHttpRequest();
    albumRequest.onreadystatechange = function() {
        if (albumRequest.readyState == 4 && albumRequest.status == 200) {
            album = JSON.parse(albumRequest.responseText).data;
            if(album.title){
                document.title = album.title;
            }
            setImageIndex(1);
        }
        //Add failed to get album.
    };
    albumRequest.open("GET", "https://api.imgur.com/3/album/" + "c2SD4", true);
    albumRequest.setRequestHeader("Authorization", "Client-ID " + getApiClientId());
    albumRequest.send();
    
    document.getElementById("imageDisplay").src = loadingImageURI;
    document.getElementById("imageDisplay").width = "100";
    document.getElementById("imageDisplay").height = "100";
}

window.load = setupPage();