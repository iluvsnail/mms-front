/**
 * 搜索栏组件
 */
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Col, Input, Row, Form, Button, FormItemProps } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface SearchItem extends FormItemProps {
  render?: ReactNode;
  name: string;
}

interface Props {
  items: SearchItem[];
  onSearch: (params?: Record<string, unknown>) => void;
  params?: Record<string, unknown>; // 受控搜索栏
  showAll?: boolean; // 不收缩，展示全部
}

const YSSearchBar: FC<Props> = ({
  items,
  onSearch,
  params,
  showAll = false,
}) => {
  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (params && form) {
      form.setFieldsValue(params);
    }
  }, [params, form]);

  const formItems = useMemo(() => {
    if (showAll || items.length < 4 || showMore) {
      return items.map((item) => {
        const { render, ...formItemProps } = item;
        return (
          <Col span={6} key={item.name}>
            <Form.Item {...formItemProps}>
              {render || <Input placeholder={`${t("input")} ${item.label}`} />}
            </Form.Item>
          </Col>
        );
      });
    }
    return items.slice(0, 3).map((item) => {
      const { render, ...formItemProps } = item;
      return (
        <Col span={6} key={item.name}>
          <Form.Item {...formItemProps}>
            {render || <Input placeholder={`${t("input")} ${item.label}`} />}
          </Form.Item>
        </Col>
      );
    });
  }, [items, showMore, showAll, t]);

  const onClickSearch = useCallback(() => onSearch(form.getFieldsValue()), [
    form,
    onSearch,
  ]);

  const onClickReset = useCallback(() => {
    form.resetFields();
    onSearch();
  }, [form, onSearch]);

  return (
    <Form
      form={form}
      style={{
        padding: "24px",
        paddingBottom: 0,
      }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Row style={{ borderBottom: "1px solid #f0f0f0" }}>
        {formItems}
        <Col flex={1} style={{ marginBottom: "24px", textAlign: "right" }}>
          <Button
            type="primary"
            style={{ marginRight: "1rem" }}
            onClick={onClickSearch}
            title={t("search")}
          >
            {t("search")}
          </Button>
          <Button onClick={onClickReset} title={t("reset")}>
            {t("reset")}
          </Button>
          {items.length < 4 ? null : (
            <Button
              type="link"
              onClick={() => setShowMore((prev) => !prev)}
              title={showMore ? "收起" : "展开"}
            >
              {showMore ? (
                <>
                  收起 <UpOutlined />
                </>
              ) : (
                <>
                  展开 <DownOutlined />
                </>
              )}
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default YSSearchBar;
