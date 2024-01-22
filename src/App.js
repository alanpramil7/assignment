import "./App.css";
import Chart from "./components/Chart";
import jsondata from "./mockupdata.json";
import { DatePicker, Row, Col, Form } from "antd";
import { useEffect, useState } from "react";
import Selection from "./components/Select";
import RadioGroup from "./components/Radio";

const { RangePicker } = DatePicker;

const keys = Object.keys(jsondata);

function App() {
  const [label, setLabel] = useState(keys[0]);
  const [data, setData] = useState(jsondata[label]);
  const [value, setValue] = useState("daily");
  const [form] = Form.useForm();

  // useEffect(() => {
  //   setData(jsondata[label]);
  // }, [label]);

  // const onCalenderChange = (values) => {
  //   const date = values;
  //   const startDate = date[0].format("YYYY-MM-DD");
  //   const lastDate = date[1].format("YYYY-MM-DD");
  //   const resultData = data.filter((a) => {
  //     const date = new Date(a.date).toISOString().slice(0, 10);
  //     // or moment.js
  //     return date >= startDate && date <= lastDate;
  //   });
  //   setData(resultData);
  // };
  //
  // const onSelectChange = (value) => {
  //   setLabel(value);
  //   setData(jsondata[value]);
  // };
  //
  const accumulateData = (data, label) => {
    const accumulatedResult = [];
    const acumulatedValues = {};

    data.forEach((item) => {
      const { date, productCode } = item;
      if (!(productCode in acumulatedValues)) {
        acumulatedValues[productCode] = 0;
      }
      acumulatedValues[productCode] += item[label];
      // console.log(acumulatedValues);
      accumulatedResult.push({
        date,
        productCode,
        [label]: acumulatedValues[productCode],
      });
    });
    return accumulatedResult;
  };
  //
  // const onRadioChange = ({ target: { value } }) => {
  //   setValue(value);
  //   if (value === "daily") {
  //     setData(jsondata[label]);
  //   } else if (value === "accumulator") {
  //     const radioResult = accumulateData(data, label);
  //     setData(radioResult);
  //   }
  // };

  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues);
    console.log(allValues);

    const rangeValue = allValues["rangepicker"];
    const selectionValue = allValues["selection"];
    const radioValue = allValues["radiogroup"];
    console.log(rangeValue);
    console.log(selectionValue);
    console.log(radioValue);

    let newData = jsondata[selectionValue];

    if (rangeValue && rangeValue.length === 2) {
      const startDate = rangeValue[0].format("YYYY-MM-DD");
      const lastDate = rangeValue[1].format("YYYY-MM-DD");
      newData = newData.filter((item) => {
        const date = new Date(item.date).toISOString().slice(0, 10);
        // console.log(date);
        return date >= startDate && date <= lastDate;
      });
    }
    console.log(newData);
    setLabel(selectionValue);

    if (radioValue === "accumulator") {
      newData = accumulateData(newData, selectionValue);
    }

    setValue(radioValue);
    setData(newData);
  };

  return (
    <div>
      <Form
        form={form}
        onValuesChange={onValuesChange}
        initialValues={{
          rangepicker: [],
          selection: "count",
          radiogroup: "daily",
        }}
      >
        <Row>
          <Col
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 6,
              offset: 2,
            }}
          >
            <Form.Item name="rangepicker">
              <RangePicker /* onChange={onCalenderChange} */ />
            </Form.Item>
          </Col>
          <Col
            xs={{
              span: 11,
              offset: 1,
            }}
            lg={{
              span: 6,
              offset: 2,
            }}
          >
            <Form.Item name="selection">
              <Selection /* onChange={onSelectChange} */ keys={keys} />
            </Form.Item>
          </Col>
          <Col
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 6,
              offset: 2,
            }}
          >
            <Form.Item name="radiogroup">
              <RadioGroup value={value} /* onChange={onRadioChange} */ />
            </Form.Item>
          </Col>
        </Row>
        <Chart data={data} label={label} />
        {/* <div> */}
        {/*   <RangePicker onChange={onCalenderChange} /> */}
        {/*   <Selection onChange={onSelectChange} keys={keys} /> */}
        {/*   <RadioGroup value={value} onChange={onRadioChange} /> */}
        {/*   <Chart data={data} label={label} /> */}
        {/* </div> */}
      </Form>
    </div>
  );
}

export default App;
