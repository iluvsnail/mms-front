import { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../YSSearchBar";
import { Select } from "antd";
import { SexList } from "../../models/dict";

interface Props {
  onSearch: (params?: Record<string, unknown>) => void;
}

const DemoSearch: FC<Props> = ({ onSearch }) => {
  const { t } = useTranslation(["demo", "dict"]);
  return (
    <YSSearchBar
      items={[
        { name: "name", label: t("name") },
        {
          name: "sex",
          label: t("sex"),
          render: (
            <Select allowClear placeholder={t("selectSex")}>
              {SexList.map((d) => (
                <Select.Option key={d} value={d}>
                  {t(`dict:sex.${d}`)}
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

export default DemoSearch;
