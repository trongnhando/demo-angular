import { Injectable } from '@angular/core';
import { Task, dummy } from './components/task/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasks(): Task[] {
    return dummy;
  }

  fetchTask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(apiUrl).pipe();
  }
}

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
