import { Product } from "../lib/model/product.model";

const ICON_PATH = "/img/platform";

export function getStoresAmountForProduct(product: Product): number {
  return Array.from(
    new Set((product.offers || []).map((offer) => offer.store.id))
  ).length;
}

export function getLauncherIcon(launcher: string): string {
  const sanitized = launcher.trim().toLowerCase();

  if (sanitized.includes("epic")) {
    return `${ICON_PATH}/epic-games.svg`;
  } else if (sanitized.includes("steam")) {
    return `${ICON_PATH}/steam.svg`;
  } else if (sanitized.includes("origin")) {
    return `${ICON_PATH}/origin.svg`;
  } else if (sanitized.includes("playstation") || sanitized.includes("psn")) {
    return `${ICON_PATH}/playstation.svg`;
  } else if (
    sanitized.includes("rockstar") ||
    sanitized.includes("social club")
  ) {
    return `${ICON_PATH}/social-club.svg`;
  } else if (sanitized.includes("xbox")) {
    return `${ICON_PATH}/xbox.svg`;
  } else if (sanitized.includes("gog")) {
    return `${ICON_PATH}/gog.svg`;
  } else if (
    sanitized.includes("battlenet") ||
    sanitized.includes("battle.net")
  ) {
    return `${ICON_PATH}/battlenet.svg`;
  } else if (sanitized.includes("ubisoft") || sanitized.includes("uplay")) {
    return `${ICON_PATH}/uplay.svg`;
  } else {
    return `${ICON_PATH}/unknown.png`;
  }
}

export function sanitizeVoucherCode(voucher?: string): string | undefined {
  // broken encoding, remove
  if (voucher?.includes("\u0082¬")) {
    return undefined;
  } else {
    return voucher;
  }
}
