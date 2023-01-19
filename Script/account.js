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
        username : signUp[2].value,
        pass : signUp[3].value,
        cart : []
    }
    console.log(newMember);
    if(checkDuplicate(newMember)){
        accountData.push(newMember);
        console.log("success");
        localStorage.setItem("accountData",JSON.stringify(accountData))
    }else{
        console.log("Error");
    }

})

function checkDuplicate(entry){
    let flag = true;
    for(let i=0;i>accountData.length;i++){
        if(accountData[i].username === entry.username){
            flag = false
            break
        }
    }
    return flag
}