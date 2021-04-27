import { Button, Divider, Form, Input, Select, Steps } from "antd";
import { FC } from "react";
import { DatePicker } from "../YSDatePicker";

const StepForm: FC = () => {
  return (
    <div style={{ paddingTop: "1rem" }}>
      <h2>分步表单演示</h2>
      <Divider />
      <div style={{ width: "30vw", margin: "0 auto" }}>
        <Steps current={0} style={{ margin: "2rem 0" }}>
          <Steps.Step title="填写任务信息" />
          <Steps.Step title="确认任务流程" />
          <Steps.Step title="完成" />
        </Steps>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="任务名称" required>
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item label="起止时间" required>
            <DatePicker.RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="分配人员" required>
            <Select
              showSearch
              optionFilterProp="children"
              mode="multiple"
              placeholder="请选择人员"
            >
              <Select.Option value="1">张三</Select.Option>
              <Select.Option value="2">李四</Select.Option>
              <Select.Option value="3">王五</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="任务描述">
            <Input.TextArea placeholder="请输入任务描述信息" />
          </Form.Item>
          <Form.Item label="备注信息">
            <Input.TextArea placeholder="其他备注信息" />
          </Form.Item>
          <div style={{ marginLeft: "25%" }}>
            <Button type="primary">下一步</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StepForm;
