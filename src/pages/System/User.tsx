import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../components/StyledComponents";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import { IUser } from "../../models/user";
import {IRole} from "../../models/role";
import {
  asyncDelUser,
  asyncGetUserData,
  asyncPostDemo,
  asyncPutDemo,
    asyncGetRoleData
} from "./user.services";
import UserForm from "./UserForm";
import { message } from "antd";

const User: FC = () => {
  const [list, setList] = useState<IUser[]>([]);
  const [roles,setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<IUser>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetUserData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
    asyncGetRoleData((res) => {
      if (res.isOk) {
        setRoles(res.data);
      }
    });
  }, []);

  useEffect(() => {
    loadData();
    return () => setList([]);
  }, [loadData]);

  const onAdd = useCallback(() => {
    setFormVisible(true);
  }, []);
  const onBatchDel = useCallback(() => {
    setFormVisible(true);
  }, []);
  const onBatchLock = useCallback(() => {
    setFormVisible(true);
  }, []);
  const onBatchResetPassword = useCallback(() => {
    setFormVisible(true);
  }, []);
  const onEdit = useCallback((editItem: IUser) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback((data: IUser) => {
    asyncDelUser(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.userName !== data.userName));
      }
    });
  }, []);

  const onSave = useCallback(
    (data: IUser) => {
      setLoading(true);
      if (data.userName) {
        asyncPutDemo(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            message.success("编辑成功");
            setList((prev) =>
              prev.map((p) => {
                if (p.userName === data.userName) {
                  return res.data;
                }
                return p;
              })
            );
            onClose();
          }
        });
      } else {
        asyncPostDemo(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            message.success("新增成功");
            setList((prev) => [res.data, ...prev]);
            onClose();
          }
        });
      }
    },
    [onClose]
  );

  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    console.log(newParams)
    setParams(newParams);
  }, []);

  const onRefresh = useCallback(() => loadData(), [loadData]);

  const filteredList = useMemo(() => {
    if (!params) {
      return list;
    }
    let result = [...list];
    if (params.name) {
      result = result.filter(r => r.name.includes(params.name as string));
    }
    if (params.isLock !== undefined) {
      result = result.filter(r => r.isLock === params.isLock);
    }
    return result;
  }, [params, list]);

  return (
    <StyledContainer>
      <UserSearch onSearch={onSearch} />
      <UserTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onBatchDel={onBatchDel}
        onBatchLock={onBatchLock}
        onBatchResetPassword={onBatchResetPassword}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={onRefresh}
      />
      <UserForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        roles = {roles}
      />
    </StyledContainer>
  );
};

export default User;
