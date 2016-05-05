"use strict";
var apiClientIds = ["82f991a3e8e7949"];

function getAlbum(var albumId){
}

function getApiClientId(){
    return apiClientIds[Math.floor(Math.random() / (1 / apiClientIds.length))];
}

function setupPage(){}

window.onload = setupPage();