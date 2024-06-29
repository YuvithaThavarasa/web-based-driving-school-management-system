import React from "react";

function CalenderView({ schedule }) {
  return (
    <div>
      <h2>Class Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Student</th>
            <th>Course</th>
            <th>Instructor</th>
            <th>Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((session) => (
            <tr key={session.ID}>
              <td>{session.startDate}</td>
              <td>{session.endDate}</td>
              <td>{session.student}</td>
              <td>{session.course}</td>
              <td>{session.instructor}</td>
              <td>{session.vehicle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CalenderView;
