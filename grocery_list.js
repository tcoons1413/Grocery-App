'use strict';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-a8b1a-default-rtdb.firebaseio.com/"
}
let inputValue = ""

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#shopping-list")
const addButton = document.querySelector("#add-button").addEventListener("click", function () {
    inputValue = inputEl.value
    if (inputValue === "") {
        alert("Must Submit Item")
    } else {
        push(shoppingListInDb, inputValue)
        clearInputFielEl()

    }
})
const clearButton = document.querySelector("#clear-button").addEventListener("click", function () {
    ulEl.innerHTML = "Your cart is empty..."

})

onValue(shoppingListInDb, function (snapshot) {

    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())



        clearShoppingListEl()

        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentItem = shoppingListArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            render(currentItem)

        }
    } else {

        ulEl.innerHTML = "Your cart is empty..."
    }

})
function clearShoppingListEl() {
    ulEl.innerHTML = ""
}

function clearInputFielEl() {
    inputEl.value = ""
}

function render(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.innerHTML = itemValue
    newEl.addEventListener("click", function () {

        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    ulEl.append(newEl)
}

