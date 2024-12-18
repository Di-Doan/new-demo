import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  HostListener,
} from "@angular/core";
import { CarouselModule } from "primeng/carousel";
import { GiftDetailComponent } from "../gift-detail/gift-detail.component";
import { GiftModel } from "../../../shared/models";
import { PointPipe } from "../../../shared/pipes/point.pipe";

@Component({
  selector: "app-gift-item",
  standalone: true,
  templateUrl: "./gift-item.component.html",
  styleUrls: ["./gift-item.component.scss"],
  imports: [CarouselModule, GiftDetailComponent, PointPipe],
})
export class GiftItemComponent implements OnInit, OnChanges {
  @ViewChild("giftDetailModal") modal!: GiftDetailComponent;
  @Input() giftList!: GiftModel[];
  @Input() oddList!: boolean;

  currentPage = 1;
  totalPage!: number;
  activeIndex: number = 0;

  selectedGift!: GiftModel;

  mobileViewport: boolean = false;
  resizeTimeout: any;

  constructor() {}

  ngOnInit() {
    this.updateViewportAndTotalPages()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateViewportAndTotalPages()
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.updateViewportAndTotalPages();
    }, 200); // Debounce duration (200ms)
  }

  viewportResize() {
    if (window.innerWidth < 580) {
      this.mobileViewport = true;
    } else {
      this.mobileViewport = false;
    }
  }

  updateViewportAndTotalPages() {
    this.viewportResize();

    if (this.giftList) {
      if (this.mobileViewport) {
        this.totalPage = this.giftList.length; // 1 item per page on mobile
      } else {
        this.totalPage = Math.ceil(this.giftList.length / 4); // 4 items per page otherwise
      }
    }
  }

  pageChange(event: any) {
    this.currentPage = event.page + 1;
  }

  openGiftDetail(giftItem: GiftModel) {
    this.selectedGift = giftItem;
    this.modal?.open();
  }
}
