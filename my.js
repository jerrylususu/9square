
function final_table() {

    // generate table
    var lasttable = document.getElementById('nine-by-nine');
    if (lasttable != null) {
        lasttable.parentNode.removeChild(lasttable);
    }

    var data = [];

    var color = ["#fdfdfd","#c2c2c2","#9444bc","#c27c32","#6ca65c","#d3de9a","#9f9c9d","#4259a7","#c11417"];

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

    var table_width = document.getElementById('width').value;
    var table_height = document.getElementById('height').value;
    var cell_width = table_width/3;
    var cell_height = table_height/3;
    var img_height = cell_height*0.7*0.9;
    var img_width = cell_width*0.9;
    var type_size = document.getElementById('size1').value;
    var word_size = document.getElementById('size2').value;


    //generate new table
    var final_table = document.createElement('table');
    final_table.style.cssText+="background-color: black;table-layout: fixed; height:"+table_width+"px; width:"+table_height+"px;";
    final_table.classList.add('table');
    final_table.classList.add('table-bordered');
    final_table.id = 'nine-by-nine';
    document.getElementById('table_show').appendChild(final_table);
    var final_table_c = final_table;

    final_table = document.createElement('tbody');
    final_table_c.appendChild(final_table);

    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        final_table.appendChild(row);
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            cell.classList.add('cell');
            row.appendChild(cell);

            var cell_table = document.createElement('table');
            cell.appendChild(cell_table);
            var cell_tbody = document.createElement('tbody');
            cell_table.appendChild(cell_tbody);
            var cell_tr_img = document.createElement('tr');
            cell_tr_img.classList.add('cell-img');
            cell_tr_img.style.cssText+="border: 1px solid "+color[3*i+j]+";";
            var cell_tr_text = document.createElement('tr');
            cell_tbody.appendChild(cell_tr_img);
            cell_tbody.appendChild(cell_tr_text);
            var cell_tr_img_td = document.createElement('td');
            var cell_tr_text_td = document.createElement('td');
            cell_tr_text_td.classList.add("text");
            cell_tr_img.appendChild(cell_tr_img_td);
            cell_tr_text.appendChild(cell_tr_text_td);

            var imgn = document.createElement('img');
            var srcimg = data[3*i + j].children[2].children[0];
            imgn.src = srcimg.src;
            imgn.classList.add("center-block");
            imgn.classList.add("img-repsonsive");
            var img_new_height=0;
            var img_new_width=0;

                if(srcimg.height/img_height>srcimg.width/img_width){
                    imgn.style.cssText+="height: "+img_height+"px;"
                    imgn.style.cssText+="width: "+srcimg.width * img_height / srcimg.height +"px;"
                } else {
                    imgn.style.cssText+="width: "+img_width+"px;"
                    imgn.style.cssText+="height: "+srcimg.height * img_width / srcimg.width +"px;"
                }
            
            
            cell_tr_img_td.appendChild(imgn);

            var typew = document.createElement('div');
            typew.textContent = data[3*i + j].children[0].value;
            typew.classList.add("type");
            typew.style.cssText+="font-size: "+type_size+"px;";
            cell_tr_text_td.appendChild(typew);

            var wordw = document.createElement('div');
            wordw.textContent = data[3*i + j].children[1].value;
            wordw.classList.add("word");
            wordw.style.cssText+="font-size: "+word_size+"px;";
            cell_tr_text_td.appendChild(wordw);
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

    html2canvas(document.getElementById('nine-by-nine'), {
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
    img.style.cssText="display: none;"
}