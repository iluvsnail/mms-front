import { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../../components/YSSearchBar";
import { Select } from "antd";
import {LockList} from "../../models/dict";

interface Props {
    onSearch: (params?: Record<string, unknown>) => void;
}

const UserSearch: FC<Props> = ({ onSearch }) => {
    const { t } = useTranslation(["user", "dict"]);
    return (
        <YSSearchBar
            items={[
                { name: "name", label: t("name") },
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
                { name: "role", label: t("role") },
            ]}
            onSearch={onSearch}
        />
    );
};

export default UserSearch;
