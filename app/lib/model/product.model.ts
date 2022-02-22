import { MetacriticScore } from "./metacritic-score.model";
import { Offer } from "./offer.model";
import { OfferAggregate } from "./offer-aggregate.model";
import { Tag } from "./tag.model";

export interface AvailablePlatforms {
  [key: string]: AvailablePlatform;
}

export interface AvailablePlatform {
  gameId: number;
  platformName: string;
}

export interface Product {
  id: number;
  categorySlug: string;
  name: string;
  thumbnailUrl: string;
  link: string;
  releaseYear: number;
  releaseMonth: number;
  releaseDate: string; // YYYY-MM-DD
  platform: string;
  coverImageUrl?: string;
  offers?: Offer[];
  keywords: string[];
  availablePlatforms: AvailablePlatforms;
  bestOffer?: Offer;
  offerAggregate: OfferAggregate;
  metacriticScores: {
    critic: MetacriticScore;
    user: MetacriticScore;
    total: MetacriticScore;
  };
  tags: Tag[]; // unclear what tags are
  developer: string;
  publisher: string;
  officialWebsite: string;
}
