const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3002, () => {
      console.log("Server Running at http://localhost:3002/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// API 1

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  };
};

app.get("/players/", async (request, response) => {
  const getPlayerQuery = `
   SELECT * FROM cricket_team;
   `;
  const playerArray = await database.all(getPlayerQuery);
  response.send(
    playerArray.map((eachPlayer) => convertDbObjectToResponseObject(eachPlayer))
  );
});

app.get("/players/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
   SELECT * FROM cricket_team WHERE player_id = ${playerId};
   `;
  const player = await database.get(getPlayerQuery);
  response.send(convertDbObjectToResponseObject(eachPlayer));
});

app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const getPlayerQuery = `
   INSERT INTO cricket_team (player_name, jersey_number, role)
   VALUES ('${playerName}','${jerseyNumber}','${role}');
   `;
  const player = await database.run(getPlayerQuery);
  response.send("Player Added to Team");
});

app.put("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const { playerId } = request.params;
  const updatedPlayerQuery = `
   UPDATE
    cricket_team
   SET
    player_name = '${playerName}',
    jerseyNumber = '${jerseyNumber}',
    role = '${role}'
   WHERE
     player_id = ${playerId}
   `;
  const player = await database.run(getPlayerQuery);
  response.send("Player Detauils updated");
});

app.delete("/players/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
   DELETE FROM cricket_team WHERE player_id = ${playerId};
   `;
  const player = await database.run(getPlayerQuery);
  response.send("Player Removed");
});

module.exports = app;


