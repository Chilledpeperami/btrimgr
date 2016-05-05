"use strict";
var apiClientIds = ["82f991a3e8e7949"];
var loadingImageURI = "./img/loading.gif";

function getAlbum(albumId){}

function getApiClientId(){
    return apiClientIds[Math.floor(Math.random() / (1 / apiClientIds.length))];
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

function setupPage(){
    setupImage("./img/portrait.jpg");
}

window.onload = setupPage();