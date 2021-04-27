import { Button, Divider, Form, Input, Radio } from "antd";
import { FC } from "react";
import { DatePicker } from "../YSDatePicker";

const BasicForm: FC = () => {
  return (
    <div style={{ paddingTop: "1rem" }}>
      <h2>简单表单演示</h2>
      <Divider />
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Form.Item label="Title" required>
          <Input placeholder="Give the target a name" />
        </Form.Item>
        <Form.Item label="Start and end date" required>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Goal description" required>
          <Input.TextArea placeholder="Please enter your work goals" />
        </Form.Item>
        <Form.Item label="Metrics" required>
          <Input.TextArea placeholder="Please enter a metric" />
        </Form.Item>
        <Form.Item label="Client">
          <Input placeholder="Please describe your customer service, internal customers directly @ Name / job number" />
        </Form.Item>
        <Form.Item label="Inviting critics">
          <Input placeholder="Please direct @ Name / job number, you can invite up to 5 people" />
        </Form.Item>
        <Form.Item label="Weight">
          <Input suffix="%" placeholder="Please enter the weight" />
        </Form.Item>
        <Form.Item
          label="Target disclosure"
          help="Customers and invitees are shared by default"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="partially">Partially public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
        <div style={{ marginTop: '1.5rem', marginLeft: '33%' }}>
          <Button type="primary" style={{ marginRight: "1.5rem" }}>Submit</Button>
          <Button>Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default BasicForm;
