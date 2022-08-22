import React,{useState} from 'react';
import signIn from '../../api/api'
import './SignIn.css';
import SignUp from '../SignUp/SignUp';
import jwt_decode from 'jwt-decode';

const SignIn = ({history}) => {
    const [details,setDetails]=useState({
        email:'',
        passowrd:'',
    })
    const [data,setData]=useState('')
    const [pswd,setPswd]=useState('')
    const [error,setError]=useState('')
    //-------------------E-mail validation------------------------//
    const handleEmail=(e)=>{
        e.preventDefault(e)
        const value=e.target.value
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
                setError('')
                return(setData(""))
            }
        }
        
    }
    //-----------------------------password validatin---------------------------//
    const handlePswd=(e)=>{
        e.preventDefault();
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
                    setError('')
                    return(setPswd(""))
                }
        }
    }
    //--------------------handle Submit-------------------//
    const handleSubmit=async (e)=>{
       e.preventDefault()
            try{
                let response=await signIn.post('/api/login',{
                    email:details.email,
                    password:details.password
                })
                if(response.data.status===false){
                    setError("Incorrect Email or Password")
                }else{
                    console.log(response)
                    sessionStorage.setItem("token",response.data)
                    const decoded=jwt_decode(response.data)
                    sessionStorage.setItem("user-id",decoded._id)
                    history.push('/landing')
                    setError('')
                    
                }
            }
            catch(err){
                console.log(err)
            }
    }
        
    return (
        <div className="format">
        <div className="signin">
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <input type="email" placeholder="E-mail" id="email" name="email" onBlur={e=>handleEmail(e)} /><br/>
                     <div style={{color: "red"}}>{data}</div>
                </div>
                <div>
                    <input type="password" id="password" placeholder="Password" name="password" onMouseOut={e=>handlePswd(e)} />
                    <div style={{color: "red"}}>{pswd}</div>
                </div>
                <button type="submit" disabled={!details.email||!details.password ||data ||pswd ||error} className="btn btn-success">Submit</button> 
                <span>{error}</span>  
            </form>
            
        </div>
            <SignUp/>
        </div>
            
           
        
    );
};

export default SignIn;