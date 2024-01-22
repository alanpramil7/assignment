import { Column } from "@ant-design/plots";

const Chart = ({ data, label }) => {
  // console.log("Data form app: ", data[0]);
  // console.log("Data form app: ", label);

  const config = {
    data,
    xField: "date",
    yField: label,
    seriesField: "productCode",
  };
  return <Column key={label} {...config} />;
};

export default Chart;
