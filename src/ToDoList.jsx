import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Box, TextField, Button, Theme } from '@radix-ui/themes';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, done: false, id: Date.now() }]);
    setInput("");
  };

  const handleCheck = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Theme>
      <Box style={{ maxWidth: 420, margin: '40px auto', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #dadada' }}>
        <h2 style={{ marginBottom: 16 }}>ToDo List</h2>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <TextField.Root style={{ flex: 1 }}>
            <TextField.Input
              placeholder="Adicione uma tarefa"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </TextField.Root>
          <Button type="submit" variant="solid">Adicionar</Button>
        </form>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: task.done ? 0.5 : 1 }}>
              <Checkbox.Root checked={task.done} onCheckedChange={() => handleCheck(task.id)} style={{ width: 24, height: 24 }}>
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
              <Button variant="ghost" color="red" onClick={() => handleDelete(task.id)} size="1" style={{ minWidth: 0, padding: 4 }}>
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
      </Box>
    </Theme>
  );
};

export default ToDoList;
