import React,{useState} from 'react';
import './SignUp.css';
import signUp from '../../api/api';

const SignUp = () => {
    const[details,setDetails]=useState({
        name:'',
        email:'',
        phNumber:'',
        password:'',
        dateOfBirth:'',
        gender:'',
    })
    const [name,setName]=useState('')
    const [data,setData] =useState('')
    const [phNumber,setPhNumber] =useState('')
    const [pswd,setPswd] =useState('')
    const [dob,setDob]=useState('')
    const [response,setResponse] =useState('')
    //-------------------Name Validation--------------------//
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
            // console.log(details.name)
            return(setName(""))
        }
        
    }
    //----------------E-maill validation-----------------------//
    const handleEmail=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return (setData('Email is required'))
        }
        if(value){
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') === -1)) {
               return setData("Email is not valid");
             }
             else{
                setDetails(prevState=>({
                    ...prevState,
                    email:value
                }))
                return(setData(""))
                
            }
        }
    }
    //-----------------ph number validation----------------------------//
    const handlePh=(e)=>{
        const value=e.target.value
        if(!value){
            return(setPhNumber("Phone Number Required"))
        }
        if(value){
            let regExp=/^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/
            if(!(regExp.test(value))){
                    return(setPhNumber("Not valid"))
            }
            else{
                const value=e.target.value
                setDetails(prevState=>({
                    ...prevState,
                    phNumber:value
                }))
                console.log(details.phNumber)
                return(setPhNumber(""))
                
            }
        }
    }
    //-----------------------password validation---------------------------//
    const handlePswd=(e)=>{
        e.preventDefault()
        const value=e.target.value
        if(!value){
            return (setPswd('Password is required'))
        }
        if(value){
            let minNumberofChars = 6;
            let maxNumberofChars = 16;
            let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                if(value.length < minNumberofChars || value.length > maxNumberofChars){
                    return (setPswd("Password should be of 6 to 16 characters"))
                }
                else if(!regularExpression.test(value)) {
                return(setPswd(`Atleast one number and one special character`));
                }
                else{
                    setDetails(prevState=>({
                        ...prevState,
                        password:value
                    }))
                    return(setPswd(""))
                    
                }
        }
    }
    //------------------------date validation-----------------------//
    const handleDate=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setDob("DOB Required"))
        }
        else{
            if(value){
                let regex=/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
                if(!(regex.test(value))){
                    return(setDob("Not a valid date"))
                }
            }
            setDetails(prevState=>({
                ...prevState,
                dateOfBirth:value
            }))
            
                return(setDob(""))
        }
 
    }
    //------------------------gender selecting---------------------//
   const handleGender=(e)=>{
            const {value}=e.target
            setDetails(prevState=>({
                ...prevState,
                gender:value
            }))
    }
    //---------------------------handle Submit---------------------//
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            let response=await signUp.post("/api/register",{
                name:details.name,
                email:details.email,
                phNumber:details.phNumber,
                password:details.password,
                dateOfBirth:details.dateOfBirth,
                gender: details.gender,
            })
            if(response.status===200){
                setResponse(response.data.message)
                
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
    

    return (
        <div className="signup">
            <form onSubmit={e=>handleSubmit(e)}>
                <div className="top">
                    <h4>Create Account</h4>
                    <input type="text" placeholder="Name" onBlur={e=>handleName(e)} />
                    <div style={{color: "red"}}>{name}</div> 
                    <input type="email" placeholder="Email"   onBlur={e=>handleEmail(e)} />
                    <div style={{color: "red"}}>{data}</div>
                    <input type="tel" placeholder="Mobile No"  onBlur={e=>handlePh(e)} />
                    <div style={{color: "red"}}>{phNumber}</div>
                    <input type="password" placeholder="Password" onBlur={e=>handlePswd(e)} />
                    <div style={{color: "red"}}>{pswd}</div>
                </div>
                 <div className="dob">
                    <label htmlFor="do
                    
                    
                    b">DOB</label><br></br>
                    <input type="text" 
                     placeholder="YYYY-MM-DD" name="dob"  onBlur={e=>handleDate(e)}/>
                    <div style={{color: "red"}}>{dob}</div>
                 </div>
                 <div className="check">
                    <input type="radio"  name="gender" value={"male"} onClick={e=>handleGender(e)}/>
                    <label htmlFor="male">Male</label>&nbsp;&nbsp;&nbsp;
                    <input type="radio"  name="gender" value={"female"} onClick={e=>handleGender(e)}/>
                    <label htmlFor="female">Female</label> 
                 </div>
                
                 <button type="submit"  
                    disabled={!details.name||!details.email||!details.phNumber||!details.gender||!details.password||!details.dateOfBirth}
                    className="btn btn-success">Create Account</button>
             <div style={{color:"black"}}><h4>{response}</h4></div>
            </form>
        </div>
    );
};

export default SignUp;