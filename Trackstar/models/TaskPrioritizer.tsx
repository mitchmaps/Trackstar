import Task from './Task';
import Evaluation from './Evaluation';
import TaskMapperImpl from '../data_mappers/TaskMapperImpl';
import TaskMapper from '../data_mappers/TaskMapper';
import EvaluationMapper from '../data_mappers/EvaluationMapper';
import EvaluationMapperImpl from '../data_mappers/EvaluationMapperImpl';

export default class TaskPrioritizer{

    prioritize = (t: Task[]) => {

        let sortList = [];
        let mappingList = new Map();

        let DueDate;
        let evaluation
        let priorityCounter = 0;

        let taskMapper: TaskMapper = new TaskMapperImpl;
        let evalMapper: EvaluationMapper = new EvaluationMapperImpl;


        for (let index = 0; index < t.length; index++) {
            
            // find metrics to be later put into buckets
            DueDate = this.date_diff_indays(new Date(),t[index].due_date); 
            let evaluation: Evaluation  = evalMapper.find(t[index].evaluation_id); 

            // calculate priority
            priorityCounter += this.due_date_levels(DueDate)
            priorityCounter += this.duration_levels(t[index].est_duration)
            priorityCounter += this.weighting_levels(evaluation.weight);

            // find average and redefine the priority as that number
            priorityCounter/=3;
            t[index].priority = parseInt(priorityCounter.toFixed(2));

            // pass in the priority values into a list 
            sortList = this.insertList(sortList, parseInt(priorityCounter.toFixed(2)), t[index])
            
            // pass in the priority value as key, and object as value
            mappingList = this.insertKey(mappingList, parseInt(priorityCounter.toFixed(2)), t[index])
        }

        // sort the priority values list
        sortList.sort(function(a,b){return b-a});
        // console.log(mappingList)

        // populate a new sorted list of the objects based off of priority
        let returnValue = [];
        sortList.forEach(element => {
            returnValue.push(mappingList.get(element))
        });
        return returnValue;
        // console.log(returnValue)
    }


    date_diff_indays = (date1: Date, date2: Date) => {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    insertKey = (tempMap: Map<number, Task>, key: number, value: Task) => {
        while(true){
            if(tempMap.has(key))
            {
                key+=0.01
            }
            else
            {
                value.priority = key;
                tempMap.set(key, value)
                return tempMap;
            }
        }
    }
    insertList = (tempList, value, task) => {
        while(true){
            if(tempList.includes(value))
            {   
                value+=0.01
            }
            else
            {
                task.priority = value;
                tempList.push(value)
                return tempList;
            }
        }
    }
    
    due_date_levels = value => {
        if(value<=3)return 5
        else if (value<=7)return 4
        else if (value<=14)return 3
        else if (value<=28)return 2
        else return 1
    }
    
    weighting_levels = value =>{
        if(value<=5)return 1
        else if (value<=10)return 2
        else if (value<=20)return 3
        else if (value<=40)return 4
        else return 5
    }

    duration_levels = value => {
        if(value<=30)return 1
        else if (value<=60)return 2
        else if (value<=120)return 3
        else if (value<=240)return 4
        else return 5
    }
}