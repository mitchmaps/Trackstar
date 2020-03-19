import Task from './Task'

export default class TaskPrioritizer{

    prioritize = (t: Task[]) => {

        let sortList = [];
        let mappingList = new Map();

        let DueDate;
        let priorityCounter = 0;

        for (let index = 0; index < t.length; index++) {

            priorityCounter = 0;
            
            // find metrics to be later put into buckets
            DueDate = this.date_diff_indays(new Date(),t[index].due_date); 
            // let evaluation: Evaluation  = evalMapper.find(t[index].evaluation_id); 

            // calculate priority
            priorityCounter += this.due_date_levels(DueDate)
            priorityCounter += this.duration_levels(t[index].est_duration)

            // final calculation for priority
            priorityCounter/=2.0000;

            // pass in the priority values into a list 
            sortList = this.insertList(sortList, priorityCounter);
            
            // pass in the priority value as key, and object as value
            mappingList = this.insertKey(mappingList, parseFloat(priorityCounter.toFixed(5)), t[index])
        }

        // sort the priority values list
        sortList = sortList.sort(function(a,b){return b-a});

        // populate a new sorted list of tasks based off of priority
        let returnValue = [];
        sortList.forEach(element => {
            returnValue.push(mappingList.get(element))
        });
        
        // return the sorted tasks list as well
        return returnValue;
    }


    private date_diff_indays = (date1: Date, date2: Date) => {
        let dt1: Date = new Date(date1);
        let dt2: Date = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /(1000 * 60 * 60 * 24));
    }

    private insertKey = (tempMap: Map<number, Task>, key: number, value: Task) => {
        while(true){
            if(tempMap.has(key))
            {
                key+=0.01
            }
            else
            {
                tempMap.set(key, value)
                return tempMap;
            }
        }
    }
    private insertList = (tempList, value) => {
        while(true){
            if(tempList.includes(value))
            {   
                value+=0.01
            }
            else
            {
                tempList.push(value)
                return tempList;
            }
        }
    }
    
    private due_date_levels = value => {
        return 10000 - value;
    }

    private duration_levels = value => {
        if(value<=30)return 1
        else if (value<=60)return 2
        else if (value<=120)return 3
        else if (value<=240)return 4
        else return 5
    }
}