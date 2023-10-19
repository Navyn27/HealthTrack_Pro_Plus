import { CompactTable } from "@table-library/react-table-library/compact";
import { useEffect, useState } from "react";

const COLUMNS = [
  { label: "Patient_ID", renderCell: (item) => item.Patient_id },
  { label: "Patient_Name", renderCell: (item) => item.Patient_Name },
  { label: "Patient_NID", renderCell: (item) => item.Patient_NID },
  { label: "Heart_Rate", renderCell: (item) => item.Heart_Rate },
  { label: "Body_Temp", renderCell: (item) => item.Body_Temp },
  {
    label: "FrequentDisease",
    renderCell: (item) =>
      item.FrequentDisease ? item.FrequentDisease : "Null",
  },
];

const TableData = () => {
  const [nodes, setNodes] = useState([]);

  const fetchDataFromServer = () => {
    fetch("http://localhost:9080/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNodes(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const data = { nodes };
  return <CompactTable columns={COLUMNS} data={data} />;
};

export default TableData;
