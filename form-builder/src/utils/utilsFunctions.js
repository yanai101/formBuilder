export const debounce = (fun, time) =>{
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fun.apply(this, args)
        }, time)
    }
}
