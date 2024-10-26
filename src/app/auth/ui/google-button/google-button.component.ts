import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-google-button',
  standalone: true,
  imports: [],
  templateUrl: './google-button.component.html',
  styles: ``
})
export class GoogleButtonComponent {
  @Input() buttonText: string = 'Sign in with Google';
  onClick = output<void>();
}
