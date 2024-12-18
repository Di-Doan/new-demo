import { CommonModule } from "@angular/common";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { GiftService } from "../../../core/service/gift.service";
import { GiftModel } from "../../../shared/models";
import { Subject, takeUntil } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";

import { ConfirmationService, MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-admin-gift",
  standalone: true,
  templateUrl: "./admin-gift.component.html",
  styleUrls: ["./admin-gift.component.scss"],
  imports: [
    CommonModule,
    AdminSidebarComponent,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputIconModule,
    IconFieldModule,
    FormsModule,
    InputNumberModule,
    RadioButtonModule,
    InputTextModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminGiftComponent implements OnInit, OnChanges {
  giftDialog: boolean = false;

  giftList!: GiftModel[];

  gift!: GiftModel;

  selectedGifts!: GiftModel[] | null;

  submitted: boolean = false;

  destroyed$ = new Subject<void>();

  imgArray = [
    "../../../../assets/img/gift-img/klever.png",
    "../../../../assets/img/gift-img/nature.png",
    "../../../../assets/img/gift-img/pibook.png",
    "../../../../assets/img/gift-img/rose.png",
    "../../../../assets/img/gift-img/Smoothie.png",
    "../../../../assets/img/gift-img/viettel.png",
    "../../../../assets/img/gift-img/vnmobile.png",
  ];

  constructor(
    private giftService: GiftService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchGiftList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.fetchGiftList();
  }

  fetchGiftList() {
    this.giftService
      .getPost()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (res) => {
          this.giftList = res.data.result;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  openNew() {
    this.gift = new GiftModel();
    this.submitted = false;
    this.giftDialog = true;
  }

  deleteSelectedGifts() {
    this.confirmationService.confirm({
      message: "Xác nhận xoá quà tặng đã chọn?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.giftService
          .deleteMultipleGift(this.selectedGifts)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.selectedGifts = null;
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá quà tặng thành công",
                life: 3000,
              });
              setTimeout(() => {
                // Debugging line
                this.fetchGiftList();
              }, 1500);
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            },
          });
      },
    });
  }

  editGift(gift: GiftModel) {
    this.gift = { ...gift };
    this.giftDialog = true;
  }

  deleteGift(gift: GiftModel) {
    this.confirmationService.confirm({
      message: "Xác nhận xoá " + gift.name + "?",
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.giftService
          .deleteSelectedGifts(gift._id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe({
            next: () => {
              this.gift = new GiftModel();
              this.messageService.add({
                severity: "success",
                summary: "Thành công",
                detail: "Xoá quà tặng thành công",
                life: 3000,
              });

              setTimeout(() => {
                this.fetchGiftList();
              }, 1500);
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            },
          });
      },
    });
  }

  hideDialog() {
    this.giftDialog = false;
    this.submitted = false;
  }

  saveGift() {
    this.submitted = true;
    if (this.gift.name == "") {
      this.messageService.add({
        severity: "error",
        summary: "Thất bại",
        detail: "Vui lòng điền đủ thông tin",
        life: 1500,
      });

      return;
    }

    // call update info
    if (this.gift._id) {
      this.giftService
        .updateGiftInfo(this.gift._id, this.gift)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.hideDialog();
            this.gift = new GiftModel();
            this.messageService.add({
              severity: "success",
              summary: "Thành công",
              detail: "Cập nhật quà tặng thành công",
              life: 1500,
            });

            setTimeout(() => {
              this.fetchGiftList();
            }, 1500);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    } else {
      this.giftService
        .createNewGift(
          this.getRandomGiftImg(),
          this.gift.name,
          "14.01.2023",
          "13.02.2023",
          this.gift.point,
          this.gift.isHot
        )
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.hideDialog();
            this.gift = new GiftModel();
            this.messageService.add({
              severity: "success",
              summary: "Thành công",
              detail: "Tạo quà tặng thành công",
              life: 3000,
            });

            setTimeout(() => {
              this.fetchGiftList();
            }, 1500);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    }
  }

  getRandomGiftImg(): string {
    const randomIndex = Math.floor(Math.random() * this.imgArray.length);
    return this.imgArray[randomIndex];
  }
}
