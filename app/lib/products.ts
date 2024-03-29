import ky from "ky";
import { filterDistinct } from "../utils/array-utils";
import { ProductsResponseDto } from "./dto/products-response.dto";
import { Action } from "./enum/action.enum";
import { Currency } from "./enum/currency.enum";
import { Locale } from "./enum/locale.enum";
import { Edition } from "./model/edition.model";
import { Product } from "./model/product.model";
import { Region } from "./model/region.model";
import { Store } from "./model/store.model";

const INVALID_GAME_IDS_REMOVED = "Invalid game IDs item";
const ENDPOINT = process.env.ENDPOINT || "";
const API_KEY = process.env.API_KEY || "";

export interface BaseProductOptions {
  showOffers?: boolean;
  showVouchers?: boolean;
  currency?: Currency;
  locale?: Locale;
}

export interface GetProductsOptions extends BaseProductOptions {
  query: string | undefined;
}

export interface GetProductOptions extends BaseProductOptions {
  id: string | undefined;
  includeLaunchers?: string[];
  includeEditions?: string[];
  includeStores?: string[];
}

export interface GetProductResponse {
  product: Product;
  editions: Edition[];
  launchers: Region[];
  stores: Store[];
}

const DefaultBaseProductOptions: BaseProductOptions = {
  showOffers: true,
  showVouchers: true,
  currency: Currency.EUR,
  locale: Locale.en_GB,
};

const DefaultGetProductsOptions: GetProductsOptions = {
  ...DefaultBaseProductOptions,
  query: undefined,
};

const DefaultGetProductOptions: GetProductOptions = {
  ...DefaultBaseProductOptions,
  id: undefined,
};

export async function getProducts(
  options: GetProductsOptions
): Promise<Product[]> {
  options = {
    ...DefaultGetProductsOptions,
    ...options,
  } as const;

  const { query, showOffers, showVouchers, currency, locale } = options;

  if (!ENDPOINT || !query) {
    return [];
  }

  return (
    ky(ENDPOINT, {
      searchParams: {
        apiKey: API_KEY,
        action: Action.PRODUCTS.toString(),
        search: query,
        showOffers: showOffers ? "1" : "0",
        showVouchers: showVouchers ? "1" : "0",
        currency: currency ?? "",
        locale: locale ?? "",
      },
    })
      .json<ProductsResponseDto>()
      .then((response) => response.products)
      // If product has no best offer, consider it as not available
      .then((products) => products.filter((product) => product.bestOffer))
  );
}

export async function getProduct(
  options: GetProductOptions
): Promise<GetProductResponse> {
  options = {
    ...DefaultGetProductOptions,
    ...options,
  };

  const {
    id,
    showOffers,
    showVouchers,
    currency,
    locale,
    includeEditions,
    includeLaunchers,
    includeStores,
  } = options;

  if (!ENDPOINT || !id) {
    throw new Error("Missing endpoint configuration or no id specified");
  }

  return ky(ENDPOINT, {
    searchParams: {
      apiKey: API_KEY,
      action: Action.PRODUCTS,
      showOffers: showOffers ? "1" : "0",
      showVouchers: showVouchers ? "1" : "0",
      ids: id,
      currency: currency ?? "",
      locale: locale ?? "",
    },
  })
    .json<ProductsResponseDto>()
    .then((response) => {
      const includesWarnings = response.warnings.some((warning) =>
        warning.includes(INVALID_GAME_IDS_REMOVED)
      );
      if (includesWarnings || !response.products || !response.products[0]) {
        throw new Error(`No product found for id ${id}`);
      }
      return response;
    })
    .then((response) => response.products[0])
    .then((product) => {
      const launchers: Region[] = filterDistinct(
        product.offers?.map((offer) => ({ ...offer.region })),
        (a, b) => a.id === b.id
      );
      const editions: Edition[] = filterDistinct(
        product.offers?.map((offer) => ({ ...offer.edition })),
        (a, b) => a.id === b.id
      );
      const stores: Store[] = filterDistinct(
        product.offers?.map((offer) => ({ ...offer.store })),
        (a, b) => a.id === b.id
      );

      if (includeEditions) {
        product.offers = product.offers?.filter((offer) => {
          return includeEditions.includes(offer.edition.id);
        });
      }

      if (includeLaunchers) {
        product.offers = product.offers?.filter((offer) => {
          return includeLaunchers.includes(offer.region.id);
        });
      }

      if (includeStores) {
        product.offers = product.offers?.filter((offer) => {
          return includeStores.includes(offer.store.id.toString());
        });
      }

      product.offers = product.offers?.filter((offer) => offer.available);

      return { product, launchers, editions, stores };
    });
}
