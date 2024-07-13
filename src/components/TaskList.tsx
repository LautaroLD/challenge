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
import { Task } from '../models';
export default function TaskList() {
  const { tasks } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<Task | null>();
  const { deleteTask, getTasks, updateTask } = TaskHooks();
  useEffect(() => {
    getTasks();
  }, []);

  const handleModal = () => {
    setOpen(!open);
  };
  const handleDataModal = (task: Task) => {
    setModalData(task);
    handleModal();
  };

  return (
    <>
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
              <EditIcon
                className='icon'
                onClick={() => handleDataModal(task)}
              />
              <DeleteIcon
                className='icon'
                onClick={() => {
                  deleteTask(task.id);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
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
            description={modalData?.description}
            title={modalData?.title}
            status={modalData?.status}
            id={modalData?.id}
            handleModal={handleModal}
          />
        </Box>
      </Modal>
    </>
  );
}
