import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Space,
  message,
} from "antd";
import axios from "axios";

const { Column } = Table;
const { Option } = Select;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLinkAgentModalVisible, setIsLinkAgentModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/customers"
      );
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
    setLoading(false);
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/agents");
      setAgents(response.data.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchAgents();
  }, []);

  const addCustomer = async (values) => {
    setLoading(true);
    console.log(values);
    const data = JSON.stringify(values);
    console.log(data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      handleCancel();
      fetchCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
    setLoading(false);
  };

  const editCustomer = async (values) => {
    console.log(currentCustomer);
    console.log(values);
    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/users/${currentCustomer.user_id}`,
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        message.success("Customer updated successfully");
        fetchCustomers();
        handleCancel();
      } else {
        message.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error editing customer:", error);
    }
    setLoading(false);
  };

  const linkAgentToCustomer = async (agentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/customers/${currentCustomer.id}/link-agent`,
        { agent_id: agentId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        message.success("Agent linked successfully");
        fetchCustomers();
        handleCancelLinkAgent();
      } else {
        message.error("Failed to link agent");
      }
    } catch (error) {
      console.error("Error linking agent:", error);
    }
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    console.log(record);
    setCurrentCustomer(record);
    form.setFieldsValue({
      email: record.user.email,
      password: "", // Assuming you don't want to display the password in the form
      type: record.user.type,
      ...record,
    });
    setIsEditModalVisible(true);
  };

  const handleLinkAgent = (record) => {
    setCurrentCustomer(record);
    setIsLinkAgentModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleCancelLinkAgent = () => {
    setIsLinkAgentModalVisible(false);
  };

  const handleDelete = async (record) => {
    setCurrentCustomer(record);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/users/${currentCustomer.user_id}`
      );
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
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
          Add Customer
        </Button>
      </div>
      <Table
        dataSource={customers}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="User ID" dataIndex="user_id" key="user_id" />
        <Column title="First Name" dataIndex="fname" key="fname" />
        <Column title="Middle Name" dataIndex="mname" key="mname" />
        <Column title="Last Name" dataIndex="lname" key="lname" />
        <Column
          title="License Number"
          dataIndex="license_number"
          key="license_number"
        />
        <Column title="Wereda" dataIndex="wereda" key="wereda" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column title="House Number" dataIndex="house_no" key="house_no" />
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
              <Button onClick={() => handleLinkAgent(record)}>
                Link Agent
              </Button>
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
        title="Add Customer"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={addCustomer}>
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
            name="license_number"
            label="License Number"
            rules={[
              { required: true, message: "Please input the license number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="wereda"
            label="Wereda"
            rules={[{ required: true, message: "Please input the wereda!" }]}
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
          <Form.Item
            name="house_no"
            label="House Number"
            rules={[
              { required: true, message: "Please input the house number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_company"
            label="Is company"
            rules={[
              {
                required: true,
                message:
                  "Please select whether the customer is a company or not!",
              },
            ]}
          >
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
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
        title="Edit Customer"
        visible={isEditModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={editCustomer}>
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
            name="license_number"
            label="License Number"
            rules={[
              { required: true, message: "Please input the license number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="wereda"
            label="Wereda"
            rules={[{ required: true, message: "Please input the wereda!" }]}
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
          <Form.Item
            name="house_no"
            label="House Number"
            rules={[
              { required: true, message: "Please input the house number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_company"
            label="Is company"
            rules={[
              {
                required: true,
                message:
                  "Please select whether the customer is a company or not!",
              },
            ]}
          >
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
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
      <Modal
        title="Link Agent"
        visible={isLinkAgentModalVisible}
        footer={null}
        onCancel={handleCancelLinkAgent}
      >
        <Form
          layout="vertical"
          onFinish={({ agent_id }) => linkAgentToCustomer(agent_id)}
        >
          <Form.Item
            name="agent_id"
            label="Select Agent"
            rules={[{ required: true, message: "Please select an agent!" }]}
          >
            <Select placeholder="Select an agent">
              {agents.map((agent) => (
                <Option key={agent.id} value={agent.id}>
                  {agent.mname + " " + agent.lname}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Link
            </Button>
            <Button
              style={{ marginLeft: "8px" }}
              onClick={handleCancelLinkAgent}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Customers;
