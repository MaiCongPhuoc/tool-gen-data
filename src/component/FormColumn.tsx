import { Button } from "antd";
import { Form, Field } from "react-final-form";

const FormColumn = ({ strStatement }: any) => {
  const onSubmit = (values: any) => {
    console.log("Giá trị gửi đi:", values);
  };
  // console.log("strStatement: ", strStatement);
  const initialValues = strStatement.columns.reduce(
  (acc: any, key: any, index: any) => {
    acc[key] = {
      type: strStatement.types[index],
      custom: '' // Thêm trường custom mặc định
    };
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
                  <Field name={`${item}.type`}>
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          placeholder="Nhập tên..."
                          className="border p-2 rounded"
                        />
                        {meta.touched && meta.error && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  {strStatement.types[index].includes('VARCHAR')  &&
                    <Field name={`${item}.custom`}>
                      {({ input, meta }) => (
                        <div className="flex flex-col">
                          <input
                            {...input}
                            placeholder="Giá trị tùy chỉnh"
                            className="border p-2 rounded"
                          />
                        </div>
                      )}
                    </Field>
                  }
                </div>
              );
            })}

            <Button type="default" htmlType="submit">
              Gen Data
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default FormColumn;
