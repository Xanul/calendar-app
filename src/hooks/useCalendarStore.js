import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
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

  const startDeletingEvent = async () => {
    
    try {
      if (activeEvent) {
        const resp = await calendarApi.delete(`/events/${activeEvent.id}`);
        console.log(resp);
        dispatch( onDeleteEvent() )
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error saving event', error.response.data.msg, 'error');
    }
  }

  const startSavingEvent = async (calendarEvent) => {
    
    try {
      // Actualizando un evento
      if( calendarEvent.id ){
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch( onUpdateEvent({ ...calendarEvent, user }));
        return 
      }
      // Creando un evento
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch( onAddNewEvent({...calendarEvent, id: data.event.id, user}));
    } catch (error) {
      console.log(error);
      Swal.fire('Error saving event', error.response.data.msg, 'error')
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
