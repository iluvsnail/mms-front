import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../../components/StyledComponents";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import { IUser } from "../../../models/user";
import {IRole} from "../../../models/role";
import {
  asyncDelUser,
  asyncGetUserData,
  asyncPutUser,
  asyncGetRoleData,
  asyncDelUsers,
  asyncLockUser,
  asyncResetPassword,
  asyncLockUsers,
  asyncResetUsersPassword, asyncUnlockUser, asyncUnlockUsers
} from "./user.services";
import UserForm from "./UserForm";
import { message } from "antd";
import {ICodecriterion} from "../../../models/codecriterion";
import {asyncGetCodeData} from "../../Device/device.services";

const User: FC = () => {
  const [list, setList] = useState<IUser[]>([]);
  const [roles,setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<IUser>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();
  let [selectedRows,setSelected]=useState<string[]>([])
  const [codes,setCodes] = useState<ICodecriterion[]>([]);
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
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
    asyncGetCodeData((res) => {
      if (res.isOk) {
        setCodes(res.data);
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
  const onBatchDel =useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncDelUsers(its, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        onRefresh()
      }
    });
  },[]);
  const onBatchLock = useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncLockUsers(its, (res) => {
      if (res.isOk) {
        message.success("锁定用户成功");
        onRefresh()
      }
    });
  }, []);
  const onBatchUnlock = useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncUnlockUsers(its, (res) => {
      if (res.isOk) {
        message.success("解锁用户成功");
        onRefresh()
      }
    });
  }, []);
  const onBatchResetPassword = useCallback((its:string[]) => {
    if(!its || its.length<1){
      message.warn("未选中数据");
      return false;
    }
    asyncResetUsersPassword(its, (res) => {
      if (res.isOk) {
        message.success("重置密码成功");
        onRefresh()
      }
    });
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
  const onResetPassword = useCallback((data: IUser) => {
    asyncResetPassword(data, (res) => {
      if (res.isOk) {
        message.success("重置密码成功");
        setList((prev) =>
            prev.map((p) => {
              if (p.userName === data.userName) {
                return res.data;
              }
              return p;
            })
        );
      }
    });
  }, []);
  const onLock = useCallback((data: IUser) => {
    asyncLockUser(data, (res) => {
      if (res.isOk) {
        message.success("锁定用户成功");
        setList((prev) =>
            prev.map((p) => {
              if (p.userName === data.userName) {
                return res.data;
              }
              return p;
            })
        );
      }
    });
  }, []);
  const onUnLock = useCallback((data: IUser) => {
    asyncUnlockUser(data, (res) => {
      if (res.isOk) {
        message.success("解锁用户成功");
        setList((prev) =>
            prev.map((p) => {
              if (p.userName === data.userName) {
                return res.data;
              }
              return p;
            })
        );
      }
    });
  }, []);
  const onSave = useCallback(
    (data: IUser) => {
      setLoading(true);
        asyncPutUser(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            let flg = false;
            setList((prev) =>
              prev.map((p) => {
                if (p.userName === data.userName) {
                  flg=true;
                  return res.data;
                }
                return p;
              })
            );
            if(flg){
              message.success("编辑成功");
            }else{
              message.success("新增成功");
            }
            if(!flg){
              setList((prev) => [res.data, ...prev]);
            }
            onClose();
          }
        });
    },
    [onClose]
  );

  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    setParams(newParams);
  }, []);

  const onRefresh = useCallback(() => loadData(), [loadData]);

  const filteredList = useMemo(() => {
    if (!params) {
      return list;
    }
    let result = [...list];
    if (params.userName) {
      result = result.filter(r => r.userName.includes(params.userName as string));
    }
    if (params.isLock !== undefined) {
      result = result.filter(r => r.isLock == params.isLock);
    }
    if (params.role !== undefined) {
      result = result.filter(r => r.role.id == params.role);
    }
    return result;
  }, [params, list]);

  const setSelectedRows=(its:string[])=>{
    setSelected(its)
  }
  return (
    <StyledContainer>
      <UserSearch
          onSearch={onSearch}
          roles = {roles}/>
      <UserTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onBatchDel={onBatchDel}
        onBatchLock={onBatchLock}
        onBatchResetPassword={onBatchResetPassword}
        onBatchUnlock={onBatchUnlock}
        onEdit={onEdit}
        onDel={onDel}
        onResetPassword={onResetPassword}
        onLock={onLock}
        onUnlock={onUnLock}
        onRefresh={onRefresh}
        setSelectedRows={setSelectedRows}
        its={selectedRows}
      />
      <UserForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        roles = {roles}
        codes={codes}
      />
    </StyledContainer>
  );
};

export default User;
