import { useState } from "react";
import "./App.css";
import FormTable from "./component/FormTable";
import FormColumn from "./component/FormColumn";
import Gendata from "./component/Gendata";

function App() {
  const [strStatement, setStrStatement] = useState<{
    columns: String[];
    types: String[];
  }>();
  const [dataGen, setDataGen] = useState<any>();
  return (
    <>
      <FormTable statement={setStrStatement} />
      {strStatement && (
        <FormColumn strStatement={strStatement} setDataGen={setDataGen} />
      )}
      {dataGen && <Gendata header={strStatement?.columns} dataGen={dataGen} />}
    </>
  );
}

export default App;
