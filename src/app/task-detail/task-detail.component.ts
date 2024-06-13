import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../task/types';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent {
  @Input() taskDetail?: Task;
}
