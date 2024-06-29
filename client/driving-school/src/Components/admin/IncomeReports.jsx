import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "./Sidebar";

function IncomeReports() {
  const [dailyIncome, setDailyIncome] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [annualIncome, setAnnualIncome] = useState([]);
  const dailyRef = useRef();
  const monthlyRef = useRef();
  const annualRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/income/daily")
      .then((res) => setDailyIncome(res.data))
      .catch((err) => console.error("Error fetching daily income:", err));

    axios
      .get("http://localhost:5000/admin/income/monthly")
      .then((res) => setMonthlyIncome(res.data))
      .catch((err) => console.error("Error fetching monthly income:", err));

    axios
      .get("http://localhost:5000/admin/income/annual")
      .then((res) => setAnnualIncome(res.data))
      .catch((err) => console.error("Error fetching annual income:", err));
  }, []);

  const formatDate = (date, format) => moment(date).format(format);

  const generatePDF = (ref, reportType) => {
    const input = ref.current;
    const currentDate = moment().format("DD/MM/YYYY");

    html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage("/logo.png", "PNG", 10, 10, 30, 30); // Adjust logo size and position
      pdf.setFontSize(20);
      pdf.text("New Kirupa Driving School", 105, 20, { align: "center" });
      pdf.setFontSize(14);
      pdf.text(`Generated on: ${currentDate}`, 105, 30, { align: "center" });
      pdf.text(
        `${
          reportType.charAt(0).toUpperCase() + reportType.slice(1)
        } Income Report`,
        105,
        40,
        { align: "center" }
      );

      // Adjusting table font size
      pdf.setFontSize(18);
      pdf.addImage(imgData, "PNG", 10, 60, 190, 0); // Adjust dimensions as needed
      pdf.save(`${reportType}_income_report.pdf`);
    });
  };

  const secondaryColor = "#6c757d"; // Adjust to your secondary color

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#092139",
    color: "white",
    padding: "10px",
    border: `1px solid ${"#092139"}`,
    width: "80%",
  };

  const tdStyle = {
    padding: "10px",
    border: `1px solid ${secondaryColor}`,
    width: "80%",
  };

  const headingStyle = {
    color: "#092139",
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <h2>Income Reports</h2>

        <div className="report-section">
          <h3 style={headingStyle}>Daily Income</h3>
          <CSVLink
            data={dailyIncome}
            filename="daily_income.csv"
            className="btn btn-primary"
          >
            Export Daily Income
          </CSVLink>
          <button
            className="btn btn-secondary"
            onClick={() => generatePDF(dailyRef, "daily")}
          >
            Download Daily Report as PDF
          </button>
          <div ref={dailyRef}>
            <br></br>{" "}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Total Income</th>
                </tr>
              </thead>
              <tbody>
                {dailyIncome.map((income, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>
                      {formatDate(income.date, "DD/MM/YYYY")}
                    </td>
                    <td style={tdStyle}>{income.totalIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-section mt-5">
          <h3 style={headingStyle}>Monthly Income</h3>
          <CSVLink
            data={monthlyIncome}
            filename="monthly_income.csv"
            className="btn btn-primary"
          >
            Export Monthly Income
          </CSVLink>
          <button
            className="btn btn-secondary"
            onClick={() => generatePDF(monthlyRef, "monthly")}
          >
            Download Monthly Report as PDF
          </button>
          <div ref={monthlyRef}>
            <br></br>{" "}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Month</th>
                  <th style={thStyle}>Total Income</th>
                </tr>
              </thead>
              <tbody>
                {monthlyIncome.map((income, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>
                      {formatDate(income.month, "MMMM YYYY")}
                    </td>
                    <td style={tdStyle}>{income.totalIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-section mt-5">
          <h3 style={headingStyle}>Annual Income</h3>
          <CSVLink
            data={annualIncome}
            filename="annual_income.csv"
            className="btn btn-primary"
          >
            Export Annual Income
          </CSVLink>
          <button
            className="btn btn-secondary"
            onClick={() => generatePDF(annualRef, "annual")}
          >
            Download Annual Report as PDF
          </button>
          <div ref={annualRef}>
            <br></br>{" "}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Year</th>
                  <th style={thStyle}>Total Income</th>
                </tr>
              </thead>
              <tbody>
                {annualIncome.map((income, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{income.year}</td>
                    <td style={tdStyle}>{income.totalIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeReports;
