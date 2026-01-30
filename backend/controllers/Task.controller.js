import React from 'react'
import Task from '../models/Task.model'

// Crea tarea (POST)
export const createTask = async (req,res) => {
  try {
    const task = new Task(req.body) // Crea una nueva tarea con los datos recibidos
    const savedTask = await Task.save() // Guarda en MongoDB
    res.status(201).json({
        success: true,
        data: savedTask
    })
  } catch (error) {
    res.status(400).json({
        success:false,
        message: error.message
    })
  }
}

// Optener tarea (GET)
export const getAllTasks = async (req,res) =>{ 
    try {
      const tasks = await Task.find().sort({createdAt: -1}) // Ordena en orden descendente
      res.status(200).json({
        success:true,
        count: tasks.length,
        data:tasks 
      })
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}

//createdAt es un campo comúnmente usado en bases de datos para almacenar la fecha y hora de creación de un documento/registro,.g