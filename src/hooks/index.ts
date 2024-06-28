import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Task } from '../models';
export function TaskHooks() {
  const { isAuth, setTasks } = useContext(AppContext);
  const createTask = (taskData: Partial<Task>) => {
    if (isAuth) {
      const userDocRef = doc(db, 'users', isAuth.uid);
      const tasksCollectionRef = collection(userDocRef, 'tasks');
      addDoc(tasksCollectionRef, taskData);
    }
  };
  const getTasks = () => {
    if (isAuth) {
      const userDocRef = doc(db, 'users', isAuth.uid);
      const tasksCollectionRef = collection(userDocRef, 'tasks');

      const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          status: doc.data().status,
        }));
        setTasks(tasks);
      });

      return unsubscribe;
    }
  };
  const updateTask = (taskId: string, updatedTaskData: Task) => {
    if (isAuth) {
      const taskRef = doc(db, 'users', isAuth.uid, 'tasks', taskId);
      updateDoc(taskRef, updatedTaskData);
    }
  };
  const deleteTask = (taskId: string) => {
    if (isAuth) {
      const taskRef = doc(db, 'users', isAuth.uid, 'tasks', taskId);
      deleteDoc(taskRef);
    }
  };
  return {
    getTasks,
    deleteTask,
    updateTask,
    createTask,
  };
}
