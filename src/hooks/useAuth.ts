import { selectAuth } from '@/src/redux/selectors/index';

import { useAppSelector } from './redux';

export function useAuth() {
  const { user } = useAppSelector(selectAuth);
  return {
    isAuth: !!user
  };
}
