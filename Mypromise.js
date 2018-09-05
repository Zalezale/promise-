const pending = 'pending', resolve = 'resolve', reject = 'reject'

class MyPromise {
    constructor(fn) {
        this.status = pending, this.resolve = this.reject = this.value = null
        let suc = (data) => {
            this.final(data, resolve)
        }
        let err = (err) => {
            this.final(err, reject)
        }
        fn(suc, err)
    }
    final(data, type) {
        setTimeout(() => {
            if (this.status !== pending) {
                return
            }
            this.value = data, this.status = type, this[type] && this[type](data)
        }, 0);
    }
    then(fn, fnErr) {
        return new MyPromise((suc, err) => {
            function deelFn(value) {
                if (this.status === reject) {
                    let resultErr = (typeof fnErr === 'function' && fnErr(value) || value)
                    if (resultErr.then) {
                        resultErr.then(null, err)
                    } else {
                        err(value)
                    }
                } else {
                    let result = (typeof fn === 'function' && fn(value) || value)
                    if (result.then) {
                        result.then(suc, null)
                    } else {
                        suc(value)
                    }
                }
            }
            this.resolve = this.reject = deelFn
        })
    }
    static race(aryPromises = []) {
        return new MyPromise((suc, err) => {
            aryPromises.forEach(promise => {
                promise.then(suc).catch(err)
            });
        })
    }
    static all(aryPromises = []) {
        let count = aryPromises.length
        function resolveAll(e, fn) {
            --count;
            if (count === 0) {
                fn(e)
            }
        }
        return new MyPromise((suc, err) => {
            aryPromises.forEach((promise) => {
                promise.then((e) => {
                    resolveAll(e, suc)
                }).catch((e) => {
                    resolveAll(e, err)
                })
            })
        })
    }
    static resolve(x){
        if(x instanceof MyPromise){
            return x;
        }
        if(x.then){
            let fn = x.then
            return new MyPromise(fn)
        }
        return new MyPromise((suc)=>{
            suc(x)
        })
    }
    catch(fn) {
        return this.then(null, fn)
    }
}

new MyPromise((suc, err) => {
    setTimeout(() => {
        suc(10)
    }, 1000);
}).then((e) => {
    console.log('then:'+e)
}).then((e) => {
    return new MyPromise((suc, err) => {
        setTimeout(() => {
            suc(20)
        }, 100);
    })
}).then((e) => {
    console.log('then:'+e)
}).then((e) => {
    return new MyPromise((suc, err) => {
        setTimeout(() => {
            err(100)
        }, 300);
    })
}).catch((e) => {
    console.log('catch:'+e)
})
let race = MyPromise.race([new MyPromise((suc, err) => {
    setTimeout(() => {
        suc(2000)
    }, 2000);
}), new MyPromise((suc, err) => {
    setTimeout(() => {
        err(4000)
    }, 4000);
}), new MyPromise((suc, err) => {
    setTimeout(() => {
        suc(300)
    }, 300);
})])
race.then(e => console.log('race:'+e))

let all = MyPromise.all([new MyPromise((suc, err) => {
    setTimeout(() => {
        suc(4000)
    }, 4000);
}), new MyPromise((suc, err) => {
    setTimeout(() => {
        suc(5000)
    }, 5000);
}), new MyPromise((suc, err) => {
    setTimeout(() => {
        suc(300)
    }, 300);
})])
all.then((e) => {
    console.log('all:'+e)
})
MyPromise.resolve(1).then((e)=>{
    console.log('resolve 1:'+e)
})
MyPromise.resolve(new MyPromise((suc,err)=>{
     setTimeout(() => {
         err('100')
     }, 1000);
})).catch((e)=>{
    console.log('resolve promise:'+e)
})
MyPromise.resolve({then:function(suc,err){suc(10)}}).then((e)=>{
   console.log('resolve thenable:'+e)
})


