import { NgFor, NgIf, NgClass, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task, dummy } from './types';
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
  ],
})
export class TaskComponent {
  fetchDataSubscription?: Subscription;
  ngOnInit(): void {
    this.getTask();
  }
  constructor(private taskService: TaskService) {}
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
    const targetIndex = this.tasks.findIndex((value) => value.id === id);
    if (targetIndex >= 0) {
      this.tasks.splice(targetIndex, 1);
      if (this.taskSelected && id === this.taskSelected.id) {
        this.taskSelected = undefined;
      }
    }
  }
  taskSelected?: Task;
  handleSelect(task: Task): void {
    this.taskSelected = { ...task };
    this.editTask = { ...task };
  }
  editTask?: Task;
  receiveTask($editTask: Task) {
    if ($editTask && this.tasks) {
      const targetIndex = this.tasks.findIndex((e) => e.id === $editTask.id);
      if (targetIndex >= 0) {
        this.tasks[targetIndex].title = $editTask.title;
      }
    }
  }
}
