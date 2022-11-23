import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent(calendarEvent) )
  }

  const startDeletingEvent = () => {
    // Todo: llegar al backend
    dispatch( onDeleteEvent() )
  }

  const startSavingEvent = async (calendarEvent) => {
    
    if( calendarEvent._id ){
      // Actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }) )
    } else {
      // Creando
      
      const { data } = await calendarApi.post('/events', calendarEvent)
      console.log({data});

      dispatch( onAddNewEvent({...calendarEvent, id: data.event.id, user}));
    }

  }

  const startLoadingEvents = async () => {

    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDate(data.events);
      
      dispatch( onLoadEvents(events) )
      
  
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
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
    startLoadingEvents
    
  }

}
