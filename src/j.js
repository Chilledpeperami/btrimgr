"use strict";
var apiClientIds = [putClientKeysHere];
var loadingImageURI = document.getElementById("imageDisplay").src;
var album;
var images = [];
var currentImage = -1;
var loadedImage = 0;
var currentlyLoading = false;

var imageWidth;
var imageHeight;

//Select a client ID randomly from the array.
function getApiClientId(){
    return apiClientIds[Math.floor(Math.random() / (1 / apiClientIds.length))];
}

//Set the arrow's brightness to indicated to the user if the button will do anything.
function setArrows(){
    if(currentImage == -1){
        document.getElementById("leftArrowImage").src = "data:image/svg+xml,%3Csvg fill='%23777777' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'/%3E%3Cpath d='M0-.5h24v24H0z' fill='none'/%3E%3C/svg%3E";
    }else if (currentImage >= album.images.length - 1){
        document.getElementById("rightArrowImage").src = "data:image/svg+xml,%3Csvg fill='%23777777' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'/%3E%3Cpath d='M0-.25h24v24H0z' fill='none'/%3E%3C/svg%3E%0A";
    }else{
        document.getElementById("leftArrowImage").src = "data:image/svg+xml,%3Csvg fill='%23ffffff' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'/%3E%3Cpath d='M0-.5h24v24H0z' fill='none'/%3E%3C/svg%3E";
        document.getElementById("rightArrowImage").src = "data:image/svg+xml,%3Csvg fill='%23ffffff' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'/%3E%3Cpath d='M0-.25h24v24H0z' fill='none'/%3E%3C/svg%3E";
    }
}

//The function to change the current image being display. This function takes 0 to move backward, 1 to stay at the same image, 2 to move forward.
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

//Set the dressing around the page to match the particular image, or cover and calls setupImage with the URL to specifically setup the image.
function presentImage(){
    if(currentImage == -1){
        //Sets cover image, album title and album description.
        if(false){
            setupImage("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='1600' height='1000' viewBox='0 0 1600 1000' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='nsfw.svg'%3E%3Cdefs id='defs4' /%3E%3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='0.35' inkscape:cx='1045.5106' inkscape:cy='520' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='1920' inkscape:window-height='1012' inkscape:window-x='0' inkscape:window-y='32' inkscape:window-maximized='1' /%3E%3Cmetadata id='metadata7'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-52.362161)'%3E%3Ctext xml:space='preserve' style='font-style:normal;font-weight:normal;font-size:40px;line-height:127.99999714%25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:%23ff0000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;' x='46.704102' y='734.36902' id='text3344' sodipodi:linespacing='128%25'%3E%3Ctspan sodipodi:role='line' id='tspan3346' x='46.704102' y='734.36902' style='font-size:500px;line-height:127.99999714%25;fill:%23ff0000;fill-opacity:1;'%3ENSFW%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E");
        }else{
            setupImage("https://i.imgur.com/" + album.cover + "h.png");
        }
        document.getElementById("title").innerHTML = spaceIfNull(album.title) + "<small><small><small><small><small><a href='https://imgur.com/a/" + album.id + "/zip'> Album zip download link.</a></small></small></small></small></small>";
        document.getElementById("description").innerHTML = marked(album.description);
    }else{
        //Sets appropriate image, image title and image description.
        setupImage(album.images[currentImage].link);
        document.getElementById("title").innerHTML = spaceIfNull(album.images[currentImage].title);
        document.getElementById("description").innerHTML = marked(album.images[currentImage].description);
    }
}

//Displays the image needed, with loading and proper scaling.
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


//Starts loading the next 5 images of an album succesively for better user experience.
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

//Listens for keyboard events, and call setImageIndex to move the album appropriately.
function manageKeyEvent(eventIn){
    if(eventIn.keyCode == 37){
        //Do stuff when left key is pressed.
        setImageIndex(0);
    }else if(eventIn.keyCode == 39){
        //Do stuff when right key is pressed.
        setImageIndex(2);
    }
    
}

//Looks at the area available to display the image and sizes the image to fit.
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

//Called when the page is loaded for initial setup.
function setupPage(){
    
    //Remove any hashes in the URL.
    if(window.location.href.includes("#")){
        location.replace(document.location.href.replace(location.hash , "" )); 
    }
    
    //Do different stuff for gallery
    if(window.location.href.includes("/a/") || window.location.href.includes("/gallery/")){
        
        if(window.location.href.includes("/gallery/")){
            var albumId = window.location.href.slice(window.location.href.indexOf("/gallery/") + 9);
            var requestUrl = "https://api.imgur.com/3/gallery/";
            var errorMessage = "Gallery unavailable.";
        }else{
            var albumId = window.location.href.slice(window.location.href.indexOf("/a/") + 3);
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

window.load = setupPage();
