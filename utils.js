import moment from "moment";

export const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

export const sortedArr = (arr) =>
  arr.sort((a, b) => {
    return (
      new Date(moment(a.date).format()) - new Date(moment(b.date).format())
    );
  });
// console.log("SORTED ARRAY", sortedArr);
