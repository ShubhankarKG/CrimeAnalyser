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
} from "recharts";
import Title from "./Title";
import { Tooltip } from "@material-ui/core";

export default function Chart() {
  const theme = useTheme();

  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/gdb/location")
      .then((res) => res.json())
      .then((res) => {
        setChartData(res.result.sort((a, b) => a.year - b.year));
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Title>Statistics</Title>
      <ResponsiveContainer>
        <BarChart
          data={chartData.slice(0, 10)}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="location" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
              }}
            >
              Total Crimes
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="Burglary" fill="#8884d8" />
          <Bar dataKey="Theft" fill="#8844d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
