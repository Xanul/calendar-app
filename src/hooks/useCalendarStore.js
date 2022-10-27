import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent(calendarEvent) )
  }

  const startDeletingEvent = () => {
    // Todo: llegar al backend
    dispatch( onDeleteEvent() )
  }

  const startSavingEvent = async (calendarEvent) => {
    // Todo: llegar al backend
    // Todo bien

    if( calendarEvent._id ){
      // Actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }) )
    } else {
      // Creando
      dispatch( onAddNewEvent({_id: new Date().getTime(), ...calendarEvent}));
    }

  }

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    
  }

}
