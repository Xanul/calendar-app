import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, CalendarEvent, CalendarModal } from "../"
import { addHours } from 'date-fns';

import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';



const events = [{
  title: 'Cumpleanos del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#FAFAFA',
  user: {
    _id: '123',
    name: 'Fernando'
  }
},
]

console.log(new Date());

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({event, start, end, isSelected})

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }

  }

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  }

  const onSelect = (event) => {
    console.log({ onSelect: event })
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event );
  }


  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
      />
      
      <CalendarModal />

    </>
  )
}
