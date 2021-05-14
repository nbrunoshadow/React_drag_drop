import { useCallback, useState, useEffect } from 'react';
import './App.css';
import { Drop } from './Drop';
import { Table } from './table';

import XLSX from 'xlsx';

function Wrapper({ children }) {
  return (
    <div className="App">
      <header className="App-header">{children}</header>
    </div>
  );
}
//Region	Country	Item Type	Fiscal Year	Sales Channel	Order Priority	Order Date	Order ID	
//Ship Date	Units Sold	Unit Price	Unit Cost	Total Revenue	Total Cost	Total Profit

export default function App() {
  const [state, setState] = useState('WAITING');
  const [{ type, content }, setFile] = useState({});
  const setFileContent = useCallback((data) => {
    setState('PARSING');
    setFile(data);    
  }, []);

  const [json, setJson] = useState([]);

  useEffect(() => {
    if (state !== 'PARSING' || !type || !content) {
      return;
    }

    const workbook = XLSX.read(content, { type });

    const wsname = workbook.SheetNames[1];
    const ws = workbook.Sheets[wsname];

    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    console.info(data);
    setJson(data);

    setState('TABLE');
  }, [state, content, type]);

  let page;
  switch (state) {
    case 'WAITING':
      page = <Drop setFileContent={setFileContent} />;
      break;
    case 'PARSING':
      page = <p>Parsing XLS file</p>;
      break;
    case 'TABLE':
      page = <Table data={json} />;
      break;
    default:
      page = <Drop />;
  }

  return <Wrapper>{page}</Wrapper>;
}
