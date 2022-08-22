import React,{useState,useEffect} from 'react';
import './SeatLayout.css';

const SeatLayout = ({value:busObj}) => {
    
    const [totalSeats,setTotalSeats]=useState([...new Array(busObj.seatsAvailable)].map((item,index)=>{
        return{
            seatNo:index+1,
            selected:false
        }
    }))
    const  [selectedSeat,setSelectedSeat]=useState([])
    const [bookedSeats,setBookedSeats]=useState(busObj.bookedSeats)
    const isBookedSeat=(seatNo)=>{
            return(bookedSeats.includes(seatNo))
        
    }
    const seatHandler=(e,seatNo)=>{
        let copyState=[...totalSeats]
        e.preventDefault()
        const isBooked=isBookedSeat(seatNo)
        if(!isBooked){
            copyState[seatNo-1].selected=!copyState[seatNo-1].selected
            setSelectedSeat([...selectedSeat,seatNo])
           return( setTotalSeats(copyState))

    }
 }
    const renderSeatSummary=(selectedSeat)=>{
        if(selectedSeat.length>0){
            return(<div>
                    <h5>{selectedSeat+" "}</h5>
                    <h5>{selectedSeat.length}</h5>
                    <h5>{(busObj.fare+busObj.serviceTax)*selectedSeat.length}</h5>
                    </div>
            )
        }
    }
    return (
        <>
            <ul className="seats">
                {
                    totalSeats.map((item,index)=>{
                        return(<li onClick={e=>seatHandler(e,item.seatNo)} key={item.seatNo}
                                className={isBookedSeat(item.seatNo)?"bookedSeat":item.selected?"selectSeat":""}>
                            {<img className="img-fluid" src={require("./seat-icon.png")} />}
                        </li>)

                    })
                }
            </ul>
            {renderSeatSummary(selectedSeat)}
        </>
    );
};

export default SeatLayout;