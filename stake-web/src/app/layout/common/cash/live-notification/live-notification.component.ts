import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LiveNotificationData } from '../cash.types';

@Component({
    selector: 'app-live-notification',
    templateUrl: './live-notification.component.html',
    styleUrls: ['./live-notification.component.scss'],
})
export class LiveNotificationComponent {
    constructor(
        public dialogRef: MatDialogRef<LiveNotificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LiveNotificationData,
    ) { }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
