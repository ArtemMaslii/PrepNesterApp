import {Status} from "@/interface/Status";

export interface Interview {
  id: string,
  openPosition: string,
  candidateFullName: string,
  status: Status,
  createdAt: string,
}