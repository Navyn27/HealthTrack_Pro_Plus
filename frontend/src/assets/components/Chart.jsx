import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { useEffect, useState } from "react";

const CustomizedLabel = ({ x, y, value }) => (
  <text x={x} y={y} dy={-10} fill="#000000" textAnchor="middle">
    {value}
  </text>
);

const RenderLineChart = () => {
  // const [patientData, setPatientData] = useState(null);
  const [data, setData] = useState([]);

  const fetchDataFromServer = () => {
    fetch("http://localhost:9080/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);
  return (
    <LineChart
      width={1050}
      height={500}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        type="monotone"
        label={<CustomizedLabel />}
        dataKey="Heart_Rate"
        stroke="#012c5d"
        name="Heart Rate"
      />
      <Line
        type="monotone"
        label={<CustomizedLabel />}
        dataKey="Body_Temp"
        stroke="#BB2200"
        name="Temperature"
      />
      {/* New Line */}
      <CartesianGrid stroke="#525252" strokeDasharray="10 10" />
      <XAxis dataKey="Patient_name" />
      <YAxis />
      <Legend />
    </LineChart>
  );
};

export default RenderLineChart;
