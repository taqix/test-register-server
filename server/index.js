const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const usersArr = [];
app.use(bodyParser.json());
let counter = 0
app.post("/register", (req, res) => {
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
  
  // Do something with the data, e.g. save to a database
//   console.log(`Login: ${login}, Password: ${password}`);

  // Send a response back to the client
  
});

app.get('/allData', function (req, res) {
    res.send({ status: "success",data:usersArr  });
})
app.post('/openDetails', function (req, res) {
  console.log(req.body.count);
  const count = req.body.count;

  usersArr.forEach((user)=>{
    if(user.count === count){
      res.send({user:user, status:'success'})
    }
  })
  res.send({status:'error'})
  
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
