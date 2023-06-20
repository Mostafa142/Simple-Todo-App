"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../Modal/Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const handleToggleModal = () => {
    setShowModal((open) => !open);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      name: task,
    });
    setTask("");
    setShowModal(false);
    router.refresh();
  };
  return (
    <div>
      <button className="btn btn-primary w-full" onClick={handleToggleModal}>
        Add New Task <AiOutlinePlus size={18} className="ml-2 inline-block" />
      </button>
      <Modal showModal={showModal} handleToggleModal={handleToggleModal}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new Task</h3>
          <div className="modal-action">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
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
    </div>
  );
};

export default AddTask;
