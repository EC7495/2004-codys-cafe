const intersection = (...args) => {
  const flatArr = flattenDeep(args)

  const arrIntersec = flatArr.filter((elem,i) => {
    return flatArr.slice(i+1,flatArr.length).includes(elem)
  })
  return arrIntersec.filter((elem, i, self) => {
    return self.indexOf(elem) === i
  })

}

const flattenDeep = (arr) => {
  let arrFlat = []
  for(let i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      arrFlat = [...arrFlat, ...flattenDeep(arr[i])]
    }else{
      arrFlat.push(arr[i])
    }
  }
  return arrFlat
}

const flipArguments = (func) => {
  return function(...args){
    return func(...args.reverse())
  }
}


const invert = (obj) => {
  let newObj = {}
  for(let key in obj){
    newObj[obj[key]]= key
  }
  return newObj
}

const camelCase = (str) => {
  let newStr = ''
  let prevChar = null
  for(let i = 0; i < str.length; i++){
    if(str[i] === "_" || str[i] === ' '){
      prevChar = str[i]
    }
    else if(prevChar === ' ' || prevChar === '_'){
      let currChar = str[i].toUpperCase()
      newStr += currChar
      prevChar = currChar
    }
    else{
      newStr += str[i]
    }
  }
  return newStr[0].toLowerCase() + newStr.substr(1, newStr.length)
}

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
