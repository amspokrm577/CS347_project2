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

/**
 * 
const selectQuery = 'SELECT * FROM memory';
connection.query(selectQuery, (error, rows) => {
  if (error) {
    console.error(error);
  } else {
    console.log(rows);
  }
});
 */



// change these to be the last pk in the rows

let custID = 0; 

// const memories;
// const query = 'SELECT * FROM Pets ORDER BY PetID DESC LIMIT 1;';
//   connection.query(query, (error, rows) => {
//       if (error) {
//         response.status(500);
//         response.json({
//           ok: false,
//           results: error.message,
//         });
//       } else {
//         memories = rows.map(rowToMemory);
//         response.status(204);
//         response.json({
//           ok: true,
//           results: memories,
//         });
//       }
//     });

// console.log(memories);


service.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});

// POST /humans that accepts a JSON body containing a new human’s username and
// screen name. It returns a JSON structure reporting the ID assigned to the new
// human.
// This will only add pets of the type Dog.
// service.post("/pet/:name/:breed:", (req, resp) => {
//     // implement the Pets data structure above ^^^
//     // return with a status of 204 if the query is 
//     // successfull

//     const parameters = [
//        parseInt(request.params.price),
       
//   ];
//     const query = 'INSERT INTO Pet(PetID, species, pet_name, isCut, pet_color, adoption_fee, isAvailable)' +
//     'VALUES (?, ?, ?, ?, ?, ?)';
//     connection.query(query, parameters, (error, rows) => {
//       if (error) {
//         response.status(500);
//         response.json({
//           ok: false,
//           results: error.message,
//         });
//       } else {
//         const memories = rows.map(rowToMemory);
//         response.status(204).json({
//           ok: true,
//           results: rows.map(rowToMemory),
//         });
//       }
//     });
// });



// POST /customer that adds a new customer to
// the database. It returns nothing but gives back status code 204, which means
// the operation silently succeeded.
// This could be activated if a user tries to buy a pet
// and then is forced to make an account
// (could be a modal popup window)

function petResponse(row) {
  return {
    id: row.PetID,
    species: row.SPECIES,
    price: row.adoption_fee,
    neutered_spayed: row.isCut,
    entry: row.entry,
  };
}

function consResponse(row){
  return {
    id: row.CustID,
    first_name: row.fname,
    last_name: row.lname,
    balance: row.balance,
  };
}

service.post("/customer", (request, response) => {
  // implement the Pets data structure above ^^^
  // return with a status of 204 if the query is 
  // successfull
 const query = 'INSERT INTO Customer(CustID, fname, lname, cus_address, phone_num, email, balance)'+ // This balance will
 'VALUES (' + custID + ', "Randy", "Sanchez", "1732 Stroke Ln.", 17036463216, "randSanch@gmail.com", 0),'; // Inc. by the adoption fee              
 custID++;
 connection.query(query, parameters, (error, rows) => {
  if (error) {
    response.status(500);
    response.json({
      ok: false,
      results: error.message,
    });
  } else {
    const memories = rows.map(consResponse);
    console.log(memories);
    response.status(204).json({
      ok: true,
      results: memories,
    });
  }
});
});

// GET /follow/:followee that returns as JSON an array of all of the
// followers of the human with username :followee .

// This could be done when a customer requests a 
// certain price range. This returns all pet rows
//  that are less than or equal to this range

service.get('/pet/:price', (request, response) => {
  const parameters = [
    parseInt(request.params.price),
  ];
  const query = 'SELECT * FROM Pets WHERE isAvailable = 1 AND ADOPTION_FEE <= ? ORDER BY ADOPTION_FEE ASC';
  connection.query(query, parameters, (error, rows) => {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      const memories = rows.map(petResponse);
      console.log(memories);
      response.status(204).json({
        ok: true,
        results: memories,
      });
    }
  });
});



// For this I could update my existing Pet
// Database table
// this is what the query would look like:
// INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
// VALUES ('Cardinal','Tom B. Erichsen','Skagen 21','Stavanger','4006','Norway');
// Do this with Pets
service.patch("/Pet/:saleVal", (req, res) => {
  const query = 'UPDATE Pets SET adoption_fee = (adoption_fee - saleVal) WHERE species = "Dog"'
  const parameters = [
    parseInt(req.params.saleVal),
  ];
  connection.query(query, parameters, (error, rows) =>
  {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      response.status(204).json({
        ok: true,
        results: JSON.parse(rows),
      });
    }

  });
});



// DELETE /Pet/:id that soft-deletes the Pet from the database

service.delete("/Pet/:id", (req, response) => {
  const query = 'UPDATE Pets SET isAvailable = 0 WHERE PetID = ?'
  const parameters = [
    parseInt(req.params.id),
  ];
  connection.query(query, parameters, (error, rows) =>
  {
    if (error) {
      response.status(500);
      response.json({
        ok: false,
        results: error.message,
      });
    } else {
      response.status(204).json({
        ok: true,
        results: rows,
      });
    }
  });
});

connection.end();

// for each database entry, this represents a 
// a safe transition
