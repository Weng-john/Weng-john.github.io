var send=0;
var profile="";
function register(){
    location.href= "/register.html";
}

function check(status){
    if(status){
        document.getElementById("IDnumber").type= "text";
    }
    else{
        document.getElementById("IDnumber").type= "password";
    }
}

function confirm(){
    var name= document.getElementById("name").value;
    var IDnumber= document.getElementById("IDnumber").value;
    
    if(name=="" ){
        alert("請輸入學號");
    }
    else if( IDnumber==""){
        alert("請輸入身份證字號");
    }
    else{
        if(IDnumber[0]<'A' || IDnumber[0]>'z'){
            alert("身分證字號輸入錯誤!!!");
            document.getElementById("IDnumber").value="";
        }
        else if(IDnumber[0]>'Z'){
            IDnumber[0] -= 'a';
            IDnumber[0] += 'A';
            Send(name, IDnumber);
        }
        else{
            Send(name, IDnumber);
        }
    }
}

function Send(name, IDnumber){
    var Url=["https://script.google.com/macros/s/AKfycbxzPg5Z5FuVDCKlR1ubd1bTw8xW9qsWMOWkC2coDQMZl9uzbOE/exec",""];
    $.ajax({
        type:'get',
        cache: false,
        timeout: 8000,
        url: Url[send%2],
        data:  {
            'name' : name,
            'idnumber': IDnumber
        },
        datatype:'json',
        success: function(respond){
            if(respond=="fail"){
                alert("您的資料不存在於資料庫\n請先註冊帳戶後再登入");
                location.href="/register.html";
            }
            else{
                profile= respond.split(",");
                location.href="/";
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
                send++;
        }
    });
}