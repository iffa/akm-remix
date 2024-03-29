import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProductDetailsCard } from "../components/product/ProductDetailsCard";
import ProductOfferTable from "../components/product/ProductOfferTable";
import ProductOfferTableFilters from "../components/product/ProductOfferTableFilters";
import { GetProductResponse, getProduct } from "../lib/products";

export const meta: V2_MetaFunction = ({
  data,
}: {
  data: GetProductResponse | undefined;
}) => {
  return [{ title: `AKM - ${data?.product.name}` }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);

  const includeLaunchers = url.searchParams.has("launcher")
    ? url.searchParams.getAll("launcher")
    : undefined;
  const includeEditions = url.searchParams.has("edition")
    ? url.searchParams.getAll("edition")
    : undefined;
  const includeStores = url.searchParams.has("store")
    ? url.searchParams.getAll("store")
    : undefined;

  return getProduct({
    id: params.slug,
    includeEditions,
    includeLaunchers,
    includeStores,
  });
};

export const ErrorBoundary = () => {
  return (
    <div className="container mx-auto space-y-8 px-4">
      <h1 className="text-xl leading-6 font-medium text-gray-900">
        No product found.
      </h1>
    </div>
  );
};

export default function ProductSlug() {
  const { product, launchers, editions, stores } =
    useLoaderData<GetProductResponse>();

  return (
    <div className="container mx-auto space-y-8 px-4">
      <ProductDetailsCard product={product}></ProductDetailsCard>
      <ProductOfferTableFilters
        launchers={launchers}
        editions={editions}
        stores={stores}
      ></ProductOfferTableFilters>
      <ProductOfferTable product={product}></ProductOfferTable>
    </div>
  );
}
