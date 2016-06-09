"use strict";
var apiClientIds = ["82f991a3e8e7949"];
var loadingImageURI = "/static/img/loading.gif";

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
        document.getElementById("leftArrowImage").src = "/static/img/leftArrowDisabled.svg";
    }else if (currentImage >= album.images.length - 1){
        document.getElementById("rightArrowImage").src = "/static/img/rightArrowDisabled.svg";
    }else{
        document.getElementById("leftArrowImage").src = "/static/img/leftArrow.svg";
        document.getElementById("rightArrowImage").src = "/static/img/rightArrow.svg";
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
            setupImage("/static/img/nsfw.svg");
        }else{
            setupImage("http://i.imgur.com/" + album.cover + "h.png");
        }
        document.getElementById("title").innerHTML = album.title + "<small><small><small><small><small><a href='http://imgur.com/a/" + album.id + "/zip'> Album zip download link.</a></small></small></small></small></small>";
        document.getElementById("description").innerHTML = SnuOwnd.getParser().render(spaceIfNull(album.description));
    }else{
        setupImage(album.images[currentImage].link);
        document.getElementById("title").innerHTML = spaceIfNull(album.images[currentImage].title);
        document.getElementById("description").innerHTML = SnuOwnd.getParser().render(spaceIfNull(album.images[currentImage].description));
    }
}

function setupImage(imageURI){
    var imageIndex = currentImage;
    document.getElementById("imageDisplay").style.display = "block";
    document.getElementById("imageDisplay").src = loadingImageURI;
    document.getElementById("imageDisplay").width = "100";
    document.getElementById("imageDisplay").height = "100";
    
    var fileExtension = imageURI.slice(imageURI.lastIndexOf("."));
    if(fileExtension == ".gif" || fileExtension == ".webm" || fileExtension == ".mp4" ||  fileExtension == ".gifv") {
        var video = document.createElement("VIDEO");
        video.setAttribute("src", imageURI.slice(0 , imageURI.lastIndexOf(".")) + ".gifv");
        video.onload = function (){
            if(imageIndex == currentImage){    
                document.getElementById("videoDisplay").src = this.src;
                document.getElementById("imageDisplay").style.display = "none";
                document.getElementById("videoDisplay").style.display = "block";
                resizeImage();
            }
        }
    }else {
        var image = document.createElement("IMG");
        image.setAttribute("src", imageURI);
        image.onload = function (){
            if(imageIndex == currentImage){    
                document.getElementById("imageDisplay").src = this.src;
                document.getElementById("imageDisplay").style.display = "block";
                document.getElementById("videoDisplay").style.display = "none";
                resizeImage();
            }
        };
    }
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
    
    var contentDisplay;
    
    if(document.getElementById("videoDisplay").style == "block"){
        contentDisplay = document.getElementById("videoDisplay");
    }else{
        contentDisplay = document.getElementById("imageDisplay");
    }
    
    var limitByWidth;
    
    //Determine by which dimension to limit the image 
    if(contentDisplay.naturalWidth > contentDisplay.naturalHeight){
        if((imageWidth) * (contentDisplay.naturalHeight/contentDisplay.naturalWidth) > imageHeight){
            limitByWidth=false;
        }else{
            limitByWidth=true;
        }
    }else{
        if((imageHeight) * (contentDisplay.naturalWidth/contentDisplay.naturalHeight) > imageWidth){
            limitByWidth=true;
        }else{
            limitByWidth=false;
        }
    }
    
    if(limitByWidth){
        contentDisplay.width = imageWidth;
        document.getElementById("imageTableData").width = imageWidth;
        contentDisplay.height = Math.floor((imageWidth) * (contentDisplay.naturalHeight/contentDisplay.naturalWidth));
    }else{
        contentDisplay.height = imageHeight;
        contentDisplay.width = Math.floor((imageHeight) * (contentDisplay.naturalWidth/contentDisplay.naturalHeight));
        document.getElementById("imageTableData").width = imageWidth;
    }
    
}

function setupPage(){
    
    if(window.location.href.indexOf("/a/") != -1 || window.location.href.indexOf("/gallery/") != -1){
        
        if(window.location.href.slice(-1) == "/"){
            var albumId = window.location.href.slice(-6,-1);
        }else{
            var albumId = window.location.href.slice(-5);
        }
        
        
        
        var albumRequest = new XMLHttpRequest();
        albumRequest.onreadystatechange = function() {
            if (albumRequest.readyState == 4 && albumRequest.status == 200) {
                album = JSON.parse(albumRequest.responseText).data;
                if(album.title){
                    document.title = album.title;
                }
                setImageIndex(1);
            }else if (albumRequest.readyState == 4 && albumRequest.status != 200) {
                document.title = "Album unavailable.";
                document.getElementById("title").innerHTML = "Album unavailable.";
                document.getElementById("imageTableData").innerHTML = " ";
            }
            //Add failed to get album.
        };
        albumRequest.open("GET", "https://api.imgur.com/3/album/" + albumId , true);
        albumRequest.setRequestHeader("Authorization", "Client-ID " + getApiClientId());
        albumRequest.send();

        document.getElementById("imageDisplay").src = loadingImageURI;
        document.getElementById("imageDisplay").width = "100";
        document.getElementById("imageDisplay").height = "100";
    }
}

function spaceIfNull(stringIn){
    if(stringIn == null){
        return " ";
    }else{
        return stringIn;
    }
}

window.load = setupPage();