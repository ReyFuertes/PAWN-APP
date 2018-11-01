import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "pa-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  public sidebarLinks = [
    {
      text: "Dashboard",
      icon: "fa-chart-pie",
      route: "/dashboard",
      index: 1
    },
    {
      text: "Accounts",
      icon: "fa-user",
      route: "/dashboard/accounts",
      index: 2
    },
    {
      text: "Pawns",
      icon: "fa-gem",
      route: "/dashboard/pawns",
      index: 3
    },
    {
      text: "Items",
      icon: "fa-align-justify",
      route: "/dashboard/items",
      index: 4
    },
    {
      text: "Renewals",
      icon: "fa-sync-alt",
      route: "/dashboard/renewals",
      index: 5
    },
    {
      text: "Redemptions",
      icon: "fa-gift",
      route: "/dashboard/redemptions",
      index: 6
    }
  ];

  public activeMenu: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem("ss_menu")) {
      localStorage.setItem("ss_menu", "1");
    }
    this.activeMenu = localStorage.getItem("ss_menu");
  }

  public onClick(index: string, event: any): void {
    this.activeMenu = index;
    localStorage.setItem("ss_menu", index);
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public getCurrentRoute(): void {}
}
