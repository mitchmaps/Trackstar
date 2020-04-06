import Task from "./Task";
import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import User from "./User";
import UserMapper from "../data_mappers/UserMapper";
import UserMapperImpl from "../data_mappers/UserMapperImpl";

export default class CalendarHelper {

  static async addEvent(task: Task) {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendarId = await CalendarHelper.getCalendarId();

      Calendar.createEventAsync(calendarId, { // maybe add checking for if it's already in the calendar
        title: task.title,
        startDate: new Date(task.due_date.getTime() - task.est_duration * 60000), // due_date minus est_time
        endDate: task.due_date,
      });
    }
    else {
      console.log(" Calendar access denied")
    }
  }

  static async addReminder(task: Task) {
    if (Platform.OS === 'ios') {
      const { status } = await Calendar.requestRemindersPermissionsAsync();
      if (status === 'granted') {
        const newDate = new Date(task.due_date.getTime() - task.est_duration * 60000 + task.due_date.getTimezoneOffset() * 60000)
        const dateNoOffset = new Date(task.due_date.getTime() - task.est_duration * 60000)
        const formattedDate = `${newDate.getFullYear()}-0${newDate.getMonth()+1}-0${newDate.getDate()}T${newDate.getHours()}:${newDate.getMinutes()}:00.000Z`
        // const formattedDate = `${dateNoOffset.getFullYear()}-0${dateNoOffset.getMonth()+1}-0${dateNoOffset.getDate()}T${dateNoOffset.getHours()}:${dateNoOffset.getMinutes()}:00.000Z`

        Calendar.createReminderAsync(null, {
          title: task.title,
          startDate: dateNoOffset,
          dueDate: dateNoOffset,
          alarms: [{absoluteDate: formattedDate, relativeOffset: 0}],
        })
      }
      else {
        console.log("Reminders access denied")
      }
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