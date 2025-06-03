import express from "express";
import { exec } from "child_process";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/health", (_, res) => {
  res.send("OK");
});

// GET all containers
app.get("/containers", (_, res) => {
  exec("docker ps -a --format '{{json .}}'", (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    const containers = stdout
      .trim()
      .split("\n")
      .map(line => JSON.parse(line));
    res.json(containers);
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

// Start container
app.post("/containers/:id/start", (req, res) => {
    const id = req.params.id;
    exec(`docker start ${id}`, (err, stdout, stderr) => {
      if (err) {
        const msg = stderr.trim();
        if (msg.includes("No such container")) return res.status(404).send("Container not found");
        return res.status(500).send(msg);
      }
      res.status(200).send(`Started container ${id}`);
    });
  });
  
  // Stop container
  app.post("/containers/:id/stop", (req, res) => {
    const id = req.params.id;
    exec(`docker stop ${id}`, (err, stdout, stderr) => {
      if (err) {
        const msg = stderr.trim();
        if (msg.includes("No such container")) return res.status(404).send("Container not found");
        if (msg.includes("is not running")) return res.status(409).send("Container already stopped");
        return res.status(500).send(msg);
      }
      res.status(200).send(`Stopped container ${id}`);
    });
  });
  
  // Restart container
  app.post("/containers/:id/restart", (req, res) => {
    const id = req.params.id;
    exec(`docker restart ${id}`, (err, stdout, stderr) => {
      if (err) {
        const msg = stderr.trim();
        if (msg.includes("No such container")) return res.status(404).send("Container not found");
        return res.status(500).send(msg);
      }
      res.status(200).send(`Restarted container ${id}`);
    });
  });
  
  // Kill container
  app.post("/containers/:id/kill", (req, res) => {
    const id = req.params.id;
    exec(`docker kill ${id}`, (err, stdout, stderr) => {
      if (err) {
        const msg = stderr.trim();
        if (msg.includes("No such container")) return res.status(404).send("Container not found");
        return res.status(500).send(msg);
      }
      res.status(200).send(`Killed container ${id}`);
    });
  });
  