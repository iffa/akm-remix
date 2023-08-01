import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { GoSearch } from "react-icons/go";
import { SearchResult } from "../components/search/SearchResult";
import { Product } from "../lib/model/product.model";
import { getProducts } from "../lib/products";

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || undefined;
  return getProducts({ query });
};

export const meta: MetaFunction = () => {
  return { title: "AKM - Find affordable game keys" };
};

export default function Index() {
  const { t } = useTranslation("home");
  const results = useLoaderData<Product[]>();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <Form reloadDocument className="container mx-auto px-4">
      <div className="relative flex w-full flex-wrap items-stretch">
        <label htmlFor="search" className="sr-only">
          {t("search-hint")}
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder={t("search-hint")}
          className="relative px-4 py-4 bg-white placeholder-gray-300 text-gray-600 rounded text-base border-0 shadow focus:ring w-full pr-12 transition duration-200 ease-in-out"
          name="query"
          defaultValue={query}
        />
        <button
          id="searchSubmit"
          className="h-full font-normal absolute text-center text-gray-700 bg-transparent items-center justify-center w-8 right-0 py-4 mr-3 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          title={t("search-submit")}
        >
          <GoSearch className="w-full h-full" />
        </button>
      </div>

      <div
        id="searchResults"
        className="mt-8 space-y-6 md:space-y-0 content-evenly flex flex-col md:flex-row md:flex-wrap md:-mx-4"
      >
        {results.map((result, index) => (
          <SearchResult
            product={result}
            index={index}
            key={result.id}
          ></SearchResult>
        ))}
      </div>
    </Form>
  );
}
