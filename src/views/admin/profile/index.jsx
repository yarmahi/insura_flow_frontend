import React from "react";
import {
  Form,
  Input,
  Row,
  InputNumber,
  Button,
  DatePicker,
  message,
  Card,
  Col,
  Checkbox,
  Radio,
} from "antd";
import { useState } from "react";

const Profile = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card>
      <div>
        <Form
          form={form}
          name="add_plan"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16} className=" flex justify-between items-center">
            <Col span={12}>
              <Form.Item
                label="Plan Name"
                name="planName"
                rules={[
                  { required: true, message: "Please input the plan name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Premium"
                name="premium"
                rules={[
                  { required: true, message: "Please input the premium!" },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Coverage Limit"
                name="coverageLimit"
                rules={[
                  {
                    required: true,
                    message: "Please input the coverage limit!",
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Deductible"
                name="deductible"
                rules={[
                  { required: true, message: "Please input the deductible!" },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Effective Date"
                name="effectiveDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the effective date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Select Coverage Details"
                name="coverage"
                rules={[
                  {
                    required: true,
                    message: "Please select the expiration date!",
                  },
                ]}
              >
                <div className=" flex flex-wrap gap-8">
                  <Checkbox>Liablity Coverage</Checkbox>
                  <Checkbox>Collision Coverage</Checkbox>
                  <Checkbox>Comprensive Coverage</Checkbox>
                  <Checkbox>Personal Injury Protection</Checkbox>
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="New Car Replacement"
                name="replacement"
                rules={[
                  {
                    required: true,
                    message: "Please select the expiration date!",
                  },
                ]}
              >
                <div className=" flex flex-wrap gap-8">
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Terms And Conditions"
                name="terms"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Exclutions"
                name="exclutions"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Plan
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Profile;
