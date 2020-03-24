import Task from "./Task";
import { Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import User from "./User";
import UserMapper from "../data_mappers/UserMapper";
import UserMapperImpl from "../data_mappers/UserMapperImpl";

export default class CalendarHelper {

  static async addEvent(task: Task) {
    let calendarID: string;
    let userMapper: UserMapper = new UserMapperImpl;
    userMapper.getUser() // decide if we really need this
    let user = User.getInstance()
    console.log(`calendar id: ${user.calendarId}`)

    if (user.calendarId) {
      calendarID = user.calendarId;
    }
    else {
      const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await CalendarHelper.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Trackstar' };

      calendarID = await Calendar.createCalendarAsync({
        title: 'Trackstar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
      user.calendarId = calendarID;
      userMapper.update(user);
    }

    Calendar.createEventAsync(calendarID, {
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
}