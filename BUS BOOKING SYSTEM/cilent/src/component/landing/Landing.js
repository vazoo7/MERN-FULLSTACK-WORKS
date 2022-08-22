import React,{useState} from 'react';
import './landing.css';
import Planning from '../planning/Planning';
import Profile from '../profile/Profile';
import Payment from '../payment/Payment';
import Seat from '../seat/Seat';
import TicketSummary from '../ticketSummary/TicketSummary';


const Landing = ({history}) => {
    const [tab, setTab] = useState(1)
    const [busDetails, seatDetails] = useState({})
    const [totalFare,setTotalFare]=useState(0)
    const renderBus=(tab)=>{
        switch(tab){
            case 1:return(<div><Planning onChild1={e=>handleTab(e)}/></div>);
            case 2:return(<div><Seat value={busDetails} onChild3={e=>handleTab2(e)} /></div>)
            case 3:return(<div><Payment value={totalFare} onChild6={e=>handleTab3(e)}/></div>)
            case 4:return(<div><TicketSummary/></div>)
            default:return null;
        }
    }
    const handleTab = (e)=>{
        let {busData,n}=e
        seatDetails(busData)
        return(setTab(n))
    }
    const handleTab2 = (e)=>{
        let {n,totalFare}=e
        setTotalFare(totalFare)
        return(setTab(n))
    }
    const handleTab3 = (e)=>{
        let{n}=e
        return(setTab(n))
    }
    const changeTab = (e, tabIdx) => {
        e.preventDefault(e)
        setTab(tabIdx)
        console.log(tab)
    }
    const handleLogout = (e)=>{
        sessionStorage.removeItem("token")
        history.push("/")
    }
    return (
        <div>
            <div className="nav-land">
                <Profile />
                <button className="btn btn-primary" onClick={e=>handleLogout(e)}>Logout</button>
            </div>
            <div className="landing">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${tab === 1 ? 'active' : 'isDisabled'}`}  href="/landing">1.Plan Your Travel</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tab === 2 ? 'active' : 'isDisabled'}`} href='/landing'>2.Select Your Seats</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tab === 3 ? 'active' : 'isDisabled'}`} onClick={e => changeTab(e, 3)} href="/landing">3.Payments</a>
                </li>
                <li className="nav-item">
                    <a  className={`nav-link ${tab === 4 ? 'active' : 'isDisabled'}`} onClick={e => changeTab(e, 4)} href="/landing">Ticket Confirmation</a>
                </li>
            </ul>
            {renderBus(tab)}
        </div>
        </div>
        
    );
};

export default Landing;