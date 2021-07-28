const userData = {
  "5dd3d91008d79b1b0bc26389": {
    _id: "5dd3d91008d79b1b0bc26389",
    name: "Harsha Goel",
    email: "Harsha@getfundwave.com",
  },
  "5dd54521c205554a3460ae5c": {
    _id: "5dd54521c205554a3460ae5c",
    name: "Mohit Garg",
    email: "mohit@getfundwave.com",
  },
  "5ff984d0c688436e5e2dc5b1": {
    _id: "5ff984d0c688436e5e2dc5b1",
    email: "sparsh@getfundwave.com",
    name: "Sparsh Batra",
  },
  "5ff984f4c6884349c62dc5b4": {
    _id: "5ff984f4c6884349c62dc5b4",
    email: "aayush.gupta@getfundwave.com",
    name: "Aayush Gupta",
  },
  "607415bc0c820a6e6a6bf318": {
    _id: "607415bc0c820a6e6a6bf318",
    email: "sparshgetfundwave@gmail.com",
    name: "Sparsh Batra",
  },
  "609239a5274e243b9bbc18f3": {
    _id: "609239a5274e243b9bbc18f3",
    email: "gaurav@getfundwave.com",
    name: "Gaurav Chhabra",
  },
  "609239eb0a6f7b8672339cfa": {
    _id: "609239eb0a6f7b8672339cfa",
    email: "paridhi@getfundwave.com",
    name: "Paridhi Kashliwal",
  },
  "60923a100a6f7b31c9339cff": {
    _id: "60923a100a6f7b31c9339cff",
    email: "sudhanshu@getfundwave.com",
    name: "Sudhanshu Agarwal",
  },
  "60befa97f85bbb6aa2abba06": {
    _id: "60befa97f85bbb6aa2abba06",
    email: "sanjali@getfundwave.com",
    name: "Sanjali Agrawal",
  },
  "60bf8e1502cb4635fb5cad17": {
    _id: "60bf8e1502cb4635fb5cad17",
    email: "paras@getfundwave.com",
    name: "Paras Verma",
  },
  "60bf8e2502cb4604695cad1a": {
    _id: "60bf8e2502cb4604695cad1a",
    email: "tushar@getfundwave.com",
    name: "Tushar Tewari",
  },
};

let userFilterData = Object.values(userData);

const teamData = [
  {
    _id: "5ff4235bbcf5643dc4b7129a",
    teams: [
      {
        id: "5ff98717c688433a702dc5b6",
        name: "Playground",
      },
    ],
    id: "5ff4235bbcf5643dc4b7129a",
    name: "Intern Playground",
    domainEditAccess: false,
  },
  {
    _id: "60f953695aebd46105be9b51",
    teams: [
      {
        id: "60f9536a5aebd4a4e5be9b53",
        name: "Playground",
      },
      {
        id: "60f9536a5aebd4f633be9b52",
        name: "Pipe1",
      },
    ],
    id: "60f953695aebd46105be9b51",
    name: "Temp Test",
    domainEditAccess: true,
  },
];

let teamFilterData = [];
teamData.forEach((data) => {
  let teamInfo = {};
  data.teams.forEach((team) => {
    teamInfo = {};
    teamInfo.id = team.id;
    teamInfo.label = team.name;
    teamInfo.groupBy = data.name;
    teamFilterData.push(teamInfo);
  });
});

export { userData, userFilterData, teamFilterData };
