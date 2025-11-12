
import {  useEffect, useState } from "react"
import auth from "@react-native-firebase/auth";



const useAuth = () => {
    const [user, setUser] = useState<any | null>(null);

   useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser:any

    ) =>{
        console.log('User changed', firebaseUser);
        setUser(firebaseUser ?? null);
    });
    return () => unsubscribe();
   }, []);
   return user;
}

export default useAuth;
