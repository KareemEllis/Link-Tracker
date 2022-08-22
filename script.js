const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("save-tab-btn")
const delBtn = document.getElementById("del-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

let myLeads = []
let oldLeads = []

const myLeadsStorage = JSON.parse(localStorage.getItem("myLeads"))

if(myLeadsStorage){
    myLeads = myLeadsStorage
    render(myLeads)
}

saveBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log(`${typeof JSON.stringify(myLeads)} ${localStorage.getItem("myLeads")} has been saved to local storage`)
    render(myLeads);
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

    })

})

delBtn.addEventListener("dblclick", function(){
    console.log("DELETE BUTTON CLICKED")
    myLeads = []
    localStorage.clear()
    
    render(myLeads)
})


function render(leads){
    let listItems = ""
    
    leads.forEach(element => {
        listItems += 
            `<li>
                <a href= '${element}' target = '_blank'> ${element} </a>
            </li>` 
       
        console.log(listItems)
    });
    
    ulEl.innerHTML = listItems
}

