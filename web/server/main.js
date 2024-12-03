
const myarrowfunc = () => {
    // 'use strict';
    let value = 10;
    hehe = "nie powinno wypisac tego";

    console.log(hehe);
}

myarrowfunc()


const x = (str1) => y = (str2) => z = (str3) => a = (str4) => console.log(str1 + str2 + str3 + "=" + str4)

x("1")("+")("3")(4)

const lst = [1, 2, 45]
const computer = lst.reduce((acc, curr) => acc + curr, 0)

console.log(computer)
