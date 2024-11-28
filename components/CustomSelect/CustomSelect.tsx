import {
  FormControl,
  FormControlProps,
  FormLabel,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import Select, { Props as SelectProps, SelectInstance } from "react-select";

type SelectOptionType = {
  label?: string;
  value?: string;
};

interface CustomSelectProps extends FormControlProps {
  label?: string;
  id?: string;
  select?: boolean;
  selectOptions?: SelectOptionType[];
  selectProps?: SelectProps;
  errorText?: string | undefined | null;
  selectLoading?: boolean;
  light?: boolean;
  optionsText?: string;
  triggerValueChange?: string;
  isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  id,
  select,
  selectOptions,
  selectProps,
  errorText,
  selectLoading,
  light,
  optionsText,
  triggerValueChange,
  isMulti,
  ...rest
}: CustomSelectProps) => {
  const formattedOptions = useMemo(() => {
    const options = selectOptions?.map((option) => ({
      value: (option.value) as string,
      label: (option.label) as string,
      ...option,
    }));

    return options;
  }, [selectOptions]);

  return (
    <FormControl {...rest}>
      <FormLabel
        htmlFor={id}
        color='neutral.700'
        fontSize={"14px"}
        fontFamily='body'
        fontWeight='400'
        lineHeight='16px'
      >
        {label}
      </FormLabel>

      <Select
        options={formattedOptions}
        id={id}
        isClearable
        isSearchable
        isMulti={isMulti}
        isLoading={selectLoading}
        loadingMessage={() => <Spinner size='sm' color='primary.500' />}
        noOptionsMessage={() => (
          <Text>{optionsText || "No options available"}</Text>
        )}
        // defaultValue={selectProps?.defaultValue ?? ""}
        // value={selectProps?.defaultValue ?? selectProps?.value}
        {...selectProps}
        // key={`my_unique_select_key__${JSON.stringify(selectProps?.value)}`}
      />

      {errorText ? (
        <Text color='#FC8180' mt='1' fontSize={["0.875rem"]}>
          {errorText}
        </Text>
      ) : null}
    </FormControl>
  );
};

export default CustomSelect;
