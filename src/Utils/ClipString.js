const clipString = (str, len) => {
  if (!str) {
    return str;
  }
  const dots = "...";
  console.log(str);
  return str.slice(0, len - 3) + dots;
};

export default clipString;
