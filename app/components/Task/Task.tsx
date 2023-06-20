"use client";
import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import React, { FormEventHandler, useState } from "react";
import Modal from "../Modal/Modal";
import { addTodo, deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";

interface Props {
  task: ITask;
}
const Task: React.FC<Props> = ({ task }) => {
  const router = useRouter();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.name);
  const handleToggleEditModal = () => {
    setOpenEditModal((open) => !open);
  };
  const handleToggleDeleteModal = () => {
    setOpenDeleteModal((open) => !open);
  };
  const hadleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenDeleteModal(false);
    router.refresh();
  };
  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      name: taskToEdit,
    });
    setTaskToEdit("");
    setOpenEditModal(false);
    router.refresh();
  };
  return (
    <>
      <tr key={task.id}>
        <td>{task.name}</td>
        <td className="flex gap-3 ">
          <FiEdit
            onClick={handleToggleEditModal}
            size={20}
            className="text-blue-500 cursor-pointer"
          />
          <Modal
            showModal={openEditModal}
            handleToggleModal={handleToggleEditModal}
          >
            <form onSubmit={handleEditTodo}>
              <h3 className="font-bold text-lg">Edit Task</h3>
              <div className="modal-action">
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <FiTrash2
            onClick={handleToggleDeleteModal}
            size={20}
            className="text-red-500 cursor-pointer"
          />
          <Modal
            showModal={openDeleteModal}
            handleToggleModal={handleToggleDeleteModal}
          >
            <h3 className="text-lg">
              Are you sure, you want to delete this task ?
            </h3>
            <div className="modal-action">
              <button onClick={() => hadleDeleteTask(task.id)} className="btn">
                Yes
              </button>
            </div>
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default Task;
