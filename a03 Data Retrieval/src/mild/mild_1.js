/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let c = a+b;
    return a + ' + ' + b + ' = ' + c;
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    if(endNumber < startNumber){
        return [];
    }
    var arr = [1];
    arr[0] = startNumber;
    for (let i = 0; i < endNumber-startNumber; i++){
        arr.push(startNumber + i + 1);
    }
    return arr;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let max = numbers[0];
    let min = numbers[0];

    for(let i = 0; i < numbers.length; i++){
        if(numbers[i] > max){
            max = numbers[i];
        }
        if(numbers[i] < min){
            min = numbers[i];
        }
    }
    return {min: min, max: max};
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let obj = {};
    for(let i = 0; i < array.length; i++){
        let number = 0;
        if(!check(obj, array[i])){
            obj[array[i].toString()] = number
        } if(check(obj, array[i])){
            obj[array[i].toString()] += 1;
        }
    }
    return obj;
}

export function check(object, obj){
    if(obj in object){
        return true;
    } else {
        return false;
    }
}