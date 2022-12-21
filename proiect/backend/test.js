let array = [10, 20, 50, 5, 4, 1, 9];

const nr = 2

for (let i = 0; i < Math.trunc(7 / 2); i++) {

    let pair = [];

    for (let j = 0; j < nr; j++) {
        let elem = array[Math.trunc(Math.random() * array.length)];
        pair.push(elem);

        array = array.filter(el => el !== elem);
    }

    console.log(pair);

}


console.log(array);