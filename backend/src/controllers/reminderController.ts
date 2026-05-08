import { Request, Response } from 'express';
import { ApiError } from '../middleware/errorHandler.js';

interface ReminderRequest {
  scheme: string;
  deadline: string;
  notes?: string;
}

interface Reminder extends ReminderRequest {
  id: string;
  createdAt: string;
}

const remindersStore: Reminder[] = [
  {
    id: 'rem-1',
    scheme: 'City Housing Grant',
    deadline: '2026-05-18',
    notes: 'Upload income verification before the deadline.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rem-2',
    scheme: 'Small Business Relief',
    deadline: '2026-05-28',
    notes: 'Confirm your business license and tax ID.',
    createdAt: new Date().toISOString()
  }
];

export const getReminders = (_request: Request, response: Response) => {
  const sorted = [...remindersStore].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  response.status(200).json({ reminders: sorted, total: sorted.length });
};

export const createReminder = (request: Request, response: Response) => {
  const { scheme, deadline, notes } = request.body as ReminderRequest;

  if (!scheme || !deadline) {
    throw new ApiError(400, 'Missing required fields: scheme and deadline', 'VALIDATION_ERROR');
  }

  const newReminder: Reminder = {
    id: `rem-${Date.now()}`,
    scheme,
    deadline,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  remindersStore.push(newReminder);
  response.status(201).json(newReminder);
};

export const updateReminder = (request: Request, response: Response) => {
  const { id } = request.params;
  const { scheme, deadline, notes } = request.body as Partial<ReminderRequest>;

  const reminder = remindersStore.find((r) => r.id === id);
  if (!reminder) {
    throw new ApiError(404, 'Reminder not found', 'NOT_FOUND');
  }

  if (scheme) reminder.scheme = scheme;
  if (deadline) reminder.deadline = deadline;
  if (notes !== undefined) reminder.notes = notes;

  response.status(200).json(reminder);
};

export const deleteReminder = (request: Request, response: Response) => {
  const { id } = request.params;
  const index = remindersStore.findIndex((r) => r.id === id);

  if (index === -1) {
    throw new ApiError(404, 'Reminder not found', 'NOT_FOUND');
  }

  const deleted = remindersStore.splice(index, 1);
  response.status(200).json({ message: 'Reminder deleted successfully', deleted: deleted[0] });
};
