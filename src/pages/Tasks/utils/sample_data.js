import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { TASK } from "@/constants";

const timeframe = {
  start: dayjs("2022-12-01"),
  end: dayjs("2023-01-31"),
};
export const members = [
  {
    id: "6f55ca23-0363-4aec-8ea1-add6d8d512e1",
    name: "Barry",
    avatar: "/dummy/face1.jpg",
  },
  {
    id: "0f160aa7-43c7-493c-99ea-eb059d92973e",
    name: "Marcus",
    avatar: "/dummy/face2.jpg",
  },
  {
    id: "72a856ad-7e55-4dcb-a1c0-d971631b5f44",
    name: "Sheryn",
    avatar: "/dummy/face3.jpg",
  },
];
const groups = [
  {
    id: faker.datatype.uuid(),
    name: "Active Deals",
  },
  {
    id: faker.datatype.uuid(),
    name: "Closed",
  },
];
const singleProject = (name, groups) => {
  return {
    id: faker.datatype.uuid(),
    name: name,
    status: "published",
    color: null,
    owner: faker.helpers.arrayElements(members),
    contact: faker.helpers.arrayElements(members),
    taskStatus: TASK.STATUS,
    visibility: null,
    description: "",
    groups: groups,
  };
};

const singleGroup = (name, tasks) => {
  return {
    id: faker.datatype.uuid(),
    name: name,
    tasks: tasks,
  };
};

const singleTask = (
  name,
  start,
  duration,
  status,
  project,
  group,
  no_of_comment,
  no_of_attachments,
  value,
  actualvalue,
  arrmember,
  subtask,
) => {
  let comments = [];
  for (let i = 0; i < no_of_comment; i++) {
    comments.push({
      member: faker.helpers.arrayElements(members),
      message: faker.lorem.lines(),
      time: faker.date.soon(1, start),
    });
  }
  let attachments = [];
  for (let i = 0; i < no_of_attachments; i++) {
    attachments.push({
      member: faker.helpers.arrayElements(members),
      file: faker.system.commonFileName(),
      time: faker.date.soon(1, start),
    });
  }

  return {
    id: faker.datatype.uuid(),
    name: name,
    status: status,
    startDate: timeframe.start
      .add(start, "day")
      .format("YYYY-MM-DDT00:12:00.000Z"),
    endDate: timeframe.start
      .add(start + duration, "day")
      .format("YYYY-MM-DDT00:23:00.000Z"),
    actualStartDate: timeframe.start
      .add(start, "day")
      .format("YYYY-MM-DDT00:12:00.000Z"),
    actualEndDate: timeframe.start
      .add(start + duration - 1, "day")
      .format("YYYY-MM-DDT00:23:00.000Z"),
    comments: comments,
    attachments: attachments,
    company: "TCH Sdn Bhd",
    workspace: "Audit 2022",
    project: project,
    group: group,
    members: arrmember,
    watchers: [],
    contacts: [],
    value: value,
    actualValue: actualvalue,
    description: "",
    effort: null,
    tags: [],
    reminder: null,
    recurrence: null,
    checklist: [],
    tracking: 0,
    priority: "High",
    children: subtask,
  };
};

export const tasksData = {
  timeframe,
  status: TASK.STATUS,
  members,
  groups,
  projects: [
    singleProject("Sales December 2022", [
      singleGroup("Active Deals", [
        singleTask("Unicorn Corporation", 0, 20, TASK.STATUS[0], "Sales December 2022", groups[0], 2, 0, 1200, 0, [members[0], members[2]], [
          singleTask("Send initial email", 0, 5, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 0, 100, [members[1], members[2]], []),
          singleTask("Send follow up email", 1, 8, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 750, 100, [members[0], members[1]], []),
          singleTask("Schedule initial sales call", 3, 10, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 0, 100, [members[0], members[2]], []),
          singleTask("Schedule follow-up sales call (if necessary)", 6, 12, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 750, 100, [members[0], members[2]], []),
          singleTask("Schedule appointment", 9, 15, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 0, 100, [members[1], members[2]], []),
          singleTask("Follow up after appointment", 10, 11, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 750, 100, [members[0], members[1]], []),
          singleTask("Send proposal / quotation", 12, 15, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 0, 100, [members[0], members[2]], []),
          singleTask("Finalize contract", 15, 18, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 750, 100, [members[1], members[2]], []),
          singleTask("Hand off to customer success", 18, 20, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 0, 100, [members[0], members[2]], []),
          singleTask("Post-sales follow up", 19, 20, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 0, 750, 100, [members[0], members[1]], []),
        ]),
        singleTask("TCH Sdn Bhd", 5, 15, TASK.STATUS[0], "Sales December 2022", groups[0], 0, 3, 2300, 0, [members[1], members[2]], []),
        singleTask("Nature Freight", 8, 8, TASK.STATUS[1], "Sales December 2022", groups[0], 0, 0, 1500, 0, [members[0], members[2]], []),
        singleTask("Kuda Sdn Bhd", 10, 10, TASK.STATUS[1], "Sales December 2022", groups[0], 2, 2, 3100, 0, [members[0], members[1]], [
        ]),
      ]),
      singleGroup("Closed", [
        singleTask("Driversity Global", 15, 10, TASK.STATUS[2], "Sales December 2022", groups[1], 0, 0, 2750, 2500, [members[1], members[2]], []),
        singleTask("Floral Corporation", 20, 15, TASK.STATUS[2], "Sales December 2022", groups[1], 1, 0, 1300, 1100, [members[1], members[2]], []),
        singleTask("Exeliq Globiz", 25, 8, TASK.STATUS[2], "Sales December 2022", groups[1], 2, 3, 500, 0, [members[0], members[1]], []),
        singleTask("Sportify Academy",30, 10, TASK.STATUS[3], "Sales December 2022", groups[1], 0, 2, 1200, 0, [members[0], members[2]], []),
      ]),
    ]),
    // singleProject("B Project", [
    //   singleGroup("Interim Audit", [
    //     singleTask(10, 10, TASK.STATUS[0], "B Project", groups[0], 0, 0, []),
    //     singleTask(15, 15, TASK.STATUS[1], "B Project", groups[0], 2, 0, []),
    //     singleTask(18, 8, TASK.STATUS[2], "B Project", groups[0], 0, 0, []),
    //     singleTask(20, 10, TASK.STATUS[3], "B Project", groups[0], 0, 2, []),
    //   ]),
    //   singleGroup("Final Audit", [
    //     singleTask(25, 10, TASK.STATUS[0], "B Project", groups[1], 0, 2, []),
    //     singleTask(30, 15, TASK.STATUS[1], "B Project", groups[1], 2, 2, []),
    //     singleTask(35, 8, TASK.STATUS[2], "B Project", groups[1], 2, 0, []),
    //     singleTask(40, 10, TASK.STATUS[3], "B Project", groups[1], 2, 0, []),
    //   ]),
    // ]),
  ],
};
export const projectsData = [
  singleProject("Sales December 2022", []),
  singleProject("Sales November 2022", []),
  singleProject("Sales October 2022", []),
  singleProject("Sales September 2022", []),
  singleProject("Sales August 2022", []),
  singleProject("Sales July 2022", []),
];

export const subtasksData = [
  singleTask(0, 0, TASK.STATUS[0], "TCH Sdn Bhd", groups[0], 2, 0, []),
  singleTask(5, 15, TASK.STATUS[1], "TCH Sdn Bhd", groups[0], 0, 3, []),
  singleTask(8, 8, TASK.STATUS[2], "TCH Sdn Bhd", groups[0], 0, 0, []),
  singleTask(10, 10, TASK.STATUS[3], "TCH Sdn Bhd", groups[0], 2, 2, []),
];
