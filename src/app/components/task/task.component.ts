import { NgFor, NgIf, NgClass, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from './types';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    TaskDetailComponent,
    UpperCasePipe,
    RouterModule,
  ],
})
export class TaskComponent {
  fetchDataSubscription?: Subscription;
  ngOnInit(): void {
    this.getTask();
  }
  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}
  tasks: Task[] = [];
  getTask(): void {
    this.fetchDataSubscription = this.taskService.fetchTask().subscribe({
      next: (response: Task[]) => console.log({ response }),
      error: (error) =>
        error && error.message ? console.log(error.message) : '',
      complete: () => console.log('Fetch api successful'),
    });
    this.tasks = this.taskService.getTasks();
  }
  ngOnDestroy(): void {
    this.fetchDataSubscription?.unsubscribe();
  }
  deleteId?: number;
  newTitle: string = '';
  addTask(title: string): void {
    if (!title) {
      alert('New title can not be blank');
      return;
    }

    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
    };
    this.tasks.push(newTask);
    this.newTitle = '';
  }
  handleDelete(id: number): void {
    if (confirm('Are you sure you want to delete this Task')) {
      const targetIndex = this.tasks.findIndex((value) => value.id === id);
      if (targetIndex >= 0) {
        this.tasks.splice(targetIndex, 1);
      }
    }
  }
  handleSelect(id: number): void {
    this.router.navigate(['/product-detail', id]);
  }
}
