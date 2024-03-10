import { FunctionComponent, FormEvent } from "react";
import { SearchFormProps } from "../../types/types";

import styles from "./styles.module.scss";

export const SearchForm: FunctionComponent<SearchFormProps> = ({
  value,
  onChange,
}) => {
  //обработчик для предотвращения стандартного поведение формы
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter user name here"
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  );
};
