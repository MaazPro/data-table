import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DataTable from "react-data-table-component";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "blue",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};
function App() {
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setRecords(res.data);
          setFilterRecords(res.data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  return (
    <div style={{ padding: "50px 10%", backgroundColor: "gray" }}>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: "6px 10px" }}
          onChange={handleFilter}
        />
      </div>
      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        selectableRows
      ></DataTable>
    </div>
  );
}

export default App;
