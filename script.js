// ===============================
// DATA STRUCTURES
// ===============================

// Array for members
let members=[]

// HashMap for balances
let balances={}

// Stack for transactions
let stack=[]

// Queue for processing
let queue=[]

// Expense list
let expenses=[]


// ===============================
// ADD MEMBER
// ===============================

function addMember(){

let name=document.getElementById("memberInput").value

if(name=="") return

members.push(name)
balances[name]=0

queue.push(name)

updateMembers()

document.getElementById("memberInput").value=""
}


// ===============================
// UPDATE MEMBER UI
// ===============================

function updateMembers(){

let list=document.getElementById("memberList")
list.innerHTML=""

let select=document.getElementById("payer")
select.innerHTML=""

members.forEach(m=>{

let li=document.createElement("li")
li.innerText=m
list.appendChild(li)

let option=document.createElement("option")
option.value=m
option.text=m
select.appendChild(option)

})

document.getElementById("memberCount").innerText=members.length
}


// ===============================
// ADD EXPENSE
// ===============================

function addExpense(){

let payer=document.getElementById("payer").value
let amount=parseFloat(document.getElementById("amount").value)
let desc=document.getElementById("desc").value

if(!payer || !amount) return

let expense={
payer,
amount,
desc
}

expenses.push(expense)

// stack push
stack.push(expense)

balances[payer]+=amount

updateHistory()
calculateBalances()

}


// ===============================
// UPDATE TABLE
// ===============================

function updateHistory(){

let table=document.getElementById("history")

table.innerHTML=`
<tr>
<th>Member</th>
<th>Amount</th>
<th>Description</th>
</tr>
`

expenses.forEach(e=>{

let row=table.insertRow()

row.insertCell(0).innerText=e.payer
row.insertCell(1).innerText="₹"+e.amount
row.insertCell(2).innerText=e.desc

})

}


// ===============================
// BALANCE CALCULATION
// ===============================

function calculateBalances(){

let total=0

for(let m in balances){
total+=balances[m]
}

let share=total/members.length

document.getElementById("totalExpense").innerText="₹"+total
document.getElementById("equalShare").innerText="₹"+share.toFixed(2)

let balanceDiv=document.getElementById("balances")
balanceDiv.innerHTML=""

let map=[]

members.forEach(m=>{

let bal=balances[m]-share

map.push({name:m,balance:bal})

let p=document.createElement("p")
p.innerText=m+" : ₹"+bal.toFixed(2)

balanceDiv.appendChild(p)

})

// Sorting algorithm example
map.sort((a,b)=>b.balance-a.balance)

settle(map)

}


// ===============================
// SETTLEMENT ALGORITHM
// ===============================

function settle(arr){

let creditors=arr.filter(a=>a.balance>0)
let debtors=arr.filter(a=>a.balance<0)

let settlementDiv=document.getElementById("settlements")
settlementDiv.innerHTML=""

let count=0

while(creditors.length && debtors.length){

let c=creditors[0]
let d=debtors[0]

let amount=Math.min(c.balance,-d.balance)

let p=document.createElement("p")

p.innerText=d.name+" pays "+c.name+" ₹"+amount.toFixed(2)

settlementDiv.appendChild(p)

count++

c.balance-=amount
d.balance+=amount

if(c.balance<=0) creditors.shift()
if(d.balance>=0) debtors.shift()

}

document.getElementById("settlementCount").innerText=count

}


// ===============================
// SEARCH FUNCTION (DSA)
// ===============================

function searchMember(name){

for(let i=0;i<members.length;i++){

if(members[i]==name){
console.log("Found:",name)
return
}

}

console.log("Not Found")

}


// ===============================
// STACK DEMO
// ===============================

function undoLastExpense(){

let last=stack.pop()

console.log("Undo:",last)

}


// ===============================
// QUEUE DEMO
// ===============================

function processQueue(){

let member=queue.shift()

console.log("Processing:",member)

}