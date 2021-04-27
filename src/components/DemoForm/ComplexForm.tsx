import { FC } from "react";
import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import styled from "styled-components";
import { CheckOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ComplexForm: FC = () => {
    return (
        <div style={{ paddingTop: "1rem" }}>
            <h2>复杂表单演示</h2>
            <Form>
                {[1, 2].map((cardKey) => (
                    <StyledCard title={`Form${cardKey}`} key={cardKey}>
                        <Row gutter={24}>
                            {[1, 2, 3, 4, 5, 6].map((key) => (
                                <Col span={8} key={key}>
                                    <Form.Item label={`字段${key}`}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            ))}
                        </Row>
                    </StyledCard>
                ))}
                <StyledCard title="成员管理">
                    <Table
                        columns={[
                            { dataIndex: "name", title: "姓名" },
                            { dataIndex: "job", title: "职业" },
                            { dataIndex: "level", title: "等级" },
                            {
                                dataIndex: "OPERATIONS",
                                title: "操作",
                                render: () => (
                                    <>
                                        <Button
                                            type="link"
                                            icon={<EditOutlined />}
                                            title="编辑"
                                            size="small"
                                            style={{ marginRight: ".5rem" }}
                                        />
                                        <Button
                                            icon={<DeleteOutlined />}
                                            title="删除"
                                            size="small"
                                            type="link"
                                        />
                                    </>
                                ),
                            },
                        ]}
                        dataSource={[1, 2, 3, 4, 5].map((k) => ({
                            id: k,
                            name: `人员${k}`,
                            job: `职业${k}`,
                            level: `等级${k}`,
                        }))}
                        pagination={false}
                    />
                </StyledCard>
            </Form>
            <div style={{ position: "absolute", bottom: "5rem", left: "50%" }}>
                <Button type="primary">
                    <CheckOutlined /> 提交
                </Button>
            </div>
        </div>
    );
};

export default ComplexForm;

const StyledCard = styled(Card)`
  margin-bottom: 2rem;
`;
