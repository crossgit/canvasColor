
var main = document.querySelector('#main');
var ctx = main.getContext('2d');
var step = 8; // 像素间隔,一般是2的指数倍正整数 1,2,4,8等

var img = document.getElementById("scream");
img.onload = function () {
    main.width = img.width;
    main.height = img.height;
    drawImageData();
}

function drawImageData() {
    var image = img;
    ctx.drawImage(image, 0, 0);
    var imagedata = ctx.getImageData(0, 0, image.width, image.height);

    var data = imagedata.data;
    var dataWidth = imagedata.width;
    var dataHeight = imagedata.height;

    // debugger;
    var j, i, len, red, green, blue, alpha, average;

    var arr = [];  //存放坐标的二维数组,如果只是需要图片的灰色图,arr相关可以删除.
    for (i = 0, len = data.length; i < len; i += 4) {
        if (i % (step * 4) == 0) {
            var _rowNum = Math.floor(i / 4 / dataWidth) // 行数
            if (_rowNum % step == 0) {
                red = data[i];
                green = data[i + 1];
                blue = data[i + 2];
                alpha = data[i + 3];
                average = Math.floor((red + green + blue) / 3);

                average = average < 150 ? 0 : 255; // 小于150的将定位黑色
                // 数组
                var arrValue = average == 0 ? 1 : 0;
                var rnum = _rowNum / step;
                if (Object.prototype.toString.call(arr[rnum]) != '[object Array]') {
                    arr[rnum] = new Array();
                }
                arr[rnum].push(arrValue)
            } else {
                average = 255;
            }

        } else {
            average = 255;
        }

        data[i] = average;
        data[i + 1] = average;
        data[i + 2] = average;
    }

    console.log(data, arr); // data 为灰度图,arr为缩略坐标的二维数组
    imagedata.data = data;
    ctx.putImageData(imagedata, 0, 0); // 生成一个预览
} 