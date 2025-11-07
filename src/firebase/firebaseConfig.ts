
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import RNCConfig from 'react-native-config';

const API_KEY = RNCConfig.API_KEY as string;
const authDomain = RNCConfig.authDomain as string;
const projectId = RNCConfig.projectId as string;
const storageBucket = RNCConfig.storageBucket as string;
const appId = RNCConfig.appId as string;
const messagingSenderId = RNCConfig.messagingSenderId as string;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
