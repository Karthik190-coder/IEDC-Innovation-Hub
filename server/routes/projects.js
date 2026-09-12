import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

function readProjects() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function writeProjects(projects) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
}

function generateId(projects) {
  return projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
}

const VALID_STATUSES = ['Ideation', 'Prototype', 'Seed Funded'];

function validateDomain(domain) {
  if (!domain || typeof domain !== 'string') {
    return 'Domain is required';
  }
  const trimmed = domain.trim();
  if (!trimmed) {
    return 'Domain cannot be empty';
  }
  if (trimmed.length < 2) {
    return 'Domain must be at least 2 characters';
  }
  if (trimmed.length > 30) {
    return 'Domain must be at most 30 characters';
  }
  if (!/^[a-zA-Z0-9\s\-&]+$/.test(trimmed)) {
    return 'Domain can only contain letters, numbers, spaces, hyphens, and &';
  }
  return null;
}

function validateUrl(url) {
  if (!url || !url.trim()) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return 'Pitch deck link must be a valid URL';
  }
}

router.get('/', (req, res) => {
  let projects = readProjects();

  const { status, domain } = req.query;

  if (status) {
    projects = projects.filter(p =>
      p.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (domain) {
    projects = projects.filter(p =>
      p.domain.toLowerCase() === domain.toLowerCase()
    );
  }

  res.json(projects);
});

router.get('/:id', (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === parseInt(req.params.id));

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

router.post('/', (req, res) => {
  const { title, domain, teamLead, abstract, pitchDeckLink } = req.body;

  if (!title || !domain || !teamLead || !abstract) {
    return res.status(400).json({ error: 'Missing required fields: title, domain, teamLead, abstract' });
  }

  const domainError = validateDomain(domain);
  if (domainError) {
    return res.status(400).json({ error: domainError });
  }

  const urlError = validateUrl(pitchDeckLink);
  if (urlError) {
    return res.status(400).json({ error: urlError });
  }

  const projects = readProjects();
  const newProject = {
    id: generateId(projects),
    title,
    domain: domain.trim(),
    description: abstract,
    teamSize: 1,
    teamLead,
    status: 'Ideation',
    votes: 0,
    pitchDeckLink: pitchDeckLink?.trim() || ''
  };

  projects.push(newProject);
  writeProjects(projects);

  res.status(201).json(newProject);
});

router.put('/:id', (req, res) => {
  const { status, votes } = req.body;

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Allowed: Ideation, Prototype, Seed Funded' });
  }

  const projects = readProjects();
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  if (status) {
    projects[index].status = status;
  }
  if (typeof votes === 'number') {
    projects[index].votes = votes;
  }

  writeProjects(projects);

  res.json(projects[index]);
});

router.delete('/:id', (req, res) => {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const deleted = projects.splice(index, 1);
  writeProjects(projects);

  res.json({ message: 'Project deleted successfully', project: deleted[0] });
});

export default router;