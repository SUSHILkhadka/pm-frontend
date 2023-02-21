import { getAllPractitioners } from "@/axios/practitioner";

import CustomizableTable from "@/components/CustomizableTable";
import { useEffect, useState } from "react";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const TableView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [originalData, setOriginalData] = useState<any>([]);
  useEffect(() => {
    const asyncGetter = async () => {
      const listOfPractitioners = await getAllPractitioners();
      console.log("list of practioners", listOfPractitioners.data);
      setOriginalData(listOfPractitioners.data);
      setLoading(false);
    };
    asyncGetter();
  }, []);

  const columnNameJSON: any = {
    // CreatedAt: "2023-02-21T09:12:40.118175+05:45",
    // UpdatedAt: "2023-02-21T09:12:40.118175+05:45",
    // DeletedAt: null,
    id: "ID",
    firstName: "First Name",
    lastName: "Last Name",
    address1: "Address 1",
    address2: "Address 2",
    number1: "Number 1",
    number2: "Number 2",
    checkIn: "Check In",
    checkOut: "Check out",
    patientSsn: "Patient SSN"
  };

  const defaultSelectedColumns = {
    patientSsn: true,
    id: true,
    firstName: true,
    lastName: true,
    address1: true,
    address2: true,
    number1: true,
    number2: true,
    checkIn: true,
    checkOut: true
  };

  const defaultSelectedFilter = {
    id: false,
    firstName: false,
    lastName: false,
    address1: false,
    address2: false,
    number1: false,
    number2: false,
    checkIn: false,
    checkOut: false,
    patientSsn: false
  };

  const defaultFilterValues = {
    id: [],
    firstName: [],
    lastName: [],
    address1: [],
    address2: [],
    number1: [],
    number2: [],
    checkIn: [],
    checkOut: [],
    patientSsn: []
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
