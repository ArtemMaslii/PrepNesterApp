import {
  RequestCheatSheetQuestion
} from "@/interface/requestCreateCheatSheet/RequestCheatSheetQuestion";

export interface RequestCheatSheetCategory {
  id: string;
  questions: RequestCheatSheetQuestion[];
}