import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    uid: null,
    name: null,
    email: null,
    isLoading: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          name: authUser.displayName || authUser.email.split('@')[0],
          email: authUser.email,
          isLoading: false
        });
      } else {
        setUser({
          uid: null,
          name: null,
          email: null,
          isLoading: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
