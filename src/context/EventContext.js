import { createContext, useState } from "react";
import moment from "moment";

const EventContext = createContext();
const { Provider, Consumer } = EventContext;

const EventProvider = ({ children }) => {
  const eventsInfo = localStorage.getItem('eventsInfo');
  const eventsDay = localStorage.getItem('eventsDay');

  const [eventsDayState, setEventsDayState] = useState(
    eventsDay ? JSON.parse(eventsDay) : [],
  );

  const [eventState, setEventState] = useState(
    eventsInfo ? JSON.parse(eventsInfo) : []
  );


  const setEventsInfo = (eventInfo) => {
    const newEventsDay = [
      Number(moment(eventInfo.date, 'DD-MM-YYYY', true).format('D')),
      ...eventsDayState,
    ]

    setEventsDayState(newEventsDay);

    localStorage.setItem(
      'eventsDay',
      JSON.stringify(newEventsDay)
    );

    const newEventsInfo = [
      eventInfo,
      ...eventState,
    ];

    localStorage.setItem(
      'eventsInfo',
      JSON.stringify(newEventsInfo)
    );


    setEventState(newEventsInfo);
  };


  return (
    <Provider value={{ eventState, eventsDayState, setEventState: eventInfo => setEventsInfo(eventInfo), }}>
      {children}
    </Provider>
  );
}

export { EventProvider, Consumer as EventConsumer, EventContext };