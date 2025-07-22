import { Button } from "antd";
import { Form, Field } from "react-final-form";

const FormTable = ({ statement }: any) => {
  const onSubmit = (values: any) => {
    // Dùng lookbehind để lấy phần trong cặp dấu ngoặc đơn cuối cùng
    const match = values.sql.match(
      /CREATE\s+TABLE\s+\w+\s*\(([\s\S]+)\)\s*;?$/i
    );
    if (!match) {
      alert("Không phải là câu lệnh mySQL! Vui lòng nhập lại");
      return;
    }

    const columnSection = match[1];

    // Tách các dòng cột, bỏ qua các dòng định nghĩa constraint
    const columnLines = columnSection
      .split(/,(?![^()]*\))/)
      .map((line: any) => line.trim())
      .filter(
        (line: any) =>
          line.length > 0 &&
          !/^(PRIMARY|FOREIGN|UNIQUE|CHECK|CONSTRAINT|KEY)\b/i.test(line)
      );

    // Tách column và type
    const columns: string[] = [];
    const types: string[] = [];

    columnLines.forEach((line: any) => {
      const match = line.match(/^(\w+)\s+(.+)$/);
      if (match) {
        const [, column, rest] = match;
        // Lấy kiểu chính như VARCHAR(100), DECIMAL(10,2), ...
        const typeMatch = rest.match(/^([A-Z]+(?:\([^)]+\))?)/i);
        const type = typeMatch ? typeMatch[1] : "UNKNOWN";

        columns.push(column);
        types.push(type);
      }
    });
    const table = {
      columns,
      types,
    };
    statement(table);
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{ sql: "" }} // Giá trị mặc định
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Câu lệnh tạo bảng mySQL</label>
              <Field name="sql">
                {({ input }) => (
                  <div>
                    <textarea
                      {...input}
                      placeholder="Nhập câu lệnh mySQL..."
                      rows={5}
                    />
                  </div>
                )}
              </Field>
            </div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default FormTable;
