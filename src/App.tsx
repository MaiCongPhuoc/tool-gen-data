import { useState } from "react";
import "./App.css";
import FormTable from "./component/FormTable";
import FormColumn from "./component/FormColumn";
import Gendata from "./component/Gendata";

function App() {
  const [strStatement, setStrStatement] = useState<{
    tableName: string;
    columns: String[];
    types: String[];
  }>();
  const [dataGen, setDataGen] = useState<any>();
  return (
    <>
      <FormTable statement={setStrStatement} setDataGen={setDataGen} />
      {strStatement && (
        <FormColumn strStatement={strStatement} setDataGen={setDataGen} />
      )}
      {dataGen && (
        <Gendata
          header={strStatement?.columns}
          dataGen={dataGen}
          tableName={strStatement?.tableName}
        />
      )}
    </>
  );
}

export default App;
