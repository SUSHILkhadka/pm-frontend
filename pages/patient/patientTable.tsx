import { getAllpatients } from "@/axios/patient";

import CustomizableTable from "@/components/CustomizableTable";
import { useEffect, useState } from "react";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const TableView = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [originalData, setOriginalData] = useState<any>([]);

  useEffect(() => {
    const asyncGetter = async () => {
      const listOfPatients = await getAllpatients();
      console.log("list of patients", listOfPatients.data);
      setOriginalData(listOfPatients.data);
      setLoading(false);
    };
    asyncGetter();
  }, []);

  const columnNameJSON: any = {
    ssn: "SSN",
    firstName: "First Name",
    lastName: "Last Name",
    country: "Country",
    address1: "Address 1",
    address2: "Address 2",
    number1: "Number 1",
    number2: "Number 2",
    sex: "Sex",
    dob: "DOB",
    Dod: "DOD",
    email: "Email",
    height: "Height",
    weight: "Weight",
    bloodType: "Blood Type",
    education: "Education",
    occupation: "Occupation",
    lastObservation: "Last Observation",
    lastMedication: "Last Medication"
  };

  const defaultSelectedColumns = {
    ssn: true,
    firstName: true,
    lastName: true,
    country: true,
    address1: true,
    address2: true,
    number1: true,
    number2: true,
    sex: true,
    dob: true,
    Dod: true,
    email: true,
    height: true,
    weight: true,
    bloodType: true,
    education: true,
    occupation: true,
    lastObservation: true,
    lastMedication: true
  };

  const defaultSelectedFilter = {
    ssn: false,
    firstName: false,
    lastName: false,
    country: false,
    address1: false,
    address2: false,
    number1: false,
    number2: false,
    sex: false,
    dob: false,
    Dod: false,
    email: false,
    height: false,
    weight: false,
    bloodType: false,
    education: false,
    occupation: false,
    lastObservation: false,
    lastMedication: false
  };

  const defaultFilterValues = {
    ssn: [],
    firstName: [],
    lastName: [],
    country: [],
    address1: [],
    address2: [],
    number1: [],
    number2: [],
    sex: [],
    dob: [],
    Dod: [],
    email: [],
    height: [],
    weight: [],
    bloodType: [],
    education: [],
    occupation: [],
    lastObservation: [],
    lastMedication: []
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
