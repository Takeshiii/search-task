import { SearchForm } from "./components/SearchFrom/SearchForm";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { FunctionComponent, useState, ChangeEvent } from "react";
import { useDebounce } from "./hooks/useDebounce";

export const App: FunctionComponent = () => {
  //использовали подход поднятие состояния(lifting up state) для упрощения обмена данными между компонентами
  const [inputValue, setInputValue] = useState<string>("");

  //используем дебаунс для предотвращения слишком частых запросов
  const debouncedValue = useDebounce(inputValue, 500);

  //обработчик для изменения значения инпута
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Provider store={store}>
      <SearchForm value={inputValue} onChange={handleChange} />
      <SearchResults debouncedValue={debouncedValue} />
    </Provider>
  );
};
