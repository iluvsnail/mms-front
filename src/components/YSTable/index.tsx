/**
 * 公共表格组件（前端分页）
 */
import {
  Button,
  Dropdown,
  Menu, Popconfirm,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Radio, Input, Checkbox
} from "antd";
import React, { FC, useMemo, useState } from "react";
import styled from "styled-components";
import {
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {ICodecriterion} from "../../models/codecriterion";

interface Props<RecordType = any> extends TableProps<RecordType> {
  dataSource: RecordType[];
  codes?: ICodecriterion[];
  onCodeChange?:(v:string)=>void;
  onSearch?:(v:string)=>void;
  onShowAdded?:(v:boolean)=>void;
  its?:string[];
  tableTitle?: string;
  onAdd?: () => void; // 设置之后展示新建按钮
  onBatchPrint?:(its:string[])=>void;
  onBatchDel?: (its:string[]) => void; // 设置之后展示删除按钮
  onBatchLock?: (its:string[]) => void;
  onScan?: () => void;
  onBatchReceived?: (its:string[]) => void;
  onBatchRevoke?: (its:string[]) => void;
  onBatchUploadReport?: (its:string[]) => void;
  onBatchSend?: (its:string[]) => void;
  onBatchResetPassword?: (its:string[]) => void;
  onBatchImport?:(its:string[])=>void;
  onBatchExport?:(its:string[])=>void;
  onBatchFinish?:(its:string[])=>void;
  onUpdateTracing?:(its:string[])=>void;
  onRefresh?: () => void; // 设置之后展示刷新按钮
  showSizeChanger?: boolean;
  // TODO: 设置之后展示列项编辑功能
  showColumnsChanger?: boolean;
}

const tableSizeList = ["default", "middle", "small"];

const DEFAULT_PAGE_SIZE = 10;

const YSTable: FC<Props> = ({
  dataSource,
    codes,
    onCodeChange,
    onSearch,
                              onShowAdded,
    its,
  tableTitle,
  onAdd,
                              onBatchPrint,
  onBatchDel,
                              onBatchLock,
                              onBatchResetPassword,
    onBatchImport,
    onBatchExport,
                              onBatchFinish,
                              onUpdateTracing,
  onRefresh,
    onScan,
    onBatchReceived,
    onBatchRevoke,
                              onBatchUploadReport,
                              onBatchSend,
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
const codesRadio=codes?.map(v => {
 return <Radio value={v.id}>{v.criterionName}</Radio>
})
  return (
    <StyledTable>
      <StyledTableHeader>
        <div style={{ flex: 1 }}>
          {tableTitle || ""}
          {codes && onCodeChange? (
              <Radio.Group onChange={(e)=>onCodeChange(e.target.value)}>
              ${codesRadio}
              </Radio.Group>
          ):null }
          {
            onShowAdded?(
                <Checkbox onChange={(e)=>{onShowAdded(e.target.checked)}}>{t("onShowAdded")}</Checkbox>
            ):null
          }
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          {onAdd ? (
            <Button type="primary" onClick={onAdd} title={t("add")}>
              <PlusOutlined /> {t("add")}
            </Button>
          ) : null}
          {onBatchPrint ? (
              <Button onClick={()=>onBatchPrint(its?its:[])}
                      title={t("batchPrint")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchPrint")}
              </Button>
          ) : null}
          {onBatchDel ? (

              <Popconfirm
                  onConfirm={() => onBatchDel(its?its:[])}
                  title={t("common:confirmDelete")}
              >
              <Button  title={t("batchDel")}
                       style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("delete")}
              </Button>
              </Popconfirm>
          ) : null}
          {onUpdateTracing ? (
              <Button onClick={() =>onUpdateTracing(its?its:[])} title={t("onUpdateTracing")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("onUpdateTracing")}
              </Button>
          ) : null}
          {onBatchLock ? (
              <Popconfirm
                  onConfirm={() => onBatchLock(its?its:[])}
                  title={t("common:confirmLock")}
              >
              <Button  title={t("batchLock")}
                       style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("lock")}
              </Button>
              </Popconfirm>
          ) : null}
          {onBatchResetPassword ? (
              <Popconfirm
                  onConfirm={() => onBatchResetPassword(its?its:[])}
                  title={t("common:confirmResetPassword")}
              >
              <Button title={t("batchResetPassword ")}
                       style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("resetPassword")}
              </Button>
              </Popconfirm>
          ) : null}
          {onBatchImport ? (
              <Button onClick={() =>onBatchImport(its?its:[])} title={t("batchImport")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchImport")}
              </Button>
          ) : null}
          {onBatchExport ? (
              <Button onClick={() =>onBatchExport(its?its:[])} title={t("batchExport")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchExport")}
              </Button>
          ) : null}
          {onBatchFinish ? (
              <Button onClick={() =>onBatchFinish(its?its:[])} title={t("batchFinish")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchFinish")}
              </Button>
          ) : null}
          {onBatchReceived ? (
              <Button type="primary"  onClick={() =>onBatchReceived(its?its:[])} title={t("batchReceived")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchReceived")}
              </Button>
          ) : null}
          {onScan ? (
              <Button onClick={() =>onScan()} title={t("scan")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("scan")}
              </Button>
          ) : null}
          {onBatchUploadReport ? (
              <Button type="primary"  onClick={() =>onBatchUploadReport(its?its:[])} title={t("batchUploadReport")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchUploadReport")}
              </Button>
          ) : null}
          {onBatchSend ? (
              <Button type="primary"  onClick={() =>onBatchSend(its?its:[])} title={t("batchSend")} style={{ marginLeft: "1rem", cursor: "pointer" }}>
                {t("batchSend")}
              </Button>
          ) : null}
          {onBatchRevoke ? (
                  <Popconfirm
                      onConfirm={() => onBatchRevoke(its?its:[])}
                      title={t("common:confirmRevoke")}
                  >
                    <Button  title={t("batchRevoke")}
                             style={{ marginLeft: "1rem", cursor: "pointer" }}>
                      {t("batchRevoke")}
                    </Button>
                  </Popconfirm>
          ) : null}
          {onSearch ? (
              <Input key={"searchKey512"}  style={{ width:"150px",marginLeft: "1rem", cursor: "pointer" }}  onChange={(v)=>onSearch(v.target.value)}></Input>
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
