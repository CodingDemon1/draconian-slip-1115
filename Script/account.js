let accountData = JSON.parse(localStorage.getItem("accountData")) || []

let regBtn = document.getElementById("regBtn");
let signUp =  document.querySelector(".signUp")

regBtn.addEventListener("click",()=>{
    signUp.style.display = "block"
})

signUp.addEventListener("submit",(e)=>{
    e.preventDefault();

    let newMember = {
        name : signUp[0].value,
        email : signUp[1].value,
        mobile : signUp[2].value,
        username : signUp[3].value,
        pass : signUp[4].value,
        cart : []
    }
        accountData.push(newMember);
        // console.log("success");
        localStorage.setItem("accountData",JSON.stringify(accountData))

        alert("Account Created")
})

//Login

let signIn = document.querySelector(".signIn");


signIn.addEventListener("submit",(e)=>{
    e.preventDefault();
    let flag = false
    let userName = signIn[0].value;
    let password = signIn[1].value;
    let name = null;
    accountData.forEach((element,index) => {
        if((element.username === userName) && (element.pass === password)){
            flag = true;
            name = element.name;
        }
    });

    if(flag){
        alert("Login successfully")
        localStorage.setItem("LoggedName",JSON.stringify(name));
        console.log(name);
        window.location.assign("index.html")
    }else{
        alert("Wrong Credentials")
    }
})

