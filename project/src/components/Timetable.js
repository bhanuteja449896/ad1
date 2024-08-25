// src/TimeTable.js
import React from 'react';
import './css/Timetable.css'; // Import the CSS file

const TimeTable = () => {
  return (
    <div className="time-table-container">
      <div className="time-table">
        <h1>Time Table</h1>
      </div>
      <div className="schedule">
        <table>
          <thead>
            <tr className="upper">
              <td className="first">Day/hr/Time</td>
              <th className='timing'>09:20am - 10:20am</th>
              <th className='timing'>10:20am - 11:20am</th>
              <th className='timing'>11:20am - 11:30am</th>
              <th className='timing'>12:30pm - 01:30pm</th>
              <th className='timing'>01:30pm - 02:30pm</th>
              <th className='timing'>02:30pm - 03:30pm</th>
            </tr>
          </thead>
          <tbody>
            <tr className="second" align="center">
              <td className="Day">MON</td>
              <td>ACD</td>
              <td>R&A</td>
              <td>AI</td>
              <td rowSpan="6" className="Lunch">Lunch Break</td>
              <td colSpan="2">AD-1:1201</td>
            </tr>
            <tr className="second" align="center">
              <td className="Day">TUE</td>
              <td>AI</td>
              <td>ACD</td>
              <td>CN</td>
              <td>MPMC</td>
              <td>CRT</td>
            </tr>
            <tr className="second" align="center">
              <td className="Day">WED</td>
              <td>MPMC</td>
              <td>CN</td>
              <td>R&A</td>
              <td>AI</td>
              <td>CRT</td>
            </tr>
            <tr className="second" align="center">
              <td className="Day">THUR</td>
              <td>ACD</td>
              <td colSpan="2">PSD</td>
              <td>MPMC</td>
              <td>R&A</td>
            </tr>
            <tr className="second" align="center">
              <td className="Day">FRI</td>
              <td>MPMC</td>
              <td>CN</td>
              <td>ACD</td>
              <td colSpan="2">AI LAB:4309</td>
            </tr>
            <tr className="second" align="center">
              <td className="Day">SAT</td>
              <td>R&A</td>
              <td>AI</td>
              <td>CN</td>
              <td colSpan="2">MPMC LAB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
