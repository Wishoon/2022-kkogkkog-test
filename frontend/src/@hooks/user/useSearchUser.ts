import { useState } from 'react';

import useMe from '@/@hooks/user/useMe';
import useUserList from '@/@hooks/user/useUserList';
import { UserListResponse } from '@/types/remote/response';

export const useSearchUser = () => {
  const { me } = useMe();

  // 이 부분은 검색 API 도입시 사라지게됨
  const { userList } = useUserList();

  const userWithoutMe = userList?.filter(({ id }) => me?.id !== id);

  const [searchedUserList, setSearchedUserList] = useState<UserListResponse | undefined>(
    userWithoutMe
  );

  const searchUser = (keyword: string) => {
    const users = userList || [];

    if (keyword === '') {
      setSearchedUserList(userList);

      return;
    }

    // 이 부분은 검색 API 도입시 비동기 요청하는 코드로 변경됨
    const findUserList = users.filter(
      ({ id, nickname }) => nickname.includes(keyword) && me?.id !== id
    );

    setSearchedUserList(findUserList);
  };

  return {
    searchedUserList,
    searchUser,
  };
};
