import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

declare var tableau: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tableauDivHeight: number;
  tableauDivWidth: number;
  tableauUrl = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';
  tableauViz: any;
  workbook: any;
  activeSheet: any;

  @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
      this._resizeWindows();
    }
  ngOnInit() {
    this.tableauDivHeight = window.innerHeight - 80;
    this.tableauDivWidth = window.innerWidth - 80;
    this.initViz();
  }

ngOnDestroy() {
  this.tableauViz.dispose();
}

  initViz() {
    const placeholderDiv = document.getElementById('vizContainer');
    const url = this.tableauUrl;
    const options = {
      hideTabs: true,
      width: this.tableauDivWidth,
      height: this.tableauDivHeight,
      onFirstInteractive: () => {
        // The viz is now ready and can be safely used.
        this.workbook = this.tableauViz.getWorkbook();
        this.activeSheet = this.workbook.getActiveSheet();
        this.vizQuerySheets();
      }
    };
    this.tableauViz = new tableau.Viz(placeholderDiv, url, options);
  }

  vizQuerySheets() {
    const sheets = this.workbook.getPublishedSheetsInfo();
    console.log(sheets);
  }
  _resizeWindows() {
    this.tableauDivHeight = window.innerHeight - 80;
    this.tableauDivWidth = window.innerWidth - 80;
    // Set tableau height and width to 0 for auto resizing
    this.tableauViz.setFrameSize(this.tableauDivWidth, this.tableauDivHeight);
  }
}
