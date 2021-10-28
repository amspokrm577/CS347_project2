// Your web service must be started using a process manager like pm2 so that it stays running.
// Have your service respond to https://project2.YOUR-DOMAIN-NAME/report.html by sending back 
// an HTML page with brief report containing an itemized breakdown of how you believe you have met the expectations listed above.
// The service must only be directly accessible from your droplet, and not from outside. 
// Use ufw to block all ports but the ones you need for SSH and your allowed web servers.
// pm2?????
// 
const express = require("express");
const service = express();
 service.use(express.json());
 const port = 3000;
 
 const fs = require("fs");
 const mysql = require("mysql");
 
 const json = fs.readFileSync("creds.json", "utf8");
 const creds = JSON.parse(json);

const connection = mysql.createConnection(creds);
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

connection.end();


let custID = 0;
let petID = 0;

const Customers = {
  [custNextID]: {
    id: custID++,
    uName: custID - 2,
    sName: custID - 1,
  },
};

const Pets = {
  [petsNextID]: {
    id: petID++,
    followee: petID - 2,
    follower: petID - 1,
  },
};


service.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});

// POST /humans that accepts a JSON body containing a new human’s username and
// screen name. It returns a JSON structure reporting the ID assigned to the new
// human.
service.post("/pet", (req, resp) => {
    // implement the Pets data structure above ^^^
    // return with a status of 204 if the query is 
    // successfull
    const { username, screenname } = req.body;
   humans[humanNextId] = {
     id: humanNextId,
     username: username,
     screenname: screenname,
   };
   resp.json({
     ok: true,
     result: humans[humanNextId++],
   });
});

// GET /humans/:id that returns as JSON an object with the human’s screen name
// and username.
service.get("", (req, resp) => {
  // resp.json(humans[req.params.id]);
});

// POST /follow/:followeeId/:followerId that adds a new following relationship to
// the database. It returns nothing but gives back status code 204, which means
// the operation silently succeeded.
service.post("/customer", (req, resp) => {
  // implement the Pets data structure above ^^^
  // return with a status of 204 if the query is 
  // successfull
 const { username, screenname } = req.body;
 Customers[custNextID] = {
   id: humanNextId,
   uName: username,
   sName: screenname,
 };
 resp.json({
   ok: true,
   result: humans[humanNextId++],
 });
});

// GET /follow/:followee that returns as JSON an array of all of the
// followers of the human with username :followee .
service.get("", (req, resp, next) => {
  
  resp.status(204).json({
    ok: true,
  });
});

// DELETE /follow/:followeeId/:followerId that removes a following relationship from
// the database. It returns nothing but gives back status code 204, which means
// the operation silently succeeded.
service.delete("", (req, resp, next) => {
  
  resp.status(204).json({
    ok: true,
  });
});


// DELETE /humans/:id that hard-deletes the human from the database, including
// any following relationships the human is involved in.
service.delete("", (req, resp) => {
  
  resp.status(204).json({
    ok: true,
  });
});

// for each database entry, this represents a 
// a safe transition
