let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;


//..............👉get total.....
function getTotal() {
    //اولا التاكد من وجود منتج 
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'rgb(25, 199, 25)';
    } else {
        //افراغ الحقول
        total.innerHTML = '';
        total.style.background = 'rgb(228, 231, 28)'
    }
}
//1-..............👉Create Product......................
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product) 
} else {
    datapro = [];
}
submit.onclick = function () {
    //تجميع بيانات العنصر الواحد
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };

    
    //..............👉cleanData.........................
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <11) {
        if (mood==='create') {
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
            }
        }else{
                datapro.push(newpro);
            }
    } else {
        datapro[tmp] = newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }
    clearData();
    }
    
    //2-..............👉save in localStorage...........
    localStorage.setItem('product', JSON.stringify(datapro));
    
    showData()
};

//..............👉clear input feils..............
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

//..............👉read data......................
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < datapro.length; i++){
        table += `
         <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick = 'updateData( ${i})'>update</button></td>
            <td><button id="delete" onclick = 'deleteData( ${i})'>delete</button></td>
        </tr>
        `
    }
    // confirm.log(table)
    document.getElementById('tbody').innerHTML = table;
    //انشاء زرار الحذف عن وجود بيانات
    let btmDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btmDelete.innerHTML = `
        <button onclick = 'deleteAll()'>deleteAll (${datapro.length})</button>
        `
    } else {
        btmDelete.innerHTML = '';
    }
    
}

//..............👉delet Item..........................
function deleteData(i) {
    //arrayحذف العنصر من 
    datapro.splice(i, 1);
    //localStorage حذف العنصر من 
    localStorage.product = JSON.stringify(datapro);
    //تحديث شاشة العرض
    showData()
}

//..............👉delet All Data......................
function deleteAll() {
    localStorage.clear();
    //حذف بيانات الهاوية ايضا
    datapro.splice(0);
    //update Display again.
    showData()
}
//..............👉count of create................

//..............👉clean data.....................
//..............👉update.........................
function updateData(i) {

    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal()
    //count اخفاء زر
    count.style.display = 'none';
    //update تغير اسم الزرار الي 
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior:"smooth",
    })
    
}

// ............👉Searching.....................
let searcgMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searcgMood = 'title';
        search.placeholder='Search By Title';
    } else {
        searcgMood = 'category';
        search.placeholder='Search By Category';
    }
    search.focus()
    search.value = '';
    showData()
}
function searchData(value) {
    let table = '';
    if (searcgMood == 'title') {
        //search By title.......
        for (let i = 0; i < datapro.length; i++){
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick = 'updateData( ${i})'>update</button></td>
                        <td><button id="delete" onclick = 'deleteData( ${i})'>delete</button></td>
                    </tr>
                    `
            }
        }
    } else {
        //search By Category....
        for (let i = 0; i < datapro.length; i++){
            if (datapro[i].category.includes(value)) {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick = 'updateData( ${i})'>update</button></td>
                        <td><button id="delete" onclick = 'deleteData( ${i})'>delete</button></td>
                    </tr>
                    `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
showData()