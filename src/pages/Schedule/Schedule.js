// functional react component
import { useEffect, useState, useContext } from 'react';
import useQuery from '../../hooks/useQuery';
import useForm from '../../hooks/useForm';
import validateSchedule from '../../utils/validateSchedule';
import { EventContext } from '../../context/EventContext';
import { Navigate } from 'react-router';
import moment from 'moment';
import './Schedule.css';

export default function Schedule() {
    const [redirectOnDashboard, setRedirectOnDashboard] = useState(false);
    const eventContext = useContext(EventContext);
    const { eventState } = eventContext;

    let query = useQuery();
    const queryDay = query.get('day');

    const initialState = {
        date: '',
        name: '',
        description: '',
        attendees: '',
    };

    const [eventInfoData, setEventInfoData] = useState({});

    const {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
    } = useForm(initialState, validateSchedule);

    const onSubmit = async (credentias) => {
        fetch('/schedule')
            .then(res => res.json())
            .then(({ data }) => {
                const event = {
                    id: data.id,
                    ...values
                }
                if (event) {
                    eventContext.setEventState(event);
                    setTimeout(() => {
                        setRedirectOnDashboard(true);
                    }, 700);
                } else {
                    throw new Error('Event not found');
                }
            })
    }

    useEffect(() => {
        if (queryDay) {
            const eventInfo = eventState?.find(event => {
                const month = Number(moment(event?.date, 'DD-MM-YYYY', true).format('D'));
                const queryNumber = Number(queryDay)
                return month === queryNumber;
            })
            setEventInfoData(eventInfo);
        }
    }, [queryDay, eventState]);

    const { date, name, description, email } = eventInfoData;

    return (
        <>
            {redirectOnDashboard && <Navigate to={`/dashboard`} />}
            <h1>{queryDay ? 'Editing' : 'Creating'}</h1>
            <div className="schedule-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label key="date-label">Date: </label>
                    <input
                        type="text"
                        id="date"
                        key="date"
                        name="date"
                        value={date || values?.date}
                        placeholder="DD-MM-YYYY"
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {errors.date && <div className='login-form__error'> {errors.date} </div>}
                    <label key="name-label" >Name: </label>
                    <input
                        type="text"
                        id="name"
                        key="name"
                        name="name"
                        value={(name || values?.name) || ''}
                        placeholder="Your name..."
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {errors.name && <p className='login-form__error'> {errors.name} </p>}
                    <label key="description-label">Description: </label>
                    <textarea
                        id="description"
                        key="description"
                        name="description"
                        placeholder="Write some description here..."
                        value={(description || values?.description) || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}>
                    </textarea>
                    <label key="attendees-label">Attendees: </label>
                    <input
                        type="text"
                        id="attendees"
                        key="attendees"
                        name="email"
                        value={(email || values?.email) || ''}
                        placeholder="attendees@mail.com"
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {errors.email && <p className='login-form__error'> {errors.email} </p>}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );

}