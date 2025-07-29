import moment from "moment";

export const RandomData = (str: any, index: number, defaultValue?: string) => {
  switch (true) {
    case str.type.includes("varchar"):
      return randomVarchar(str, index, defaultValue);
    case str.type.includes("smallint"):
      return randomSmallint();
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
    return varchar.custom + "00" + index ;
  }
  const match = varchar.type.match(/\((\d+)\)/);
  const varcharNum = Number(match[1]);
  if (defaultValue === "tel") {
    return randomPhoneNumber();
  }
  if (defaultValue) {
    return defaultValue + renderZero(varcharNum, index);
  }
  if (varcharNum < 40) {
    return generateRandomUppercaseLetters(varcharNum, index);
  }
  if (varcharNum >= 40) {
    return generateRandomUppercaseLetters(40, index);
  }
};
const randomPhoneNumber = (): string => {
  let phone = "09";

  for (let i = 0; i < 8; i++) {
    phone += Math.floor(Math.random() * 10);
  }

  return phone;
};

const generateRandomUppercaseLetters = (num: number, index: number) => {
  let result = "";
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const charactersLength = characters.length;

  for (let i = 0; i < num - String(index).length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result + index;
};

const renderZero = (num: number, index: number) => {
  let result = "";
  for (let i = 0; i < num - 1 - String(index).length; i++) {
    result += "0";
  }
  return result + index;
};

// Random value smallint
const randomSmallint = () => {
  return Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "1");
};

// Random value tinyint
const randomTinyint = () => {
  return Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "1");
};

// Random value datetime
const randomDatetime = () => {
  return moment().format("MM/DD/yyyy hh:mm:ss");
};

// Random value int
const randomint = () => {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "1");
};

// Random value decimal
const randomDecimal = (decimal: any) => {
  const match = decimal.type.match(/decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/i);

  if (!match) {
    throw new Error("Không đúng định dạng kiểu DECIMAL(p, s)");
  }

  const precision = parseInt(match[1], 10); // Tổng chữ số
  const scale = parseInt(match[2], 10); // Số chữ số phân thập phân

  if (scale > precision) {
    throw new Error("scale không thể lớn hơn precision");
  }

  const integerLength = precision - scale;

  // Trường hợp không cho phép phần nguyên là 0
  const minInteger = integerLength === 1 ? 1 : 0;
  const maxInteger = Math.pow(10, integerLength) - 1;

  let integerPart: number;

  do {
    integerPart = Math.floor(Math.random() * (maxInteger + 1));
  } while (integerPart < minInteger);

  // Xử lý đặc biệt khi scale là 0 (chỉ cần phần nguyên)
  if (scale === 0) {
      return `${integerPart}.0`;
  }

  let decimalPart: string;

  do {
    decimalPart = Math.floor(Math.random() * Math.pow(10, scale))
      .toString()
      .padStart(scale, "0");
  } while (decimalPart.endsWith("0")); // Loại kết thúc bằng 0

  return `${integerPart}.${decimalPart}`;
};
