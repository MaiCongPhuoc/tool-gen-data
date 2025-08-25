import { Button } from "antd";
import { RandomData } from "../util";
import { toast, ToastContainer } from "react-toastify";

const Gendata = ({ header, dataGen, tableName }: any) => {
  const valuesArray = Object.entries(dataGen)
    .filter(([key, _]) => key !== "lineNumber")
    .map(([_, value]) => value);
  const tableData: any[][] = [];
  const columnTable = Array.from({ length: dataGen.lineNumber }).map(
    (_, index) => {
      const row: any[] = [];

      const tds = valuesArray.map((itemValue: any, indexValue: any) => {
        let cellContent;
        const headerText = header[indexValue]?.toLowerCase();

        if (headerText && headerText.includes("_flg")) {
          cellContent = index % 2;
        } else if (headerText && headerText.includes("_cd")) {
          cellContent = RandomData(
            itemValue,
            index + 1,
            header[indexValue].slice(0, 1)
          );
        } else if (headerText && headerText.includes("tel")) {
          cellContent = RandomData(itemValue, index + 1, "tel");
        } else {
          cellContent = RandomData(itemValue, index + 1);
        }

        row.push(cellContent);

        return (
          <td className="border" key={`${itemValue}-${indexValue}`}>
            {cellContent}
          </td>
        );
      });

      tableData.push(row);

      return tds;
    }
  );
  // const newTableData = [header, ...tableData];
  tableData.unshift(header);

  const handleCopy = () => {
    // Biến mảng 2D thành chuỗi (mỗi dòng cách nhau \n, mỗi cột cách nhau \t)
    const tsvString = tableData.map((row) => row.join("\t")).join("\n");

    // Copy vào clipboard
    navigator.clipboard
      .writeText(tsvString)
      .then(() => {
        toast.info("Đã copy excel");
      })
      .catch((err) => {
        toast.error("Lỗi copy: ", err);
      });
  };

  const headers = tableData[0];
  const rows = tableData.slice(1);

  // Gom tất cả các dòng thành 1 mảng
  const lines = [
    `${tableName}(${headers.join(",")})`,
    ...rows.map((row, index) => {
      const rowString =
        "    (" +
        row
          .map((val) => (typeof val === "string" ? `"${val}"` : val))
          .join(", ") +
        ")";
      return index < rows.length - 1 ? rowString + "," : rowString + ";";
    }),
  ];

  const handleCopySQL = () => {
    const tsvString = lines.join("\n");
    navigator.clipboard
      .writeText(tsvString)
      .then(() => toast.info("Đã copy câu lệnh mySQL"))
      .catch((err) => toast.error("Lỗi copy: " + err));
  };
  return (
    <div>
      <div className="text-center overflow-y-scroll">
        <span className="text-2xl font-bold">Dữ liệu được tự tạo</span>
        <Button type="primary" htmlType="submit" onClick={handleCopy}>
          Copy excel
        </Button>
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
            {columnTable.map((item: any, index: any) => {
              return <tr key={`${index}`}>{item}</tr>;
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-12 border-t-[1px] border-slate-800 overflow-y-scroll">
        <p className="text-center font-bold text-4xl mb-6">Câu lệnh SQL</p>
        <Button type="primary" htmlType="submit" onClick={handleCopySQL}>
          Copy mySQL
        </Button>
        {lines.map((line, idx) => (
          <p key={idx} className={idx === 0 ? "" : "ml-8"}>
            {idx === 0 ? (
              <>
                <span className="text-sky-600 font-bold">INSERT INTO </span>
                {line.replace(/^INSERT INTO /, "")}
                <span className="text-sky-600 font-bold"> VALUES</span>
              </>
            ) : (
              line
            )}
          </p>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Gendata;
