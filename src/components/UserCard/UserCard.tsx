import { FunctionComponent } from "react";
import { User } from "../../types/types";
import classNames from "classnames";
import styles from "./styles.module.scss";

export const UserCard: FunctionComponent<User> = ({
  image,
  firstName,
  lastName,
  address,
  isLoading,
  isFetching,
}) => {
  //отображаем скелетон по размерам карточки пользователя пока данные загружаются или обновляются
  return isLoading || isFetching ? (
    <div className={classNames(styles.userCard, styles.userCardSkeleton)}>
      <div className={classNames(styles.userPic, styles.userPicSkeleton)} />
    </div>
  ) : (
    <div className={styles.userCard}>
      <img className={styles.userPic} loading="lazy" src={image} />
      <div className={styles.userInfo}>
        <div>{`${firstName} ${lastName}`}</div>
        <div>{address.city}</div>
      </div>
    </div>
  );
};
