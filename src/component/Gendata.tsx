import { RandomData } from "../util";

const Gendata = ({ header, dataGen }: any) => {
  const valuesArray = Object.entries(dataGen)
    .filter(([key, value]) => key !== "lineNumber")
    .map(([key, value]) => value);

  console.log("valuesArray: ", valuesArray);
  return (
    <div className="text-center">
      <span className="text-2xl font-bold">Dữ liệu được tự tạo</span>
      <table>
        <thead>
          <tr>
            {header.map((item: string, index: number) => (
              <th className="p-2" key={`${item}-${index}`}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: dataGen.lineNumber }).map(
            (item: any, index: any) => {
              return (
                <tr key={index}>
                  {valuesArray.map((itemValue: any, indexValue: any) => {
                    return (
                      <td className="border">
                        {header[indexValue].toLowerCase().includes("_flg")
                          ? index % 2
                          : header[indexValue].toLowerCase().includes("_cd")
                          ? RandomData(
                              itemValue,
                              index,
                              header[indexValue].slice(2, 3)
                            )
                          : RandomData(itemValue, index)}
                      </td>
                    );
                  })}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Gendata;
