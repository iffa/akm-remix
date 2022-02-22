import { useTranslation } from "react-i18next";
import { Product } from "../../lib/model/product.model";
import ProductOfferTableRow from "./ProductOfferTableRow";

function ProductOfferTable({ product }: { product: Product }): JSX.Element {
  const offers = (product.offers || [])
    .filter((offer) => offer.available)
    .sort((a, b) => {
      return (
        (a?.bestVoucher?.priceWithVoucher || a.price) -
        (b?.bestVoucher?.priceWithVoucher || b.price)
      );
    });

  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col rounded shadow">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("product:platformAndEdition")}
                    </th>
                    <th
                      scope="col"
                      className="hidden md:visible px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("product:store")}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("product:priceAndVoucher")}
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">{t("product:purchase")}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {offers.map((offer) => (
                    <ProductOfferTableRow
                      offer={offer}
                      key={offer.url}
                    ></ProductOfferTableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOfferTable;
