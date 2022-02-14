import React, { Fragment, useEffect, useState } from "react";
import { getReportsByCoterie } from "../../services/supabase/supabase";
import Dropdown from "../utility/Dropdown";

function ReportsList({ coterie }) {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    if (coterie) {
      getReportsByCoterie(coterie.id).then((res) => {
        setReports(res);
      });
    }
    // console.log(reports.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coterie]);

  return (
    <Fragment>
      {reports?.map((report, index) => {
        return (
          <Dropdown key={index} title={report.day}>
            Test
          </Dropdown>
        );
      })}
    </Fragment>
  );
}

export default ReportsList;
