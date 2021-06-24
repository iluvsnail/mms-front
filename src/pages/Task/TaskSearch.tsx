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

const TaskSearch: FC<Props> = ({ onSearch ,codes}) => {
    const { t } = useTranslation(["task", "dict"]);

    return (
        <YSSearchBar
            items={[
                { name: "name", label: t("name") },
                {
                    name: "status",
                    label: t("currentStatus"),
                    render: (
                        <Select allowClear placeholder={t("selectStatus")}>
                            <Select.Option key={"0"} value={"0"}>
                                {t(`status0`)}
                            </Select.Option>
                            <Select.Option key={"1"} value={"1"}>
                                {t(`status1`)}
                            </Select.Option>
                            <Select.Option key={"2"} value={"2"}>
                                {t(`status2`)}
                            </Select.Option>
                        </Select>
                    ),
                },
                { name: "dutyPerson", label: t("dutyPerson") },
                { name: "startDate", label: t("startDate") ,render:(<DatePicker></DatePicker>)},
                { name: "finishDate", label: t("finishDate") ,render:(<DatePicker></DatePicker>) },
            ]}
            onSearch={onSearch}
        />
    );
};

export default TaskSearch;
