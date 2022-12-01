import { Button } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import KanbanTask from "./KanbanTask";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { displayTasksBy } from "../utils/_utils";
import SearchFilter from "./SearchFilter";
import _ from "lodash";
import TaskAdd from "./TaskAdd";

const KanbanBoard = (props) => {
  const data = displayTasksBy[props.displayBy](props.data);
  const [modalTaskAdd, setModalTaskAdd] = useState(false);
  function numberWithCommas(num) {
    num = Number(num);
    return num
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // console.log(data);
  // const [data, setData] = useState(displayTasksBy[props.displayBy](props.data));
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let newData = data;

    const draggedTask = _.find(newData, { id: source.droppableId }).tasks[
      source.index
    ];

    const sourceColumnIndex = _.findIndex(newData, { id: source.droppableId });
    const destinationColumnIndex = _.findIndex(newData, {
      id: destination.droppableId,
    });

    newData[sourceColumnIndex].tasks.splice(source.index, 1);
    newData[destinationColumnIndex].tasks.splice(
      destination.index,
      0,
      draggedTask
    );

    switch (props.displayBy) {
      case "group":
        console.log('update group', {
          task_id: draggedTask.id,
          group_id: destination.droppableId
        });
        break;
      case "status":
        console.log('update status', {
          task_id: draggedTask.id,
          status_id: destination.droppableId
        });
        break;

      default:
        console.log('update member', {
          task_id: draggedTask.id,
          member_id: destination.droppableId
        });
        break;
    }

    // setData(newData);
  };
  const boardTotal = {
    group: {
      0: {
        budget: 8100,
        actual: 0,
      },
      1: {
        budget: 5750,
        actual: 3600,
      },
    },
    status: {
      0: {
        budget: 3500,
        actual: 0,
      },
      1: {
        budget: 4600,
        actual: 0,
      },
      2: {
        budget: 4550,
        actual: 3600,
      },
      3: {
        budget: 1200,
        actual: 0,
      },
    },
    member: {
      0: {
        budget: 7500,
        actual: 0,
      },
      1: {
        budget: 9950,
        actual: 3600,
      },
      2: {
        budget: 10250,
        actual: 3600,
      },
    },
  }

  return (
    <div className="p-3 bg-gray-50">
      <SearchFilter />
      <div className="flex flex-nowrap overflow-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.map((board, index) => (
            <div className="flex-none p-1.5 w-72" key={board.name}>
              <div className="bg-gray-100 px-2 py-3 rounded border border-gray-300">
                <div className="py-0 px-2">{board.name}</div>
                <Droppable droppableId={board.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {board.tasks.map((task, taskIndex) => (
                        <KanbanTask
                          task={task}
                          key={task.id}
                          index={taskIndex}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div>
                  <div className="pt-2 px-2 text-gray-500">Total Value</div>
                </div>
                <div className="grid grid-cols-2 border border-gray-200 shadow rounded">
                  <div className="p-2 bg-gray-50">
                    <div className="text-sm">RM{numberWithCommas(boardTotal[props.displayBy][index].budget)}</div>
                    <div className="text-xs text-gray-500">Budget</div>
                  </div>
                  <div className={`p-2 border-l bg-green-50 text-green-600 border-green-500`}>
                    <div className="text-sm">RM{numberWithCommas(boardTotal[props.displayBy][index].actual)}</div>
                    <div className="text-xs text-gray-500">Actual</div>
                  </div>
                </div>

                <Button
                  size="mini"
                  type="text"
                  icon={<IconPlus />}
                  className="mt-2"
                  onClick={() => setModalTaskAdd(true)}
                >
                  Add Task
                </Button>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
      <TaskAdd visible={modalTaskAdd} setVisible={setModalTaskAdd} />
    </div>
  );
};
export default KanbanBoard;
