import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {city: avg(mpg_data, "city"), highway: avg(mpg_data, "highway")},
    allYearStats: getStatistics(helper(mpg_data)),
    ratioHybrids: ratio(mpg_data),
};
export function helper(array){
    let arr = [];
    for(let i = 0; i < array.length; i++){
        arr.push(array[i].year)
    }
    return arr;
}
export function ratio(array) {
    let arr = array.filter(array => array.hybrid === true)
    return arr.length/array.length;
}
export function avg(array, obj) {
    let len = array.length;
    let arr = 0;
    if(obj === "city"){
        const reducer = (accumulator, currentValue, currentIndex, sourceArray) => {
            return accumulator + currentValue.city_mpg
        }
        arr = array.reduce(reducer,0);
    }
    else if(obj === "highway"){
        const reducer = (accumulator, currentValue, currentIndex, sourceArray) => {
            return accumulator + currentValue.highway_mpg
        }
        arr = array.reduce(reducer, 0);
    }
    return arr/len;
}



/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: helper2(mpg_data),
    avgMpgByYearAndHybrid: avgMPG(mpg_data)
};
console.log(moreStats);

export function avgMPG(array){
    let arr = {};
    for(let i = 0; i < array.length; i++){
        if(!check2(arr, array[i].year)){
            arr[array[i].year] = {hybrid: yearHybrid(array, array[i].year),
                            notHybrid: yearNonHybrid(array, array[i].year)}  
      }
    }
    return arr;
}
export function check2(array, number){
    let arr = helper(array);
    if(arr.includes(number)){
        return true;
    } else {
        return false;
    }
}
console.log(moreStats);

export function yearHybrid(array, year){
    for(let i = 0; i < array.length; i++){
        if(array[i].year === year && array[i].hybrid){
            return {city: avg2(array, "city", year, true),
                    highway: avg2(array, "highway", year, true)}
        }
    }
}
export function yearNonHybrid(array, year){
    let arr = {};
    for(let i = 0; i < array.length; i++){
        if(array[i].year === year && !array[i].hybrid){
            return {city: avg2(array, "city", year, false),
                    highway: avg2(array, "highway", year, false)}
        }
    }
}

export function avg2(array, type, year, hyb) {
    let num = 0;
    let counter = 0;
    if(type === "city"){
        for(let i = 0; i < array.length; i++){
            if(array[i].year === year && array[i].hybrid === hyb){
                num = num + array[i].city_mpg;
                counter++;
            }
        }
    }
    else if(type === "highway"){
        for(let i = 0; i < array.length; i++){
            if(array[i].year === year && array[i].hybrid === hyb){
                num = num + array[i].highway_mpg;
                counter++;
            }
        }
    }
    return num/(counter);
}


export function helper2(array){
    let arr = [];
    for(let i = 0; i < array.length; i++){
        if(!check(arr, array[i].make)){
            if(helper3(array, i) != null){
                arr.push(helper3(array,i, arr));
            }
        }
    }
    return arr;
}
export function check(array, string){
    for(let i = 0; i < array.length; i++){
        if(array[i].make === string){
            return true;
        }
    }
    return false;
}

export function helper3(array, i, arr2){
    let arr = hybridSearch(array, array[i].make);
    if(arr.length === 0){
        return null;
    } else {
    return {make: array[i].make,
            hybrids: arr}
    }
}

export function hybridSearch(array, make){
    let arr = [];
    for(let i = 0; i < array.length; i++){
        if(array[i].make === make && array[i].hybrid){
            arr.push(array[i].id);
        }
    }
    return arr;
}