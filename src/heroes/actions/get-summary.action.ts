import { heroesApi } from "@/heroes/api/hero.api";
import type { SummaryInformationResponse } from "@/heroes/interfaces/summary-information.response";

export const getSummaryAction =
  async (): Promise<SummaryInformationResponse> => {
    const { data } =
      await heroesApi.get<SummaryInformationResponse>("/summary");

    return data;
  };
