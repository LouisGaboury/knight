import React, { Fragment, useEffect, useState } from "react";
import { getReportsByCoterie } from "../../services/supabase/supabase";
import Dropdown from "../utility/Dropdown";

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mx-2 text-green-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const minusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mx-2 text-red-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

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
            <ul>
              {report.health && (
                <li className="flex">
                  {report.health > 0 ? (
                    <Fragment>
                      {plusIcon} La coterie a récupéré {report.health} pdv
                    </Fragment>
                  ) : (
                    <Fragment>
                      {minusIcon} La coterie a perdu {report.health} pdv
                    </Fragment>
                  )}
                </li>
              )}
              {report.hope && (
                <li className="flex">
                  {report.hope > 0 ? (
                    <Fragment>
                      {plusIcon} La coterie a récupéré {report.hope} points
                      d'espoir
                    </Fragment>
                  ) : (
                    <Fragment>
                      {minusIcon} La coterie a perdu {report.hope} points
                      d'espoir
                    </Fragment>
                  )}
                </li>
              )}
              {report.rg && (
                <li className="flex">
                  {report.hope > 0 ? (
                    <Fragment>
                      {plusIcon} La coterie a récupéré {report.rg} ressources de
                      guerre
                    </Fragment>
                  ) : (
                    <Fragment>
                      {minusIcon} La coterie a perdu {report.rg} ressources de
                      guerre
                    </Fragment>
                  )}
                </li>
              )}
            </ul>
          </Dropdown>
        );
      })}
    </Fragment>
  );
}

export default ReportsList;
