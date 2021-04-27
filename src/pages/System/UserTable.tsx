import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import YSTable from "../../components/YSTable";
import { DateFormatString } from "../../constants/strings";
import { Button, Popconfirm } from "antd";
import {IsLock, LockList} from "../../models/dict";
import {IUser} from "../../models/user";
import {IRole} from "../../models/role";

interface Props {
  data: IUser[];
  loading: boolean;
  onAdd: () => void;
  onBatchDel:()=>void;
  onBatchLock:()=>void;
  onBatchResetPassword:()=>void;
  onEdit: (item: IUser) => void;
  onDel: (item: IUser) => void;
  onRefresh: () => void;
}

const UserTable: FC<Props> = ({
  data,
  loading,
  onAdd,
  onBatchDel,
  onBatchLock,
  onBatchResetPassword,
  onEdit,
  onDel,
  onRefresh,
}) => {
  const { t } = useTranslation(["user", "common", "dict"]);

  const columns = useMemo(
    () => [
      {
        note: t("userName"),
        dataIndex: "userName",
        sorter: (a: IUser, b: IUser) => a.userName.localeCompare(b.userName),
      },
      {
        note: t("isLock"),
        dataIndex: "isLock",
        render: (v: IsLock) => t(`dict:isLock.${v}`),
        sorter: (a: IUser, b: IUser) => a.isLock - b.isLock,
      },
        {
            note: t("role"),
            dataIndex: "role",
            sorter: (a: IUser, b: IUser) => a.role.name.localeCompare(b.role.name),
            render: (v:IRole) => t(`user:${v.name}`)
        },
        {
            note: t("name"),
            dataIndex: "name",
            sorter: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
        },
        {
            note: t("special"),
            dataIndex: "special",
            sorter: (a: IUser, b: IUser) => a.special.localeCompare(b.special),
        },
        {
            note: t("department"),
            dataIndex: "department",
            sorter: (a: IUser, b: IUser) => a.special.localeCompare(b.department),
        },
        {
            note: t("position"),
            dataIndex: "position",
            sorter: (a: IUser, b: IUser) => a.special.localeCompare(b.special),
        },

      /*{
        title: t("createDate"),
        dataIndex: "createDate",
        render: (v: number) => dayjs(v).format(DateFormatString),
        sorter: (a: IUser, b: IUser) => a.createDate - b.createDate,
      },
      {
        title: t("updateDate"),
        dataIndex: "updateDate",
        render: (v: number) => dayjs(v).format(DateFormatString),
        sorter: (a: IUser, b: IUser) => a.updateDate - b.updateDate,
      },*/
      {
        note: t("common:operations"),
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
              <Button
                  size="small"
                  onClick={() => onEdit(r)}
                  title={t("common:lock")}
                  type="link"
              >
                  {t("common:lock")}
              </Button>
              <Button
                  size="small"
                  onClick={() => onEdit(r)}
                  title={t("common:resetPassword")}
                  type="link"
              >
                  {t("common:resetPassword")}
              </Button>
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
      }}
      columns={columns}
      tableTitle={t("table.title")}
      onAdd={onAdd}
      onBatchDel={onBatchDel}
      onBatchLock={onBatchLock}
      onBatchResetPassword={onBatchResetPassword}
      onRefresh={onRefresh}
    />
  );
};

export default UserTable;
