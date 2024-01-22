import { Select } from "antd";

const Selection = ({ onChange, keys }) => {
  const options = keys.map((key) => ({
    value: key,
    label: key,
  }));

  return (
    <Select
      defaultValue={keys[0]}
      style={{
        width: 120,
      }}
      onChange={onChange}
      options={options}
    />
  );
};

export default Selection;
