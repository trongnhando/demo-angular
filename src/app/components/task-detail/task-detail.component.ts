import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task/types';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent {
  @Input() taskDetail?: Task;
  @Input() editTask?: Task;
  @Output() taskEvent = new EventEmitter<Task>();

  updateTask() {
    this.taskEvent.emit(this.editTask);
  }
}
