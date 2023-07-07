import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Spin } from "antd";
import TableIcons from "./TableIcons";
import { post, get, deleteData } from "./service";
import ModalComponent from "./Modal";

const headings = {
  edit: "Edit User",
  view: "View User",
  add: "Add User",
};
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [mode, setMode] = useState("add");
  const formRef = useRef(null);

  const getList = async () => {
    const list = await get("users");
    console.log("list ::: ", list);
    setLoading(false);
    setContacts(list);
  };

  useEffect(() => {
    getList();
  }, []);

  async function onActionClick(data) {
    console.log("data", data);
    if (data.name === "edit" || data.name === "view") {
      formRef.current = contacts.find((item) => item.id === data.record.id);
      setMode(data.name);
      setIsOpen(true);
    }
    if (data.name === "delete") {
      const isSuccess = await deleteData(`users/${data.record.id}`);
      if (isSuccess) {
        getList();
      }
    }
  }

  const columns = [
    {
      title: "#",
      dataIndex: "slno",
      key: "slno",
      render: (_, record, index) => (
        <>
          <div>{index + 1}</div>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <>
          <TableIcons
            record={record}
            Icon={<EditOutlined />}
            name="edit"
            onActionClick={onActionClick}
          />
          <TableIcons
            record={record}
            Icon={<DeleteOutlined />}
            name="delete"
            onActionClick={onActionClick}
          />
          <TableIcons
            record={record}
            Icon={
              <div>
                <a>View</a>
              </div>
            }
            name="view"
            onActionClick={onActionClick}
          />
        </>
      ),
    },
  ];

  const handleAdd = () => {
    console.log("handleAdd");
    formRef.current = null;
    setMode("add");
    setIsOpen(!isOpen);
  };

  const onSubmitForm = async (values) => {
    console.log("values", values);
    if (Object.values(values).includes("")) {
      console.log("Somethin mising");
    } else {
      setIsOpen(false);
      const newContact = {
        key: nanoid(),
        name: values.name,
        password: values.password,
        email: values.email,
      };
      let method = "POST";
      let body = newContact;
      const url = "users";
      if (mode === "edit") {
        method = "PUT";
        body.id = values.id;
      }
      const postData = await post(url, body, method);
      console.log("postData", postData);
      if (postData) {
        getList();
      }
    }
  };

  const MainComponent = () => {
    return (
      <div className="app-container">
        <div className="header">
          <h2>Users</h2>
          <Button
            onClick={handleAdd}
            style={{
              marginTop: 25,
            }}
          >
            Add
          </Button>
        </div>
        <Table dataSource={contacts} columns={columns} />;
        <ModalComponent
          title={headings[mode]}
          isOpen={isOpen}
          onClose={handleAdd}
          handleSubmit={onSubmitForm}
          value={formRef.current}
          isDisable={mode === "view"}
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <Spin tip="Loading...">
        <MainComponent />
      </Spin>
    );
  }
  return <MainComponent />;
};

export default App;
