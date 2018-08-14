
var main = document.querySelector('#main'); // 一个黑白图预览
var ctx = main.getContext('2d');

var particle = document.querySelector('#particle');  //  根据二维数组,生成粒子图
var pctx = particle.getContext('2d');

var photo = document.querySelector('#photo')

var step = 8; // 像素间隔,一般是2的指数倍正整数 1,2,4,8等

var img = document.getElementById("scream");
img.onload = function () {
    main.width = img.width;
    main.height = img.height;

    particle.width = img.width;
    particle.height = img.height;

    photo.width = img.width;
    photo.height = img.height;

    var arr = drawImageData();
    var draw = new Draw()
    draw.init()
    var pointCount = 0
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == 1) {
                draw.drawParticles(j * step, i * step)
                draw.drawPhotos(randomNum(1,1000), j * step, i * step)
                pointCount++
            }
        }
    }
    console.log(pointCount)
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

    // console.log(data, arr); // data 为灰度图,arr为缩略坐标的二维数组
    imagedata.data = data;
    ctx.putImageData(imagedata, 0, 0); // 生成一个预览
    return arr
}

var Draw = function () { }

Draw.prototype = {
    init: function () {
        this.color = randomColor();
    },
    drawParticles: function (px, py) {
        pctx.beginPath();
        pctx.globalAlpha = 1;
        pctx.fillStyle = this.color;
        pctx.arc(px, py, 4, 0, Math.PI * 2)// 半径是2
        pctx.fill();
    },
    drawPhotos: function (fIndex, fx, fy) {
        var imgObj = new Image();
        imgObj.src = '/assets/img/photo/f' + fIndex.toString() + '.jpg';
        console.log(imgObj.src)
        var self = this;
        //待图片加载完后，将其显示在canvas上
        imgObj.onload = function () { //onload必须使用
            var fctx = photo.getContext('2d');
            fctx.beginPath();
            fctx.globalAlpha = 1;
            fctx.fillStyle = self.color;
            fctx.drawImage(this, fx, fy, 8, 8); // 图为边长为8的正方形,图片最好走cdn,缩略处理在后端完成,
            // fctx.fillRect(fx, fy, 8, 8);
            pctx.fill();
        }

    }
}


//--------------
function randomNum(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
}
//随机颜色

function randomColor() {
    return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
}

