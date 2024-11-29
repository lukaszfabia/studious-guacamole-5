const myarrowfunc = () => {
  //   "use strict";
  let value = 10;
  hehe = "121212";

  console.log(hehe);
};

myarrowfunc();

const x = (str1) =>
  (y = (str2) =>
    (z = (str3) =>
      (a = (str4) => console.log(str1 + str2 + str3 + "=" + str4))));

x("1")("+")("3")(4);
