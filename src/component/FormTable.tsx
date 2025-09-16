import { Button } from "antd";
import { Form, Field } from "react-final-form";
import { toast, ToastContainer } from "react-toastify";

const FormTable = ({ statement, setDataGen }: any) => {
  const onSubmit = (values: any) => {
    // Dùng lookbehind để lấy phần trong cặp dấu ngoặc đơn cuối cùng
    const cleanSql = values.sql.replace(/`/g, "");

    const tableNameMatch = cleanSql.match(/CREATE\s+TABLE\s+`?(\w+)`?/i);
    const tableName = tableNameMatch ? tableNameMatch[1] : null;

    const openIdx = cleanSql.indexOf("(");
    if (openIdx === -1) {
      toast.info("Không phải là câu lệnh mySQL! Vui lòng nhập lại");
      return;
    }

    let closeIdx = openIdx;
    let depth = 0;
    for (let i = openIdx; i < cleanSql.length; i++) {
      const char = cleanSql[i];
      if (char === "(") depth++;
      else if (char === ")") depth--;
      if (depth === 0) {
        closeIdx = i;
        break;
      }
    }

    if (depth !== 0) {
      toast.info("Câu lệnh không hợp lệ do lỗi dấu ngoặc.");
      return;
    }

    const columnSection = cleanSql.slice(openIdx + 1, closeIdx).trim();

    // Tách các dòng cột, bỏ qua các dòng định nghĩa constraint
    const columnLines = columnSection
      .split(/,(?![^()]*\))/)
      .map((line: any) => line.trim())
      .filter(
        (line: any) =>
          line.length > 0 &&
          !/^(PRIMARY|FOREIGN|UNIQUE|CHECK|CONSTRAINT|KEY|PRIMARY KEY)\b/i.test(line)
      );
    const keyTableElement = columnSection
      .split(/,(?![^()]*\))/)
      .map((line: any) => line.trim())
      .filter((line: any) => line.length > 0 &&
          /^(PRIMARY KEY|PRIMARY)\b/i.test(line));
    const keyTable = keyTableElement[0]?.split(/[\(\)]/)[1].split(",");

    // Tách column và type
    const columns: string[] = [];
    const types: string[] = [];

    columnLines.forEach((line: any) => {
      // const match = line.match(/^(\w+)\s+(.+)$/);
      const match = line.match(/^([\w\.]+)\s+(.+)$/);
      if (match) {
        const [, column, rest] = match;
        // Lấy kiểu chính như VARCHAR(100), DECIMAL(10,2), ...
        const typeMatch = rest.match(/^([A-Z]+(?:\([^)]+\))?)/i);
        const type = typeMatch ? typeMatch[1] : "UNKNOWN";

        columns.push(column);
        types.push(type.toLowerCase());
      }
    });
    const table = {
      tableName,
      columns,
      types,
      keyTable
    };
    statement(table);
    setDataGen("");
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Form
        onSubmit={onSubmit}
        initialValues={{ sql: "" }} // Giá trị mặc định
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center">
              <div>
                <label className="text-2xl font-bold">
                  Nhập câu lệnh tạo bảng mySQL
                </label>
                <Field name="sql">
                  {({ input }) => (
                    <div>
                      <textarea
                        {...input}
                        placeholder="Nhập câu lệnh mySQL..."
                        className="border w-[800px]"
                        rows={8}
                      />
                    </div>
                  )}
                </Field>
              </div>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default FormTable;
