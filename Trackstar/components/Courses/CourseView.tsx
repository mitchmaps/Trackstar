import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Divider, Title } from "react-native-paper";
import { iOSUIKit } from "react-native-typography";
import Evaluation from "../../models/Evaluation";

export interface Props {
  code: string;
  name: string;
  term: string;
  minGrade: number;
}

export default function CourseView({ code, name, term, minGrade }: Props) {
  const fakeEvaluations: Evaluation[] = [
    {
      title: "Midterm",
      due_date: new Date(),
      complete: false,
      weight: 35,
      grade: 0,
      course_code: "BIOL 1902"
    },
    {
      title: "Final",
      due_date: new Date(),
      complete: false,
      weight: 65,
      grade: 0,
      course_code: "BIOL 1902"
    }
  ];

  // replace with DB query when setup
  const evalMarkup = generateEvalMarkup(fakeEvaluations);

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
        <Card>
          <Card.Title title="Grading scheme" />
          <Card.Content>{evalMarkup}</Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

function generateEvalMarkup(evals: Evaluation[]) {
  return evals.reduce((allEvals, currEval) => {
    const { title, due_date, weight } = currEval;

    const subTitle = `Due on ${due_date.toDateString()} `;

    const evalMarkup = (
      <View key={title}>
        <Card.Content>
          <Card.Title title={title} subtitle={`Worth ${weight}%`} />
          <Text>{subTitle}</Text>
        </Card.Content>
      </View>
    );

    allEvals.push(evalMarkup);

    return allEvals;
  }, []);
}
