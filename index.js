const express = require('express');

const server = express();

server.use(express.json());

function checkUserIdExists(req, res, next) {
    const { id } = req.params;
    const userExist = projects.find(p => p.id == id);

    if(!userExist) {
        return res.status(400).json({error: 'User not found!'})
    }

    return next();
}


server.use((req, res, next) => {
    console.count(`Requisições do tipo ${req.method}`);
    return next();
})



const projects = [];
server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;

    const project = {
        id, 
        title,
        tasks  
    }

    projects.push(project); 

    return res.json(project);
})


server.get('/projects', (req, res) => {
    return res.json(projects);
 })



server.put('/projects/:id', checkUserIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);
    project.title = title;

    return res.json(project);
})


server.delete('/projects/:id', checkUserIdExists, (req, res) => {
    const { id } = req.params; 
    const project = projects.findIndex((p) => {
        return p.id == id;
    })
    
    projects.splice(project, 1);

    return res.send(); 
})
 

server.post('/projects/:id/tasks', checkUserIdExists,  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find((p) => {
       return p.id == id;  
    });

    project.tasks.push(title);

    return res.json(project);
})

server.listen(3333);

     