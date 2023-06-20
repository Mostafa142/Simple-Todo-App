import { ITask } from "@/types/tasks";
import React from "react";
import Task from "../../Task/Task";
interface Props {
  tasks: ITask[];
}
const TodoList: React.FC<Props> = ({ tasks }) => {
  console.log(tasks);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-200">
            <th>Tasks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return <Task task={task} key={task.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
