import { Link } from "remix";
import { AvailablePlatform } from "../../lib/model/product.model";

function ProductPlatformPill({
  platform,
  isActive,
}: {
  platform: AvailablePlatform;
  isActive: boolean;
}): JSX.Element {
  return (
    <Link
      to={`/product/${platform.gameId}`}
      data-cy={platform.gameId}
      className={`${
        isActive
          ? "bg-blue-700 text-gray-200 hover:bg-blue-800"
          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
      } py-2 px-4 inline-flex text-xs leading-5 whitespace-nowrap font-semibold rounded-full transition duration-200 ease-in-out`}
    >
      {platform.platformName}
    </Link>
  );
}

export default ProductPlatformPill;
