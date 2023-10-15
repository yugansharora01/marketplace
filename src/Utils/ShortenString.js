const shortenString = (str, len) => {
  const dots = "...";
  const lengthOfPart = (len - dots.length) / 2;
  return str.slice(0, lengthOfPart) + dots + str.slice(-lengthOfPart);
};

export default shortenString;
