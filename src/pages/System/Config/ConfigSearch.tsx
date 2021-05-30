import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../../../components/YSSearchBar";
import { Select } from "antd";
import {LockList} from "../../../models/dict";
import {IRole} from "../../../models/role";

interface Props {
    onSearch: (params?: Record<string, unknown>) => void;
    roles:IRole[]
}

const ConfigSearch: FC<Props> = ({ onSearch ,roles}) => {
    const { t } = useTranslation(["user", "dict"]);

    return (
        <YSSearchBar
            items={[
                { name: "userName", label: t("userName") },
                {
                    name: "isLock",
                    label: t("isLock"),
                    render: (
                        <Select allowClear placeholder={t("selectIsLock")}>
                            {LockList.map((d) => (
                                <Select.Option key={d} value={d}>
                                    {t(`dict:isLock.${d}`)}
                                </Select.Option>
                            ))}
                        </Select>
                    ),
                },
                {
                    name: "role",
                    label: t("role"),
                    render: (
                        <Select allowClear placeholder={t("selectRole")}>
                            {
                                roles.map((it) =>(
                                    (<Select key={it.id} value={it.id}>{it.note}</Select>)
                                ))}
                        </Select>
                    ),
                },
            ]}
            onSearch={onSearch}
        />
    );
};

export default ConfigSearch;
