import {Status} from "@/interface/Status";
import {InterviewUpdateCandidateDetails} from "./InterviewUpdateCandidateDetails";

export interface InterviewUpdateDetails {
  candidate: InterviewUpdateCandidateDetails,
  openPosition: string,
  departmentName: string,
  status: Status,
  notes: string,
  cheatSheetId: string,
}