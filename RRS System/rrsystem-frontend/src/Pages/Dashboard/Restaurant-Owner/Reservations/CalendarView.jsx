import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner";

function CalendarView() {
  const scrollAreaRef = useRef(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTimePosition, setCurrentTimePosition] = useState(null);
  const [tables, setTables] = useState([]);

  const calculateCurrentTimePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const startHour = 0;
    const endHour = 24;
    
    if (currentHour < startHour || currentHour > endHour) {
      setCurrentTimePosition(null);
      return;
    }
    
    const tableHeaderEl = document.querySelector('.resCalendar-tableHeader');
    const tableHeaderWidth = tableHeaderEl ? tableHeaderEl.offsetWidth : 100;
    
    const timeHeaderEl = document.querySelector('.resCalendar-timeHeader');
    const slotWidth = timeHeaderEl ? timeHeaderEl.offsetWidth : 80;
    
    const totalMinutesSinceStart = (currentHour - startHour) * 60 + currentMinute;
    const position = (totalMinutesSinceStart / 30) * slotWidth + tableHeaderWidth;
    
    setCurrentTimePosition(position);
  };

  useEffect(() => {
    if (!isLoading && tables.length > 0) {
      calculateCurrentTimePosition();
      const intervalId = setInterval(calculateCurrentTimePosition, 60000);
      return () => clearInterval(intervalId);
    }
  }, [isLoading, tables]);

  useEffect(() => {
    if (currentTimePosition !== null && scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft = Math.max(currentTimePosition - 50, 0);
      console.log("Current time position:", currentTimePosition);
      console.log("Scroll area ref:", scrollAreaRef.current);
    }
  }, [currentTimePosition]);

  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/restaurant-owner/calendar/get-restaurant-id", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch restaurantId");
        const id = await res.json();
        setRestaurantId(id);
      } catch (err) {
        console.error("Error fetching restaurantId:", err);
      }
    };
    fetchRestaurantId();
  }, []);

  useEffect(() => {

    if (!restaurantId) return;

    const fetchTables = async () => {
      try {
        const res = await fetch(
          `http://localhost:8081/api/restaurant-owner/calendar/${restaurantId}/tables`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
        const data = await res.json();
        if (data && Array.isArray(data) && data.length > 0) {
          const formattedTables = data.map(table => ({
            id: table.tableId.toString(),
            name: table.tableName || `Table ${table.tableId}`,
            capacity: table.tableCapacity || 2
          }));
          setTables(formattedTables);
        }
      } catch (err) {
        console.error("Error fetching tables:", err);
      }
    };
    
    fetchTables();
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) return;
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        const formattedDate = currentDate.toISOString().split('T')[0];
        
        console.log(`Fetching reservations for restaurant ID: ${restaurantId} and date: ${formattedDate}`);
        
        const res = await fetch(
          `http://localhost:8081/api/restaurant-owner/calendar/${restaurantId}?date=${formattedDate}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        
        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Reservations API response data:", data);
        
        if (data && Array.isArray(data)) {
          const formattedEvents = data.map(item => ({
            id: Math.random().toString(36).substring(2, 9),
            date: new Date(item.sessionDate),
            start: formatTimeString(item.sessionStart),
            end: formatTimeString(item.sessionEnd),
            title: `${item.reservationName || ''} ${item.reservationSurname || ''}`.trim() || "Reservation",
            tableIds: formatTableIds(item.reservationTableIds),
            peopleNo: item.reservationPeopleNo || 2,
            reservationPhone: item.reservationPhone || "N/A",
          }));
          
          console.log("Formatted events:", formattedEvents);
          setEvents(formattedEvents);
        } else {
          setEvents([]);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setEvents([]);
        setError(`Failed to fetch reservations: ${err.message}`);
        setIsLoading(false);
      }
    };
    
    fetchReservations();
  }, [restaurantId, currentDate]);
  
  const formatTimeString = (timeStr) => {
    if (!timeStr) return "19:00";
    
    if (typeof timeStr === 'string') {
      if (timeStr.includes(':')) {
        const parts = timeStr.split(':');
        if (parts.length >= 2) {
          return `${parts[0]}:${parts[1]}`;
        }
      }
    }
    
    return timeStr;
  };
  
  const formatTableIds = (tableIds) => {
    if (!tableIds) return [];
    
    let tableArray = [];
    
    if (typeof tableIds === 'string') {
      tableArray = tableIds.split(',').map(id => id.trim());
    } else if (typeof tableIds === 'number') {
      tableArray = [tableIds.toString()];
    } else if (Array.isArray(tableIds)) {
      tableArray = tableIds.map(id => id.toString().trim());
    }
    
    return tableArray;
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 0;
    const endHour = 24; // 00:00 dahil
    for (let hour = startHour; hour < endHour; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    slots.push("00:00");
    return slots;
  };

  const goToToday = () => setCurrentDate(new Date());
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  const goToNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 3); // Current date in middle
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatHeaderDate = (date) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = dayNames[date.getDay()];
    const month = date.toLocaleString('en-US', { month: 'short' });
    const dateNum = date.getDate();
    
    return (
      <>
        <div className="resCalendar-dayName">{day}</div>
        <div className="resCalendar-dayDate">{month} {dateNum}</div>
      </>
    );
  };

  const getEventForSlot = (tableId, timeSlot, timeSlots) => {
    const tableEvents = events.filter(event => {
      const eventStart = new Date(event.date);
      const [startHour, startMinute] = event.start.split(':').map(Number);
      eventStart.setHours(startHour, startMinute, 0, 0);
  
      const eventEnd = new Date(event.date);
      const [endHour, endMinute] = event.end.split(':').map(Number);
      if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
        eventEnd.setDate(eventEnd.getDate() + 1);
      }
      eventEnd.setHours(endHour, endMinute, 0, 0);
  
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);
  
      const overlaps = eventStart <= dayEnd && eventEnd > dayStart;
      const tableMatches = event.tableIds.includes(tableId);
  
      return overlaps && tableMatches;
    });
  
    for (const event of tableEvents) {
      const eventStart = new Date(event.date);
      const [startHour, startMinute] = event.start.split(':').map(Number);
      eventStart.setHours(startHour, startMinute, 0, 0);
  
      const eventEnd = new Date(event.date);
      const [endHour, endMinute] = event.end.split(':').map(Number);
      if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
        eventEnd.setDate(eventEnd.getDate() + 1);
      }
      eventEnd.setHours(endHour, endMinute, 0, 0);
  
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);
  
      const slotStart = eventStart < dayStart ? dayStart : eventStart;
      const slotEnd = eventEnd > dayEnd ? dayEnd : eventEnd;
  
      const [slotHour, slotMinute] = timeSlot.split(':').map(Number);
      const slotTime = new Date(currentDate);
      slotTime.setHours(slotHour, slotMinute, 0, 0);
  
      if (
        slotTime.getTime() === slotStart.getTime()
      ) {
        const span = calculateEventSpanForDay(event, timeSlots, currentDate);
        return {
          event,
          isStart: true,
          span
        };
      }
  
      if (slotTime > slotStart && slotTime < slotEnd) {
        return {
          event,
          isStart: false,
          span: 0
        };
      }
    }
  
    return null;
  };

  const calculateEventSpanForDay = (event, timeSlots, currentDate) => {
    const eventStart = new Date(event.date);
    const [startHour, startMinute] = event.start.split(':').map(Number);
    eventStart.setHours(startHour, startMinute, 0, 0);
  
    const eventEnd = new Date(event.date);
    const [endHour, endMinute] = event.end.split(':').map(Number);
    if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
      eventEnd.setDate(eventEnd.getDate() + 1);
    }
    eventEnd.setHours(endHour, endMinute, 0, 0);
  
    const dayStart = new Date(currentDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(currentDate);
    dayEnd.setHours(23, 59, 59, 999);
  
    const slotStart = eventStart < dayStart ? dayStart : eventStart;
    const slotEnd = eventEnd > dayEnd ? dayEnd : eventEnd;
  
    const startTimeStr = slotStart
      .toTimeString()
      .slice(0, 5);
    const endTimeStr = slotEnd
      .toTimeString()
      .slice(0, 5);
  
    const startIndex = timeSlots.indexOf(startTimeStr);
    let endIndex = timeSlots.indexOf(endTimeStr);
  
    if (endIndex === -1) endIndex = timeSlots.length;
  
    const span = endIndex - startIndex;
    return span > 0 ? span : 1;
  };

  const renderCurrentTimeIndicator = () => {
    if (currentTimePosition === null) {
      return null;
    }
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    return (
      <div 
        className="resCalendar-currentTimeIndicator" 
        style={{ left: `${currentTimePosition}px` }}
      >
        <div className="resCalendar-currentTimeLabel">
          {timeString}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const timeSlots = generateTimeSlots();
    
    return (
      <div className="resCalendar-dayView">
        <table className="resCalendar-table">
          <thead>
            <tr>
              {/* Tables header */}
              <th className="resCalendar-tableHeader">
                Tables
              </th>
              
              {/* Time headers */}
              {timeSlots.map((time, index) => (
                <th 
                  key={`header-${index}`}
                  className="resCalendar-timeHeader"
                  style={{ borderRight: index < timeSlots.length - 1 ? '1px solid #e0e0e0' : 'none' }}
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {tables.map((table, tableIndex) => {
              const renderedEvents = new Map();              
              return (
                <tr key={`table-row-${tableIndex}`}>
                  {/* Table Name Cell with Capacity */}
                  <td 
                    className="resCalendar-tableName"
                    style={{ borderBottom: tableIndex < tables.length - 1 ? '1px solid #e0e0e0' : 'none' }}
                  >
                    <div className="resCalendar-tableIdDisplay">
                      {table.name || `T${table.id}`}
                    </div>
                    <div className="resCalendar-tableCapacity">
                      {table.capacity}
                    </div>
                  </td>
                  
                  {/* Time Slots */}
                  {(() => {
                    let slotIndex = 0;
                    const cells = [];
                    
                    while (slotIndex < timeSlots.length) {
                      const slot = timeSlots[slotIndex];
                      const eventInfo = getEventForSlot(table.id, slot, timeSlots);
                      
                      if (!eventInfo || (eventInfo.event && renderedEvents.has(eventInfo.event.id))) {
                        cells.push(
                          <td 
                            key={`cell-${tableIndex}-${slotIndex}`}
                            className={`resCalendar-emptyCell ${slotIndex % 2 === 0 ? 'resCalendar-oddCell' : 'resCalendar-evenCell'}`}
                            style={{ 
                              borderBottom: tableIndex < tables.length - 1 ? '1px solid #e0e0e0' : 'none',
                              borderRight: slotIndex < timeSlots.length - 1 ? '1px solid #e0e0e0' : 'none'
                            }} 
                          />
                        );
                        slotIndex++;
                        continue;
                      }
                      
                      if (eventInfo.isStart) {
                        renderedEvents.set(eventInfo.event.id, true);
                        const span = Math.min(eventInfo.span, timeSlots.length - slotIndex);
                        
                        const tableNum = parseInt(table.id.replace(/\D/g, '')) || 0;
                        const colorClasses = [
                          'resEvent-green', 
                          'resEvent-blue', 
                          'resEvent-orange', 
                          'resEvent-purple', 
                          'resEvent-lightGreen'
                        ];
                        const colorClass = colorClasses[tableNum % colorClasses.length];
                        
                        const isMultiTableReservation = eventInfo.event.tableIds.length > 1;
                        const multiTableClass = isMultiTableReservation ? 'resEvent-multiTable' : '';
                        
                        cells.push(
                          <td 
                            key={`event-${tableIndex}-${slotIndex}`}
                            colSpan={span}
                            style={{ 
                              padding: '5px',
                              borderBottom: tableIndex < tables.length - 1 ? '1px solid #e0e0e0' : 'none',
                              borderRight: (slotIndex + span) < timeSlots.length ? '1px solid #e0e0e0' : 'none'
                            }}
                          >
                            <div className={`resEvent-card ${colorClass} ${multiTableClass}`}>
                              <div className="resEvent-title">
                                {eventInfo.event.title}
                                {console.log("Event title:", eventInfo.event.phone)}
                              </div>
                              <div className="resEvent-time">
                                {eventInfo.event.start} - {eventInfo.event.end}
                              </div>
                              {eventInfo.event.peopleNo && (
                                <div className="resEvent-people">
                                  People: {eventInfo.event.peopleNo}
                                </div>
                              )}
                              {(
                                <div className="resEvent-tables">
                                  Phone: {eventInfo.event.reservationPhone}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                        
                        slotIndex += span;
                      } else {
                        cells.push(
                          <td 
                            key={`cell-${tableIndex}-${slotIndex}`}
                            className={`resCalendar-emptyCell ${slotIndex % 2 === 0 ? 'resCalendar-oddCell' : 'resCalendar-evenCell'}`}
                            style={{ 
                              borderBottom: tableIndex < tables.length - 1 ? '1px solid #e0e0e0' : 'none',
                              borderRight: slotIndex < timeSlots.length - 1 ? '1px solid #e0e0e0' : 'none'
                            }} 
                          />
                        );
                        slotIndex++;
                      }
                    }
                    
                    return cells;
                  })()}
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Current time indicator */}
        {renderCurrentTimeIndicator()}
      </div>
    );
  };

  return (
    
    <div className="resCalendar-container">
      <Navigation />
      <h1 className="page-name text-center">Reservations - Calendar View</h1>
      
      <div className="resCalendar-contentWrapper">
        {/* Fixed navigation header */}
        <div>
          {/* Week navigation header */}
          <div className="resCalendar-navContainer">
            <button 
              onClick={goToPrevious} 
              className="resCalendar-navButton"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            
            {getWeekDates().map((date, index) => {
              const isSelectedDay = date.toDateString() === currentDate.toDateString();
              const isTodayDate = isToday(date);
              
              return (
                <div 
                  key={index} 
                  className={`resCalendar-dayItem ${isSelectedDay ? 'resCalendar-selectedDay' : ''} ${isTodayDate ? 'resCalendar-today' : ''}`}
                  onClick={() => setCurrentDate(new Date(date))}
                >
                  {formatHeaderDate(date)}
                </div>
              );
            })}
            
            <button 
              onClick={goToNext} 
              className="resCalendar-navButton"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          {/* Today Button */}
          <div className="resCalendar-buttonContainer">
            <button 
              onClick={goToToday} 
              className="resCalendar-todayButton"
            >
              Today
            </button>
          </div>
        </div>
        
        {/* Scrollable calendar content */}
        <div className="resCalendar-scrollArea" ref={scrollAreaRef}>
          <div className="resCalendar-mainContent">
            <div className="resCalendar-calendarContent">
              {isLoading ? (
                <div className="resCalendar-loadingMessage">
                  <p>Loading reservations...</p>
                </div>
              ) : error ? (
                <div className="resCalendar-errorMessage">
                  {error}
                </div>
              ) : renderDayView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;