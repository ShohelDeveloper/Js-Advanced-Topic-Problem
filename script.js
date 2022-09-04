/**
 * Js Array & Objects
 */

const numbers = [1,2,3,4,false, '', NaN, 5,6]
const result = numbers.reduce((acc,cur) => {
  if(cur){ //question is : how working this('cur')
    acc += cur.toString() //if i don't use tostring(), no problem, becuase without toString() show me Perfect result, so why i can use it.
  }
  return acc
},'')

console.log(result)


// Reduce Implementation:

function myReduce(array,cb,init){
  let acc = init;

  for(let i = 0; i < array.length; i++){

    acc = cb(acc, array[i],i,array) //Don't understand Calculation

  }

  return acc;
}

const sum = myReduce([1,2,3,4], (a,b) => a+b, 0)
console.log(sum)

// // Another Result 
const arr = myReduce[1,2,'',false,3,NaN,false,4,5,NaN,6];

const result = myReduce(arr, (acc,cur) =>{

  if(cur) {
    acc.push(cur * cur);
  }
  return acc

},[])
// How can i defined myReduce for solve error
console.log(result)




/**
 *  Function As A Value
 */


// let's contruct a function

function strToObj(str){
    let obj = {}

    for(let s of str) {
        if(s !== ' '){
            obj[s] = s //How can caluculate and update data in OBJ Object; obj[h] = h
        }
    }
    return obj
}

console.log(strToObj('Shohel Rana Shanto')) //why last s h a n o is word remove ?

//another 
const fn = new Function(
    'str',
    ` let obj = {}

    for(let s of str) {
        if(s !== ' '){
            obj[s] = s
        }
    }
    return obj`
)

console.log(fn('Shohel Rana Shanto'))

// Another
const fData = {
    param: ['a','b'],
    body:['const r = a+b', 'return r']
}

const fbody = fData.body.reduce((acc,cur) => {
    acc += cur + ';' ; //Not understand 
    return acc
}, '');

const tf = new Function(...fData.param, fbody); //Not understand 
console.log(tf(100,200))

// timing problem

for (var i = 1; i <=5; i++){ //if i use let then perfectly answer show problem for var and const
    setTimeout(function(){
        console.log(i)
    }, 1000 * i)
}

const operations = [
    {
         args:[10,20],
         params: ['a','b'],
         body:  ' console.log("a + b =", a+b)' 
    },
    {
        args:[10,20],
        params: ['a','b'],
        body: ' console.log("a - b =", a-b)' 
   },

   {
    args:[10,20],
    params: ['a', 'b'],
    body:  ' console.log("a * b =", a*b)' 
 },
 {
    args:[5],
    params: ['n'],
    body:  `  
    for(let i = 0; i < n; i++){
        let line = ''
        
        for(let j = 0; j < n; j++){
            line += '*'
        }
        console.log(line)
    }`,
},
]

operations.forEach(operation =>{
    const fn = new Function(...operation.params, operation.body) //calculation not understand.

    fn(... operation.args) //calculation not understand

})


/**
 * Functional Programming 
 */


// impure function and side effect

let limit = 100;

function chnageLimit() {
    limit = 500
}
chnageLimit(limit)
console.log(limit)

// // Another Impure function & side effect
const arr = [1,2,3]

function add(data) {
    arr.push(data)
}


//Asayn Await ----

// Personal Range Iterator:

const range = {
    start: 0,
    stop:100,
    step:5
}

range[Symbol.iterator] = function () {
    let current = this.start
    let stop = this.stop
    let step = this.step

    return {
        next() {
            const o = {
                value:current,
                done:current > stop
            }
            current += step //how can update this value, as like how first value show 0, second 5
            return o
        }
    }

}


const rangeIterator = range[Symbol.iterator]() //------- রেঞ্জ টাকে Iterator থেকে বের করতে হবে ।
console.log(rangeIterator.next())
console.log(rangeIterator.next())
console.log(rangeIterator.next())
console.log(rangeIterator.next())

// Dufault Parameters: 

let greet = (name = 'Shohel Rana Shanto', msg) => {
    console.log(`${name}! ${msg}`)
}

greet('','Good Morning') // how can i write first argument from this situation

// reduce
function sum(...rest) {
    return rest.reduce((a,b) => a+b) //how can calculated
  }
  
  console.log(sum(1,2,3,4,5))

//   Iterator

let obj = {
    start: 1,
    end:5,

    [Symbol.iterator] : function* () {
            let currentValue = this.start
            while(currentValue <= this.end){
                yield currentValue++
            }
    }
}

let result = obj[Symbol.iterator]() //Why can i use this double

console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())


// for await 

// iterable 
let asyncIterqable = {
    [Symbol.asyncIterator]() { //why here asyncIterator method, why not Iterator
        let i  = 0 
        return{
            next() {
                if(i < 5) {
                    return Promise.resolve({
                        value:i++,
                        done:false
                    })
                }else{
                    return Promise.resolve({
                        value:undefined,
                        done:true
                    })
                }
            }
        }
    }
}

// Iterator
let iterate = asyncIterqable[Symbol.asyncIterator](); //why here asyncIterator method, why not Iterator

(async function () {
       for await(let v of asyncIterqable){ 
        console.log(v)
       }
})()