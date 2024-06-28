/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { TaskHooks } from '../hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Modal } from '@mui/material';
import FormNewTask from './FormNewTask';
export default function TaskList() {
  const { tasks } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const { deleteTask, getTasks, updateTask } = TaskHooks();
  useEffect(() => {
    getTasks();
  }, []);

  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <ul className='taskList'>
      {tasks.length < 1 && (
        <div className='TaskEmpty'>
          <p>Todavía no tienes tareas creadas.</p>
        </div>
      )}
      {tasks.map((task, i) => (
        <li
          key={i}
          className={`${task.status === true ? 'completed' : 'pending'}`}
        >
          <div
            className='icon'
            onClick={() => {
              updateTask(task.id, {
                ...task,
                status: !task.status,
              });
            }}
          >
            {task.status === true ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </div>
          <p>{task.title}</p>
          <p className='description'>{task.description}</p>

          <div>
            <EditIcon className='icon' onClick={handleModal} />
            <DeleteIcon
              className='icon'
              onClick={() => {
                deleteTask(task.id);
              }}
            />
          </div>
          <Modal className='modalTask' open={open} onClose={handleModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                bgcolor: 'background.paper',
                boxShadow: 24,
              }}
            >
              <FormNewTask
                description={task.description}
                title={task.title}
                status={task.status}
                id={task.id}
                handleModal={handleModal}
              />
            </Box>
          </Modal>
        </li>
      ))}
    </ul>
  );
}
