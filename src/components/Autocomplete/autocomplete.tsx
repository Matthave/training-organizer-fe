import * as React from "react";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import crossIcon from "@/images/cross.svg";
import circleIcon from "@/images/circle.svg";
import { ISubpart } from "@/types/exercises";

export default function CheckboxesTags({
  autocompleteTagsHandler,
  settedValue,
  tagsArray,
}: {
  autocompleteTagsHandler: (filterValue: ISubpart[]) => void;
  settedValue: ISubpart[];
  tagsArray: ISubpart[];
}) {
  return (
    <div className="autocompleteTagsWrapper">
      <Autocomplete
        multiple
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            width: "330px",
            minHeight: "60px",
            maxHeight: "120px",
            overflow: "scroll",
            border: "0.5px solid #555",
            borderRadius: "31px",
            boxShadow: "inset 8px 8px 16px #101010, inset -0px 0px 5px #424242",
            scrollbarWidth: "none",
          },
          "& .MuiAutocomplete-popupIndicator": {
            display: "none",
          },
          "& .MuiInputLabel-shrink": {
            display: "none",
          },
          "& .MuiAutocomplete-tag": {
            display: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            display: "none",
          },
          "& .MuiChip-root": {
            display: "none",
          },
          "#autocompleteTags-label": {
            marginLeft: "12px",
          },
          "#autocompleteTags.MuiInputBase-input": {
            color: "#fff",
          },
          ".MuiInputLabel-formControl": {
            display: "none",
          },
          ".MuiInputBase-input": {
            paddingLeft: "25px !important",
            fontSize: "13px",
          },
        }}
        value={settedValue}
        limitTags={1}
        id="autocompleteTags"
        options={tagsArray}
        disableCloseOnSelect
        disablePortal
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onChange={(event, newValue: ISubpart[]) =>
          autocompleteTagsHandler(newValue)
        }
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          const { className } = optionProps || "";
          return (
            <li
              key={key}
              {...optionProps}
              className={`${className} autocompleteLi`}
            >
              <Checkbox
                icon={<Image src={circleIcon} alt="circle icon" width={10} />}
                checkedIcon={
                  <Image src={crossIcon} alt="cross icon" width={10} />
                }
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          );
        }}
        style={{ width: 330 }}
        renderInput={(params) => (
          <TextField {...params} label="" placeholder="Wpisz tag" />
        )}
      />
    </div>
  );
}
