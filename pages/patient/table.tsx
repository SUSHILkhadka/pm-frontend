import {
  columnNameVyagutaData,
  defaultFilterValues,
  defaultSelectedColumns,
  defaultSelectedFilter,
  randomMockData
} from "@/components/constants/data";
import CustomizableTable from "@/components/CustomizableTable";
import CustomTimeline from "@/components/utils/CustomTimeline";
import moment from "moment";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const TableView = () => {
  const originalData = randomMockData(100);
  const columnNameJSON = columnNameVyagutaData;

  const getAllColumns = (value: any, columnNameJSON: any, sortColumn: any) => {
    if (value == "projectTimeline") {
      return (
        <Column width={400} key={value} sortable>
          <HeaderCell
            style={{ color: sortColumn == value ? "#29b6f6" : "" }}
            className="f-20"
          >
            {" "}
            {columnNameJSON[value]}
          </HeaderCell>
          <Cell dataKey={value}>
            {(rowData) => {
              const formatedDateStart = moment(rowData[value].start).format(
                "ll"
              );
              const formatedDateEnd = moment(rowData[value].end).format("ll");
              return (
                <CustomTimeline
                  start={formatedDateStart}
                  progress={rowData[value].progress}
                  end={formatedDateEnd}
                  key={rowData.id}
                />
              );
            }}
          </Cell>
        </Column>
      );
    } else if (value == "am" || value == "rm" || value == "projectLeader") {
      return (
        <Column
          width={value == "projectLeader" ? 150 : 100}
          key={value}
          sortable
        >
          <HeaderCell
            style={{ color: sortColumn == value ? "#29b6f6" : "" }}
            className="f-20"
          >
            {" "}
            {columnNameJSON[value]}
          </HeaderCell>
          <Cell dataKey={value}>
            {(rowData) => (
              <div key={rowData.id} className="avatar">
                <div className="avatar-table">
                  <img
                    className="avatar-table-img"
                    alt="loading"
                    src="https://images.vyaguta.lftechnology.com/employee/48/5.png"
                  />
                </div>
                <a>{rowData[value]}</a>
              </div>
            )}
          </Cell>
        </Column>
      );
    } else if (value == "projectName") {
      return (
        <Column fixed width={200} key={value} sortable>
          <HeaderCell
            style={{ color: sortColumn == value ? "#29b6f6" : "" }}
            className="f-20"
          >
            {" "}
            {columnNameJSON[value]}
          </HeaderCell>
          <Cell dataKey={value}>
            {(rowData) => (
              <div key={rowData.id} className="project-avatar">
                <div className="project-avatar-table">
                  <img
                    className="project-avatar-table-img"
                    alt="loading"
                    src="https://images.vyaguta.lftechnology.com/projects/logo/48/224.png"
                  />
                </div>
                <span>{rowData[value]}</span>
              </div>
            )}
          </Cell>
        </Column>
      );
    } else if (value == "status") {
      const colorForStatus: any = {
        "Not Started": "#999",
        Done: "#4caf50",
        Risk: "red",
        Lost: "#dda7ff",
        "In Progress": "#ffc107"
      };
      return (
        <Column width={150} key={value} sortable>
          <HeaderCell
            style={{ color: sortColumn == value ? "#29b6f6" : "" }}
            className="f-20"
          >
            {" "}
            {columnNameJSON[value]}
          </HeaderCell>
          <Cell dataKey={value}>
            {(rowData) => (
              <div key={rowData.id} className="project-status">
                <div
                  style={{
                    background: `${
                      colorForStatus[`${rowData[value]}`]
                        ? colorForStatus[`${rowData[value]}`]
                        : ""
                    }`
                  }}
                  className="project-status-table"
                >
                  <div className="project-status-table-div" />
                </div>
                <span>{rowData[value]}</span>
              </div>
            )}
          </Cell>
        </Column>
      );
    }
    return (
      <Column width={180} key={value} sortable>
        <HeaderCell
          style={{ color: sortColumn == value ? "#29b6f6" : "" }}
          className="f-20"
        >
          {" "}
          {columnNameJSON[value]}
        </HeaderCell>
        <Cell dataKey={value}></Cell>
      </Column>
    );
  };

  const getTagPickerDataForColumns = (column: string) => {
    if (column == "am") {
      return ["RR", "AS", "SGR"].map((item) => ({
        label: item,
        value: item
      }));
    } else if (column == "rm") {
      return ["CS", "HK", "CB"].map((item) => ({
        label: item,
        value: item
      }));
    } else if (column == "category") {
      return ["Health", "Services", "Engineering"].map((item) => ({
        label: item,
        value: item
      }));
    } else if (column == "contract") {
      return ["Time and Materials", "Fixed Bid", "Retainer"].map((item) => ({
        label: item,
        value: item
      }));
    } else if (column == "projectLeader") {
      return ["SP", "PST", "PS", "DBP", "KL", "LP", "SM", "PST"].map(
        (item) => ({
          label: item,
          value: item
        })
      );
    }

    return ["In Progress", "Done", "Risk", "Lost", "Not Started"].map(
      (item) => ({
        label: item,
        value: item
      })
    );
  };

  return (
    <CustomizableTable
      originalData={originalData}
      defaultSelectedColumns={defaultSelectedColumns}
      defaultSelectedFilter={defaultSelectedFilter}
      defaultFilterValues={defaultFilterValues}
      columnNameJSON={columnNameJSON}
      getTagPickerDataForColumns={getTagPickerDataForColumns}
      getAllColumns={getAllColumns}
    />
  );
};
export default TableView;
