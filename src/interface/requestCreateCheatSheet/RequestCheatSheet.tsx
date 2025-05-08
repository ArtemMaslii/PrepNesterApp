import {
  RequestCheatSheetCategory
} from "@/interface/requestCreateCheatSheet/RequestCheatSheetCategory";

export interface RequestCheatSheet {
  title: string;
  isPublic: boolean;
  categories: RequestCheatSheetCategory[];
  createdBy: string;
}