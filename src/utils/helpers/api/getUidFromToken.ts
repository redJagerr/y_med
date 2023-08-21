import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import { firebaseAdmin } from '@/@firebase/admin';

export const getUidFromToken = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  const { uid } = token;
  return uid;
};
