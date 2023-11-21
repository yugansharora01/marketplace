const StringToBig = (str) => {
  if (!str) {
    return BigInt(0);
  }
  const index = str.indexOf(".");
  if (index == -1) {
    let num = 10 ** 18;
    return BigInt(str) * BigInt(num);
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
