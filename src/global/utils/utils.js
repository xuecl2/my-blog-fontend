const utils = {
    isBlank(value){
        if(value === undefined || value === null || value === ''){
            return true
        }
        return false
    },
    debounce(func, interval){
        if(interval === undefined) interval = 2000 // default interval
        let lock = false
        return function(){
            if(lock) return
            lock = true
            func.apply(this,arguments)
            setTimeout(() => {
                lock = false
            }, interval)          
        }
    },
}
export default utils