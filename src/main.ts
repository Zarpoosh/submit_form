import "./index.css"
import {v4 as uuidv4} from "uuid"


type Item={
  id:string
  name:string
  email:string
}


let $=document
const form=$.querySelector<HTMLInputElement>("#add-user-form")
const name=$.querySelector<HTMLInputElement>("#name")
const email=$.querySelector<HTMLInputElement>("#email")
const users=$.querySelector<HTMLDivElement>("#user-list")

const userList:Item[]= loadUsers()

userList.forEach(addUser)

form?.addEventListener("submit", e=>{
  e.preventDefault()

  if(name?.value===undefined || email?.value===undefined) return

  const userItem :Item={
    id:uuidv4(), 
    name:name.value,
    email:email.value
  }


  userList.push(userItem) 
  addUser(userItem)
  saveUsers()
  name.value=""
  email.value=""
})

function addUser(item:Item) {
  const container=$.createElement("div")
  const name=$.createElement("p")
  const email=$.createElement("p")
  

  name.append(item.name)
  email.append(item.email)
  container.append(name, email)
  users?.append(container)

  container.classList.add(
    "p-6",
    "bg-slate-800", 
    "rounded-md",
    "text-center", 
    "text-slate-200"
  )
}

function saveUsers(){
  localStorage.setItem("item", JSON.stringify(userList))
}

function loadUsers():Item[]{
  const data=localStorage.getItem("item")

  if(data==null) return []

  return JSON.parse(data)
}