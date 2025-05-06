import {CheatSheet} from "@/interface/CheatSheet";
import {CheatSheetListItem} from "./CheatSheetListItem";

interface Props {
  cheatSheets: CheatSheet[];
}

export const CheatSheetList = ({cheatSheets}: Props) => (
    <>
      {cheatSheets.map((cheatSheet) => (
          cheatSheet.isPublic ? (
              <CheatSheetListItem
                  key={cheatSheet.id}
                  cheatSheet={cheatSheet}
              />
          ) : null
      ))}
    </>
);