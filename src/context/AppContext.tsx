import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState } from 'react';
import { auth } from '../firebase/config';
import { Task } from '../models';

export const AppContext = createContext<{
  isAuth: User | null;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}>({
  isAuth: null,
  tasks: [],
  setTasks: () => {},
});
export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setAuth] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuth(user);
    } else {
      setAuth(null);
    }
  });
  return (
    <AppContext.Provider value={{ isAuth, tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};
