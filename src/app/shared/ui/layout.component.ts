import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  // template: `./layout.component.html`,
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);
  // 13316

  get currentEmail() {
    return this._authState.currentUser?.email || 'Guest';
  }

  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
