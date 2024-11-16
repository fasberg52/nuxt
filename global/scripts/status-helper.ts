// global/scripts/status-helpers.ts

import { JobOpportunityStatusEnum } from "~/enums/jobOpportunity.enum";

export function getTranslatedStatus(status: JobOpportunityStatusEnum): string {
  const translations: Record<JobOpportunityStatusEnum, string> = {
    [JobOpportunityStatusEnum.ACTIVE]: "فعال",
    [JobOpportunityStatusEnum.NOTACTIVE]: "غیر فعال",
   
  };

  return translations[status] || "نامشخص"; 
}
