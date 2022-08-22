const BookedSeats=require('../../models/bookedUsers')

module.exports=function(router){

    router.post("/getBookedUser",(req,res)=>{
        console.log(req.body)
        BookedSeats.findOne({userId:req.body.userId,busId:req.body.busId},(err,users)=>{
            if(err){
                res.json({status:false,message:err})
            }else{
                if(!users){
                    res.json({status:false,message:"No Data"})
                }
                else{
                    console.log(users)
                    res.json({status:true,users:users})
                }
            }
        })
    })

    router.post('/saveUser',(req,res)=>{
        let note1=new BookedSeats(req.body)
        note1.save((err)=>{
            if(err){
                return(res.status(400).json(err))
            }
            res.status(200).json(note1)
            console.log(note1)
        })
    })
}