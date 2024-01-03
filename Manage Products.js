
let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let mood='create';
let tmp;

console.log(title,price,taxes,ads,discount,total,count,category,submit)
// get total
function getTotal(){
if (price.value !=''){
    let result=(+price.value+ +taxes.value+ +ads.value)-+discount.value;
    total.innerHTML=result;
    total.style.background='#040'
}else{
    total.style.background='#01447a';
}
}
//create product 

let datapro;
if (localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)

}
else{
 datapro=[];//array

}


submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !=''&& price.value !='' && category.value !='')
    if (mood==="create"){
    if (newpro.count>1) {         /// add many item
for (let i=0 ;i<newpro.count;i++){
    datapro.push(newpro);
}
    }
else {
    datapro.push(newpro);
}

} else{
 clearData()///////////

datapro[ tmp ]=newpro;
mood='creat';
submit.innerHTML='Create'
count.style.display='block'

}

  
    localStorage.setItem('product',JSON.stringify(datapro)   )  //save data in localstorage
    console.log(datapro)
showData()/////////////
}


// clear inputs مسح المدخلات الموجوده بالصفحه فقط بعد اضافتها فى الذاكره
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
total.innerHTML='';
count.value='';
discount.value='';
category.value='';
}
//read عرض المدخلات بعد حفظها بالذاكره

function showData()
{
    getTotal()
let table='';
for(let i=0 ; i<datapro.length;i++){
    table +=`<tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button> </td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
    </tr>
    
    
    `;

}


document.getElementById('tbody').innerHTML=table;
let btndelete=document.getElementById('deleteall');
if(datapro.length>0){
btndelete.innerHTML=`

<button onclick='deleteall()'>delete all(${datapro.length})</button>

`
}
else{
    btndelete.innerHTML=''
}
}
showData()

//delete حذف عنصر من البيانات المدخله من خلال الضغط على زر



function deletedata(i)
{
    datapro.splice(i,1) //// delet item
    localStorage.product=JSON.stringify(datapro); 

    showData() /////////////////important

}

function deleteall(){   /////////////////delete all data
localStorage.clear()
datapro.splice(0)
showData()
}


//count



//update التعديل فى العنصر




function updatedata(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
taxes.value=datapro[i].taxes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
category.value=datapro[i].category;
getTotal()
count.style.display='none'
submit.innerHTML='update'
mood='update';
tmp=i;
scroll({top:0,
behavior:"smooth"})
}



//search

let searchmood='title';
function getsearchmood(id)
{
let search=document.getElementById("search");
if(id=='searchTitle'){
searchmood='title';
search.Placeholder='search by title';
}else{
    searchmood='category';
    search.Placeholder='search by category';

}
search.focus()
search.value='';
showData()
}
function searchdata(value){
    let table='';
    if (searchmood=='title')
    {
            for (let i=0 ; i<datapro.length;i++){
                if(datapro[i].title.includes(value.toLowerCase())){
                    table +=`<tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button> </td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
                    </tr>
                    
                    
                    `;
                }
            }

    }else{
        for (let i=0 ; i<datapro.length;i++){
            if(datapro[i].category.includes(value)){
                table +=`<tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button> </td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
                </tr>
                
                
                `;
            }
        }

    }
    document.getElementById('tbody').innerHTML=table;



}
// clean data

