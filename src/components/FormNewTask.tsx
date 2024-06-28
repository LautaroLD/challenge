import { TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskHooks } from '../hooks';

interface Inputs {
  title: string;
  description: string;
  status: boolean;
}

const inputsMessages = {
  required: 'Este campo es obligatorio',
};
interface Props {
  title?: string;
  description?: string;
  status?: boolean;
  id?: string;
  handleModal?: () => void;
}
export default function FormNewTask({
  title,
  description,
  status,
  id,
  handleModal,
}: Props) {
  const { createTask, updateTask } = TaskHooks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: title ?? '',
      description: description ?? '',
      status: status ?? false,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (title && description && status && id && handleModal) {
      updateTask(id, {
        ...data,
        id: id,
      });
      handleModal();
    } else {
      createTask({
        ...data,
        status: false,
      });
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='formTask'>
      <label>
        <TextField
          size='small'
          className='input'
          {...register('title', {
            required: {
              value: true,
              message: inputsMessages.required,
            },
          })}
          id='outlined-basic'
          label='Titulo'
          variant='outlined'
        />
        {errors.title && <p className='errorMessage'>{errors.title.message}</p>}
      </label>
      <label>
        <TextField
          size='small'
          className='input'
          {...register('description', {
            required: {
              value: true,
              message: inputsMessages.required,
            },
          })}
          id='outlined-basic'
          label='Descripción'
          variant='outlined'
        />
        {errors.description && (
          <p className='errorMessage'>{errors.description.message}</p>
        )}
      </label>
      {title && (
        <p>
          Estado:{' '}
          <b className={status === true ? 'completed' : 'pending'}>
            {status === true ? 'completada' : 'pendiente'}
          </b>
        </p>
      )}
      <Button type='submit' variant='contained'>
        {title ? 'Editar tarea' : 'Crear tarea'}
      </Button>
    </form>
  );
}
