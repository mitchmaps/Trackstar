import React from 'react';

export class CourseView extends React.Component {
  render() {

    const grade = this.gradeCalculations();

    return <p>hello course view</p>;
  }

  gradeCalculations() {
     // Where the logic for calculating grades goes
    
    /* planning first
    total grade for the course starts at 0
    user enters grades for each evaluation. How does this relation work? does it need to know about evaluations
    yeah it needs to get the percentage information from it
    adds up to total grade
    */
   
   
  }
}
