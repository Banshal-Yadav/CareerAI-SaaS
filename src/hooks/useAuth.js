import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInAnonymously 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  // the guest login function 
  const loginAsGuest = async () => {
    return await signInAnonymously(auth);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  return { user, loading, login, register, loginWithGoogle, logout, loginAsGuest };
};