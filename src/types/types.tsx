import { ChangeEvent } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: {
    city: string;
  };
  isLoading: boolean;
  isFetching: boolean;
}

export interface SearchResultsProps {
  debouncedValue: string;
}

export interface SearchFormProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
