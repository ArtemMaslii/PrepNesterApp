import {Status} from "@/interface/Status";
import {InterviewCandidateDetails} from "./InterviewCandidateDetails";

export interface InterviewDetails {
  id: string,
  candidate: InterviewCandidateDetails,
  openPosition: string,
  department: string,
  status: Status,
  notes: string,
  cheatSheetId: string,
}