let displaySection = document.querySelector(".displaySection")

fetchData("../api.json")
// fetching Function
async function fetchData(url){
    try{
        let response = await fetch(url);
        let result = await response.json();
        console.log(result);
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
            price.textContent = `$${element.price}`

            card.append(img,title,price)
            displaySection.append(card)
    });
}
