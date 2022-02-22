import {
  ErrorBoundaryComponent,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import ProductDetailsCard from "../../components/product/ProductDetailsCard";
import ProductOfferTable from "../../components/product/ProductOfferTable";
import ProductOfferTableFilters from "../../components/product/ProductOfferTableFilters";
import { getProduct, GetProductResponse } from "../../lib/products";

export const meta: MetaFunction = ({
  data,
}: {
  data: GetProductResponse | undefined;
}) => {
  return { title: `AKM - ${data?.product.name}` };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const includeLaunchers = url.searchParams.has("launcher")
    ? url.searchParams.getAll("launcher")
    : undefined;
  const includeEditions = url.searchParams.has("editions")
    ? url.searchParams.getAll("edition")
    : undefined;
  return getProduct({ id: params.slug, includeEditions, includeLaunchers });
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="container mx-auto space-y-8 px-4">
      <h1 className="text-xl leading-6 font-medium text-gray-900">
        No product found.
      </h1>
    </div>
  );
};

export default function ProductSlug() {
  const { product, launchers, editions } = useLoaderData<GetProductResponse>();

  return (
    <div className="container mx-auto space-y-8 px-4">
      <ProductDetailsCard product={product}></ProductDetailsCard>
      <ProductOfferTableFilters
        launchers={launchers}
        editions={editions}
      ></ProductOfferTableFilters>
      <ProductOfferTable product={product}></ProductOfferTable>
    </div>
  );
}
