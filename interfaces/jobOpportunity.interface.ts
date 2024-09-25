import type {
  JobOpportunityStatusEnum,
  WorkModelEnum,
  WorkTypeEnum,
} from "~/enums/jobOpportunity.enum";

export interface Job {
  id: number;
  title: string;
  status: JobOpportunityStatusEnum;
  lastOpinionStatus: string;
  timeInterview: string;
  workType: WorkTypeEnum;
  workModel: WorkModelEnum;
  salary: number;
  category: {
    id: number;
    name: string;
  };
}
