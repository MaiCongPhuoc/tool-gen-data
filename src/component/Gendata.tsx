import { RandomData } from "../util";

const Gendata = ({ header, dataGen }: any) => {
  const valuesArray = Object.entries(dataGen)
    .filter(([key, _]) => key !== "lineNumber")
    .map(([_, value]) => value);
    console.log('valuesArray: ', valuesArray)
  const columnTable = Array.from({ length: dataGen.lineNumber }).map((_, index) => {
    return valuesArray.map((itemValue: any, indexValue: any) => {
        let cellContent;
        const headerText = header[indexValue]?.toLowerCase();

        if (headerText && headerText.includes("_flg")) {
            cellContent = index % 2;
        } else if (headerText && headerText.includes("_cd")) {
            cellContent = RandomData(
                itemValue,
                index,
                header[indexValue].slice(0, 2)
            );
        } else if (headerText && headerText.includes("tel")) {
            cellContent = RandomData(itemValue, index, "tel");
        } else {
            cellContent = RandomData(itemValue, index);
        }

        return (<td className="border" key={`${itemValue}-${indexValue}`}>{cellContent}</td>);
    })
  });
  return (
    <div className="text-center overflow-y-scroll">
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
          {
            columnTable.map((item: any, index: any) => {
              return(
                <tr key={`${index}`}>
                  {item}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Gendata;
