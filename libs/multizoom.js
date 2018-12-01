// Nhập <script src="js.js"></script> vào cuối thẻ html để import file js
// 
//        Khai báo các biến tọa độ
var locationX, locationY, locationX1, locationY1, locationX2, locationY2;
var getLocation = [];
var getZoomImageWidth, getZoomImageHeight;
var getZoomLensWidth, getZoomLensHeight;
var getTargetImageWidth, getTargetImageHeight, getTargetImageBorderWidth;
var getBackgroundWidth, getBackgroundHeight;
var moveRight = 0;
var moveBottom = 0;
var optionY = "stick-right";
var optionX = "stick-centre";
$(document).ready(function () {
    $("body").append("<div>"
            + "<div id='zoomLens' onmousemove='showCoords(event)' style='border:'></div>"
            + "<input type='range' style='display: none' min='30' max='200' value='50' id='ratio'>"
            + "<div id='zoomImage'></div>"
            + "</div>");
    getZoomImageWidth = $("#zoomImage").width();
    getZoomImageHeight = $("#zoomImage").height();
    $(".targetImage, #zoomLens").mouseenter(function () {
        $("#zoomLens, #zoomImage").show();
        showCoords(event);
    });
    $(".targetImage, #zoomLens").mouseleave(function () {
        $("#zoomLens, #zoomImage").hide();
        $("input[type=range]").attr("min", 30);
        $("input[type=range]").attr("max", 200);
    });
    $(".targetImage").mousemove(function () {
        showCoords(event);
    });
    $("#ratio").change(function () {
        changeRatio();
    });
    $("#ratio").width(getTargetImageWidth);
//            Lăn chuột để thay đổi độ phóng to
    $("#zoomLens").bind('mousewheel', function (event) {
        if (event.originalEvent.wheelDelta >= 0) {
            $("#ratio").val($("#ratio").val() / 1 + 5);
            changeRatio();
        } else {
            $("#ratio").val($("#ratio").val() / 1 - 5);
            changeRatio();
        }
        showCoords(event);
        return false;
    });
});

function showCoords(event) {
    scrollTop = $(window).scrollTop();
    if ($(event.target).attr("class") == "targetImage") {
        target = event.target;
    }
    getTargetImageBorderWidth = parseInt($(target).css("border-width"));
    getTargetImageWidth = $(target).width();
    getTargetImageHeight = $(target).height();
    getLocation = $(target).offset();

    if ($(target).attr("settingZoomImage")) {
        option = ($(target).attr("settingZoomImage")).split(" ");
        option[1] = parseInt(option[1]);
        option[3] = parseInt(option[3]);
        locateZoomImage(target, option);
        console.log(target);
    } else {
        locateZoomImage(target, [optionY, moveRight, optionX, moveBottom]);
    }

    $("#zoomImage").css("background-image", "url(" + $(target).attr("src") + ")");
    refineRatio();
//            Tọa độ locationX locationY của main image, dùng scrollTop vì trang sẽ scroll lên xuống
    locationX = event.clientX - getLocation.left - getTargetImageBorderWidth;
    locationY = event.clientY - getLocation.top + scrollTop - getTargetImageBorderWidth;
//            Tọa độ locationX1 locationY1 của background image của zoom image
    locationX1 = ratio * locationX - (getZoomImageWidth / 2);
    locationY1 = ratio * locationY - (getZoomImageHeight / 2);
    locationX1 = limitValue(locationX1, 0, getBackgroundWidth - getZoomImageWidth);
    locationY1 = limitValue(locationY1, 0, getBackgroundHeight - getZoomImageHeight);
//            Tọa độ locationX2 locationY2 của zoom lens
    locationX2 = event.clientX - getZoomLensWidth / 2;
    locationY2 = event.clientY - getZoomLensHeight / 2;
    locationX2 = limitValue(locationX2, getLocation.left + getTargetImageBorderWidth, getTargetImageWidth - getZoomLensWidth + getLocation.left + getTargetImageBorderWidth);
    locationY2 = limitValue(locationY2, getLocation.top - scrollTop + getTargetImageBorderWidth, getTargetImageHeight - getZoomLensHeight + getLocation.top - scrollTop + getTargetImageBorderWidth);

    $("#zoomImage").css("background-position", "-" + locationX1 + "px -" + locationY1 + "px");
    $("#zoomLens").css({"top": locationY2, "left": locationX2});
}

function limitValue(check, min, max) {
    if (check > max) {
        return max;
    }
    if (check < min) {
        return min;
    }
    return check;
}

function changeRatio() {
//            Lấy giá trị ratio nhập vào input
    ratio = $("#ratio").val() / 10;
//            Setting kích thước của zoom lens
    getZoomLensBorderWidth = $("#zoomLens").css("border-width");
    getZoomLensWidth = getZoomImageWidth / ratio;
    $("#zoomLens").width(getZoomLensWidth - 2 * parseInt(getZoomLensBorderWidth));
    getZoomLensHeight = getZoomImageHeight / ratio;
    $("#zoomLens").height(getZoomLensHeight - 2 * parseInt(getZoomLensBorderWidth));
//            Setting kích thước của background image (độ phóng to hiển thị trên zoom image)
    getBackgroundWidth = getTargetImageWidth * ratio;
    getBackgroundHeight = getTargetImageHeight * ratio;
    $("#zoomImage").css("background-size", getBackgroundWidth + "px " + getBackgroundHeight + "px");
}

function refineRatio() {
    //    Điều chỉnh min và max ratio phù hợp với kích thước của zoom image 
    //    (phòng khi người dùng điều chỉnh kích thước zoom image hay target image)
    widthRatio = getZoomImageWidth / getTargetImageWidth;
    heightRatio = getZoomImageHeight / getTargetImageHeight;
    minRatio = $("#ratio").attr("min") / 10;
    maxRatio = $("#ratio").attr("max") / 10;
    if (minRatio < widthRatio) {
        minRatio = widthRatio;
    }
    if (minRatio < heightRatio) {
        minRatio = heightRatio;
    }
    $("#ratio").attr("min", minRatio * 10);
    changeRatio();
    if (maxRatio < minRatio * 2) {
        maxRatio = minRatio * 2;
        $("#ratio").attr("max", maxRatio * 10);
        changeRatio();
    }
}

function settingZoomImage(option) {
    optionY = option[0];
    moveRight = option[1];
    optionX = option[2];
    moveBottom = option[3];
}

function locateZoomImage(target, [optionY, moveRight, optionX, moveBottom]) {
    switch (optionY) {
        case "left" :
            $("#zoomImage").css("left", moveRight);
            break;
        case "right" :
            $("#zoomImage").css("left", $(window).width() - $("#zoomImage").width() - parseInt($("#zoomImage").css("border-width")) * 2 + moveRight);
            break;
        case "stick-right":
            $("#zoomImage").css("left", $(target).width() + getTargetImageBorderWidth * 2 + $(target).offset().left + moveRight);
            break;
        case "stick-left":
            $("#zoomImage").css("left", -$("#zoomImage").width() - parseInt($("#zoomImage").css("border-width")) * 2 + $(target).offset().left - moveRight);
            break;
        case "centre":
            $("#zoomImage").css("left", ($(window).width() - $("#zoomImage").width() - parseInt($("#zoomImage").css("border-width")) * 2) / 2 + moveRight);
            break;
    }
    switch (optionX) {
        case "top" :
            $("#zoomImage").css("top", moveBottom);
            break;
        case "bottom" :
            $("#zoomImage").css("top", $(window).height() - $("#zoomImage").height() - parseInt($("#zoomImage").css("border-width")) * 2 + moveBottom);
            break;
        case "stick-centre":
            $("#zoomImage").css("top", ($(target).height() - $("#zoomImage").height() + getTargetImageBorderWidth * 2 - parseInt($("#zoomImage").css("border-width")) * 2) / 2 + $(target).offset().top + moveBottom - scrollTop);
            break;
        case "centre":
            $("#zoomImage").css("top", ($(window).height() - $("#zoomImage").height() - parseInt($("#zoomImage").css("border-width")) * 2) / 2 + moveBottom);
            break;
}
}