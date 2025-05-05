'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {UserDetails} from "@/interface/UserDetails";
import {getUserDetails} from "@/lib/api";
import {useAuth} from "@/context";

interface UserContextType {
  user: UserDetails | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {
  },
});

export const UserProvider = ({children}: { children: React.ReactNode }) => {
  const {token} = useAuth();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    if (!token) return;

    const email = localStorage.getItem('email');

    if (!email) return;

    try {
      const userDetails = await getUserDetails(token, email)
      setUser(userDetails);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserDetails();
  }, [token]);

  return (
      <UserContext.Provider value={{user, isLoading, refreshUser: fetchUserDetails}}>
        {children}
      </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);