
function final_table() {

    // generate table
    var lasttable = document.getElementById('final_table');
    if (lasttable != null) {
        lasttable.parentNode.removeChild(lasttable);
    }

    var data = [];

    // get input
    var input_table = document.getElementById('input_table');
    var table_rows = input_table.children;
    for (var i = 0; i < table_rows.length; i++) {
        var table_cells = table_rows[i].children;
        for (var j = 0; j < table_cells.length; j++) {
            var table_cell = table_cells[j];
            var cell_data = table_cell.firstElementChild;
            data.push(cell_data);
            console.log(table_cell.firstElementChild);
        }
    }

    console.log(data);

    //generate new table
    var final_table = document.createElement('table');
    final_table.style.cssText+="background-color: white;table-layout: fixed; height:"+document.getElementById('width').value+"px; width:"+document.getElementById('height').value+"px;";
    // final_table.style.width = document.getElementById('width').value;
    // final_table.style.height = document.getElementById('height').value;
    final_table.classList.add('table');
    final_table.classList.add('table-bordered');
    final_table.id = 'final_table';
    document.getElementById('table_show').appendChild(final_table);
    final_table = document.createElement('tbody');
    document.getElementById('final_table').appendChild(final_table);
    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        // row.width = final_table.width;
        // row.style.height = final_table.style.height/3;
        final_table.appendChild(row);
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            cell.classList.add('cell');
            var fianl_cell = document.createElement('div');
            // fianl_cell.width = final_table.width/3;
            // final_cell.style.height = final_table.style.height/3;
            // fianl_cell.classList.add("final_cell");
            var imgn = document.createElement('img');
            imgn.src = data[3*i + j].children[2].children[0].src;
            var typew = document.createElement('div');
            typew.textContent = data[3*i + j].children[0].value;
            // typew.style.cssText+="vertical-align:bottom;text-align:center;"
            typew.classList.add("type");
            var wordw = document.createElement('div');
            wordw.textContent = data[3*i + j].children[1].value;
            wordw.classList.add("word");
            // wordw.style.cssText+="vertical-align:bottom;text-align:center;"
            console.log(fianl_cell);

            fianl_cell.classList.add("final_cell");

            fianl_cell.appendChild(imgn);
            cell.appendChild(fianl_cell);
            cell.appendChild(typew);
            cell.appendChild(wordw);
            
            row.appendChild(cell);
        }
    }

    

    // get picture
    // draw();

}

function draw(){

    var cont = document.getElementById('img_show_container');

    while (cont.firstChild) {
        cont.removeChild(cont.firstChild);
    }

    html2canvas(document.getElementById('final_table'), {
        onrendered: function(canvas){
            document.getElementById('img_show_container').appendChild(canvas);
        }
    });
}

function generate2() {

    var data = [];

    // get input
    var input_table = document.getElementById('input_table');
    var table_rows = input_table.children;
    for (var i = 0; i < table_rows.length; i++) {
        var table_cells = table_rows[i].children;
        for (var j = 0; j < table_cells.length; j++) {
            var table_cell = table_cells[j];
            var cell_data = table_cell.firstElementChild;
            data.push(cell_data);
            console.log(table_cell.firstElementChild);
        }
    }

    console.log(data);

    // generate table
    var lastcanvas = document.getElementById('canvas');
    if (lastcanvas != null) {
        lastcanvas.parentNode.removeChild(lastcanvas);
    }


    var canvas_container = document.getElementById("canvas_container");
    var canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.width = document.getElementById('width').value;
    canvas.style.height = document.getElementById('height').value;

    var ctx = canvas.getContext('2d');
    var oneh = canvas.style.height / 3;
    var oned = canvas.width / 3;



    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect(100, 100, 200, 200);
    ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    ctx.fillRect(150, 150, 200, 200);
    ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
    ctx.fillRect(200, 50, 200, 200);
    canvas_container.appendChild(canvas);

    // capture to image
    var final_img = document.getElementById("final_img");
    final_img.src = canvas.toDataURL("image/png");
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split('');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + '';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + '';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}


function imgPreview(fileDom) {
    //判断是否支持FileReader
    if (window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }
    //获取文件
    var file = fileDom.files[0];
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    var father = fileDom.parentNode;
    var img = father.firstElementChild;
    //读取完成
    reader.onload = function (e) {
        //获取图片dom
        // var img = document.getElementById("preview");
        //图片路径设置为读取的图片
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}