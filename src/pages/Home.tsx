/* eslint-disable react-hooks/exhaustive-deps */
import FormNewTask from '../components/FormNewTask';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className='homePage'>
      <FormNewTask />
      <TaskList />
    </div>
  );
}
