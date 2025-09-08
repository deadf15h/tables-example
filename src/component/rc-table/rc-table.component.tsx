import Table from "rc-table";
import { Link } from "react-router-dom";
import { getPath, paths } from "../../const/paths";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 100,
  },
  {
    dataIndex: "address",
    title: "Address",
    key: "address",
    width: 200,
  },
  {
    title: "Operations",
    dataIndex: "",
    key: "operations",
    render: () => <a href="#">Delete</a>,
  },
];

const data = [
  { name: "Jack", age: 28, address: "some where", key: "1" },
  { name: "Rose", age: 36, address: "some where", key: "2" },
];

const RCTable = () => {
  return (
    <div className="">
      <Link to={getPath(paths.TanstackTablePath)}>Tanstack table</Link>

      <Table columns={columns} data={data} />
    </div>
  );
};

export default RCTable;
