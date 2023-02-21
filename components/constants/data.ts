export const vyagutaDataMock = [
  {
    id: 1,
    projectName: "Adhyayan",
    projectTimeline: {
      start: "2021/02/01",
      progress: 20,
      end: "2023/03/04"
    },
    status: "In Progress",
    projectLeader: "SP",
    contract: "Time and Materials",
    category: "Health",
    am: "RR",
    rm: "CS"
  },

  {
    id: 2,
    projectName: "Alpine Media",
    projectTimeline: {
      start: "2022/04/01",
      progress: 80,
      end: "2023/03/04"
    },
    status: "Done",
    projectLeader: "PST",
    contract: "Fixed Bid",
    category: "Services",
    am: "AS",
    rm: "HK"
  },
  {
    id: 3,
    projectName: "Crown Health",
    projectTimeline: {
      start: "2010/04/01",
      progress: 50,
      end: "2023/03/04"
    },
    status: "Risk",
    projectLeader: "PS",
    contract: "Time and Materials",
    category: "Engineering",
    am: "RR",
    rm: "HK"
  },
  {
    id: 4,
    projectName: "Project D",
    projectTimeline: {
      start: "2021/04/01",
      progress: 10,
      end: "2023/03/04"
    },
    status: "In Progress",
    projectLeader: "DBP",
    contract: "Time and Materials",
    category: "Health",
    am: "RR",
    rm: "HK"
  },
  {
    id: 5,
    projectName: "i8labs",
    projectTimeline: {
      start: "2009/04/01",
      progress: 70,
      end: "2023/03/04"
    },
    status: "Done",
    projectLeader: "KL",
    contract: "Retainer",
    category: "Health",
    am: "SGR",
    rm: "HK"
  },
  {
    id: 6,
    projectName: "Laudio",
    projectTimeline: {
      start: "2021/04/01",
      progress: 20,
      end: "2023/03/04"
    },
    status: "Risk",
    projectLeader: "LP",
    contract: "PM6",
    category: "Health",
    am: "RR",
    rm: "CS"
  },
  {
    id: 7,
    projectName: "Signetic",
    projectTimeline: {
      start: "2021/04/01",
      progress: 70,
      end: "2023/03/04"
    },
    status: "Lost",
    projectLeader: "SM",
    contract: "PM7",
    category: "Health",
    am: "SGR",
    rm: "CB"
  },
  {
    id: 8,
    projectName: "Trayt",
    projectTimeline: {
      start: "2021/04/01",
      progress: 90,
      end: "2023/03/04"
    },
    status: "Not Started",
    projectLeader: "PST",
    contract: "Retainer",
    category: "Health",
    am: "AS",
    rm: "CB"
  }
];

export const randomMockData = (numberOfData: number = 20) => {
  let mockdata = [];
  for (let i = 0; i < numberOfData; i++) {
    const original = vyagutaDataMock[i % 8];
    const modification = { ...original };
    modification.id = i;
    if (i > 7) {
      modification.projectName = modification.projectName + i;
    }
    mockdata.push(modification);
  }
  return mockdata;
};

export const columnNameVyagutaData: any = {
  id: "ID",
  projectName: "Project Name",
  projectTimeline: "Project Timeline",
  status: "Status",
  projectLeader: "Project Leader",
  contract: "Contract",
  category: "Category",
  am: "AM",
  rm: "RM"
};

export const defaultSelectedColumns = {
  projectName: true,
  projectTimeline: true,
  status: true,
  projectLeader: true,
  category: true,
  am: true,
  rm: true,
  contract: true
};

export const defaultSelectedFilter = {
  projectTimeline: false,
  status: false,
  projectLeader: false,
  contract: false,
  category: false,
  am: false,
  rm: false
};

export const defaultFilterValues = {
  projectName: [],
  projectTimeline: [],
  status: [],
  projectLeader: [],
  contract: [],
  category: [],
  am: [],
  rm: []
};
