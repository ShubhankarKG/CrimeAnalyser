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
} from "recharts";
import Title from "./Title";
import { Tooltip } from "@material-ui/core";

export default function CustomChart({ chartData }) {
  let shapeChangedData = [];
  Object.keys(chartData).forEach((key) => {
    shapeChangedData.push({ name: key, value: chartData[key] });
  });

  return (
    <React.Fragment>
      <Title>Statistics</Title>
      {console.log(shapeChangedData)}
      <ResponsiveContainer>
        <PieChart
          data={shapeChangedData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Pie dataKey="value" color="#8884d8" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
