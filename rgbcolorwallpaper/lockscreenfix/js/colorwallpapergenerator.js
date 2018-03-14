/*************************************************************************
    RGB Color Wallpaper - Lock Screen Fix
    Copyright (C) 2017 Tecdrop. All Rights Reserved.
    http://www.tecdrop.com

    ColorWallpaperGenerator
    Provides a method to create and download a color wallpaper image file.
*************************************************************************/

ColorWallpaperGenerator = (function () {
    "use strict";
    
    /**
     * Creates the color wallpaper in memory, using a HTML5 canvas element.
     *
     * @param {number} width - The width of the wallpaper image.
     * @param {number} height - The height of the wallpaper image.
     * @param {string} colorhex - The hexadecimal color code.
     * @param {Object} $canvas - The canvas element used to generate the color wallpaper.
     * @return {string} The data URL of the wallpaper image that was created.
     */
    function createWallpaper(width, height, colorhex, $canvas) {
        // Resize the canvas to the values requested by the user
        $canvas.attr("width", width).attr("height", height);

        var dataURL = null,
            context = $canvas[0].getContext("2d");
        
        if (context) {
            // Clear the canvas (get rid of previous colors)
            context.clearRect(0, 0, width, height);
            
            // Fill the canvas with the color argument
            context.fillStyle = "#" + colorhex;
            context.fillRect(0, 0, width, height);
            
            // Convert the canvas to a data URL
            dataURL = $canvas[0].toDataURL();
        }
        
        return dataURL;
    }
    
    /**
     * Creates and downloads a color wallpaper image file.
     *
     * @public
     * @param {number} width - The width of the color wallpaper.
     * @param {number} height - The height of the color wallpaper.
     * @param {string} colorhex - The hexadecimal color code.
     * @param {Object} $canvas - The canvas element used to generate the color wallpaper.
     * @param {Object} $downloadLink - The download link element used to download the image.
     * @param {string} downloadWindow - The HTML contents of the download window.
     */
    function downloadWallpaper(width, height, colorhex, $canvas, $downloadLink, downloadWindow) {
        var dataURL, fileName;
        
        // Create the color wallpaper using HTML5 Canvas
        dataURL = createWallpaper(width, height, colorhex, $canvas);
        
        // Assemble the file name
        fileName = "color-wallpaper-" + colorhex + ".png";

        // Download the color wallpaper directly (if supported by the browser)
        if ("download" in $downloadLink[0]) {
            $downloadLink.attr("download", fileName).attr("href", dataURL);
            $downloadLink[0].click();        
        } else {
            // If not supported, open the color wallpaper in a new window
            var newWindow = window.open();
            newWindow.document.write(downloadWindow.replace("{dataURL}", dataURL));
        }        
    }
    
    /* Public Method(s) */
    return {
        downloadWallpaper: downloadWallpaper
    };
    
}());