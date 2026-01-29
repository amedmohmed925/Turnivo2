import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCleanerCalendar } from '../../api/cleanerCalenderApi';
import { selectAccessToken } from '../../store/authSlice';
import CleanerHeader from './CleanerHeader';


const CleanerCalendarMain = ({ onMobileMenuClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setIsLoading(true);

        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please login to continue',
          });
          return;
        }

        const response = await getCleanerCalendar(accessToken);
        if (response.status === 1 && Array.isArray(response.data)) {
          const flat = response.data.flat().filter(Boolean);
          setCalendarData(flat);
        } else {
          setCalendarData([]);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load calendar',
        });
        setCalendarData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendar();
  }, [accessToken]);

  const uniqueDates = Array.from(new Set(calendarData.map((item) => item.date))).sort();
  const timeSlots = Array.from(
    new Set(
      calendarData.map((item) => `${item.time_from || ''}-${item.time_to || ''}`).filter((slot) => slot !== '-')
    )
  ).sort();

  const getStatusBadge = (status) => {
    if (status === 1) return { className: 'third-btn-sm', label: 'At work' };
    return { className: 'sec-btn-sm h-100', label: 'Available for work' };
  };

  const getReservationsCount = (date) => calendarData.filter((item) => item.date === date).length;


  return (
    <section>
      <CleanerHeader title="Calendar & Availability" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <div className="d-flex">
              <div className="d-flex package-filter align-items-center py-1 px-1 m-0 w-auto mb-2">
                  <button 
                    className={`rounded-2 border-0 px-2 py-2 sec-btn d-flex align-items-center gap-1`}
                  >
                    <FontAwesomeIcon icon={faCalendar} />
                   Calendar
                  </button>
                  <Link to='/cleaner/availability' 
                    className={`rounded-2 text-decoration-none border-0 px-2 py-2 days-filter-item d-flex align-items-center gap-1`}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Profile
                  </Link>
              </div>

        </div>
        <h6 className="dashboard-routes-sub m-0">Calendar</h6>
                        {/* Top Controls */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mt-2">
              <div className="d-flex gap-2 p-2 rounded-2 days-filter">
                <button className="main-btn rounded-2 px-3 py-1">Today</button>
                <div className="days-filter-item px-3 py-1">Back</div>
                <div className="days-filter-item px-3 py-1">Next</div>
              </div>

              <h6 className="m-0 date-label">10 Mar 2025 - 16 Apr 2025</h6>

              <div className="d-flex gap-2 p-2 rounded-2 times-filter">
                <button className="main-btn rounded-2 px-3 py-1">Month</button>
                <div className="times-filter-item px-3 py-1">Week</div>
                <div className="times-filter-item px-3 py-1">Day</div>
              </div>
            </div>

            {/* Calendar Table */}
            <div className="calendar-wrapper">
              {isLoading ? (
                <div className="text-center my-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : uniqueDates.length === 0 ? (
                <div className="text-center my-4 text-muted">No reservations found.</div>
              ) : (
                <table className="table calendar-table text-center">
                  <thead>
                    <tr>
                      <th>Time</th>
                      {uniqueDates.map((date) => (
                        <th key={date}>
                          {date}
                          <br />
                          <small className="fw-bold">{getReservationsCount(date)} Reservation</small>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {timeSlots.map((slot) => {
                      const [from, to] = slot.split('-');
                      return (
                        <tr key={slot}>
                          <td className="table-time">{from}</td>
                          {uniqueDates.map((date) => {
                            const match = calendarData.find(
                              (item) => item.date === date && `${item.time_from}-${item.time_to}` === slot
                            );
                            if (!match) return <td key={`${date}-${slot}`}></td>;
                            const badge = getStatusBadge(match.status);
                            return (
                              <td key={`${date}-${slot}`}>
                                <div className={badge.className}>{badge.label}</div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

      </div>
    </section>
  );
};

export default CleanerCalendarMain;