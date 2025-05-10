import {FormControl, MenuItem, Select} from "@mui/material";
import React from "react";

export const PrivacyTextField =
    ({
       isPublic,
       setIsPublic,
     }:
         { isPublic: boolean, setIsPublic: (isPublic: boolean) => void }) => {
      const selectedStyleColor = {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#DDDDDD',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#DDDDDD',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#DDDDDD',
          borderWidth: '1px',
        },
        '& .MuiSelect-icon': {
          color: '#000048',
        },
        '&:hover .MuiSelect-icon': {
          color: '#000048',
        },
        '&.Mui-focused .MuiSelect-icon': {
          color: '#000048',
        },
        '& .MuiPaper-root': {
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '4px',
          '& .MuiMenu-list': {
            padding: 0,
          },
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          },
        },
      }

      return (
          <>
            <FormControl sx={{width: '50%'}}>
              <Select
                  value={isPublic ? 'public' : 'private'}
                  onChange={(e) => setIsPublic(e.target.value === 'public')}
                  sx={{
                    mb: 2,
                    borderRadius: '5px',
                    color: '#000048',
                    height: '50px', ...selectedStyleColor
                  }}
              >
                <MenuItem value="public" sx={{color: '#000048'}}>Public</MenuItem>
                <MenuItem value="private" sx={{color: '#000048'}}>Private</MenuItem>
              </Select>
            </FormControl></>
      )
    }