import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../../../components/StyledComponents";
import ConfigSearch from "./ConfigSearch";
import ConfigTable from "./ConfigTable";
import { IConfig } from "../../../models/config";
import {IRole} from "../../../models/role";
import {
  asyncDelUser,
  asyncGetConfigData,
  asyncPutConfig,
  asyncGetRoleData,
  asyncDelUsers,
  asyncLockUser,
  asyncResetPassword,
  asyncLockUsers,
  asyncResetUsersPassword
} from "./config.services";
import ConfigForm from "./ConfigForm";
import { message } from "antd";
import {IUser} from "../../../models/user";

const Config: FC = () => {
  const [list, setList] = useState<IConfig[]>([]);
  const [roles,setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<IConfig>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();
  let [selectedRows,setSelected]=useState<string[]>([])
  useEffect(()=>{
    setSelected(selectedRows)
  },[selectedRows])
  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetConfigData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
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
    asyncDelUsers(its, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        onRefresh()
      }
    });
  },[]);
  const onBatchLock = useCallback((its:string[]) => {
    asyncLockUsers(its, (res) => {
      if (res.isOk) {
        message.success("锁定用户成功");
        onRefresh()
      }
    });
  }, []);
  const onBatchResetPassword = useCallback((its:string[]) => {
    asyncResetUsersPassword(its, (res) => {
      if (res.isOk) {
        message.success("重置密码成功");
        onRefresh()
      }
    });
  }, []);
  const onEdit = useCallback((editItem: IConfig) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);
  const onSave = useCallback(
      (data: IConfig) => {
        setLoading(true);
        asyncPutConfig(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            let flg = false;
            setList((prev) =>
                prev.map((p) => {
                  if (p.id === data.id) {
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
    /*f (params.userName) {
      result = result.filter(r => r.userName.includes(params.userName as string));
    }
    if (params.isLock !== undefined) {
      result = result.filter(r => r.isLock == params.isLock);
    }
    if (params.role !== undefined) {
      result = result.filter(r => r.role.id == params.role);
    }*/
    return result;
  }, [params, list]);

  const setSelectedRows=(its:string[])=>{
    setSelected(its)
  }
  return (
    <StyledContainer>
      <ConfigTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onBatchDel={onBatchDel}
        onBatchLock={onBatchLock}
        onBatchResetPassword={onBatchResetPassword}
        onEdit={onEdit}
        onRefresh={onRefresh}
        setSelectedRows={setSelectedRows}
        its={selectedRows} />
      <ConfigForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
        roles = {roles}
      />
    </StyledContainer>
  );
};

export default Config;
