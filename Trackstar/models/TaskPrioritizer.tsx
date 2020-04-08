import Task from './Task'
import { EvaluationMapper, EvaluationMapperImpl } from '../data_mappers';
import { Evaluation } from '.';

export default class TaskPrioritizer{



    async prioritize(t: Task[]): Promise<Task[]> {

        let returnValue: Task[] = [];
        let sortList: number[] = []; // take all priority values and put them into a list, to be sorted
        let mappingList = new Map(); // attach all priority values with their respective tasks into a map
        let DueDate;
        let priorityCounter = 0;
        let evalMapper: EvaluationMapper = new EvaluationMapperImpl;
        let currentEval: Evaluation;

<<<<<<< HEAD
        return new Promise((resolve) => {
          // have an 'evals' variable that will be used to represent all evaluations

          evalMapper.all().then((evals) => {
=======
        return new Promise(async (resolve) => {
>>>>>>> 5697d62cdffe01aa76662c4becbe4e6d4993367f

            // loop through all the task elements that were past in
            for (let i = 0; i < t.length; i++) {
                priorityCounter = 0;

                console.log(`here1: ${t[i].title}`)
                // find associated evaluation element
                currentEval = await evalMapper.find(t[i].evaluation_id)
                console.log(`here2: ${currentEval.title}`)

                DueDate = this.date_diff_indays(new Date(),t[i].due_date);

                // calculate priority
                priorityCounter += this.due_date_levels(DueDate);
                console.log(`${t[i].title}: ${this.due_date_levels(DueDate)}`)

                priorityCounter += this.duration_levels(t[i].est_duration);
                console.log(`${t[i].title}: ${this.duration_levels(t[i].est_duration)}`)

                priorityCounter += this.weighting_levels(currentEval.weight);
                console.log(`${t[i].title}: ${this.weighting_levels(currentEval.weight)}`)

<<<<<<< HEAD
                // pass in the priority values into a list
                // and then priority + the task objects into a map so that we can retrieve the task objects later

                let flag = false;
                mappingList.forEach(task_ele=>{
                    if(task_ele.id === task_element.id)
                        flag = true;
                });
=======
                priorityCounter/=3.0000;
                console.log(`${t[i].title}: ${priorityCounter}`)
                // pass in the priority values into a list
                // and then priority + the task objects into a map so that we can retrieve the task objects later
                let flag = false;
                let mappingKeysArray = Array.from(mappingList.keys())
                // console.log(mappingKeysArray)
                for (let j = 0; j < mappingKeysArray.length; j++) {
                    // console.log(mappingList.get(mappingKeysArray[j]))
                    if(mappingList.get(mappingKeysArray[j]).id === t[i].id) {
                        flag = true
                    }
                }
>>>>>>> 5697d62cdffe01aa76662c4becbe4e6d4993367f

                if(flag === true){
                    priorityCounter+=0.01;

                }
<<<<<<< HEAD

            })
=======
                mappingList.set(priorityCounter, t[i]);
                sortList.push(priorityCounter);
                console.log("here3")
            }
            console.log("here4")

>>>>>>> 5697d62cdffe01aa76662c4becbe4e6d4993367f
            // after all elements have been inserted into lists, continue on with functionality
            // start by sorting our (priorityList)
            sortList = sortList.sort(function(a,b){return b-a});
            // populate a new sorted list of tasks based off of our sorted list
            // use our sorted list values as keys to retrieve the actual task objects
            for (let k = 0; k < sortList.length; k++) {
              returnValue.push(mappingList.get(sortList[k]))
            }

            // return the sorted tasks list as well
<<<<<<< HEAD
            console.log(returnValue)
=======
            console.log(mappingList);
>>>>>>> 5697d62cdffe01aa76662c4becbe4e6d4993367f
            resolve(returnValue);
        })
        }

    // }


    // difference between two days
    private date_diff_indays(date1: Date, date2: Date) {
        let dt1: Date = new Date(date1);
        let dt2: Date = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /(1000 * 60 * 60 * 24));
    }


    // unfair to divide due dates into buckets so decided to create generic counter instead
    private due_date_levels(value) {
        return 10000 - value;
    }

    // estimated duration bucketing
    private duration_levels(value) {
        if(value<=30)return 1
        else if (value<=60)return 2
        else if (value<=120)return 3
        else if (value<=240)return 4
        else return 5
    }

    private weighting_levels(value) {
        if(value<=5)return 1
        else if (value<=10)return 2
        else if (value<=20)return 3
        else if (value<=40)return 4
        else return 5
    }
}