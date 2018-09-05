//函数防抖与函数节流     

//防抖 只要最后一名，就是喜欢成绩最烂的，哈哈哈
let timer = null
function cShake(time=0, fn) {
    return function (x) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn(x)
        }, time);
    }
}

function test(x) {
    console.log(x)
}
let fn = cShake(100, test)
let now = new Date().getTime()
while (true) {
    fn(10);
    if (now + 3000 < new Date().getTime()) {
        break
    }
}
console.log('节流的实现哦--------------------')
//节流      买票要等
let timer1 = null 
function cClosure(time=1000,fn){
  return function(x){
      if(timer1){
          return;
      }else{
        timer1 = setTimeout(() => {
              fn(x)
              timer1 = null
          }, time);
          
      }
  }
}
let fn1 = cClosure(5000,test)
setInterval(()=>{
    fn1(1)
},100)

