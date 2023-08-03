const formatDate = (date) => {
  const dateArr = date.split("-");
  const newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  return newDate;
};

module.exports = formatDate;
