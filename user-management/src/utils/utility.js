const isExists = (array1, array2) => {
  let isExist = false;
  array2.filter((a) => {
    isExist = array1.filter((el) => {
      return el.key === a.key;
    });
    return isExist;
  });
  return !!isExist.length;
};

module.exports = {
  isExists,
};
