/**
 * 公共表格组件（前端分页）
 */
import {
  Button,
  Dropdown,
  Menu,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
} from "antd";
import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import {
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface Props<RecordType = any> extends TableProps<RecordType> {
  dataSource: RecordType[];
  tableTitle?: string;
  onAdd?: () => void; // 设置之后展示新建按钮
  onBatchDel?: () => void; // 设置之后展示删除按钮
  onBatchLock?: () => void;
  onBatchResetPassword?: () => void;
  onRefresh?: () => void; // 设置之后展示刷新按钮
  showSizeChanger?: boolean;
  // TODO: 设置之后展示列项编辑功能
  showColumnsChanger?: boolean;
}

const tableSizeList = ["default", "middle", "small"];

const DEFAULT_PAGE_SIZE = 10;

const YSTable: FC<Props> = ({
  dataSource,
  tableTitle,
  onAdd,
  onBatchDel,
                              onBatchLock,
                              onBatchResetPassword,
  onRefresh,
  showSizeChanger = true,
  showColumnsChanger,
  ...tableProps
}) => {
  const { t, i18n } = useTranslation("common");
  const [tableSize, setTableSize] = useState(tableSizeList[0]);

  // 提取出需要修改的属性，其他的属性直接放入Table组件
  const { pagination, ...otherTableProps } = tableProps;

  const sizeOverLay = useMemo(
    () => (
      <Menu
        onClick={(info) => setTableSize(info.key as string)}
        selectedKeys={[tableSize]}
      >
        {tableSizeList.map((s) => (
          <Menu.Item key={s}>{t(`tableSize.${s}`)}</Menu.Item>
        ))}
      </Menu>
    ),
    [t, tableSize]
  );

  const showTotal = (total: number, range: [number, number]) => {
    if (i18n.language === 'zh') {
      return `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`;
    }
    return `${t("range")}: ${range[0]}-${range[1]} / ${t('total')}: ${total}`;
  };

  const paginationConfig: TablePaginationConfig = {
    showSizeChanger: true,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    showTotal,
    ...pagination,
  };

  return (
    <StyledTable>
      <StyledTableHeader>
        <div style={{ flex: 1 }}>{tableTitle || ""}</div>
        <div style={{ flex: 1, textAlign: "right" }}>
          {onAdd ? (
            <Button type="primary" onClick={onAdd} title={t("add")}>
              <PlusOutlined /> {t("add")}
            </Button>
          ) : null}
          {onBatchDel ? (
              <Button  onClick={onBatchDel} title={t("batchDel")}
                       style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("delete")}
              </Button>
          ) : null}
          {onBatchLock ? (
              <Button  onClick={onBatchLock} title={t("batchLock")}
                       style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("lock")}
              </Button>
          ) : null}
          {onBatchResetPassword ? (
              <Button  onClick={onBatchResetPassword } title={t("batchResetPassword ")}
                       style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("resetPassword")}
              </Button>
          ) : null}
          {onRefresh ? (
            <Tooltip title={t("refresh")}>
              <ReloadOutlined
                style={{ marginLeft: "1rem", cursor: "pointer" }}
                onClick={onRefresh}
              />
            </Tooltip>
          ) : null}
          {showSizeChanger ? (
            <Tooltip title={t("density")}>
              <Dropdown overlay={sizeOverLay} trigger={["click"]}>
                <ColumnHeightOutlined
                  style={{ marginLeft: "1rem", cursor: "pointer" }}
                />
              </Dropdown>
            </Tooltip>
          ) : null}
          {showColumnsChanger ? (
            <Tooltip title={t("columnSetting")}>
              <SettingOutlined
                style={{ marginLeft: "1rem", cursor: "pointer" }}
              />
            </Tooltip>
          ) : null}
        </div>
      </StyledTableHeader>
      <Table
        dataSource={dataSource}
        pagination={paginationConfig}
        // @ts-ignore
        size={tableSize}
        {...otherTableProps}
      />
    </StyledTable>
  );
};

const StyledTable = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledTableHeader = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
`;

export default YSTable;
