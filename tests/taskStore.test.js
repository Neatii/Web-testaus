import { expect, it } from 'vitest';
import { loadTasks } from '../public/taskStore';
import { saveTasks } from '../public/taskStore';
import { sortTasks } from '../public/taskStore';
import { createTask } from '../public/taskStore';
import { updateTask } from '../public/taskStore';
import { toggleTaskCompletion } from '../public/taskStore';
import { generateId } from '../public/taskStore';
import { escapeHtml } from '../public/taskStore';
import { statusLabel } from '../public/taskStore';

// loadTask()
it('pitäisi näyttää tallennetut tehtävät oikein', () => {
  const tasks = [
    {
      id: 1,
      text: 'Osta maitoa',
      done: false,
    },
    { id: 2, text: 'tee SQL tehtävä', done: true },
  ];

  localStorage.setItem('todo_tasks_v1', JSON.stringify(tasks));
  const result = loadTasks();

  expect(result).toEqual(tasks);
});

(it('should return empty array if localstorage is empty'),
  () => {
    localStorage.clear();
    // Arrange: Set up test data
    const result = loadTasks();
    const expected = [];

    // Act: Execute the function

    // Assert: Verify the result
    expect(result).toBe(expected);
  });

// saveTask()
it('tehtävän pitäisi tallentua localStorageen', () => {
  const tasks = [
    {
      id: 1,
      text: 'Osta maitoa',
      done: false,
    },
    { id: 2, text: 'tee SQL tehtävä', done: true },
  ];

  saveTasks(tasks);
  const stored = JSON.parse(localStorage.getItem('todo_tasks_v1'));
  expect(stored).toEqual(tasks);
});

// sortTask()
it('pitäisi järjestää tehtävät oikein', () => {
  const tasks = [
    {
      id: 1,
      completed: true,
      priority: 'high',
      createdAt: 1,
    },
    {
      id: 2,
      completed: false,
      priority: 'high',
      createdAt: 1,
    },
  ];
  const result = sortTasks(tasks);

  expect(result[0].id).toBe(2);
  expect(result[1].id).toBe(1);
});

// createTask()
it('pitäisi luoda tehtävä oikeilla tiedoilla', () => {
  const payload = {
    text: 'Osta maitoa',
    priority: 'high',
    status: 'todo',
  };
  const now = 1234567890;

  const result = createTask(payload, now);

  expect(result.text).toBe('Osta maitoa');
  expect(result.priority).toBe('high');
  expect(result.status).toBe('todo');
  expect(result.createdAt).toBe(now);
  expect(result.updatedAt).toBe(now);
});

// updateTask()
it('päivittää tehtävän tiedot oikein', () => {
  const existingTask = {
    id: 1,
    text: 'Osta maitoa',
    priority: 'low',
    status: 'todo',
    completed: false,
    createdAt: 1000,
    updatedAt: 1000,
  };

  const payload = { priority: 'high', status: true };

  const now = 2000;
  const result = updateTask(existingTask, payload, now);

  expect(result.id).toBe(1);
  expect(result.text).toBe('Osta maitoa');
  expect(result.priority).toBe('high');
  expect(result.status).toBe(true);
  expect(result.createdAt).toBe(1000);
  expect(result.updatedAt).toBe(2000);
});

// toggleTaskCompletion()
it('tehtävän tilan tulisi vaihtua', () => {
  const task = {
    id: 1,
    text: 'Osta maitoa',
    priority: 'low',
    status: 'todo',
    completed: false,
    createdAt: 1000,
    updatedAt: 1000,
  };
  const now = 200;

  const result = toggleTaskCompletion(task, now);
  expect(result.status).toBe('done');
});

// generateId()
it('pitäisi generoida oikeanlainen id eli merkkijono', () => {
  const result = generateId();

  expect(typeof result).toBe('string');
});

//escapeHtml():
it('muuttaa HTML:n erikoismerkit niin, että se on merkkijonn mukainen', () => {
  const str = 'Kissa & koira';
  const result = escapeHtml(str);

  expect(result).toBe('Kissa &amp; koira');
});

it('normi tekstin tulee palautua muuttumattomana, koska siinä ei ole erikoismerkkejä', () => {
  const str = 'Kissalla ja koiralla on mukavaa';
  const result = escapeHtml(str);

  expect(result).toBe('Kissalla ja koiralla on mukavaa');
});

//statusLabel():
it('pitäisi palauttaa done kun tehtävä on tehty', () => {
  const result = statusLabel('Done');

  expect(result).toBe('Done');
});

it('pitäisi palauttaa to do kun tehtävä on kesken', () => {
  const result = statusLabel('To do');

  expect(result).toBe('To do');
});
