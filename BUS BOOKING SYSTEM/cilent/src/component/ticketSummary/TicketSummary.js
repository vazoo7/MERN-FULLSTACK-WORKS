import React,{useState,useEffect} from 'react';
import api from '../../api/api';
import jwt_decode from 'jwt-decode';
import './TicketSummary.css';
const TicketSummary = () => {
    const [ticketDetails,setTicketDetails]=useState({})
    const [user,setUser]=useState({})
    const [busDetails,setBusDetails]=useState({})
    useEffect(()=>{
        const token=sessionStorage.getItem("token")
        const decoded=jwt_decode(token)
        setUser(decoded)
        async function fetchData(){
            try{
                let bookedResponse=await api.post('/api/getBookedUser',{
                    userId:decoded._id,
                    busId:sessionStorage.getItem("bus-id"),
                })
                let busDetails=await api.post('/api/getBusById',{
                    busId:sessionStorage.getItem("bus-id"),
                })
                 setTicketDetails(bookedResponse.data.users)
                 setBusDetails(busDetails.data.bus)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
       
       
    },[])
    const renderSeats=(ticketDetails)=>{
        if(ticketDetails.selectedSeats)
            return(ticketDetails.selectedSeats.length)
    }
    return (
        <div className="tic-summary">
            <div className="summary-top">
                <p><b>Dear {user.name},</b></p>
                <p><b>Your ticket has been successfully booked and sent to  {user.email} and {user.phNumber}</b></p>
            </div>
            <div className="summary-content">
                
                <div className="row">
                    <div className="col-4"><h5>From:{busDetails.from}</h5></div>
                    <div className="col-4"><h5>To:{busDetails.to}</h5></div>
                    <div className="col-4"><h5>BusType:{busDetails.busType}</h5></div>
                </div>
                <div className="row">
                    <div className="col-4"><h5>Travel Date:{busDetails.travelDate}</h5></div>
                    <div className="col-4"><h5>Depature:{busDetails.depature}</h5></div>
                    <div className="col-4"><h5>Arrival:{busDetails.arrival}</h5></div>
                </div>
                <div className="row">
                    <div className="col-4"><h5>Passenger Name:{ticketDetails.name}</h5></div>
                    <div className="col-4"><h5>Gender:{ticketDetails.gender}</h5></div>
                    <div className="col-4"><h5>Email:{user.email}</h5></div>
                </div>
                <div className="row">
                    <div className="col-4"><h5>Total Seats:{renderSeats(ticketDetails)}</h5></div>
                    <div className="col-4"><h5>Seats No:{ticketDetails.selectedSeats}</h5></div>
                    <div className="col-4"><h5>Total Fare:{ticketDetails.amountPaid}</h5></div>
                </div>
            </div>
        </div>
    );
};

export default TicketSummary;