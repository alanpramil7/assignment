import { Radio } from "antd";

const options = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Accumulator",
    value: "accumulator",
  },
];

const RadioGroup = ({ value, onChange }) => {
  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={value}
      optionType="button"
    />
  );
};

export default RadioGroup;
