import { useRouter } from "next/router";
import { Button } from "rsuite";
import Papa from "papaparse";
import {
  getObservationBodyFromCSVRow,
  getMedicationBodyFromCSVRow,
  getHospitalBodyFromCSVRow,
  getPractitionerBodyFromCSVRow,
  getPatientBodyFromCSVRow
} from "@/utils/jsonParsers.utils";
import axios from "axios";
const Home = () => {
  const changeHandler = (event: any) => {
    console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    axios.post("http://localhost:9010/upload/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };
  const router = useRouter();
  return (
    <>
      <h1>/HOMNE</h1>
      <Button
        onClick={() => {
          router.replace("/index2");
        }}
      >
        Next
      </Button>

      <Button
        color="red"
        appearance="primary"
        onClick={() => {
          console.log("upload csv here");
        }}
      >
        Upload
      </Button>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
    </>
  );
};
export default Home;
