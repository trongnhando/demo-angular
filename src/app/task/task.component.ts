import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, dummy } from './types';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [FormsModule, NgFor, NgIf, NgClass, TaskDetailComponent],
})
export class TaskComponent {
  tasks: Task[] = dummy;
  maxId: number = this.tasks[this.tasks.length - 1].id || 1;
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
    this.taskSelected = task;
  }
}
