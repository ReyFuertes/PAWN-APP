import { Component, OnInit, AfterViewInit, HostListener } from "@angular/core";
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
      route: "/dashboard"
    },
    {
      text: "Accounts",
      icon: "fa-user",
      route: "/dashboard/accounts"
    },
    {
      text: "Loans",
      icon: "fa-gem",
      route: "/dashboard/loans"
    },
    {
      text: "Items",
      icon: "fa-align-justify",
      route: "/dashboard/items"
    },
    {
      text: "Renewals",
      icon: "fa-sync-alt",
      route: "/dashboard/renewals"
    },
    {
      text: "Redemptions",
      icon: "fa-gift",
      route: "/dashboard/redemptions"
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }

  public gotoRoute(event: any): void {
    let links = document.querySelectorAll(".router-link-item");

    console.log(links);
    links.forEach(link => {
      link.classList.remove('active');
    });

    event.target.parentElement.classList.add('active');
  }

  ngAfterViewInit(): void {
    let link = document.querySelectorAll(".router-link-item");
    link[0].classList.add('active');
  }
}
