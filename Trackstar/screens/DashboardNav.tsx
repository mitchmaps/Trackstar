import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import CourseScreen from './CourseScreen';
import DashboardScreen from './DashboardScreen';
import AddCourseScreen from './AddCourseScreen';

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  Course: CourseScreen,
  Add: AddCourseScreen,
});

export default createAppContainer(DashboardStack);
