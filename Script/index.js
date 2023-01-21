let LoggedName = JSON.parse(localStorage.getItem("LoggedName"));

// console.log(LoggedName);
let account = document.querySelector("#account");
let logOut = document.querySelector("#logOut");
let lName = document.querySelector("#name")


if(LoggedName === null){
    account.style.display = " inline-block"
    logOut.style.display = "none"
}
else{
    lName.innerText = `Welcome ${LoggedName}`;
    account.style.display = "none"
    logOut.style.display = " inline-block"
}

logOut.addEventListener("click",()=>{
    localStorage.removeItem("LoggedName");
    lName.innerText ="";
    account.style.display = " inline-block"
    logOut.style.display = "none"
    alert("You are Logged Out")
})

