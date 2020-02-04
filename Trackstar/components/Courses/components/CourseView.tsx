import React from 'react';

export class CourseView extends React.Component {
  render() {

    const grade = this.gradeCalculations();

    return <p>hello course view</p>;
  }

  gradeCalculations() {
    // Where the logic for calculating grades goes
  }
}