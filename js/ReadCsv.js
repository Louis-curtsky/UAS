window.onload=function()
{ 
    with (new XMLHttpRequest()) {
    onreadystatechange=cb; 
    open('GET','../data/Parts.csv',true); 
    responseType='text';send();
  }}

function cb()
{
    if(this.readyState===4)
    document.getElementById('main').innerHTML=tbl(this.responseText); 
}

function tbl(csv)
{ // do whatever is necessary to create your table here ...
   return csv.split('\n').map(
    function(tr,i){
        return '<tr><td>'
            +tr.replace(/\t/g,'</td><td>')
            +'</td></tr>';})
             .join('\n'); 
}
  