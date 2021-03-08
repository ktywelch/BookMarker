/*
This helper funtion will take the string and convert  
to object used because the button returns a string and that will not work for sort
code taken diretly from MDN 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
*/
const  getDescendantProp = (obj, desc) => {
    var arr = desc.split('.');
    while (arr.length) {
      obj = obj[arr.shift()];
    }
    return obj;
}
export default getDescendantProp;



