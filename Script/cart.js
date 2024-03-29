let cartItems = document.getElementById("cartItems");
let cart = JSON.parse(localStorage.getItem("ApnaFashionCart")) || [];
let orderTotal = document.getElementById("price");
let orderTotals = document.getElementById("prices");
let checkout = document.getElementById("checkout");
let paytm = document.getElementById("paytm");

display(cart)
// console.log(cart);
function display(data){
    cartItems.innerHTML ="";
    data.forEach((element,index) => {
        let card = document.createElement("div")
        card.className ="cartCard"
        let img = document.createElement("img");
        img.src = element.image;
        let div = document.createElement("div");
        let title = document.createElement("h3")
        title.textContent = element.title;
        let p = document.createElement("p")
        p.textContent = "Buy 1, Get 1 50% Off";

        let price = document.createElement('p');
        price.textContent = `Price : $ ${element.price}`
        
        div.append(title,price,p)

        let quantity = document.createElement("h4");
        quantity.textContent = element.quantity;

        let div2 = document.createElement("div")
        let plusBtn = document.createElement("button")
        plusBtn.textContent = "+"

        plusBtn.addEventListener("click",()=>{
            element.quantity++
            localStorage.setItem("ApnaFashionCart",JSON.stringify(cart))
            display(cart)
            orderTotal.innerText = `$ ${totalvalue()}`
            orderTotals.innerText = `$ ${totalvalue()}`
        })

        
        let minusBtn=document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.addEventListener("click",()=>{
            if(element.quantity>1){
                element.quantity--;
                localStorage.setItem("ApnaFashionCart",JSON.stringify(cart));
                display(cart);
                // totalvalue()
                orderTotal.innerText = `$ ${totalvalue()}`
                orderTotals.innerText = `$ ${totalvalue()}`
            }else if(element.quantity==1){
                cart = cart.filter((el,i)=>{
                    if(i === index){
                        return false
                    }
                    return true
                })
                localStorage.setItem("ApnaFashionCart",JSON.stringify(cart));
                display(cart);
                orderTotal.innerText = `$ ${totalvalue()}`
                orderTotals.innerText = `$ ${totalvalue()}`
            }
        })
        
        div2.append(plusBtn,quantity,minusBtn)

        card.append(img,div,div2)

        cartItems.append(card)
        orderTotal.innerText = `$ ${totalvalue()}`
                orderTotals.innerText = `$ ${totalvalue()}`
    });
}


//Function of Calculating total amount
function totalvalue(){
    let total = 0;
        for(let i=0;i<cart.length;i++){
            total += (cart[i].price*cart[i].quantity); 
        }
        return total;
    }


    //overlay & checkout form

    let overlay = document.querySelector(".overlay");
    let checkoutBtn = document.querySelector("#checkout");
    let checkoutForm = document.querySelector(".checkoutForm")
    let closeBtn = document.getElementById("closeBtn");

    closeBtn.addEventListener("click",closeModal)
    
    checkoutBtn.addEventListener("click",showModal)

    function showModal(){
        overlay.classList.add("showOverlay");
        checkoutForm.classList.add("showLoginForm");
    }

    function closeModal(){
        overlay.classList.remove("showOverlay");
        checkoutForm.classList.remove("showLoginForm");
    }


    let paymentForm = document.querySelector("#checkoutDetails")
    let ordered = JSON.parse(localStorage.getItem("apnaFashionOrdered")) || [];
    let empty = document.querySelector(".empty");


        paymentForm.addEventListener("submit",()=>{
        alert("Hurray!!! Payment Success")
        
        let orderDetails = {
            fullName : paymentForm[0].value,
            fullAdd : paymentForm[1].value +"  "+ paymentForm[2].value +" "+paymentForm[3].value+" "+paymentForm[4].value,
            phone : paymentForm[5].value,
            card : paymentForm[6].value,
            totalItem : countItems(),
            bill : totalvalue()
        }
        ordered.push(orderDetails);
        localStorage.setItem("apnaFashionOrdered",JSON.stringify(ordered));
        localStorage.removeItem("ApnaFashionCart");   
        
        cartItems.innerHTML = ""
        }); 


        function countItems(){
            let count = 0;
            cart.forEach((ele)=>{
                count+= ele.quantity;
            })
            return count;
        }