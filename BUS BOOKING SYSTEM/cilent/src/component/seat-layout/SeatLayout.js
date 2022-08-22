import React,{useState} from 'react';
import './SeatLayout.css';
import api from "../../api/api";

const SeatLayout = ({value:busObj,onChild4}) => {
    
    const [name,setName]=useState('')
    const [totalSeats,setTotalSeats]=useState([...new Array(busObj.seatsAvailable)].map((item,index)=>{
        return{
            seatNo:index+1,
            selected:false
        }
    }))
    const  [selectedSeat,setSelectedSeat]=useState([])
    const [bookedSeats]=useState(busObj.bookedSeats)
    const[details,setDetails]=useState({
        name:'',
        gender:'',
    })
    // useEffect(()=>{
    //     setBookedSeats([...bookedSeats.concat(selectedSeat)])
    // })
    const isBookedSeat=(seatNo)=>{
            return(bookedSeats.includes(seatNo))  
    }
    const seatHandler=(e,seatNo)=>{
        let copyState=[...totalSeats]
        e.preventDefault()
        const isBooked=isBookedSeat(seatNo)
        if(!isBooked){
            copyState[seatNo-1].selected=!copyState[seatNo-1].selected
            if(!selectedSeat.includes(seatNo)){
                setSelectedSeat([...selectedSeat,seatNo])
            }
            else{
                const index=selectedSeat.indexOf(seatNo)
                selectedSeat.splice(index,1)
                console.log(selectedSeat)
            }
           return( setTotalSeats(copyState))
        }
   }
    const handleGender=(e)=>{
        const {value}=e.target
        setDetails(prevState=>({
            ...prevState,
            gender:value
        }))
    }
    const handleName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setName("Name is Required"))
        }else{
            setDetails(prevState=>({
                ...prevState,
                name:value
            }))
            return(setName(""))
        }
        
    }
    const handlePayments=(e)=>{
        // setBookedSeats([...bookedSeats.concat(selectedSeat)])
        // sessionStorage.setItem("total-fare",((busObj.fare+busObj.serviceTax)*selectedSeat.length)
        console.log(details)
        if(onChild4){
            let e={n:3,totalFare:(busObj.fare+busObj.serviceTax)*selectedSeat.length}
            onChild4(e)
        }
        try{
            api.post('/api/saveUser',{
                busId:sessionStorage.getItem("bus-id"),
                userId:sessionStorage.getItem("user-id"),
                name:details.name,
                gender:details.gender,
                selectedSeats:selectedSeat,
                amountPaid:(busObj.fare+busObj.serviceTax)*selectedSeat.length,
            })
            api.put('/api/updateBusBookedSeats',{
                _id:sessionStorage.getItem("bus-id"),
                bookedSeats:selectedSeat,
            })
            
        }
        catch(err){
            console.log(err)
        }
        
    }
    // const renderTotalFare=(selectedSeat)=>{
    //     const n=(busObj.fare+busObj.serviceTax)*selectedSeat.length
    //     setTotalFare(n)
    //     return(n)
    // }
    const renderSeatSummary=(selectedSeat)=>{
        if(selectedSeat.length>0){
            return(<div className="fare-details">
                    <table>
                <tbody>
                <tr>
                    <td className="bLeft">
                        <input className='form-control'type="text" 
                            onBlur={e=>handleName(e)} placeholder="Primary Passenger Name"/>
                        <div style={{color: "red"}}>{name}</div> 
                    </td>
                    <td className="bRight">
                        <input type="radio"  name="gender" 
                               value={"male"} onClick={e=>handleGender(e)} />
                        <label htmlFor="male">Male</label>&nbsp;&nbsp;&nbsp;
                        <input type="radio"  name="gender" 
                            value={"female"} onClick={e=>handleGender(e)} />
                        <label htmlFor="female">Female</label> 
                    </td>
                </tr>
                <tr>
                    <td className="bLeft">
                        SeatNum
                    </td>
                    <td className="bRight">
                        {selectedSeat+""}
                    </td>
                </tr>
                <tr>
                    <td className="bLeft">Total Seat</td>
                    <td className="bRight">{selectedSeat.length}</td>
                </tr>
                <tr>
                    <td className="bLeft">Fare</td>
                    <td className="bRight">{busObj.fare}</td>
                </tr>
                <tr>
                    <td className="bLeft">Service Tax</td>
                    <td className="bRight">{busObj.serviceTax}</td>
                </tr>
                <tr>
                    <td className="bLeft">Total</td>
                    <td className="bRight">{(busObj.fare+busObj.serviceTax)*selectedSeat.length}</td>
                    {/* <td className="bRight">{renderTotalFare(selectedSeat)}</td> */}
                </tr>
                <tr>
                    <td className="bLeft">
                        <button className="btn btn-success" disabled={!details.name||!details.gender}
                                onClick={e=>handlePayments(e)}>Proceed to Payment</button>
                    </td>
                </tr>
                </tbody>
            </table>
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
                            {<img className="img-fluid" alt="seat" src={require("./seat-icon.png")} />}
                        </li>)

                    })
                }
            </ul>
            {renderSeatSummary(selectedSeat)}
        </>
    );
};

export default SeatLayout;