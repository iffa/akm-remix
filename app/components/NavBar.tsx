import { Link } from "@remix-run/react";
import { Trans, useTranslation } from "react-i18next";

export const NavBar = (): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <header className="shadow z-10">
      <div className="container mx-auto p-4 flex flex-row justify-between items-center align-middle">
        <Link to="/" className="text-xl text-gray-900 font-semibold">
          {t("title")}
          <span className="text-gray-700 font-normal text-base">
            <Trans
              i18nKey="common:version"
              components={{
                span: <span className="font-semibold text-pink-500" />,
              }}
            />
          </span>
        </Link>
      </div>
    </header>
  );
};
