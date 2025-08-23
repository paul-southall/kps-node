import e, { Request, Response, NextFunction } from 'express';
import { Task, CreateTaskRequest, TaskQueryParams, TaskStatus, TaskPriority } from '../types/task';
import { TASK_TITLE_EXISTS, TaskService } from '../services/taskService';
import { createTaskSchema, taskQuerySchema } from '../validation/taskValidation';
import { createError } from '../middleware/errorHandler';
// Import your validation schemas when ready
// import { createTaskSchema } from '../validation/taskValidation';

/**
 * Task Controller
 * 
 * TODO: Implement the controller methods for basic task operations
 * Remember to:
 * - Use proper TypeScript types
 * - Validate input data  
 * - Handle errors appropriately
 * - Return proper HTTP status codes
 * - Use the task service for business logic
 */

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implement get all tasks
    // - Extract query parameters for filtering (status, priority)
    // - Call task service method
    // - Sort by priority then by createdAt
    // - Return filtered and sorted tasks

    const queryParams: TaskQueryParams = {
      status: req.query.status as TaskStatus,
      priority: req.query.priority as TaskPriority,
    };

    //validate query parameters if needed
    const { error } = taskQuerySchema.validate(queryParams);
    if (error) {
      return next(createError(error.message, 400));
    }
        

    TaskService.getAllTasks(req.query as TaskQueryParams)
      .then((tasks: Task[]) => {
        res.status(200).json(tasks);
      })
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskData: CreateTaskRequest = req.body;
    const { error } = createTaskSchema.validate(taskData);
    if (error) {
      return next(createError(error.message, 400));
    }
    
    TaskService.createTask(req.body as CreateTaskRequest)
      .then((task: Task) => {
        res.status(201).json(task);
      }).catch((error: any) => {
        if (error.message === TASK_TITLE_EXISTS) {
          return next(createError('Task title already exists', 409));
        }
        next(createError('Failed to create task', 500));
      });
  } catch (error: any) {
    next(error);
  }
};

export const clearAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await TaskService.clearAllTasks();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};