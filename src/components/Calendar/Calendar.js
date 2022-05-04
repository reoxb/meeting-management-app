import { useContext } from "react";
import moment from "moment";
import './Calendar.css';
import { Link } from "react-router-dom";
import { EventContext } from "../../context/EventContext";

export default function Calendar() {
    const eventContext = useContext(EventContext);
    const {
        eventsDayState,
    } = eventContext;

    const weekdayshort = moment.weekdaysShort();

    let weekdayshortname = weekdayshort.map(day => {
        return (
            <th key={day}>
                {day}
            </th>
        );
    });

    const firstDayOfMonth = () => {
        let firstDay = moment()
            .startOf("month")
            .format("d");
        return firstDay;
    };

    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(
            <td className="empty">{""}</td>
        );
    }

    let daysInMonth = [];

    for (let d = 1; d <= moment().daysInMonth(); d++) {
        let highlightday = eventsDayState.includes(d);

        if (highlightday) {
            daysInMonth.push(
                <td key={d} className={"calendar-day calendar-day_entry"}>
                    <Link className="calendar-day_event" to={`/schedule-meeting?day=${d}`} >
                        {d}
                    </Link>
                </td >
            );
        } else {
            daysInMonth.push(
                <td key={d} className={"calendar-day"}>
                    {d}
                </td >
            );
        }
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row); // if index not equal 7 that means not go to next week
        } else {
            rows.push(cells); // when reach next week we contain all td in last week to rows 
            cells = []; // empty container 
            cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
            rows.push(cells);
        }
    });

    let daysinmonth = rows.map((row, i) => {
        return <tr key={i}>{row}</tr>;
    });

    const currMonthName = moment().format('MMMM');
    const currYearName = moment().format('YYYY');


    return (
        <div className="calendar">
            <table className="calendar-month">
                <caption className="calendar-month-header">{`${currMonthName} ${currYearName}`}</caption>
                <thead className="calendar-weekdays-header">
                    <tr className="calendar-weekdays">{weekdayshortname}</tr>
                </thead>
                <tbody className="">
                    {daysinmonth}
                </tbody>
            </table>
        </div>
    );
}