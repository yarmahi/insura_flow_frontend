import React, { useState } from "react";
import { customers } from "./variables/AssignedCustomers";
import Card from "../../../components/card";
import { Button, Col, Drawer, Form, Input, Row, Space, Table } from "antd";

const AgentClaims = () => {
  const dataSource = customers;
  const [searchedText, setSearchedText] = useState("");
  const [openEdit, setOpenEdit] = useState();
  const [currentAgent, setCurrentAgent] = useState({});

  const handleEdit = (record) => {
    console.log(record);
    setCurrentAgent(record);
    setOpenEdit(true);
  };
  const closeModal = (record) => {
    setOpenEdit(false);
  };
  const onClose = () => {
    setOpenEdit(false);
  };
  const saveChanges = () => {
    // Logic to save changes
    closeModal();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAgent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (record) => {
    // Add your delete logic here
    console.log("Delete:", record);
  };

  const claimColumns = [
    {
      title: "Customer Id",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      filteredValue: [searchedText],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "Approved") color = "green";
        else if (status === "Pending") color = "orange";
        else if (status === "Rejected") color = "red";
        else if (status === "In Review") color = "yellow";
        return <span className="">{status}</span>;
      },
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone_number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "policy_number",
      dataIndex: "policy_number",
      key: "policy_number",
    },
    {
      title: "policy_type",
      dataIndex: "policy_type",
      key: "policy_type",
    },
    {
      title: "policy_start_date",
      dataIndex: "policy_start_date",
      key: "policy_start_date",
    },
    {
      title: "policy_end_date",
      dataIndex: "policy_end_date",
      key: "policy_end_date",
    },
    {
      title: "agent_assigned",
      dataIndex: "agent_assigned",
      key: "agent_assigned",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="">
          <>
            {openEdit && (
              <div>
                <Drawer
                  title="Create a new account"
                  width={720}
                  onClose={closeModal}
                  open={openEdit}
                  styles={{
                    body: {
                      paddingBottom: 80,
                    },
                  }}
                  extra={
                    <Space>
                      <Button onClick={onClose}>Cancel</Button>
                      <Button onClick={saveChanges} type="primary">
                        Submit
                      </Button>
                    </Space>
                  }
                >
                  <Form layout="vertical" onChange={handleInputChange}>
                    <div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            {" "}
                            <Input
                              name="id"
                              onChange={handleInputChange}
                              value={currentAgent.id}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            {" "}
                            <Input
                              name="name"
                              onChange={handleInputChange}
                              value={currentAgent.name}
                            />{" "}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            {" "}
                            <Input
                              name="email"
                              type="email"
                              onChange={handleInputChange}
                              value={currentAgent.email}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            {" "}
                            <Input
                              name="phone_number"
                              onChange={handleInputChange}
                              value={currentAgent.phone_number}
                              type=""
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            {" "}
                            <Input value="" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter user name",
                              },
                            ]}
                          >
                            <Input value="" />{" "}
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </Drawer>
              </div>
            )}
          </>
        </div>
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl flex justify-between items-center font-bold w-full text-navy-700 dark:text-white">
            <div className="w-full">Agents Table</div>
            <div className="px-4 flex justify-between items-center">
              <Button type="primary">Add New Agent</Button>
              <Input.Search
                placeholder="Search By Name"
                className="w-[500px] p-2 text-[px]"
                onSearch={(value) => {
                  setSearchedText(value);
                }}
                onChange={(e) => {
                  setSearchedText(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <Table
          dataSource={dataSource}
          columns={claimColumns}
          className="tabelStyle"
        />
      </Card>
    </div>
  );
};

export default AgentClaims;
