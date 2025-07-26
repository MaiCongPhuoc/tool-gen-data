import moment from "moment";

export const RandomData = (str: any, index: number, defaultValue?: string) => {
  switch (true) {
    case str.type.includes("varchar"):
      return randomVarchar(str, index, defaultValue);
    case str.type.includes("smallint"):
      return randomsmallint();
    case str.type.includes("tinyint"):
      return randomTinyint();
    case str.type.includes("datetime"):
      return randomDatetime();
    case str.type.includes("int"):
      return randomint();
    case str.type.includes("decimal"):
      return randomDecimal(str);
  }
};

// Random value varchar
const randomVarchar = (varchar: any, index: number, defaultValue?: string) => {
  if (varchar.custom !== "") {
    return varchar.custom + "00" + index;
  }
  const match = varchar.type.match(/\((\d+)\)/);
  const varcharNum = Number(match[1]);
  if (defaultValue) {
    return defaultValue + renderZero(varcharNum) + (index + 1);
  }
  if (varcharNum <= 2) {
    return generateRandomUppercaseLetters(1) + (index + 1);
  }
  if (varcharNum > 2 && varcharNum < 40) {
    return generateRandomUppercaseLetters(varcharNum - 2) + "0" + (index + 1);
  }
  if (varcharNum > 40) {
    return generateRandomUppercaseLetters(38) + "0" + (index + 1);
  }
};

const generateRandomUppercaseLetters = (n: number) => {
  let result = "";
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const charactersLength = characters.length;

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
};

const renderZero = (num: number) => {
  let result = "";
  for (let i = 0; i < num - 2; i++) {
    result += "0";
  }
  return result;
};

// Random value smallint
const randomsmallint = () => {
  return Math.floor(Math.random() * 1000);
};

// Random value tinyint
const randomTinyint = () => {
  return Math.floor(Math.random() * 100);
};

// Random value datetime
const randomDatetime = () => {
  return moment().format("mm-DD-yyyy hh:mm:ss");
};

// Random value int
const randomint = () => {
  return Math.floor(Math.random() * 10000);
};

// Random value decimal
const randomDecimal = (decimal: any) => {
  const match = decimal.type.match(/decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/i);

  if (!match) {
    throw new Error("Không đúng định dạng kiểu DECIMAL(p, s)");
  }

  const precision = parseInt(match[1], 10); // Tổng chữ số
  const scale = parseInt(match[2], 10); // Số chữ số sau dấu thập phân

  if (scale > precision) {
    throw new Error("scale không thể lớn hơn precision");
  }

  // Tính số lớn nhất ở phần nguyên
  const maxInteger = Math.pow(10, precision - scale) - 1;

  // Sinh phần nguyên và phần thập phân ngẫu nhiên
  const integerPart = Math.floor(Math.random() * (maxInteger + 1));
  const decimalPart = Math.floor(Math.random() * Math.pow(10, scale))
    .toString()
    .padStart(scale, "0");

  return parseFloat(`${integerPart}.${decimalPart}`);
};
