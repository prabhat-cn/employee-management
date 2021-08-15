import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import API from "../api";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState();
  const columns = [
    { title: "Sl.No", field: "slNo" },
    { title: "Name", field: "name" },
    { title: "Email", field: `name` },
    { title: "Phone", field: "phone" },
  ];

  const allEmployee = () => {
    API.get("/employee?populate=department")
      .then((res) => {
        console.log("allEmployee", res);
        const mapData = res.data.data.map((value, i) => {
          return { ...value, ...{ slNo: i + 1 } };
        });
        setEmployeeData(mapData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    allEmployee();
  }, []);
  return (
    <>
      <div className="container list-data">
        <div className="row line-height-top">
          <MaterialTable
            title="Material Employee List"
            columns={columns}
            data={employeeData}
            // data={(query) =>
            //   new Promise((resolve, reject) => {
            //     let url = `${process.env.REACT_APP_API}/employee?populate=department`;
            //     fetch(url)
            //       .then((resp) => resp.json())
            //       .then((resp) => {
            //         resolve({
            //           data: resp, // your data array
            //           page: 1, // current page number
            //           // totalCount: // total row number
            //         });
            //       });
            //   })
            // }
          />
        </div>
      </div>
      <style>{deptCss}</style>
    </>
  );
};

export default Employee;

const deptCss = `
.rounded-circle {
  padding: 0px 8px;
}
`;
