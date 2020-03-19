
var date_diff_indays = function(date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}
var insertKey = function (tempMap, key, value){
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
var insertList = function (tempList,value){
    while(true){
        if(tempList.includes(value))
        {   
            value+=0.01
        }
        else
        {
            value.priority = value;
            tempList.push(value)
            return tempList;
        }
    }
}

function due_date_levels(value){
    if(value<=3)return 5
    else if (value<=7)return 4
    else if (value<=14)return 3
    else if (value<=28)return 2
    else return 1
}

function weighting_levels(value){
    if(value<=5)return 1
    else if (value<=10)return 2
    else if (value<=20)return 3
    else if (value<=40)return 4
    else return 5
}

function duration_levels(value){
    if(value<=30)return 1
    else if (value<=60)return 2
    else if (value<=120)return 3
    else if (value<=240)return 4
    else return 5
}

import Task from './Task';

export default class TaskPrioritizer{

    prioritize = (t: Task[]) => {

        let sortList = [];
        let mappingList = new Map();

        let DueDate;
        let priorityCounter = 0;

        for (let index = 0; index < t.length; index++) {
            
            DueDate = date_diff_indays(new Date(),t[index].due_date)
            
            // calculate the priority value
            priorityCounter += due_date_levels(DueDate)
            priorityCounter += duration_levels(t[index].est_duration)

            // find average and redefine the priority as that number
            priorityCounter/=2;
            t[index].priority = parseInt(priorityCounter.toFixed(2));

            // pass in the priority values into a list 
            sortList = insertList(sortList, parseInt(priorityCounter.toFixed(2)))
            
            // pass in the priority value as key, and object as value
            mappingList = insertKey(mappingList, parseInt(priorityCounter.toFixed(2)), t[index])
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
    }}




