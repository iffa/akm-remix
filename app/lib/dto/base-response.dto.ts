export interface ResponseTimesDto {
  validation: number;
  fetching: number;
}

export interface BaseResponseDto {
  status: "success" | "failed";
  warnings: string[];
  errors: string[];
  info: {
    times: ResponseTimesDto;
    productCount?: number;
  };
}
