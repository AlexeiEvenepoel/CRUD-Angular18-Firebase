import {
  AfterViewInit,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  providers: [TaskService],
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  loading = signal(false);
  deleteLoading = signal(false);
  // isEditMode = signal(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });

  constructor() {
    effect(() => {
      const id = this.idTask();
      if (id) {
        this.getTask(id);
      }
    });
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed } = this.form.value;
      const task: TaskCreate = {
        title: title || '',
        completed: !!completed,
      };

      const id = this.idTask();

      if (id) {
        await this._taskService.update(task, id);
      } else {
        await this._taskService.create(task);
      }

      toast.success(`Task ${id ? 'updated' : 'created'}  successfully.`);
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.success('A problem occurred.');
    } finally {
      this.loading.set(false);
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }

  async deleteTask() {
    const id = this.idTask();
    if (!id) return;
    try {
      this.deleteLoading.set(true);
      await this._taskService.delete(id);
      toast.success('Task deleted successfully.');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('A problem occurred while deleting the task.');
    } finally {
      this.deleteLoading.set(false);
    }
  }

  navigateToTasks() {
    this._router.navigateByUrl('/tasks');
  }
}
