import * as React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";
import Title from "./Title";
import { Container } from "@material-ui/core";

export default function CustomChart({ location, year }) {
  const [tableData, setTableData] = React.useState([]);

  const COLORS = ["#d2d3c9", "#f1d4d4", "#0e918c", "#c060a1", "#07689f", "#f6830f", "#6a097d", "#bb2205", "#ffc93c"];

  const shapeChangedData = (data) => {
    let res = [];
    Object.keys(data).forEach((key) => {
      if (key !== "year" && key !== "total")
        res.push({ name: key, value: data[key] });
    });
    console.log("res", res);
    return res;
  };

  React.useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, year: parseInt(year) }),
    };

    fetch("http://localhost:8000/gdb/custom", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTableData([res]);
      })
      .catch((err) => console.log(err));
  }, [location, year]);

  return (
    tableData.length > 0 && (
      <div
        style={{
          paddingBottom: "38.25%" /* 16:9 */,
          position: "relative",
          height: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "80%",
            height: "80%",
          }}
        >
          {/* <>  */}
          <Title>Statistics</Title>
          <ResponsiveContainer>
            <PieChart
              // data={shapeChangedData(tableData[0])}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
              // width={400}
              // height={400}
            >
              <Pie
                data={shapeChangedData(tableData[0])}
                dataKey="value"
                outerRadius={80}
                paddingAngle={5}
              >
                {shapeChangedData(tableData[0]).map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          {/* </> */}
        </div>
      </div>
    )
  );
}
