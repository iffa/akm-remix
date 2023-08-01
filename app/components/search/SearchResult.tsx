import { Link } from "@remix-run/react";
import { Product } from "../../lib/model/product.model";
import { getFormattedPrice } from "../../utils/number-utils";

export const SearchResult: React.FC<{ product: Product; index: number }> = (
  props
) => {
  const { product, index } = props;
  const price =
    product.bestOffer?.bestVoucher?.priceWithVoucher ||
    product.bestOffer?.price;
  const currency = product.bestOffer?.currency;

  return (
    <div
      id={`searchResult-${index}`}
      className="w-full md:w-1/2 lg:w-1/3 p-0 md:p-4"
    >
      <Link
        to={`/product/${product.id}`}
        className="flex flex-row bg-white hover:bg-gray-50 rounded shadow transition duration-200 ease-in-out"
      >
        <div className="w-2/3 p-4">
          <h2 className="text-base font-semibold text-gray-800 line-clamp-2 mb-1">
            {product.name}
          </h2>
          <p className="text-base text-blue-600 font-normal">
            {getFormattedPrice(currency, price)}
          </p>
        </div>
        <div className="w-1/3">
          <div className="aspect-w-9 aspect-h-11">
            {/** TODO: Use more optimized component instead of native <img> */}
            <img
              className="rounded"
              width={180}
              height={220}
              src={product.coverImageUrl || "/img/placeholder_cover.svg"}
            ></img>
          </div>
        </div>
      </Link>
    </div>
  );
};
