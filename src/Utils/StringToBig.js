const StringToBig = (str) => {
  if (!str) {
    return BigInt(0);
  }
  const index = str.indexOf(".");
  if (index == -1) {
    return BigInt(str);
  }
  str = str.replace(".", "");
  let existingDecimals = str.length - index;
  if (existingDecimals <= 18) {
    const zerosToAdd = 18 - existingDecimals;
    let numToMultiplied = 10 ** zerosToAdd;
    return BigInt(str) * BigInt(numToMultiplied);
  } else {
    str = str.substring(0, index + 18);
    return BigInt(str);
  }
};

export default StringToBig;
