import React, { useEffect, useRef, useState } from "react";



const Patient = () => {
  const [checkedKeys, setCheckedKeys] = React.useState<any>([]);
  let checked = false;
  let indeterminate = false;
  const [data, setData] = useState<any>([
    { id: 1, progress: 10, rating: 3 },
    { id: 2, progress: 10, rating: 3 }
  ]);

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }



  return <>ff</>;
};

export default Patient;
