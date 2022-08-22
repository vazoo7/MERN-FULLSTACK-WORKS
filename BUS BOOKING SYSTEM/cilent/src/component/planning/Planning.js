import React,{useState} from 'react';
import './planning.css';
import getBus from '../../api/api';
import BusTable from '../table/Table'
const Planning = (props) => {
    const [plan,setPlan]=useState('')
    const [busData,setBusData]=useState({})
    const handleFrom=(e,field)=>{
        e.preventDefault()
        let value=e.target.value
        setPlan({...plan,[field]:value.toLowerCase()})
        console.log(plan.date)
    }
    const handlePlan=async (e)=>{
        e.preventDefault()
        try{
            let response=await getBus.post('/api/busDetails',{
                        from:plan.from, to:plan.to, travelDate: plan.date,
    
            })
            if(response.data.status===true){
                // console.log(response.data.bus)
               return( setBusData(response.data))

            }
        }
        catch(err){console.log(err)}
    } 
    const renderBus=(busData)=>{
            if(Object.keys(busData).length>0)
                return(<BusTable value={busData} onChild2={e1=>handleSeat(e1)}/>)
    }
    const handleSeat=(e)=>{
        let {onChild1}=props
        // return(e.target.value=2)
        if(onChild1){
            let e={busData,n:2}
            onChild1(e)
        }
    }
    return (
        <div>
        <div className="planning">
            <div>
            <label htmlFor="exampleFormControlSelect1">From</label>
            <select className="form-control" id="exampleFormControlSelect1" onClick={e=>handleFrom(e,"from")}>
                <option>Chennai</option>
                <option>Banglore</option>
                <option>Hyderabad</option>
                <option>Vijayawada</option>
                <option>Coimbatore</option>
            </select>
            </div>
            <div>
            <label htmlFor="exampleFormControlSelect1">To</label>
            <select className="form-control"  id="exampleFormControlSelect1" onClick={e=>handleFrom(e,"to")}>
                 <option>Chennai</option>
                <option>Banglore</option>
                <option>Hyderabad</option>
                <option>vijayawada</option>
                <option>Coimbatore</option>
            </select>
            </div>
            <div>
                <label htmlFor="doj">Travel Date</label>
                <div><input type="date" id="doj" name="doj" onChange={e=>handleFrom(e,"date")}/></div>
            </div>
            <div>
                <button className="btn btn-success" onClick={e=>handlePlan(e)}>Plan Trip</button>
            </div>
            {/* {console.log(busData.bus)} */}
        </div>
            {renderBus(busData)}
        </div>
    );
};

export default Planning;