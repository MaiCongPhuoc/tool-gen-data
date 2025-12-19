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
    keyTable: String[];    
  }>();
  const [dataGen, setDataGen] = useState<any>();
  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <FormTable statement={setStrStatement} setDataGen={setDataGen} />
        {strStatement && (
          <FormColumn strStatement={strStatement} setDataGen={setDataGen} />
        )}
      </div>
      {dataGen && (
        <Gendata
          header={strStatement?.columns}
          dataGen={dataGen}
          tableName={strStatement?.tableName}
          keyTable={strStatement?.keyTable}
        />
      )}
    </>
  );
}

export default App;
