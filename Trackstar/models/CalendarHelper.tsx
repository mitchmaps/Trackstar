import Task from "./Task";
import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import User from "./User";
import UserMapper from "../data_mappers/UserMapper";
import UserMapperImpl from "../data_mappers/UserMapperImpl";

export default class CalendarHelper {

  static async addEvent(task: Task, reminder: boolean = false) {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendarId = await CalendarHelper.getCalendarId();

      if (reminder && (Platform.OS === 'ios')) {
        const { status } = await Calendar.requestRemindersPermissionsAsync();
        if (status === 'granted') {
          Calendar.createReminderAsync(null, {
            title: task.title,
            startDate: task.due_date,
            dueDate: task.due_date
          })
        }
        else {
          console.log("Reminders access denied")
        }
      }
      Calendar.createEventAsync(calendarId, { // maybe add checking for if it's already in the calendar
        title: task.title,
        startDate: task.due_date, // maybe change this to be due_date minus est_time
        endDate: task.due_date
      });
    }
    else {
      console.log(" Calendar access denied")
    }
  }

  private static async getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    let defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    if (defaultCalendars[0] == undefined) {
      defaultCalendars = calendars.filter(each => each.source.name === 'iCloud');
    }
    return defaultCalendars[0].source;
  }

  private static async getCalendarId() {
    let userMapper: UserMapper = new UserMapperImpl;
    await userMapper.getUser();
    let user = User.getInstance();
    let calendarId: string = user.calendarId;

    const calendars = await Calendar.getCalendarsAsync();
    if (calendars.filter(each => each.id == calendarId).length > 0) {
      return calendarId;
    }
    else {
      return await CalendarHelper.createCalendar()
    }
  }

  private static async createCalendar() {
    const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await CalendarHelper.getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Trackstar' };

    const calendarId = await Calendar.createCalendarAsync({
      title: 'Trackstar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    let userMapper: UserMapper = new UserMapperImpl;
    await userMapper.getUser();
    let user = User.getInstance();
    user.calendarId = calendarId;
    userMapper.update(user);

    return calendarId
  }
}