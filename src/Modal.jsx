import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import Space from "./Space";

const Label = ({ value }) => <div>{value}</div>;

const ModalComponent = ({
  isOpen,
  title = "",
  onClose,
  handleSubmit,
  value,
  isDisable,
}) => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setFormValue(value);
  }, [value]);
  const handleChange = (event, field) => {
    setFormValue({
      ...formValue,
      [field]: event.target.value,
    });
  };
  const onSubmitForm = () => {
    handleSubmit(formValue);
  };
  return (
    <Modal title={title} open={isOpen} footer={null} onCancel={onClose}>
      <Label value="Name" />
      <Input
        placeholder="Enter Name"
        onChange={(e) => handleChange(e, "name")}
        value={formValue?.name}
        disabled={isDisable}
      />
      <Space />
      <Label value="Email" />
      <Input
        placeholder="Enter Email"
        onChange={(e) => handleChange(e, "email")}
        value={formValue?.email}
        disabled={isDisable}
      />
      <Space />
      <Label value="Password" />
      <Input.Password
        placeholder="Enter Password"
        onChange={(e) => handleChange(e, "password")}
        value={formValue?.password}
        disabled={isDisable}
      />
      <Space />
      {!isDisable && <Button type="primary" onClick={onSubmitForm}>Submit</Button>}
    </Modal>
  );
};

export default ModalComponent;
