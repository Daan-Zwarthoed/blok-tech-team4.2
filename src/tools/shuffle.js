/**
 * This function will shuffle an array. It is done by using the Fisher-Yates shuffle algorithm.
 * We will take an array and loop through it by using a for loop. A new variable 'j' is created
 * and will generate a random number depending on the index (i) value and the array's length. 
 * Afterwards we'll assign and exchange the current item (array[i]) and the randomItem (array[j]).
 * 
 * Example:
 * array = [0, 1, 2, 3, 4, 5]
 * shuffle = 1, 3, 0, 2, 5, 4
 * new array = [1, 3, 0, 2, 5, 4]
 * 
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * https://www.youtube.com/watch?v=I_hmS4t-zJs
 * 
 * @param {*} arr = the array which needs to be shuffled
 */
const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        // Randomize the value of j
        const j = Math.floor(Math.random() * (arr.length - i) + i);

        // Assign indexes to a variable
        const currentItem = arr[i];
        const randomItem = arr[j];

        // Exchange the arrays
        arr[j] = currentItem;
        arr[i] = randomItem;
        
        console.log(arr[i])
    }
}

module.exports = { shuffle };
