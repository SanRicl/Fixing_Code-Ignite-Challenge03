const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find((repo) => repo.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repo = repositories.find((repository) => repository.id === id);

  if (!repo) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  repositories.splice(repositoryIndex, 1);

  repositories.filter((repository) => repository.id !== id);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((repo) => repo.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  return response.json((repository.likes += 1));
});

module.exports = app;
