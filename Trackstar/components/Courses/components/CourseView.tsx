/* Grade Calculations for the course evaluations */
import React from 'react';

export class CourseView extends React.Component {
  render() {

    const grade = this.gradeCalculations();

    return <p>hello course view</p>;
  }

  gradeCalculations() {
     // Where the logic for calculating grades goes
    
    float curr_grade = 0; 
    
    //get from evaluations weight and grade.
    //do for each evaluation. How are the evaluations stored? How do you get weight*grade = total_percentage for each evaluation
   for(i=0;i<number_of_evaluations;i++){
     curr_grade = weight*grade;
  }
   
  }
}
