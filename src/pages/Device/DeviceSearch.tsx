import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../../components/YSSearchBar";
import {DatePicker, Select} from "antd";
import {LockList} from "../../models/dict";
import {ICodecriterion} from "../../models/codecriterion";

interface Props {
    onSearch: (params?: Record<string, unknown>) => void;
    codes:ICodecriterion[]
}

const DeviceSearch: FC<Props> = ({ onSearch ,codes}) => {
    const { t } = useTranslation(["device", "dict"]);

    return (
        <YSSearchBar
            items={[
                { name: "deviceName", label: t("deviceName") },
                {
                    name: "criterion",
                    label: t("criterionName"),
                    render: (
                        <Select allowClear placeholder={t("selectCriterion")}>
                            {
                                codes.map((it) =>(
                                    (<Select key={it.id} value={it.id}>{it.criterionName}</Select>)
                                ))}
                        </Select>
                    ),
                },
                { name: "standardType", label: t("standardType") },
                { name: "factoryNumber", label: t("factoryNumber") },
                { name: "manufacturer", label: t("manufacturer") },
                { name: "lastAuthenticationDate", label: t("lastAuthenticationDate"),
                render:(<DatePicker></DatePicker>)},
                { name: "validDate", label: t("validDate") ,
                render:(
                    <DatePicker></DatePicker>
                )},
                { name: "verifier", label: t("verifier") },
                { name: "dutyUnit", label: t("dutyUnit") },
                { name: "dutyPerson", label: t("dutyPerson") },
                {
                    name: "status",
                    label: t("status"),
                    render: (
                        <Select allowClear placeholder={t("selectStatus")}>
                            {LockList.map((d) => (
                                <Select.Option key={d} value={d}>
                                    {t(`dict:status.${d}`)}
                                </Select.Option>
                            ))}
                        </Select>
                    ),
                },
            ]}
            onSearch={onSearch}
        />
    );
};

export default DeviceSearch;
