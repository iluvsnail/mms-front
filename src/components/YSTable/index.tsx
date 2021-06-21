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
    Radio, Input, Checkbox, message, Upload
} from "antd";
import React, {FC, useMemo, useState} from "react";
import styled from "styled-components";
import {
    PlusOutlined,
    ReloadOutlined,
    SettingOutlined,
    ColumnHeightOutlined,
} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {ICodecriterion} from "../../models/codecriterion";
import {BASE_URL} from "../../utils/apiUtils";
import api from "../../configs/api";

interface Props<RecordType = any> extends TableProps<RecordType> {
    dataSource: RecordType[];
    codes?: ICodecriterion[];
    onCodeChange?: (v: any[]) => void;
    onSearch?: (v: string) => void;
    onShowAdded?: (v: boolean) => void;
    onShowDetected?: (v: boolean) => void;
    onShowSend?: (v: boolean) => void;
    its?: string[];
    tableTitle?: string;
    onAdd?: () => void; // 设置之后展示新建按钮
    onBatchPrint?: (its: string[]) => void;
    onBatchDel?: (its: string[]) => void; // 设置之后展示删除按钮
    onBatchLock?: (its: string[]) => void;
    onScan?: () => void;
    onScanSend?: () => void;
    onBatchReceived?: (its: string[]) => void;
    onBatchRevoke?: (its: string[],sts:string) => void;
    onBatchUploadReport?: (its: string[]) => void;
    onBatchSend?: (its: string[]) => void;
    onBatchResetPassword?: (its: string[]) => void;
    onBatchUnlock?: (its: string[]) => void;
    onBatchImport?: (its: string[]) => void;
    onBatchExport?: (its: string[]) => void;
    onBatchFinish?: (its: string[]) => void;
    onUpdateTracing?: (its: string[]) => void;
    sts?:string;
    onRefresh?: () => void; // 设置之后展示刷新按钮
    showSizeChanger?: boolean;
    // TODO: 设置之后展示列项编辑功能
    showColumnsChanger?: boolean;
    isAdmin?: boolean;
    importUrl?: string;
}

const tableSizeList = ["default", "middle", "small"];

const DEFAULT_PAGE_SIZE = 10;

const YSTable: FC<Props> = ({
                                dataSource,
                                codes,
                                onCodeChange,
                                onSearch,
                                onShowAdded,
                                onShowDetected,
                                onShowSend,
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
                                onBatchUnlock,
                                onRefresh,
                                onScan,
    onScanSend,
                                onBatchReceived,
                                onBatchRevoke,
                                onBatchUploadReport,
                                onBatchSend,
                                showSizeChanger = true,
                                showColumnsChanger,
                                isAdmin,
                                importUrl,
    sts,
                                ...tableProps
                            }) => {
    const {t, i18n} = useTranslation("common");
    const [tableSize, setTableSize] = useState(tableSizeList[0]);

    // 提取出需要修改的属性，其他的属性直接放入Table组件
    const {pagination, ...otherTableProps} = tableProps;

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
    const codesRadio = codes?.map(v => {
        return <Checkbox value={v.id}>{v.criterionName}</Checkbox>
    })
    const props = {
        name: 'file',
        accept: ".xlsx,.xls",
        showUploadList: false,
        headers: {
            authorization: 'authorization-text',
        },
        withCredentials: true,
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                if(info.file.response){
                    message.warn(info.file.response);
                }else{
                    message.success(`数据导入成功！`);
                    if (onRefresh) {
                        onRefresh();
                    }
                }

            } else if (info.file.status === 'error') {
                message.error(`数据导入失败`);
            }
        },
    };
    return (
        <StyledTable>
            <StyledTableHeader>
                <div style={{flex: 1}}>
                    {tableTitle || ""}
                    {codes && onCodeChange ? (
                        <Checkbox.Group onChange={(e) => onCodeChange(e)}>
                            {codesRadio}
                        </Checkbox.Group>
                    ) : null}
                    {
                        onShowAdded ? (
                            <Checkbox onChange={(e) => {
                                onShowAdded(e.target.checked)
                            }}>{"仅显示已接收设备"}</Checkbox>
                        ) : null
                    }
                    {
                        onShowDetected ? (
                            <Checkbox onChange={(e) => {
                                onShowDetected(e.target.checked)
                            }}>{"仅显示已检定设备"}</Checkbox>
                        ) : null
                    }
                    {
                        onShowSend ? (
                            <Checkbox onChange={(e) => {
                                onShowSend(e.target.checked)
                            }}>{"仅显示已发放设备"}</Checkbox>
                        ) : null
                    }
                </div>
                <div style={{flex: 1, textAlign: "right"}}>
                    {(onAdd && isAdmin) ? (
                        <Button type="primary" onClick={onAdd} title={t("add")}>
                            <PlusOutlined/> {t("add")}
                        </Button>
                    ) : null}
                    {(onBatchPrint && isAdmin) ? (
                        <Button onClick={() => onBatchPrint(its ? its : [])}
                                title={t("batchPrint")} style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("batchPrint")}
                        </Button>
                    ) : null}
                    {(onBatchDel && isAdmin) ? (

                        <Popconfirm
                            onConfirm={() => onBatchDel(its ? its : [])}
                            title={t("common:confirmDelete")}
                        >
                            <Button title={t("batchDel")}
                                    style={{marginLeft: "1rem", cursor: "pointer"}}>
                                {t("delete")}
                            </Button>
                        </Popconfirm>
                    ) : null}
                    {(onUpdateTracing && isAdmin) ? (
                        <Button onClick={() => onUpdateTracing(its ? its : [])} title={t("onUpdateTracing")}
                                style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("onUpdateTracing")}
                        </Button>
                    ) : null}
                    {onBatchLock ? (
                        <Popconfirm
                            onConfirm={() => onBatchLock(its ? its : [])}
                            title={t("common:confirmLock")}
                        >
                            <Button title={t("batchLock")}
                                    style={{marginLeft: "1rem", cursor: "pointer"}}>
                                {t("lock")}
                            </Button>
                        </Popconfirm>
                    ) : null}
                    {onBatchUnlock ? (
                        <Popconfirm
                            onConfirm={() => onBatchUnlock(its ? its : [])}
                            title={t("common:confirmUnlock")}
                        >
                            <Button title={t("unlock")}
                                    style={{marginLeft: "1rem", cursor: "pointer"}}>
                                {t("unlock")}
                            </Button>
                        </Popconfirm>
                    ) : null}
                    {onBatchResetPassword ? (
                        <Popconfirm
                            onConfirm={() => onBatchResetPassword(its ? its : [])}
                            title={t("common:confirmResetPassword")}
                        >
                            <Button title={t("batchResetPassword ")}
                                    style={{marginLeft: "1rem", cursor: "pointer"}}>
                                {t("resetPassword")}
                            </Button>
                        </Popconfirm>
                    ) : null}
                    {(onBatchExport && isAdmin) ? (
                        <Button onClick={() => onBatchExport(its ? its : [])} title={t("batchExport")}
                                style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("batchExport")}
                        </Button>
                    ) : null}
                    {(onBatchImport && isAdmin) ? (
                        <Upload action={importUrl}  {...props} >
                            <Button title={t("batchImport")} style={{marginLeft: "1rem", cursor: "pointer"}}>
                                {t("batchImport")}
                            </Button>
                        </Upload>
                    ) : null}
                    {(onBatchFinish && isAdmin) ? (
                        <Button onClick={() => onBatchFinish(its ? its : [])} title={t("batchFinish")}
                                style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("batchFinish")}
                        </Button>
                    ) : null}
                    {onBatchReceived ? (
                        <Button type="primary" onClick={() => onBatchReceived(its ? its : [])}
                                title={t("batchReceived")} style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("batchReceived")}
                        </Button>
                    ) : null}
                    {onScan ? (
                        <Button onClick={() => onScan()} title={t("scan")}
                                style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("scan")}
                        </Button>
                    ) : null}
                    {onScanSend ? (
                        <Button onClick={() => onScanSend()} title={"扫描发放"}
                                style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("扫描发放")}
                        </Button>
                    ) : null}
                    {onBatchUploadReport ? (
                        <Button type="primary" onClick={() => onBatchUploadReport(its ? its : [])}
                                title={t("batchUploadReport")} style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("batchUploadReport")}
                        </Button>
                    ) : null}
                    {onBatchSend ? (
                        <Button type="primary" onClick={() => onBatchSend(its ? its : [])} title={t("batchSend")}
                                style={{marginLeft: "1rem", cursor: "pointer"}}>
                            {t("batchSend")}
                        </Button>
                    ) : null}
                    {onBatchRevoke ? (
                        <Popconfirm
                            onConfirm={() => onBatchRevoke(its ? its : [],sts?sts:"")}
                            title={t("common:confirmRevoke")}
                        >
                            <Button title={t("batchRevoke")}
                                    style={{marginLeft: "1rem", cursor: "pointer"}}>
                                {t("batchRevoke")}
                            </Button>
                        </Popconfirm>
                    ) : null}
                    {onSearch ? (
                        <Input key={"searchKey512"} style={{width: "150px", marginLeft: "1rem", cursor: "pointer"}}
                               onChange={(v) => onSearch(v.target.value)}></Input>
                    ) : null}
                    {onRefresh ? (
                        <Tooltip title={t("refresh")}>
                            <ReloadOutlined
                                style={{marginLeft: "1rem", cursor: "pointer"}}
                                onClick={onRefresh}
                            />
                        </Tooltip>
                    ) : null}
                    {showSizeChanger ? (
                        <Tooltip title={t("density")}>
                            <Dropdown overlay={sizeOverLay} trigger={["click"]}>
                                <ColumnHeightOutlined
                                    style={{marginLeft: "1rem", cursor: "pointer"}}
                                />
                            </Dropdown>
                        </Tooltip>
                    ) : null}
                    {showColumnsChanger ? (
                        <Tooltip title={t("columnSetting")}>
                            <SettingOutlined
                                style={{marginLeft: "1rem", cursor: "pointer"}}
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
