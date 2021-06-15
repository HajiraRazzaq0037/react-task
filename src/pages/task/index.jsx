import React, { useState } from "react";
import { Form, Input, Button, message, Table, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Todos } from "../../store/actions/infoActions";
import axios from "axios";
const Home = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [data, setData] = useState([]);
  const [page, setPage] = useState([1, 2, 3]);
  const info = useSelector((state) => state?.todos?.todos);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    form.validateFields().then((values) => {
      let dubInfo = [...info];
      dubInfo.push(values);
      dispatch(Todos(dubInfo));
      message.success("todo successfully added");
      form.resetFields();
    });
  };

  // useEffect(() => {
  //   axios.get(`https://reqres.in/api/users?page=${1}`).then((res) => {
  //     setData(res.data.data);
  //   });
  // }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First_name",
      dataIndex: "first_name",
    },
    {
      title: "Last_name",
      dataIndex: "last_name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    axios.get(`https://reqres.in/api/users?page=${value}`).then((res) => {
      setData(res.data.data);
    });
  };

  return (
    <>
      <div className="p-12">
        <Form name="basic" layout="inline" form={form} onFinish={onFinish}>
          <Form.Item
            label="todo"
            name="task"
            rules={[{ required: true, message: "Please input your todo!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Todo
            </Button>
          </Form.Item>
          <Select
            defaultValue="select Page"
            style={{ width: 120 }}
            onChange={(value) => {
              handleChange(value);
            }}
          >
            {page.map((sin, index) => (
              <Option value={index + 1}>{sin}</Option>
            ))}
          </Select>
        </Form>
      </div>

      <div className="m-8 w-1/5">
        {info?.length > 0 && <h1 className="font-bold">Todo list</h1>}
        <ul className="py-8">
          {info.map((sin, index) => (
            <div key={index}>{sin?.task} </div>
          ))}
        </ul>
      </div>

      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default Home;
