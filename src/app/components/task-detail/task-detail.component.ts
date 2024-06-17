import { NgIf, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task/types';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
  ) {}

  taskDetail?: Task;
  editTask?: Task;

  updateTask() {
    if (this.editTask && this.taskDetail) {
      if (JSON.stringify(this.editTask) === JSON.stringify(this.taskDetail)) {
        alert('Please change at least one of the fields');
      } else {
        this.taskService.updateTask(this.editTask);
        alert('Update successfully');
        this.location.back();
      }
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const taskSelected = this.taskService.getTaskById(Number(id));
      if (taskSelected) {
        this.taskDetail = { ...taskSelected };
        this.editTask = { ...taskSelected };
      } else {
        this.location.back();
      }
    } else {
      this.location.back();
    }
  }

  handleBack(): void {
    this.location.back();
  }
}
