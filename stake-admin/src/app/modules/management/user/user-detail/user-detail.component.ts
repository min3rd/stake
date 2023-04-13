import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Contact } from 'app/layout/common/quick-chat/quick-chat.types';
import { Subject, takeUntil } from 'rxjs';
import { UserListComponent } from '../user-list/user-list.component';
import { User } from 'app/core/user/user.types';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  userForm: UntypedFormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userListComponent: UserListComponent,
    private _formBuilder: UntypedFormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _userService: UserService,
  ) {
  }
  ngOnInit(): void {
    this._userListComponent.matDrawer.open();
    this.userForm = this._formBuilder.group({
      id: [''],
      cash: [0],
      demoCash: [0],
      blocked: [false]
    });
    this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe(user => {
      this.user = user;
      this.userForm.patchValue(user);
      this._changeDetectorRef.markForCheck();
    });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._userListComponent.matDrawer.close();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  updateUser() {
    const raw = this.userForm.getRawValue();
    this._userService.updateUser(raw).subscribe();
  }
  blockUser() {
    this.user.blocked = true;
    this._userService.updateUser(this.user).subscribe();
  }
  unblockUser() {
    this.user.blocked = false;
    this._userService.updateUser(this.user).subscribe();
  }
}
