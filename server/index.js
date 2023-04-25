const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const usersArr = [];
app.use(bodyParser.json());
let counter = 0
app.post("/register", (req, res) => {
  console.log(req.body)
  const login = req.body.login;
  const password = req.body.password;
  const now = new Date();
  const currentTime = now.getTime();
  let isLoginExist = false;
  const user = { login: login, password: password,count: counter, time: currentTime };
  usersArr.forEach((el)=>{
    if(el.login === login){
        isLoginExist = true;
    }
  })
  if(isLoginExist){
    res.send({status:'error'})
  }
  else{
    usersArr.push(user);
    counter++;
    res.send({status:'success'})
  }
  
  
});

app.get('/allData', function (req, res) {
    res.send({ status: "success",data:usersArr  });
})
app.post('/openDetails', function (req, res) {
  const count = req.body.count;

  usersArr.forEach((user)=>{
    if(user.count === count){
      res.send({user:user, status:'success'})
    }
  })
  res.send({status:'error'})
  
})
app.post('/deleteItem', function (req, res) {
  const count = req.body.count;
  const index = usersArr.findIndex((item) => item.count === count);
  usersArr.splice(index,1)
  res.send({status:'success',data:usersArr})
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
