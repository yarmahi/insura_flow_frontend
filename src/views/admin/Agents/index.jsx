import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
} from "antd";
import axios from "axios";

const { Column } = Table;

const AgentsTable = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentAgent, setCurrentAgent] = useState(null);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/agents");
      setAgents(response.data.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const addAgent = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      handleCancel();
      fetchAgents();
    } catch (error) {
      console.error("Error adding agent:", error);
    }
    setLoading(false);
  };

  const editAgent = async (values) => {
    setLoading(true);
    console.log(values);
    console.log(currentAgent.user_id);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/${currentAgent.user_id}`,
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        message.success("Agent updated successfully");
        fetchAgents();
        handleCancel();
      } else {
        message.error("Failed to update agent");
      }
    } catch (error) {
      console.error("Error editing agent:", error);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurrentAgent(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (record) => {
    setCurrentAgent(record);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/users/${currentAgent.user_id}}`
      );
      fetchAgents();
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: "16px" }}
        >
          Add Agent
        </Button>
      </div>
      <Table
        dataSource={agents}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="User ID" dataIndex="user_id" key="user_id" />
        <Column title="First Name" dataIndex="fname" key="fname" />
        <Column title="Middle Name" dataIndex="mname" key="mname" />
        <Column title="Last Name" dataIndex="lname" key="lname" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column title="Email" dataIndex={["user", "email"]} key="email" />
        <Column
          title="User Type"
          dataIndex={["user", "type"]}
          key="user_type"
        />
        <Column title="Created At" dataIndex="created_at" key="created_at" />
        <Column title="Updated At" dataIndex="updated_at" key="updated_at" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record)}
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Add Agent"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={addAgent}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="type"
            label="User Type"
            rules={[{ required: true, message: "Please input the user type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fname"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="mname" label="Middle Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="lname"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
            <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Agent"
        visible={isEditModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={editAgent}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="type"
            label="User Type"
            rules={[{ required: true, message: "Please input the user type!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="fname"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="mname" label="Middle Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="lname"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AgentsTable;
