import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { GiftModel } from '../../../shared/models';
import { PointPipe } from '../../../shared/pipes/point.pipe';
import { AuthService } from '../../../core/service/auth.service';
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-gift-detail',
  standalone: true,
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.scss'],
  imports: [CommonModule, PointPipe, ToastModule],
  providers: [MessageService]
})
export class GiftDetailComponent implements OnInit {
  @Input() giftDetail!: GiftModel;
  user = {name: ''};
  visible = false;
  alertVisible = false

  constructor(private authService: AuthService, private messageService: MessageService) {}

  ngOnInit() {
    this.authService.user$.subscribe(
      (value) => {
        this.user.name = value.name
      }
    )
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  openAlert() {
    this.close()
    this.messageService.add({
      severity: "info",
      summary: "Lưu ý",
      detail: "Đây là chức năng demo. Hiện không hỗ trợ đổi quà.",
      life: 3000,
    });
  }


}
