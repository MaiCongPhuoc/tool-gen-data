const Gendata = ({ header, dataGen }: any) => {
  console.log("dataGen: ", dataGen);
  return (
    <div>
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
          {Array.from({ length: dataGen.lineNumber }).map(
            (item: any, index: any) => {
              return (
                <tr key={index}>
                  <td>Dòng {index + 1}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Gendata;
