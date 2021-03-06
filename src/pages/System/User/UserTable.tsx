import {FC, useMemo} from "react";
import {useTranslation} from "react-i18next";
import YSTable from "../../../components/YSTable";
import {Button, Popconfirm} from "antd";
import {IsLock} from "../../../models/dict";
import {IUser} from "../../../models/user";
import {IRole} from "../../../models/role";
import {isAdmin} from "../../../utils/tokenUtils";

interface Props {
  data: IUser[];
  its:string[];
  loading: boolean;
  onAdd: () => void;
  onBatchDel:(its:string[])=>void;
  onBatchLock:(its:string[])=>void;
  onBatchResetPassword:(its:string[])=>void;
    onBatchUnlock:(its:string[])=>void;
  onEdit: (item: IUser) => void;
  onDel: (item: IUser) => void;
  onResetPassword: (item: IUser) => void;
  onLock: (item: IUser) => void;
    onUnlock: (item: IUser) => void;
  onRefresh: () => void;
  setSelectedRows:(its:string[])=>void;
}

const UserTable: FC<Props> = ({
  data,
    its,
  loading,
  onAdd,
  onBatchDel,
  onBatchLock,
  onBatchResetPassword,
  onEdit,
  onDel,
    onResetPassword,
    onLock,
  onRefresh,
    setSelectedRows,
    onBatchUnlock,
    onUnlock
}) => {
  const { t } = useTranslation(["user", "common", "dict"]);
    const onSelectChange = function (selectedRowKeys:any){
        setSelectedRows(selectedRowKeys)
    };
  const columns = useMemo(
    () => [
      {
        title: t("userName"),
        dataIndex: "userName",
        sorter: (a: IUser, b: IUser) => a.userName.localeCompare(b.userName),
      },
      {
        title: t("isLock"),
        dataIndex: "isLock",
        render: (v: IsLock) => t(`dict:isLock.${v}`),
        sorter: (a: IUser, b: IUser) => a.isLock - b.isLock,
      },
        {
            title: t("role"),
            dataIndex: "role",
            sorter: (a: IUser, b: IUser) => a.role.name.localeCompare(b.role.name),
            render: (v:IRole) => t(`user:${v.name}`)
        },
        {
            title: t("name"),
            dataIndex: "name",
            sorter: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
        },
        {
            title: t("special"),
            dataIndex: "special",
            sorter: (a: IUser, b: IUser) => a.special.localeCompare(b.special),
        },
        {
            title: t("department"),
            dataIndex: "department",
            sorter: (a: IUser, b: IUser) => a.special.localeCompare(b.department),
        },
        {
            title: t("position"),
            dataIndex: "position",
            sorter: (a: IUser, b: IUser) => a.special.localeCompare(b.special),
        },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: IUser) => (
          <>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("common:edit")}
              type="link"
            >
              {t("common:edit")}
            </Button>
              {r.isLock==IsLock.UnLock?(<Popconfirm
                  onConfirm={() => onLock(r)}
                  title={t("common:confirmLock")}
              >
                  <Button
                      size="small"
                      title={t("common:lock")}
                      type="link"
                  >
                      {t("common:lock")}
                  </Button>
              </Popconfirm>):""}
              {
                  r.isLock==IsLock.Lock?(<Popconfirm
                      onConfirm={() => onUnlock(r)}
                      title={t("common:confirmUnlock")}
                  >
                      <Button size="small" title={t("common:unlock")} type="link">
                          {t("common:unlock")}
                      </Button>
                  </Popconfirm>):""
              }
              <Popconfirm
                  onConfirm={() => onResetPassword(r)}
                  title={t("common:confirmResetPassword")}
              >
              <Button
                  size="small"
                  title={t("common:resetPassword")}
                  type="link"
              >
                  {t("common:resetPassword")}
              </Button>
              </Popconfirm>
            <Popconfirm
              onConfirm={() => onDel(r)}
              title={t("common:confirmDelete")}
            >
              <Button size="small" title={t("common:delete")} type="link">
                {t("common:delete")}
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [t, onEdit, onDel]
  );

  return (
    <YSTable
      rowKey="userName"
      dataSource={data}
      loading={loading}
      rowSelection={{
          type: "checkbox",
          onChange:onSelectChange
      }}
      columns={columns}
      tableTitle={t("table.title")}
      onAdd={onAdd}
      onBatchDel={onBatchDel}
      onBatchLock={onBatchLock}
      onBatchResetPassword={onBatchResetPassword}
      onBatchUnlock={onBatchUnlock}
      onRefresh={onRefresh}
      its={its}
      isAdmin={isAdmin()}
    />
  );
};

export default UserTable;
