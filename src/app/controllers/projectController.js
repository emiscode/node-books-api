import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import { Project } from '../models/Project.js'
import { Task } from '../models/Task.js'

const projectRouter = express.Router()

projectRouter.use(authMiddleware)

projectRouter.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate(['user', 'tasks'])

    return res.send({ projects })
  } catch (err) {
    return res.status(400).send({ error: 'Listing projects failed' })
  }
})

projectRouter.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate([
      'user',
      'tasks',
    ])

    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ error: 'Loading the project failed' })
  }
})

projectRouter.post('/', async (req, res) => {
  try {
    const user = req.userId
    const { title, description, tasks } = req.body

    const project = await Project.create({
      title,
      description,
      user,
    })

    await Promise.all(
      tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id })

        await projectTask.save()
        project.tasks.push(projectTask)
      })
    )

    await project.save()

    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ error: 'Project creation failed' })
  }
})

projectRouter.put('/:projectId', async (req, res) => {
  try {
    const user = req.userId
    const { title, description, tasks } = req.body

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
        description,
      },
      { new: true }
    )

    project.tasks = []
    await Task.remove({ project: project._id })

    await Promise.all(
      tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id })

        await projectTask.save()
        project.tasks.push(projectTask)
      })
    )

    await project.save()

    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ error: 'Project creation failed' })
  }
})

projectRouter.delete('/:projectId', async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.projectId)

    return res.send()
  } catch (err) {
    return res.status(400).send({ error: 'Deleting project failed' })
  }
})

export { projectRouter }
