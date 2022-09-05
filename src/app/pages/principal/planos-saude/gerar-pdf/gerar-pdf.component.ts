import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-gerar-pdf',
  templateUrl: './gerar-pdf.component.html',
  styleUrls: ['./gerar-pdf.component.css']
})
export class GerarPdfComponent implements OnInit {

  constructor() { }

  @ViewChild('pageContainer', {static: false}) pageContainer!: ElementRef;

  ngOnInit(): void {
    
  }  
  
  public gerar() {
    var data = document.getElementById('contentToConvert');  
    html2canvas(this.pageContainer.nativeElement).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF 
    });

    /*let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.pageContainer.nativeElement, {
      callback: (pdf) => {
        pdf.save("atestado.pdf");
      }
    }) */
  }

}
