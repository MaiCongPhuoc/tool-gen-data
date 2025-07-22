import { Button } from "antd";
import { Form, Field } from "react-final-form";

const FormColumn = ({ strStatement }: any) => {
  const onSubmit = (values: any) => {
    console.log("Giá trị gửi đi:", values);
  };
  // console.log("strStatement: ", strStatement);
  const initialValues = strStatement.columns.reduce(
    (acc: any, key: any, index: any) => {
      acc[key] = strStatement.types[index];
      return acc;
    },
    {}
  );
  console.log("initialValues: ", initialValues);
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues} // Giá trị mặc định ban đầu
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {strStatement.columns.map((item: any, index: any) => {
              return (
                <div className="flex justify-center">
                  <span>{item}: </span>
                  <Field name={item}>
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          placeholder="Nhập tên..."
                          className="border"
                        />
                        {meta.touched && meta.error && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              );
            })}

            <Button type="default" htmlType="submit">
              Gửi
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default FormColumn;
