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
        document.getElementById("videoDisplay").width = 300;
        document.getElementById("videoDisplay").src = imageURI.slice(0 , imageURI.lastIndexOf(".")) + ".mp4";
        document.getElementById("imageDisplay").style.display = "none";
        document.getElementById("videoDisplay").style.display = "block";
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
    if(loadedImage < album.images_count && loadedImage < (currentImage + 5)){
        if(album.images[loadedImage].link.slice(album.images[loadedImage].link.lastIndexOf(".")) == ".gif"){
            loadedImage = loadedImage + 1;
            aggressiveLoading();
        }else if(currentlyLoading == false){
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
    
    if(document.getElementById("videoDisplay").style.display == "block"){
        contentDisplay = document.getElementById("videoDisplay");
    }else{
        contentDisplay = document.getElementById("imageDisplay");
    }
    
    var limitByWidth;
    
    //Determine by which dimension to limit the image 
    if(getWidth(contentDisplay) > getHeight(contentDisplay)){
        limitByWidth = (!((imageWidth) * (getHeight(contentDisplay)/getWidth(contentDisplay)) > imageHeight));
    }else{
        limitByWidth = ((imageHeight) * (getWidth(contentDisplay)/getHeight(contentDisplay)) > imageWidth);
    }
    

    if(limitByWidth){
        contentDisplay.width = imageWidth;
        document.getElementById("imageTableData").width = imageWidth;
        contentDisplay.height = Math.floor((imageWidth) * (getHeight(contentDisplay)/getWidth(contentDisplay)));
    }else{
        contentDisplay.height = imageHeight;
        contentDisplay.width = Math.floor((imageHeight) * (getWidth(contentDisplay)/getHeight(contentDisplay)));
        document.getElementById("imageTableData").width = imageWidth;
    }
    
}

function setupPage(){
    
    //Do different stuff for gallery
    if(window.location.href.indexOf("/a/") != -1 || window.location.href.indexOf("/gallery/") != -1){
        
        //Update code as there might be stuff after the album/gallery id.
        if(window.location.href.slice(-1) == "/"){
            var albumId = window.location.href.slice(-6,-1);
        }else{
            var albumId = window.location.href.slice(-5);
        }
        
        if(window.location.href.indexOf("/gallery/") != -1){
           var requestUrl = "http://api.imgur.com/3/gallery/album/";
           var errorMessage = "Gallery unavailable.";
        }else{
           var requestUrl = "https://api.imgur.com/3/album/";
           var errorMessage = "Album unavailable.";
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
                document.title = errorMessage;
                document.getElementById("title").innerHTML = errorMessage;
                document.getElementById("imageTableData").innerHTML = " ";
            }
        };
        albumRequest.open("GET", requestUrl + albumId , true);
        albumRequest.setRequestHeader("Authorization", "Client-ID " + getApiClientId());
        albumRequest.send();

        document.getElementById("imageDisplay").src = loadingImageURI;
        document.getElementById("imageDisplay").width = "100";
        document.getElementById("imageDisplay").height = "100";
    }else{
        document.getElementById("albumViewer").style.display = "none";
        document.getElementById("homePage").style.display = "block";
        document.getElementById("baseTag").target = "_self";
    }
}

function spaceIfNull(stringIn){
    if(stringIn == null){
        return " ";
    }else{
        return stringIn;
    }
}

//Function to get the natural width of video or picture.
function getWidth(contentIn){
    if(contentIn.videoWidth){
        return contentIn.videoWidth;
    }else{
        return contentIn.naturalWidth;
    }
}

//Function to get the natural height of video or picture.
function getHeight(contentIn){
    if(contentIn.videoHeight){
        return contentIn.videoHeight;
    }else{
        return contentIn.naturalHeight;
    }
}

window.load = setupPage();