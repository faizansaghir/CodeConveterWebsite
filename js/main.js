document.getElementById("menu-button").addEventListener('click',toggleMenu);
function toggleMenu(){
    if(document.getElementById("navbar").style.display=='block'){
        document.getElementById("navbar").style.display = 'none';
        document.getElementById("navbar-seperator").style.display = 'none';
    }
    else{
        document.getElementById("navbar").style.display = 'block';
        document.getElementById("navbar-seperator").style.display = 'block';
    }
}
window.onresize = function(){
    if(window.innerWidth<=668){
        document.getElementById("navbar").style.display = 'none';
        document.getElementById("navbar-seperator").style.display = 'none';
        document.getElementById("action-button-2").style.marginTop='10px';
        smallSetMarginActionButton();        
    }
    else{
        document.getElementById("navbar").style.display = 'block';
        document.getElementById("navbar-seperator").style.display = 'block';
        setMarginActionButton();
    }
    adjustHeightCommentArea();
}
if(window.innerWidth<=668){
    document.getElementById("action-button-2").style.marginTop='10px';
    smallSetMarginActionButton();
}
else{
    setMarginActionButton();
}

function setMarginActionButton(){
    var actionButtonHeight=document.getElementById("action-button-1").offsetHeight;
    var actionButtonWidth=document.getElementById("action-button-1").offsetWidth;
    var codeAreaHeight=document.getElementById("code-area").offsetHeight;
    var actionButtonContainerWidth=document.getElementById("action-button-container").offsetWidth;
    var leftMargin=actionButtonContainerWidth/2 - actionButtonWidth/2;
    var topMargin=codeAreaHeight/2 - actionButtonHeight/2;
    document.getElementById("action-button-1").style.marginTop=topMargin+'px';
    document.getElementById("action-button-1").style.marginLeft=leftMargin+'px';
}
function smallSetMarginActionButton(){
    var actionButtonWidth=document.getElementById("action-button-2").offsetWidth;
    var actionButtonContainerWidth=window.innerWidth;
    var leftMargin=actionButtonContainerWidth/2 - actionButtonWidth/2;
    document.getElementById("action-button-2").style.marginLeft=leftMargin+'px';
}

adjustHeightCommentArea();

function adjustHeightCommentArea(){
    var codeAreaHeight=document.getElementById("code").offsetHeight;
    document.getElementById("comment").style.height=codeAreaHeight+'px';
}

document.getElementById("action-button-1").addEventListener("click",performAction);
document.getElementById("action-button-2").addEventListener("click",performAction);

function performAction(){
    var xhr=new XMLHttpRequest();
    xhr.open('POST','https://codeconverter.herokuapp.com//getcode',true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function(){
        var comment=xhr.responseText;
        comment = comment.replace(/\n\r?/g, '<br>');
        document.getElementById("comment").innerHTML=comment;
    }
    xhr.onerror = function(){
        var comment='Sorry. We are facing some server error. Please check your code for any errors.';
        document.getElementById("comment").innerHTML=comment;
    }
    var code=document.getElementById("code").value;
    code = code.replace(/\n\r?/g, '\n');
    xhr.send("code="+code);
}

document.getElementById("comment").addEventListener('mousedown',disableSelectionOutside);
document.getElementById("comment").addEventListener('mouseup',enableSelectionOutside);

document.body.onmouseup=function(){
    document.body.style.userSelect='auto';
}

function disableSelectionOutside(){
    document.body.style.userSelect='none';
    document.getElementById("comment").style.userSelect='text';
}
function enableSelectionOutside(){
    document.body.style.userSelect='auto';
    document.getElementById("comment").style.userSelect='auto';
}

document.getElementById("reset-button").addEventListener('click',clearCodeArea);

function clearCodeArea(){
    document.getElementById('code').value='';
}

document.getElementById("copy-button-1").addEventListener('click',copyCommentArea);
document.getElementById("copy-button-2").addEventListener('click',copyCommentArea);

function copyCommentArea(){
    document.getElementById("comment").focus();
    var text= document.getElementById("comment").innerHTML;
    text = text.replaceAll('<br>', '\n');
    navigator.clipboard.writeText(text).then(function() {
        alert('Text Copied Successfully');
      }, function() {
        alert('Unable To Copy Text');
      });    
}