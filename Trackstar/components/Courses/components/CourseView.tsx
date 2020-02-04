import React from 'react';

export class CourseView extends React.Component {
  render() {

    const grade = this.gradeCalculations();

    return <p>hello course view</p>;
  }

  gradeCalculations() {
     // Where the logic for calculating grades goes
    float total_grade = 0; 
    //for now = 0 maybe change it to = calculation of each evaluation*percentage worth
    
    /* 
    user enters grades for each evaluation. How does this relation work? does it need to know about evaluations
    yeah it needs to get the percentage information from it
    adds up to total grade
    */
    
   
   
  }
}
