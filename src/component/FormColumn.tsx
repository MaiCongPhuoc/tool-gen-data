import { Button } from "antd";
import { Form, Field } from "react-final-form";

const FormColumn = ({ strStatement, setDataGen }: any) => {
  const onSubmit = (values: any) => {
    setDataGen(values);
  };
  const initialValues = strStatement.columns.reduce(
    (acc: any, key: any, index: any) => {
      acc[key] = {
        type: strStatement.types[index],
        custom: "", // Thêm trường custom mặc định
      };
      if (index === 0) {
        acc.lineNumber = 1;
      }
      return acc;
    },
    {}
  );
  return (
    <div className="text-center">
      <span className="text-2xl font-bold">Các cột</span>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues} // Giá trị mặc định ban đầu
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="lineNumber"
                parse={(value) => (value === "" ? 0 : parseInt(value))}
              >
                {({ input }) => (
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-xl text-lime-600">
                      Nhập số dòng:{" "}
                    </span>
                    <input
                      {...input}
                      placeholder="Nhập số dòng..."
                      className="border p-2 rounded"
                      type="number"
                    />
                  </div>
                )}
              </Field>
              <div className="h-96 overflow-x-scroll">
                {strStatement.columns.map((item: any, index: any) => {
                  return (
                    <div
                      // className="flex justify-center items-center gap-2"
                      className="grid grid-cols-3 pb-1"
                      key={`${item}-${index}`}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <span>{index + 1}</span>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <span>{item}: </span>
                        <Field name={`[${item}].type`}>
                          {({ input }) => (
                            <div>
                              <input
                                {...input}
                                placeholder="Nhập tên..."
                                className="border p-2 rounded"
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div>
                        {strStatement.types[index].includes("varchar") && (
                          <Field name={`${item}.custom`}>
                            {({ input }) => (
                              <div className="flex flex-col">
                                <input
                                  {...input}
                                  placeholder="Giá trị tùy chỉnh"
                                  className="border p-2 rounded"
                                />
                              </div>
                            )}
                          </Field>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button type="primary" htmlType="submit">
              Gen Data
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default FormColumn;
