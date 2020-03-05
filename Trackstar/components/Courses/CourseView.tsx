import React, {useEffect, useState} from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Divider, Title, Badge } from "react-native-paper";
import { iOSUIKit } from "react-native-typography";
import Evaluation from "../../models/Evaluation";

export interface Props {
  code: string;
  name: string;
  term: string;
  minGrade: number;
}

// console.log(Evaluation.all());

export default function CourseView({ code, name, term, minGrade }: Props) {
  // const fakeEvaluations: Evaluation[] = [
  //   {
  //     title: "Midterm",
  //     due_date: new Date("2020-03-13"),
  //     complete: false,
  //     weight: 35,
  //     grade: 0,
  //     course_code: "BIOL 1902"
  //   },
  //   {
  //     title: "Final",
  //     due_date: new Date("2020-04-10"),
  //     complete: false,
  //     weight: 65,
  //     grade: 0,
  //     course_code: "BIOL 1902"
  //   },
  //   {
  //     title: "Test",
  //     due_date: new Date("2020-03-06"),
  //     complete: false,
  //     weight: 0,
  //     grade: 0,
  //     course_code: "BIOL 1902"
  //   }
  // ];

  const [courseEvals, setCourseEvals] = useState([]);

  useEffect(() => {
    console.log(code);
    const evalData = retrieveEvalData(code).then((data: Evaluation[]) => {
      console.log('data from promise');
      console.log(data);
      setCourseEvals(data);
    });
  }, []);

  // replace with DB query when setup
  const evalMarkup = generateEvalMarkup(courseEvals);

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <ScrollView
        style={{
          height: 80,
          alignSelf: "stretch",
          padding: 20
        }}
      >
        <Text style={iOSUIKit.largeTitleEmphasized}>{code}</Text>
        <Text style={iOSUIKit.subhead}>{name}</Text>
        <Text style={iOSUIKit.bodyEmphasized}>Grading scheme</Text>
        {evalMarkup}
      </ScrollView>
    </View>
  );
}

// convert this to tasks
function generateEvalMarkup(evals: Evaluation[]) {
  return evals.reduce((allEvals, currEval) => {
    const { title, due_date, weight } = currEval;

    const formattedDate = new Date(due_date);
    const subTitle = `Due on ${formattedDate.toDateString()}`;
    const daysUntil = determineDaysUntilEval(formattedDate);
    const badgeText = `In ${daysUntil} days`;

    const badgeColor = (daysUntil > 10) ? (
      "#408ff7"
    ) : (daysUntil <= 10 && daysUntil > 5) ? (
      "#f48618"
    ) : (
      "#fc2525"
    );

    const badgeMarkup = (
      <Badge visible={true} style={{backgroundColor: badgeColor, color: '#ffffff'}}>
        {badgeText}
      </Badge>
    );

    const titleMarkup = (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Title>{title}</Title>
        {badgeMarkup}
      </View>
    );

    // Chaneg how this looks
    const evalMarkup = (
      <View key={title} style={{paddingVertical: 5}}>
        <Card>
          <Card.Content>
            <Card.Title title={title} subtitle={`Worth ${weight}%`} />
            <Text>{subTitle}</Text>
            {badgeMarkup}
          </Card.Content>
        </Card>
      </View>
    );

    allEvals.push(evalMarkup);

    return allEvals;
  }, []);
}

function determineDaysUntilEval(evalDate: Date) {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const currDate = new Date();

  return (
    (Date.UTC(evalDate.getFullYear(), evalDate.getMonth(), evalDate.getDate()) -
      Date.UTC(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate()
      )) /
      oneDayInMs
  );
}

async function retrieveEvalData(code: string) {
  const evals = await Evaluation.findByCourseCode(code);

  return evals;
}
