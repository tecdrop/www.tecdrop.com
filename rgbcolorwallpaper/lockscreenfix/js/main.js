/*************************************************************************
    RGB Color Wallpaper - Lock Screen Fix
    Copyright (C) 2017 Tecdrop. All Rights Reserved.
    http://www.tecdrop.com

    Main JavaScript file
*************************************************************************/

/* global $, ColorWallpaperGenerator*/
$( document ).ready(function() {
    var width, height, color;
    
    /**
     * Gets individual parameter values from the query string.
     * https://davidwalsh.name/query-string-javascript
     */
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Get the required parameters from the query string: width, height, and hexadecimal color code
    width = getUrlParameter("width") || 2160;
    height = getUrlParameter("height") || 1920;
    color = getUrlParameter("color") || "000000"

    $("#color-sample").css("background-color", "#" + color);
    $("#wallpaper-info").text("Width: " + width + ", Height: " + height + ", Color: " + color);

    // Assign the functionality of the click event of the download button
    $("#download-button").click(function () {

        if ($.isNumeric(width) && $.isNumeric(height)) {

            // Create and download the color wallpaper
            ColorWallpaperGenerator.downloadWallpaper(
                width,
                height,
                color,
                $("#color-canvas"),
                $("#download-link"),
                $("#download-window").html()
            );
        }
    }); 
});