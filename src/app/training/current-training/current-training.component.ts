import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onStopTraining = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startTraining();
  }

  startTraining() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.interval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(this.interval);
      }
    }, step);
  }

  stopTraining() {
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onStopTraining.emit();
      } else {
        this.startTraining();
      }
    });
  }

}
