window.onload = function () {
    document.getElementById('content').style.display = 'none';
    browser.runtime.sendMessage({ type: "stat" }, function (response) {
        // console.log(response)
        document.getElementById("chk").checked = !response.isDisabled;

        var button = document.getElementById('clear');

        button.addEventListener('click', function (e) {
            browser.runtime.sendMessage({ type: "clear" });
            window.close();
        });

        /*
        document.getElementById('format').addEventListener('click', function () {
            alert("Please select desired format in web player")
        });
         */
        
        if (response.list.length > 0) {
            document.getElementById('content').style.display = 'block';
            //return;
        }

        renderList(response.list);

    });

    document.getElementById("chk").addEventListener('click', function () {
        browser.runtime.sendMessage({ type: "cmd", disable: !this.checked });
        window.close();
    });
};

function toUTF8(str) {
    var text = "";
    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
        text += String.fromCharCode(arr[i]);
    }
    return text;
}

function renderList(arr) {

    var table = document.getElementById("table");

    // console.log("total element: "+arr.length);

    for (var i = 0; i < arr.length; i++) {
        var listItem = arr[i];

        var text = toUTF8(listItem.text);

        var info = listItem.info;
        var id = listItem.id;

        var row = table.insertRow(0);
        var cell = row.insertCell(0);

        cell.setAttribute("class","card");


        var div = document.createElement('div');
        div.setAttribute("class", "card-body")
        div.setAttribute("style", "padding: 10px; display: flex; flex-direction: column;");

        var p1 = document.createElement('span');
        p1.setAttribute("style", "font-family:helvetica,arial,courier; font-size: 14px;");
        var node = document.createTextNode(text);
        p1.appendChild(node);

        var p2 = document.createElement('span');
        p2.id=listItem.id;
        p2.setAttribute("style", "font-family:helvetica,arial,courier; font-size: 12px; margin-top: 5px; cursor: pointer;");
        p2.setAttribute("class", "badge badge-dark")
        p2.addEventListener('click', function (e) {
           downloadNow(e)
        });
        node = document.createTextNode(info);
        p2.appendChild(node);

        div.appendChild(p1);
        div.appendChild(p2);

        cell.appendChild(div);
    }
}

function downloadNow(e){
    //alert("Sending message for download - id: "+e.target.id+ "target: "+e.target);
    browser.runtime.sendMessage({ type: "vid", itemId: e.target.id });
    window.close();
}


