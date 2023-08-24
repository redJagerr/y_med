// import { initializeApp, credential } from 'firebase-admin/app';
// import { g  } from 'firebase-admin/auth';

import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from '@/firebase.json'

try {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id
    })
  });
} catch (err) {
  firebaseAdmin.app();
}
export { firebaseAdmin };
