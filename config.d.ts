declare module 'react-native-config' {
  export interface NativeConfig {
    API_KEY: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId:string;
    appId: string;
    // Add any other variables you use.
  }
  
 
  export const Config: NativeConfig;
  export default Config;
}