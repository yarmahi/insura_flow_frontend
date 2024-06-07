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

const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLinkAgentModalVisible, setIsLinkAgentModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentClaim, setCurrentClaim] = useState(null);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/claims");
      setClaims(response.data.data);
    } catch (error) {
      console.error("Error fetching claims:", error);
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
    fetchClaims();
    fetchAgents();
  }, []);

  const addClaim = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/claims",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      handleCancel();
      fetchClaims();
    } catch (error) {
      console.error("Error adding claim:", error);
    }
    setLoading(false);
  };

  const editClaim = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/claims/${currentClaim.id}`,
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        message.success("Claim updated successfully");
        fetchClaims();
        handleCancel();
      } else {
        message.error("Failed to update claim");
      }
    } catch (error) {
      console.error("Error editing claim:", error);
    }
    setLoading(false);
  };

  const linkAgentToClaim = async (agentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/claims/${currentClaim.id}/link-agent`,
        { agent_id: agentId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        message.success("Agent linked successfully");
        fetchClaims();
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
    setCurrentClaim(record);
    form.setFieldsValue({
      ...record,
    });
    setIsEditModalVisible(true);
  };

  const handleLinkAgent = (record) => {
    setCurrentClaim(record);
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
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/claims/${record.id}`);
      fetchClaims();
    } catch (error) {
      console.error("Error deleting claim:", error);
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
          Add Claim
        </Button>
      </div>
      <Table
        dataSource={claims}
        rowKey="id"
        loading={loading}
        scroll={{ x: "max-content" }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Latitude" dataIndex="latitude" key="latitude" />
        <Column title="Longitude" dataIndex="longitude" key="longitude" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Time of Accident"
          dataIndex="time_of_accident"
          key="time_of_accident"
        />
        <Column title="Status" dataIndex="status" key="status" />
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
        title="Add Claim"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={addClaim}>
          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true, message: "Please input the latitude!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true, message: "Please input the longitude!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time_of_accident"
            label="Time of Accident"
            rules={[
              { required: true, message: "Please input the time of accident!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
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
        title="Edit Claim"
        visible={isEditModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={editClaim}>
          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true, message: "Please input the latitude!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true, message: "Please input the longitude!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time_of_accident"
            label="Time of Accident"
            rules={[
              { required: true, message: "Please input the time of accident!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button style={{ marginLeft: "8px" }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Link Agent to Claim"
        visible={isLinkAgentModalVisible}
        footer={null}
        onCancel={handleCancelLinkAgent}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={({ agentId }) => linkAgentToClaim(agentId)}
        >
          <Form.Item
            name="agentId"
            label="Select Agent"
            rules={[{ required: true, message: "Please select an agent!" }]}
          >
            <Select>
              {agents.map((agent) => (
                <Option key={agent.id} value={agent.id}>
                  {agent.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Link Agent
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

export default Claims;
