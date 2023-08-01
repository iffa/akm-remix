import { Form, useSearchParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Store } from "~/lib/model/store.model";
import { Edition } from "../../lib/model/edition.model";
import { Region } from "../../lib/model/region.model";
import ProductFilterCheckbox from "./ProductFilterCheckbox";

function ProductOfferTableFilters({
  launchers,
  editions,
  stores,
}: {
  launchers: Region[];
  editions: Edition[];
  stores: Store[];
}): JSX.Element {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const hasSelectedEditions = searchParams.has("edition");
  const hasSelectedLaunchers = searchParams.has("launcher");
  const hasSelectedStores = searchParams.has("store");
  const selectedEditions = searchParams.getAll("edition");
  const selectedLaunchers = searchParams.getAll("launcher");
  const selectedStores = searchParams.getAll("store");

  return (
    <Form reloadDocument className="px-4 mb-8">
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-12">
        <div className="flex flex-col">
          <h4 className="text-lg text-gray-900 font-semibold mb-2">
            {t("product:platforms")}
          </h4>
          <div className="flex flex-col space-y-0.5">
            {launchers.map((launcher) => (
              <ProductFilterCheckbox
                key={launcher.id}
                title={launcher.id}
                name="launcher"
                value={launcher.id}
                checked={
                  !hasSelectedLaunchers ||
                  !!selectedLaunchers.find((x) => x === launcher.id)
                }
              ></ProductFilterCheckbox>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-lg text-gray-900 font-semibold mb-2">
            {t("product:editions")}
          </h4>
          <div className="flex flex-col space-y-0.5">
            {editions.map((edition) => (
              <ProductFilterCheckbox
                key={edition.id}
                title={edition.name}
                name="edition"
                value={edition.id}
                checked={
                  !hasSelectedEditions ||
                  !!selectedEditions.find((x) => x === edition.id)
                }
              ></ProductFilterCheckbox>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-lg text-gray-900 font-semibold mb-2">
            {t("product:stores")}
          </h4>
          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-0.5">
            {stores.map((store) => (
              <ProductFilterCheckbox
                key={store.id}
                title={store.name}
                name="store"
                value={store.id.toString()}
                checked={
                  !hasSelectedStores ||
                  !!selectedStores.find((x) => x === store.id.toString())
                }
              ></ProductFilterCheckbox>
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-700 text-gray-200 hover:bg-blue-800 py-2 px-4 inline-flex text-sm leading-5 whitespace-nowrap font-semibold rounded-full transition duration-200 ease-in-out mt-4"
      >
        Activate filters
      </button>
    </Form>
  );
}

export default ProductOfferTableFilters;
