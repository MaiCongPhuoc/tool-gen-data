import { useState } from "react";
import "./App.css";
import FormTable from "./component/FormTable";
import FormColumn from "./component/FormColumn";

function App() {
  const [strStatement, setStrStatement] = useState<String>("");
  return (
    <>
      <FormTable statement={setStrStatement} />
      {strStatement != "" && <FormColumn strStatement={strStatement} />}
    </>
  );
}

export default App;
