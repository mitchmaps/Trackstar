import React from "react";
import { View, Text } from "react-native";

export interface Props {
  code: string;
  name: string;
  term: string;
}

export default function CourseView({ code, name, term }: Props) {
  return <Text>{`${code} ${name} ${term}`}</Text>;
}
