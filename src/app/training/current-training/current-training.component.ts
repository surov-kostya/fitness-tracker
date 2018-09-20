import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval;

  @Output() onStopTraining = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startTraining();
  }

  startTraining(){
    this.interval = setInterval(()=>{
      this.progress += 5;
      if (this.progress >= 100){
        clearInterval(this.interval);
      }
    }, 1000);
  }

  stopTraining(){
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data:{
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.onStopTraining.emit();
      } else {
        this.startTraining();
      }
    })
  }

}
