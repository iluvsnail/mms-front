import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../../components/YSSearchBar";
import { Select } from "antd";
import {LockList} from "../../models/dict";
import {ICodecriterion} from "../../models/codecriterion";

interface Props {
    onSearch: (params?: Record<string, unknown>) => void;
    codes:ICodecriterion[]
}

const CertificateSearch: FC<Props> = ({ onSearch ,codes}) => {
    const { t } = useTranslation(["certificate", "dict"]);

    return (
        <YSSearchBar
            items={[
                { name: "certificateNumber", label: t("certificateNumber") },
                { name: "deviceName", label: t("deviceName") },
                {
                    name: "verifyResult",
                    label: t("verifyResult"),
                    render: (
                        <Select allowClear placeholder={t("selectVerifyResult")}>
                                <Select.Option key={"0"} value={"0"}>
                                    {t(`verifyResult0`)}
                                </Select.Option>
                            <Select.Option key={"1"} value={"1"}>
                                {t(`verifyResult1`)}
                            </Select.Option>
                        </Select>
                    ),
                },
                { name: "entrustUnit", label: t("entrustUnit") },

            ]}
            onSearch={onSearch}
        />
    );
};

export default CertificateSearch;
