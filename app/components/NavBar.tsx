import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";

export const NavBar = (): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <header className="shadow z-10">
      <div className="container mx-auto p-4 flex flex-row justify-between items-center align-middle">
        <Link to="/" className="text-xl text-gray-900 font-semibold">
          {t("title")}
          <span className="text-gray-700 font-normal text-sm">
            {t("version")}
          </span>
        </Link>
      </div>
    </header>
  );
};
