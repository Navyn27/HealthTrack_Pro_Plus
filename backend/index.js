//My unmatched Percycassity coupled with Indie Fatigability makes me a feared opponent in any realm of human endeavour

var sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const json = require("json");

let dbConnStatus = false;

var db = new sqlite3.Database("healthtrack.db", (err) => {
  if (err) {
    console.log(err);
    console.log("Brief:" + err.message);
  } else {
    console.log("200: Connection successful");
    dbConnStatus = true;
    app.listen(9080, () => {
      console.log("Server up and running, listening for requests");
    });
  }
});

const insertPatient = (
  patientID,
  patientName,
  patientNID,
  patientHeartRate,
  patientBodyTemp
) => {
  let query = `INSERT INTO Patients(Patient_id,Patient_Name, Patient_NID, Heart_Rate, Body_Temp) VALUES(${patientID}, '${patientName}', '${patientNID}', ${patientHeartRate}, ${patientBodyTemp})`;
  try {
    db.run(query, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deletePatientById = (patientID) => {
  let query = `DELETE FROM Patients WHERE Patient_ID = ${patientID}`;
  db.run(query);
};

const addDisease = (patientId, Disease) => {
  let query = `UPDATE Patients WHERE SET FrequentDisease=${Disease} WHERE Patient_ID = ${patientID}`;
  db.run(query);
};

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS Patients ( Patient_id INTEGER PRIMARY KEY, Patient_Name TEXT NOT NULL, Patient_NID TEXT NOT NULL, Heart_Rate REAL NOT NULL, Body_Temp REAL NOT NULL, FrequentDisease TEXT);",
    (err) => {
      if (err) {
        console.log(err);
        dbConnStatus = false;
      }
    }
  );
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  cors({ origin: req.headers.origin });
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  console.log(req.path, req.method);
  next();
});

app.get("/", async (req, res) => {
  if (!dbConnStatus) {
    res.status(500).json("Internal Server Error");
    return;
  }
  console.log(`${req.method} :: ${req.rawHeaders[7]}`);
  db.all("SELECT * FROM Patients", [], (err, results) => {
    if (!err) {
      // console.log(results);
      res.status(200).json({ data: results });
      // console.log(results);
    } else {
      res.status.json(`Error: ${err}`);
    }
  });
});

app.post("/newPatient", (req, res) => {
  if (!dbConnStatus) {
    res.send("Internal Server Error");
    return;
  }
  const patientData = req.body;
  patientData.forEach((patient) => {
    insertPatient(
      patient.Patient_id,
      patient.Patient_Name,
      patient.Patient_NID,
      patient.Heart_Rate,
      patient.Body_Temp
    );
  });
  res.send("Success");
});
