// ========================================
// DSA MODULE FOR EXPENSE SHARING PROJECT
// ========================================


// ================================
// ARRAYS / LIST
// ================================

let dsaMembers = []
let dsaExpenses = []

console.log("Array initialized for members and expenses")


// ================================
// STACK (LIFO)
// ================================

class Stack {

constructor(){
this.items=[]
}

// Push → O(1)
push(element){
this.items.push(element)
console.log("Stack Push:",element)
}

// Pop → O(1)
pop(){

if(this.items.length==0){
console.log("Stack is empty")
return null
}

let removed=this.items.pop()

console.log("Stack Pop:",removed)

return removed
}

peek(){
return this.items[this.items.length-1]
}

print(){
console.log("Stack:",this.items)
}

}

let transactionStack = new Stack()



// ================================
// QUEUE (FIFO)
// ================================

class Queue {

constructor(){
this.items=[]
}

// Enqueue → O(1)
enqueue(element){

this.items.push(element)

console.log("Queue Enqueue:",element)

}

// Dequeue → O(n)
dequeue(){

if(this.items.length==0){
console.log("Queue empty")
return null
}

let removed=this.items.shift()

console.log("Queue Dequeue:",removed)

return removed

}

front(){
return this.items[0]
}

print(){
console.log("Queue:",this.items)
}

}

let memberQueue = new Queue()



// ================================
// LINEAR SEARCH
// ================================
// Time Complexity → O(n)

function linearSearch(arr,target){

for(let i=0;i<arr.length;i++){

if(arr[i]==target){

console.log("Linear Search Found at index:",i)

return i

}

}

console.log("Linear Search: Not Found")

return -1

}



// ================================
// BINARY SEARCH
// ================================
// Works only on sorted arrays
// Time Complexity → O(log n)

function binarySearch(arr,target){

let left=0
let right=arr.length-1

while(left<=right){

let mid=Math.floor((left+right)/2)

if(arr[mid]==target){

console.log("Binary Search Found at index:",mid)

return mid

}

if(arr[mid]<target){

left=mid+1

}else{

right=mid-1

}

}

console.log("Binary Search: Not Found")

return -1

}



// ================================
// BUBBLE SORT
// ================================
// Time Complexity → O(n²)

function bubbleSort(arr){

let result=[...arr]

for(let i=0;i<result.length;i++){

for(let j=0;j<result.length-i-1;j++){

if(result[j]>result[j+1]){

let temp=result[j]

result[j]=result[j+1]

result[j+1]=temp

}

}

}

console.log("Bubble Sorted:",result)

return result

}



// ================================
// INSERTION SORT
// ================================
// Time Complexity → O(n²)

function insertionSort(arr){

let result=[...arr]

for(let i=1;i<result.length;i++){

let key=result[i]

let j=i-1

while(j>=0 && result[j]>key){

result[j+1]=result[j]

j--

}

result[j+1]=key

}

console.log("Insertion Sorted:",result)

return result

}



// ================================
// MERGE SORT
// ================================
// Time Complexity → O(n log n)

function mergeSort(arr){

if(arr.length<=1) return arr

let mid=Math.floor(arr.length/2)

let left=mergeSort(arr.slice(0,mid))
let right=mergeSort(arr.slice(mid))

return merge(left,right)

}

function merge(left,right){

let result=[]

while(left.length && right.length){

if(left[0]<right[0]){

result.push(left.shift())

}else{

result.push(right.shift())

}

}

return [...result,...left,...right]

}



// ================================
// QUICK SORT
// ================================
// Average Time → O(n log n)

function quickSort(arr){

if(arr.length<=1) return arr

let pivot=arr[arr.length-1]

let left=[]
let right=[]

for(let i=0;i<arr.length-1;i++){

if(arr[i]<pivot){

left.push(arr[i])

}else{

right.push(arr[i])

}

}

return [...quickSort(left),pivot,...quickSort(right)]

}



// ================================
// HASH MAP
// ================================
// Used to store member balances

class BalanceHashMap{

constructor(){
this.map=new Map()
}

set(member,amount){

this.map.set(member,amount)

}

get(member){

return this.map.get(member) || 0

}

print(){

console.log("Balances:",this.map)

}

}

let balanceMap = new BalanceHashMap()



// ================================
// SETTLEMENT ALGORITHM
// ================================
// Greedy algorithm
// Time Complexity → O(n log n)

function calculateSettlements(balances){

let creditors=[]
let debtors=[]

for(let member in balances){

if(balances[member]>0){

creditors.push({name:member,balance:balances[member]})

}

else if(balances[member]<0){

debtors.push({name:member,balance:balances[member]})

}

}

creditors.sort((a,b)=>b.balance-a.balance)
debtors.sort((a,b)=>a.balance-b.balance)

let settlements=[]

let i=0
let j=0

while(i<debtors.length && j<creditors.length){

let amount=Math.min(-debtors[i].balance,creditors[j].balance)

settlements.push({

from:debtors[i].name,
to:creditors[j].name,
amount:amount

})

debtors[i].balance+=amount
creditors[j].balance-=amount

if(Math.abs(debtors[i].balance)<0.01) i++
if(Math.abs(creditors[j].balance)<0.01) j++

}

console.log("Settlements:",settlements)

return settlements

}



// =====================================
// DEMO OUTPUT FOR CONSOLE
// =====================================

console.log("===== DSA DEMO START =====")

transactionStack.push("Expense1")
transactionStack.push("Expense2")
transactionStack.pop()

memberQueue.enqueue("Rahul")
memberQueue.enqueue("Aman")
memberQueue.dequeue()

linearSearch(["Rahul","Aman","Priya"],"Aman")

bubbleSort([300,100,200,50])

console.log("Quick Sort:",quickSort([300,100,200,50]))

console.log("Merge Sort:",mergeSort([300,100,200,50]))

console.log("===== DSA DEMO END =====")