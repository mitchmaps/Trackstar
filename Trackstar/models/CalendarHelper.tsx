import Task from "./Task";
import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default class CalendarHelper {

  static async addEvent(task: Task) {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await CalendarHelper.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Trackstar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Trackstar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    // const details = {
    //   title: "Study Unit 1",
    //   startDate: new Date(),
    //   endDate: new Date()
    // }
    Calendar.createEventAsync(newCalendarID, {
      title: task.title,
      startDate: task.due_date,
      endDate: task.due_date
    });
  }

  private static async getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.source.name === 'iCloud');
    return defaultCalendars[0].source;
  }

  private static async createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await CalendarHelper.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Trackstar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Trackstar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    // const details = {
    //   title: "Study Unit 1",
    //   startDate: new Date(),
    //   endDate: new Date()
    // }
    Calendar.createEventAsync(newCalendarID, {
      title: "Study Unit 1",
      startDate: new Date(),
      endDate: new Date()
    });
  }
}