const Users=require('../../models/Users')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


process.env.SECRET_KEY='secret'
module.exports=function(router){
        router.post('/register',function(req,res){
            let dateObj=new Date(req.body.dateOfBirth);
            let month = dateObj.getUTCMonth() + 1;
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            var dateOfBirt = day+ "-" + month + "-" + year;
            console.log(dateOfBirt)
            const userData={
                name:req.body.name,
                email:req.body.email,
                phNumber:req.body.phNumber,
                password:req.body.password,
                dateOfBirth:dateOfBirt,
                gender:req.body.gender,
            }
            Users.findOne({email:req.body.email},(err,user)=>{
                if(err){res.json({status:false,message:err})}
                else{
                    if(!user){
                        bcrypt.hash(req.body.password,10,(err,hash)=>{
                            userData.password=hash
                            Users.create(userData,(err)=>{
                                if(err){res.json({status:false,message:err})}
                                else{res.json({status:true,message:`registered sucessfully`})}
                            })
                        })
                    }
                    else{
                        res.json({status:false,message:"User already exists"})
                    }

                }
            })
        })
        router.post('/login',(req,res) =>{
            Users.findOne({email:req.body.email},async (err,user)=>{
                if(err){
                    res.json({status:false,message:err})
                }else{
                    if(user){
                        try{
                            const match=await bcrypt.compare(req.body.password,user.password)
                            if(match){
                                const userLoad={
                                    _id:user.id,
                                    name:user.name,
                                    email:user.email,
                                    phNumber:user.phNumber,
                                    dateOfBirth:user.dateOfBirth,
                                    gender:user.gender,
                                }
                                let token=jwt.sign(userLoad,process.env.SECRET_KEY,{expiresIn:1440})
                                res.send(token)
                            }
                            else{
                                res.json({status:false,message:"User not found"})
                            }
                        }
                        catch(err){
                            console.log(err)
                        }
                    }    
                    else{
                            res.json({status:false,message:"User not found"})
                        }
                    }
                })
            })
        router.get("/profile",(req,res)=>{
            const profile=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
            Users.findOne({_id:profile._id},(err,user)=>{
                if(err){
                    res.json({status:false,message:err})
                }
                else{
                    if(user){
                        res.json(user)
                    }else{
                        res.send("User does not exist")
                    }
                }
            })
        })
}