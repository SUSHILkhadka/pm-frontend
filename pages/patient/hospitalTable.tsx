import { getAllHospitals } from "@/axios/hospital";

import CustomizableTable from "@/components/CustomizableTable";
import { useEffect, useState } from "react";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const TableView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [originalData, setOriginalData] = useState<any>([]);
  useEffect(() => {
    const asyncGetter = async () => {
      const listOfHospitals = await getAllHospitals();
      console.log("list of hospitals", listOfHospitals.data);
      setOriginalData(listOfHospitals.data);
      setLoading(false);
    };
    asyncGetter();
  }, []);

  const columnNameJSON: any = {
    // ID: 0,
    // CreatedAt: "2023-02-21T09:12:40.110996+05:45",
    // UpdatedAt: "2023-02-21T09:12:40.110996+05:45",
    // DeletedAt: null,
    id: "id",
    name: "Name of Hospital",
    address: "Address",
    number: "Number",
    email: "Email"
    // patientSsn: "392-09-3041"
  };

  const defaultSelectedColumns = {
    // id: true,
    name: true,
    address: true,
    number: true,
    email: true
  };

  const defaultSelectedFilter = {
    id: false,
    name: false,
    address: false,
    number: false,
    email: false
  };

  const defaultFilterValues = {
    id: [],
    name: [],
    address: [],
    number: [],
    email: []
  };
  const getAllColumns = (value: any, columnNameJSON: any, sortColumn: any) => {
    return (
      <Column width={180} key={value} sortable>
        <HeaderCell
          style={{ color: sortColumn == value ? "#29b6f6" : "" }}
          className="f-20"
        >
          {" "}
          {columnNameJSON[value] ? columnNameJSON[value] : value}
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
  // return <div>aa</div>;

  return !loading ? (
    <CustomizableTable
      originalData={originalData}
      defaultSelectedColumns={defaultSelectedColumns}
      defaultSelectedFilter={defaultSelectedFilter}
      defaultFilterValues={defaultFilterValues}
      columnNameJSON={columnNameJSON}
      getTagPickerDataForColumns={getTagPickerDataForColumns}
      getAllColumns={getAllColumns}
    />
  ) : (
    <div>loading</div>
  );
};
export default TableView;
