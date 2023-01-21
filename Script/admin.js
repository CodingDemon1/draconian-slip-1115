let container = document.querySelector(".container");
let ordered = JSON.parse(localStorage.getItem("apnaFashionOrdered")) || [];
let loginForm = document.querySelector(".loginForm")
let form = document.querySelector(".login")

let products = JSON.parse(localStorage.getItem("products")) || []

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(form[0].value === 'admin' && form[1].value === 'admin'){
        alert("Login Success")
        container.style.display = "block"
        loginForm.style.display = "none"
    }else{
        alert("Wrong Credentials")
    }
})

let addProduct = document.getElementById("addProduct");
let addProductsBtn = document.getElementById("addProductsBtn")
addProductsBtn.addEventListener("click",()=>{
    // console.log("clicked");
    addProduct.style.display = "flex";
    displayProduct.style.display = "none"
    trackTable.style.display = "none"
})


// let addProductButton = document.querySelector("#addbtn")
addProduct.addEventListener("submit",(e)=>{
    e.preventDefault();
    // console.log("clicked");
    
    let newProduct = {
        title : addProduct[0].value,
        id : addProduct[1].value,
        rating : addProduct[2].value,
        price : addProduct[3].value,
        category : addProduct[4].value,
        image : "dummyImage.jpg"
    }
    console.log(products);
    products.push(newProduct);

    localStorage.setItem("products",JSON.stringify(products))
    alert("Product Added")
})

//let show all products
let showProducts = document.getElementById("showProducts");
let displayProduct = document.querySelector(".displayProduct")
showProducts.addEventListener("click",()=>{
    addProduct.style.display = "none";
    displayProduct.style.display = "grid"
    trackTable.style.display = "none"

    displayAllProduct(products)
})

function displayAllProduct(data){
    displayProduct.innerHTML = ""
    data.forEach((element,index) => {
        let card = document.createElement("div");
        card.className="card"
            let img = document.createElement("img")
                img.src = element.image;

            let title = document.createElement("p");
            title.textContent = element.title;

            let price = document.createElement("p")
            price.textContent = `$ ${element.price}`
            card.append(img,title,price)
        displayProduct.append(card);
    });
}


//tackOrder

let trackOrderBtn = document.getElementById("trackOrder")
let trackTable = document.querySelector(".trackTable")
let orderedList = document.getElementById("orderedList")
trackOrderBtn.addEventListener("click",()=>{
    addProduct.style.display = "none";
    displayProduct.style.display = "none"
    trackTable.style.display = "block"

    ordered.forEach((ele) => {
        let tr = document.createElement('tr')
            let fname = document.createElement("td")
            fname.textContent = ele.fullName;

            let fAdd = document.createElement('td');
            fAdd.textContent = ele.fullAdd;

            let cPhone= document.createElement("td")
            cPhone.textContent = ele.phone;

            let card = document.createElement("td");
            card.textContent = ele.card;

            let item = document.createElement("td")
            item.textContent = ele.totalItem;

            let bill = document.createElement("td");
            bill.textContent = ele.bill;

        tr.append(fname,fAdd,cPhone,card,item,bill)

        orderedList.append(tr);
    });
})