import Card from "../../../components/card";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [addForm, setAddForm] = useState(false);

  const [form] = Form.useForm();

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/vehicles");
      setVehicles(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      message.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Plate Number",
      dataIndex: "plate_number",
      key: "plate_number",
    },
    {
      title: "Engine Number",
      dataIndex: "engine_number",
      key: "engine_number",
    },
    {
      title: "Type Of Body",
      dataIndex: "type_of_body",
      key: "type_of_body",
    },
    {
      title: "Horse Power",
      dataIndex: "horse_power",
      key: "horse_power",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className=" flex">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log(record);
    const updatedRecord = { ...record, customer_id: record.customer.id || 1 }; // Set a default value if customer_id is missing
    form.setFieldsValue(updatedRecord);
    setVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/vehicles/${values.id}`,
        values
      );
      if (response.status === 200) {
        message.success("Vehicle updated successfully");
        fetchVehicles(); // Refresh vehicle list
        handleCancel();
      } else {
        message.error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      if (error.response && error.response.data) {
        message.error(
          `Failed to update vehicle: ${error.response.data.message}`
        );
      } else {
        message.error("Failed to update vehicle");
      }
    }
  };
  const handleDelete = async (record) => {
    try {
      const ID = record.id;

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/vehicles/${ID}`
      );
      if (response.status === 200 || response.status === 204) {
        message.success("Vehicle Deleted successfully");
        fetchVehicles(); // Refresh vehicle list
      } else {
        message.error("Failed to Delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      if (error.response && error.response.data) {
        message.error(
          `Failed to update vehicle: ${error.response.data.message}`
        );
      } else {
        message.error("Failed to delete vehicle");
      }
    }
  };

  return (
    <div className=" mt-4">
      <Card>
        <div>
          <Button type="primary" onClick={() => setVisible(true)}>
            Add Vehicle
          </Button>
          <Table columns={columns} dataSource={vehicles} loading={loading} />
          <Modal
            title="Edit Vehicle"
            visible={visible}
            onCancel={handleCancel}
            onOk={handleSave}
          >
            <Form form={form} layout="vertical">
              <Form.Item name="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item
                hidden
                name="customer_id"
                label="Customer ID"
                rules={[
                  { required: true, message: "Please enter customer ID" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="plate_number"
                label="Plate Number"
                rules={[
                  { required: true, message: "Please enter plate number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="engine_number"
                label="Engine Number"
                rules={[
                  { required: true, message: "Please enter engine number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="chassis_number"
                label="Chassis Number"
                rules={[
                  { required: true, message: "Please enter chassis number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="model"
                label="Model"
                rules={[{ required: true, message: "Please enter model" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="type_of_body"
                label="Type Of Body"
                rules={[
                  { required: true, message: "Please enter type of body" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="horse_power"
                label="Horse Power"
                rules={[
                  { required: true, message: "Please enter horse power" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="year_manufactured"
                label="Year Manufactured"
                rules={[
                  { required: true, message: "Please enter year manufactured" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="year_of_purchased"
                label="Year of Purchase"
                rules={[
                  { required: true, message: "Please enter year of purchase" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passenger_carrying_capacity"
                label="Passenger Carrying Capacity"
                rules={[
                  {
                    required: true,
                    message: "Please enter passenger carrying capacity",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="goods_carrying_capacity"
                label="Goods Carrying Capacity"
                rules={[
                  {
                    required: true,
                    message: "Please enter goods carrying capacity",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Card>
    </div>
  );
};

export default Vehicles;
