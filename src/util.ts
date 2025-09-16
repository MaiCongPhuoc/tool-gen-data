import moment from "moment";

// const PREFIX_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

// const getPrefixCharByIndexTensDigit = (index: number): string => {
//   const tensDigit = Math.floor(index / 10);
//   const charIndex = tensDigit % PREFIX_CHARS.length;
//   return PREFIX_CHARS[charIndex];
// };

interface MyObject {
  [key: string]: any;
}

export const RandomData = (
  str: any,
  index: number,
  keyData: MyObject,
  key_flg: string,
  defaultValue?: string,
  headerText?: string,
) => {
  switch (true) {
    case str.type.includes("varchar"):
    case str.type.includes("char"):
      const valueChar = randomVarchar(str, index, defaultValue, headerText)
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueChar);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueChar;
    case str.type.includes("blob"):
      const valueBlob = headerText + "_" + renderZero(10) + index;
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueBlob);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueBlob;
    case str.type.includes("smallint"):
      const valueSmallint = randomSmallint();
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueSmallint);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueSmallint;
    case str.type.includes("tinyint"):
      const valueTinyint = randomTinyint();
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueTinyint);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueTinyint;
    case str.type.includes("datetime"):
      const valueDatetime = randomDatetime();
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueDatetime);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueDatetime;
    case str.type.includes("int"):
      const valueInt = randomint();
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueInt);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueInt;
    case str.type.includes("decimal"):
      const valueDecimal = randomDecimal(str);
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueDecimal);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueDecimal;
    case str.type.includes("date"):
      const valueDate = randomDate();
      if(key_flg !== "") {
        const arr = keyData[key_flg];
        arr.push(valueDate);
        keyData[key_flg] = [...new Set(arr)];
      }
      return valueDate;
  }
};

// Random value varchar
const randomVarchar = (
  varchar: any,
  index: number,
  defaultValue?: string,
  headerText?: string
) => {
  if (varchar.custom !== "") {
    if (index < 10) {
      return varchar.custom + "00" + index;
    } else {
      return varchar.custom + "0" + index;
    }
  }
  const match = varchar.type.match(/\((\d+)\)/);
  const varcharNum = Number(match[1]);
  if (headerText && defaultValue === "email") {
    return headerText + index + "@gmail.com";
  }
  if (headerText && defaultValue === "cd") {
    if(varcharNum === 1) {
      return "1";
    }
    if(varcharNum < 10) {
      return headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum) + index;
    } else {
      return headerText?.slice(0, 1).toUpperCase() + renderZero(10) + index;
    }
  }
  if (headerText && defaultValue === "id") {
    if(varcharNum === 1) {
      return "1";
    }
    if(varcharNum < 10) {
      return headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum, index);
    } else {
      return headerText?.slice(0, 1).toUpperCase() + renderZero(10,  index);
    }
  }
  if (defaultValue === "dt" && varcharNum === 8) {
    return moment().subtract(1, "days").format("yyyyMMDD");
  }
  if (defaultValue === "tel") {
    return randomPhoneNumber();
  }
  if (defaultValue) {
    // const unitDigit = index % 10;
    return headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum, index);
    // if (index < 10) {
    //   return defaultValue + renderZero(varcharNum, index);
    // } else {
    // const prefixChar = getPrefixCharByIndexTensDigit(index);
    // return prefixChar + renderZero(varcharNum - 1) + unitDigit;
    //   return defaultValue + renderZero(varcharNum, index);
    // }
  }
  // if (varcharNum === 1) {
  //   // return generateRandomUppercaseLetters(varcharNum, index);
  //   return headerText?.slice(0, 1).toUpperCase();
  // }
  // if (varcharNum === 2) {
  //   // return generateRandomUppercaseLetters(varcharNum, index);
  //   if(index < 10) {
  //     return headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum) + index;
  //   } else {
  //     return index;
  //   }
  // }
  // if (varcharNum < 6) {
  //   // return generateRandomUppercaseLetters(varcharNum, index);
  //   return headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum) + index;
  // }
  // if (varcharNum >= 6 && varcharNum < 30) {
  //   // return generateRandomUppercaseLetters(varcharNum, index);
  //   return "テスト_" + index;
  // }
  // if (varcharNum >= 30) {
  //   // return generateRandomUppercaseLetters(40, index);
  //   return headerText + "_" + "テスト_" + index;
  // }

  switch (true) {
    case varcharNum === 1:
      // return generateRandomUppercaseLetters(varcharNum, index);
      return headerText?.slice(0, 1).toUpperCase();

    case varcharNum === 2:
      // return generateRandomUppercaseLetters(varcharNum, index);
      if (index < 10) {
        return (
          headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum) + index
        );
      } else {
        return index;
      }

    case varcharNum > 2 && varcharNum < 7:
      // return generateRandomUppercaseLetters(varcharNum, index);
      if (index < 10) {
        return (
          headerText?.slice(0, 1).toUpperCase() + renderZero(varcharNum) + index
        );
      } else {
        return (
          headerText?.slice(0, 1).toUpperCase() +
          renderZero(varcharNum - 1) +
          index
        );
      }

    case varcharNum >= 7 && varcharNum < 30:
      // return generateRandomUppercaseLetters(varcharNum, index);
      if (headerText && headerText?.length + 6 <= varcharNum) {
        return headerText + "_テスト_" + index;
      } else {
        const numTemp = varcharNum - 6;
        const headertemp = headerText?.slice(0, numTemp);
        if (headertemp?.endsWith("_")) {
          return headertemp + "テスト_" + index;
        } else {
          return headertemp + "_テスト_" + index;
        }
      }

    case varcharNum >= 30:
      // return generateRandomUppercaseLetters(40, index);
      return headerText + "_" + "テスト_" + index;
  }
};
const randomPhoneNumber = (): string => {
  let phone = "09";

  for (let i = 0; i < 8; i++) {
    phone += Math.floor(Math.random() * 10);
  }

  return phone;
};

// const generateRandomUppercaseLetters = (num: number, index: number) => {
//   let result = "";
//   const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
//   const charactersLength = characters.length;

//   for (let i = 0; i < num - String(index).length; i++) {
//     const randomIndex = Math.floor(Math.random() * charactersLength);
//     result += characters[randomIndex];
//   }

//   return result + index;
// };

const renderZero = (num: number, index?: number) => {
  let result = "";
  if (index) {
    for (let i = 0; i < num - 1 - String(index).length; i++) {
      result += "0";
    }
    return result + index;
  } else {
    for (let i = 0; i < num - 2; i++) {
      result += "0";
    }
    return result;
  }
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
  return moment()
    .subtract(1, "days")
    .subtract(1, "hours")
    .minutes(0)
    .seconds(0)
    .format("yyyy-MM-DD hh:mm:ss");
};

const randomDate = () => {
  return moment().subtract(1, "days").format("yyyy-MM-DD");
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
    return `${integerPart}`;
  }

  let decimalPart: string;

  do {
    decimalPart = Math.floor(Math.random() * Math.pow(10, scale))
      .toString()
      .padStart(scale, "0");
  } while (decimalPart.endsWith("0")); // Loại kết thúc bằng 0

  return `${integerPart}.${decimalPart}`;
};
