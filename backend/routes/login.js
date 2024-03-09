const router = require('express').Router();
let UserData = require('../models/user.model');

router.route('/').post((req,res) => {
    const {email,password} =req.body;
        UserData.findOne({email:email},(err,user)=>{
            if(err) throw err;
            if(user){
               if(password === user.password){
                   res.send({message:user})
               }
               else{
                   res.send({message:"0"})
               }
            }else{
                res.send({message:"0"})
            }
        })
});

module.exports = router;