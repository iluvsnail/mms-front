import dayjs from "dayjs";
import {FC, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../components/YSTable";
import { DateTimeFormatString } from "../../constants/strings";
import { Button, Popconfirm } from "antd";
import {IsLock, LockList} from "../../models/dict";
import {IRole} from "../../models/role";
import {ICertificate} from "../../models/certificate";
import {ICodecriterion} from "../../models/codecriterion";
import {IDevice} from "../../models/device";
import {isAdmin} from "../../utils/tokenUtils";

interface Props {
  data: ICertificate[];
  its:string[];
  loading: boolean;
    onDetail: (item: ICertificate) => void;
  onBatchDel:(its:string[])=>void;
    onBatchPrint:(its:string[])=>void;
    onBatchImport:(its:string[])=>void;
    onBatchExport:(its:string[])=>void;
  onEdit: (item: ICertificate) => void;
  onDel: (item: ICertificate) => void;
  onRefresh: () => void;
  setSelectedRows:(its:string[])=>void;
  onPrint: (item: ICertificate)=>void;
}

const CertificateTable: FC<Props> = ({
  data,
    its,
  loading,
    onDetail,
                                    onBatchPrint,
    onBatchExport,
    onBatchImport,
  onBatchDel,
  onEdit,
  onDel,
  onRefresh,
    setSelectedRows,
    onPrint
}) => {
  const { t } = useTranslation(["certificate", "common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
    () => [
      {
        title: t("certificateNumber"),
        dataIndex: "certificateNumber",
        sorter: (a: ICertificate, b: ICertificate) => a.certificateNumber.localeCompare(b.certificateNumber),
      },{
            title: t("deviceName"),
            dataIndex: "device",
            sorter: (a: ICertificate, b: ICertificate) => a.device.deviceName.localeCompare(b.device.deviceName),
            render: (v:IDevice) => v.deviceName
        },{
            title: t("standardType"),
            dataIndex: "device",
            sorter: (a: ICertificate, b: ICertificate) => a.device.standardType.localeCompare(b.device.standardType),
            render: (v:IDevice) => v.standardType
        },{
            title: t("factoryNumber"),
            dataIndex: "device",
            sorter: (a: ICertificate, b: ICertificate) => a.device.factoryNumber.localeCompare(b.device.factoryNumber),
            render: (v:IDevice) => v.factoryNumber
        },{
            title: t("verifyResult"),
            dataIndex: "verifyResult",
            sorter: (a: ICertificate, b: ICertificate) => a.verifyResult.localeCompare(b.verifyResult),
            render:(v:string)=>t(`verifyResult${v}`)
        },{
            title: t("validDate"),
            dataIndex: "validDate",
            sorter: (a: ICertificate, b: ICertificate) => a.validDate - b.validDate,
        },{
            title: t("entrustUnit"),
            dataIndex: "entrustUnit",
            sorter: (a: ICertificate, b: ICertificate) => a.entrustUnit.localeCompare(b.entrustUnit),
        },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: ICertificate) => (
          <>
              <Button
                  size="small"
                  onClick={() => onDetail(r)}
                  title={t("common:detail")}
                  type="link"
              >
                  {t("common:detail")}
              </Button>
              <Button
                  size="small"
                  onClick={() => onPrint(r)}
                  title={t("print")}
                  type="link"
              >
                  {t("print")}
              </Button>
              {/*<Button
                  size="small"
                  onClick={() => onResetPassword(r)}
                  title={t("export")}
                  type="link"
              >
                  {t("export")}
              </Button>*/}
          </>
        ),
      },
    ],
    [t, onEdit, onDel]
  );

  return (
    <YSTable
      rowKey="id"
      dataSource={data}
      loading={loading}
      rowSelection={{
          type: "checkbox",
          onChange:onSelectChange
      }}
      columns={columns}
      tableTitle={t("table.title")}
      onBatchPrint={onBatchPrint}
      onBatchExport={onBatchExport}
      onRefresh={onRefresh}
      its={its}
      isAdmin={isAdmin()}
    />
  );
};

export default CertificateTable;
