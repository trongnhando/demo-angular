import { Injectable } from '@angular/core';
import { Task, dummy } from './task/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(): Task[] {
    return dummy;
  }
}
