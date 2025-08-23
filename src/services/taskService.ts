import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskRequest, TaskQueryParams } from '../types/task';

/**
 * Task Service - Business Logic Layer
 * 
 * This service manages the in-memory task storage and business logic.
 * In a real application, this would interface with a database.
 * 
 * TODO: Implement the service methods
 */

// In-memory storage (for this interview - normally you'd use a database)
const tasks: Task[] = [];
export const TASK_TITLE_EXISTS = 'TASK_TITLE_EXISTS';

export class TaskService {
  
  static async getAllTasks(queryParams?: TaskQueryParams): Promise<Task[]> {
    // TODO: Implement getting all tasks with filtering
    // - Filter by status if provided
    // - Filter by priority if provided  
    // - Sort by priority (high -> medium -> low) then by createdAt
    // - Return filtered and sorted tasks
    
    let filteredTasks = tasks;
    if (queryParams) {
      if (queryParams.status) {
        filteredTasks = filteredTasks.filter(task => task.status === queryParams.status);
      }
      if (queryParams.priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === queryParams.priority);
      }
    }

    return filteredTasks.sort((a, b) => {
      const priorityOrder = ['high', 'medium', 'low'];
      const priorityDiff = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      if (priorityDiff !== 0) return priorityDiff;
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    // TODO: Implement creating a new task
    // - Generate UUID for id
    // - Set default status to 'pending'
    // - Set createdAt and updatedAt to current time
    // - Add to tasks array
    // - Return created task

    if (tasks.some((task: Task) => (task.title === taskData.title))) {
      throw new Error('TASK_TITLE_EXISTS');
    }

    tasks.push({
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
    });

    return tasks[tasks.length - 1]; // Return the newly created task
  }

  // Test helper method - clears all tasks for testing
  static async clearAllTasks(): Promise<void> {
    tasks.length = 0;
  }
} 