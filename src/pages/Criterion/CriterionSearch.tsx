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

const CriterionSearch: FC<Props> = ({ onSearch ,codes}) => {
    const { t } = useTranslation(["criterion", "dict"]);

    return (
        <YSSearchBar
            items={[
                {
                    name: "criterion",
                    label: t("criterion"),
                    render: (
                        <Select allowClear placeholder={t("selectCriterion")}>
                            {
                                codes.map((it) =>(
                                    (<Select key={it.id} value={it.id}>{it.criterionName}</Select>)
                                ))}
                        </Select>
                    ),
                },
                { name: "instrumentName", label: t("instrumentName") },
                { name: "standardType", label: t("standardType") },
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
                { name: "lastTracingUnit", label: t("lastTracingUnit") },
                { name: "lastTracingDate", label: t("lastTracingDate"),render:(<DatePicker/>) },
            ]}
            onSearch={onSearch}
        />
    );
};

export default CriterionSearch;
