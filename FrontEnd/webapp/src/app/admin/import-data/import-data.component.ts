import { Component, OnInit } from '@angular/core';
import { UploadSummary } from '../../models/uploadSummary.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  showdata = true;
  uploading: boolean;
  constructor(private uploadFileService: FileService) { }
  uploadSummary: UploadSummary;
  title = 'read-excel-in-angular8';
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;
  fileCorrect: boolean;
  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    this.fileCorrect = true;
  }
  ngOnInit() { this.uploading = true; }
  sendData() {
    this.showdata = false;
    this.uploadFileService.pushFileToStorage(this.fileUploaded).subscribe((data) => {
      this.uploadSummary = data;
      this.uploading = false;
      this.showdata = true;
    });

  }
  sendingback() {
    this.uploading = true;
    this.uploadSummary = null;
  }

}
