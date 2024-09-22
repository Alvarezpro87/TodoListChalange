'use client';

import { useState, useEffect } from 'react';
import './TaskList.scss'; 
import Modal from '../modal/modal';
import Image from 'next/image';
import Trash from '../../assets/Icon.png'; 

export default function ToDoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isCreateTaskModal, setCreateTaskModal] = useState(false);
  const [isDeleteTaskModal, setDeleteTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [deleteFromCompleted, setDeleteFromCompleted] = useState(false);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem('tasks');
      const storedCompletedTasks = localStorage.getItem('completedTasks');

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks(['Lavar as mãos', 'Fazer um Bolo', 'Lavar a louça']);
      }

      if (storedCompletedTasks) {
        setCompletedTasks(JSON.parse(storedCompletedTasks));
      } else {
        setCompletedTasks(['Levar o lixo para fora']);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
  }, [tasks, completedTasks]);

  function addTask() {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
      setCreateTaskModal(false);
    }
  }

  function confirmDeleteTask() {
    if (taskToDelete !== null) {
      if (deleteFromCompleted) {
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== taskToDelete);
        setCompletedTasks(updatedCompletedTasks);
      } else {
        const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
        setTasks(updatedTasks);
      }
      setTaskToDelete(null);
      setDeleteFromCompleted(false);
      setDeleteTaskModal(false);
    }
  }

  function completeTask(index: number) {
    const completedTask = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCompletedTasks = [...completedTasks, completedTask];

    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  }

  function uncompleteTask(index: number) {
    const uncompletedTask = completedTasks[index];
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    const updatedTasks = [...tasks, uncompletedTask];

    setCompletedTasks(updatedCompletedTasks);
    setTasks(updatedTasks);
  }

  return (
    <div className="toDoList"> 
      <div className="tasks">
        <p>Suas Tarefas de Hoje</p>
        <ul>
          {tasks.length === 0 ? (
            <li className="no-task">Nenhuma tarefa para fazer</li>
          ) : (
            tasks.map((task, index) => (
              <li key={index}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="complete-task"
                    onChange={() => completeTask(index)}
                  />
                  <p>{task}</p>
                </div>
                <div
                  onClick={() => {
                    setDeleteTaskModal(true);
                    setTaskToDelete(index);
                    setDeleteFromCompleted(false);
                  }}
                  className="delete-task"
                >
                  <Image src={Trash} alt="deletar tarefa" width={24} height={24} />
                </div>
              </li>
            ))
          )}
        </ul>

        <p>Tarefas Finalizadas</p>
        <ul>
          {completedTasks.length === 0 ? (
            <li className="no-task">Nenhuma Tarefa Finalizada</li>
          ) : (
            completedTasks.map((task, index) => (
              <li key={index}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="complete-task checked"
                    onChange={() => uncompleteTask(index)}
                  />
                  <p className="checked">{task}</p>
                </div>
                <div
                  onClick={() => {
                    setDeleteTaskModal(true);
                    setTaskToDelete(index);
                    setDeleteFromCompleted(true);
                  }}
                  className="delete-task"
                >
                  <Image src={Trash} alt="deletar tarefa" width={24} height={24} />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <button className="button confirm" onClick={() => setCreateTaskModal(true)}>
        Adicionar Tarefa
      </button>

      {/* Modal de criar nova tarefa */}
      {isCreateTaskModal && (
        <Modal
          title="Nova Tarefa"
          onClose={() => setCreateTaskModal(false)}
          buttons={[
            { label: 'Adicionar tarefa', onClick: addTask, type: 'confirm' },
            { label: 'Cancelar', onClick: () => setCreateTaskModal(false), type: 'modalClose' },
          ]}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="new-task">Título</label>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Digite"
              name="new-task"
            />
          </div>
        </Modal>
      )}

      {/* Modal de confirmação de exclusão */}
      {isDeleteTaskModal && (
        <Modal
          title="Deletar Tarefa"
          onClose={() => setDeleteTaskModal(false)}
          buttons={[
            { label: 'Deletar', onClick: confirmDeleteTask, type: 'alert' },
            { label: 'Cancelar', onClick: () => setDeleteTaskModal(false), type: 'modalClose' },
          ]}
        >
          <p>Tem certeza que você deseja deletar essa tarefa?</p>
        </Modal>
      )}
    </div>
  );
}
