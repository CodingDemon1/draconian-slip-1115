let displaySection = document.querySelector(".displaySection")
let ApnaFashionCart = JSON.parse(localStorage.getItem("ApnaFashionCart")) || []
let fetchResult = []
fetchData("../menApi.json")
// fetching Function
async function fetchData(url){
    try{
        let response = await fetch(url);
        let result = await response.json();
        // console.log(result);
        fetchResult = result
        display(result)
    }
    catch{
        console.log("Error");
    }
}

// fetch("../api.json")
// .then((response)=>{
//     return response.json()
// })
// .then((data)=>{
//     display(data);
// })


// Display Function

function display(data){
    displaySection.innerHTML ="";
    data.forEach((element,index) => {
        let card = document.createElement("div")
            card.className="productCard";

            let img = document.createElement("img")
            img.src = element.image;

            let title = document.createElement("p");
            title.textContent = element.title;

            let desc = document.createElement("p");
            desc.textContent = element.description;

            let price = document.createElement("H4")
            price.textContent = `$ ${element.price}`

            let add = document.createElement("button")
            add.textContent = "Add to Cart"
            add.addEventListener("click",()=>{
                if(checkDuplicate(element)){
                    alert("Product Already in Cart")
                    }
                else{
                    ApnaFashionCart.push({...element,quantity:1})
                    localStorage.setItem("ApnaFashionCart",JSON.stringify(ApnaFashionCart))
                    console.log(ApnaFashionCart)
                    alert("Product Added To Cart")
                }
            })

            card.append(img,title,price,add)
            displaySection.append(card)
    });
}

//Search Functionality starts Here:-
let searchBar = document.querySelector("#searchBar");
let searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click",()=>{
    let searchVal = searchBar.value;
    
    let searchRes = fetchResult.filter((ele=>(ele.title.toLowerCase().includes(searchVal.toLowerCase()))))  
    display(searchRes)
})

//Search Functionality endss Here:-


//Sort Functionality from Starts Here :-
let sort = document.getElementById("sort")

sort.addEventListener("change",()=>{
    let sorted = []
    if(sort.value === "asc"){
        sorted = fetchResult.sort((a,b)=>(a.price-b.price))
        display(sorted)
    }else if(sort.value === "desc"){
        sorted = fetchResult.sort((a,b)=>(b.price-a.price))
        display(sorted)
    }else{
        fetchData("../menApi.json")
    }
})

//Sort Functionality Ends here

//Filter Functionality from starts Here:-

let filterByCategory = document.querySelector(".filterByCategory")
filterByCategory.addEventListener("change",()=>{
    let filterValue = filterByCategory.value;
    console.log(filterValue);
    if(filterValue === ""){
        fetchData("../menApi.json")
    }else{ 
        display(fetchResult.filter((ele)=>(ele.category ===filterValue)))
    }
});


let filterByPrice = document.querySelector(".filterByPrice");

filterByPrice.addEventListener("change",()=>{
    let filterValue = +filterByPrice.value;
    // console.log(filterValue);
    if(filterValue === 0){
        fetchData("../menApi.json")
    }else if(filterValue === "200"){ 
        display(fetchResult.filter((ele)=>(ele.price >= 200)))
    }else{
        display(fetchResult.filter((ele)=>(ele.price <= filterValue)))
    }
});


let filterByRating = document.querySelector(".filterByRating");

filterByRating.addEventListener("change",()=>{
    let filterValue = +filterByRating.value;
    console.log(filterValue);
    if(filterValue === 0){
        fetchData("../menApi.json")
    }else{
        display(fetchResult.filter((ele)=>(ele.rating > filterValue)))
    }
});
//Filter Functionality ends Here:-

//CheckDuplicateProducts:-
function  checkDuplicate(product){
    for(let i=0;i<ApnaFashionCart.length;i++){
        if(ApnaFashionCart[i].id===product.id){
        return true
    }
    }
    return false
}