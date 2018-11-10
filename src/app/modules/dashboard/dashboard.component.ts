import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Chart } from 'chart.js';
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'pa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  public totalPawnCount: number = 0;
  public totalRenewedCount: number = 0;
  public totalItems: number = 0;
  public totalAccounts: number = 0;
  public canvas: any;
  public ctx: any;

  @ViewChild('lineChart') private chartRef;    
  public chart: any;   
  public lineChart = []; 

  constructor(private cdRef: ChangeDetectorRef, private dashboardService: DashboardService) {
    
  }

  ngOnInit(): void {
    this.dashboardService.getDashboardReports().subscribe(response => {
      if(response.success === true) {
        this.totalPawnCount = response.totalPawnedItems;
        this.totalRenewedCount = response.totalRenewedItems;
        this.totalItems = response.totalItems;
        this.totalAccounts = response.totalAccounts;
        this.initChart(this.totalAccounts, this.totalItems, this.totalPawnCount, this.totalRenewedCount);
      }
    });
  }

  private initChart(totalAccounts, totalItems, totalPawnCount, totalRenewedCount): void {
    this.lineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
          labels: ["Total Accounts", "Total Items", "Pawned Items", "Renewed Items"],
          datasets: [{
              label: 'Total Engagements',
              data: [totalAccounts, totalItems, totalPawnCount, totalRenewedCount],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    })

  }


  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}