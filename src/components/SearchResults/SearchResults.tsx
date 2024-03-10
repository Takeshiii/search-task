import { FunctionComponent, useEffect, useState } from "react";
import { UserCard } from "../UserCard/UserCard";
import styles from "./styles.module.scss";
import { useLazyGetUsersQuery } from "../../redux/service/users";
import { User } from "../../types/types";
import { SearchResultsProps } from "../../types/types";

export const SearchResults: FunctionComponent<SearchResultsProps> = ({
  debouncedValue,
}) => {
  //устанавливаем состояния количества загружаемых пользователей для пагинации(бесконечного скролла на +10 пользователей)
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);

  //вызываем RTK Query хук для запроса на сервер (lazy что бы он не отрабатывал сразу при загрузке страницы и пустом инпуте)
  const [trigger, result] = useLazyGetUsersQuery();

  //деструктурируем параметры квери функции для дальнейшей работы с ними
  const { data, isLoading, isFetching, isError, error } = result;

  //обработчик запроса на сервер с условием когда наша квери функция будет отрабатывать
  useEffect(() => {
    if (debouncedValue.length > 0) {
      trigger({ user: debouncedValue, page: page, limit: limit });
    }
  }, [trigger, debouncedValue, page, limit]);

  //обработчик скрола для загрузки новых пользователей (по достижению лимита перестает отрабатывать)
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (
        scrolledToBottom &&
        !isFetching &&
        data?.users.length >= limit * page
      ) {
        setPage(page + 1);
        setLimit(limit + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, limit, data, isFetching]);

  //хранение данных в сторе составляет одну минуту и обновляется при повторном обращении к ним в пределах этой минуты
  //предполагаю если пользователь вводит какие-то данные в инпут без их удаления и ищет новые данные или возвращается к старым то они ему нужны
  //и таймер на хранение данных в редаксе всегда будет обновляться
  //в свою очередь если инпут пуст на протяжении одной минуты (что равно жизненному циклу стора) то считаю нужным обнулить всю пагинацию вместе с стором
  useEffect(() => {
    if (debouncedValue.length === 0) {
      const timer = setTimeout(() => {
        setPage(1);
        setLimit(1);
      }, 60000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [debouncedValue]);

  //сбрасываем отображаемые карточки если инпут пустой
  if (!debouncedValue) {
    return null;
  }

  //если не можем найти совпадений говорим что у нас нет таких данных
  if (data?.users.length === 0) {
    return <div className={styles.usersList}>No users found</div>;
  }

  //информируем пользователя об ошибке если все запросы оказались не удачными (и отправляем данные в консоль)
  if (isError && "status" in error) {
    console.error(error);
    return (
      <div className={styles.usersList}>
        <div>Oops, something went wrong!</div>
        <div>Error: {error.status}</div>
      </div>
    );
  }

  return (
    <div className={styles.usersList}>
      {data?.users.map((user: User) => (
        <UserCard
          key={user.id}
          {...user}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      ))}
    </div>
  );
};
