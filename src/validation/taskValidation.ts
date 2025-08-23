import Joi from 'joi';

/**
 * Task Validation Schemas
 * 
 * TODO: Implement Joi validation schemas for task operations
 * Reference the task requirements in README.md
 */

export const createTaskSchema = Joi.object({
  // TODO: Define validation schema for creating a task
  // Remember the requirements:
  // - title: required, string, max 100 characters
  // - description: optional, string, max 500 characters  
  // - priority: required, one of 'low', 'medium', 'high'
  // - dueDate: optional, valid date
  // Note: status, id, and timestamps are set automatically

  title: Joi.string().max(100).required(),
  description: Joi.string().max(500).optional(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  dueDate: Joi.date().iso().optional().min('now')
}).required().messages({
  'string.base': 'must be a string',
  'string.empty': 'cannot be empty',
  'string.max': 'exceeds maximum length',
  'any.required': '{#label} is required',
  'any.only': '{#label} must be one of {#valids}',
  'date.base': 'must be a valid date',
  'date.iso': 'must be a valid ISO date',
  'date.min': 'must be a date in the future',
  'object.unknown': 'contains unknown fields',
}).unknown(false);

export const taskQuerySchema = Joi.object({
  // TODO: Define validation schema for query parameters
  // - status: optional, valid task status
  // - priority: optional, valid task priority
  
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
}).optional().messages({
  'string.base': 'must be a string',
  'any.only': '{#label} must be one of {#valids}',
  'object.unknown': 'contains unknown query parameters',
  'object.base': 'must be an object',
  'object.empty': 'cannot be empty',
  'object.required': 'query parameters are required',
  'object.allowUnknown': 'contains unknown fields',
}).unknown(false); // Reject unknown query params

// Validation helper functions
export const validateCreateTask = (data: unknown) => {
  return createTaskSchema.validate(data);
};

export const validateTaskQuery = (data: unknown) => {
  return taskQuerySchema.validate(data);
}; 