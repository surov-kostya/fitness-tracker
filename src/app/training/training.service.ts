import { Subject, Subscriber } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;

    constructor(
        private db: AngularFirestore
    ) {}

    fetchAvailableExercises() {
        this.db.collection('availableExercises').snapshotChanges()
        .subscribe(docArr => {
                this.availableExercises = docArr.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories']
                    };
                });
                this.exercisesChanged.next(this.availableExercises.slice());
            });
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise});
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    completeExercise() {
        this.addDataToDatabse({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancleExercise(progress) {
        this.addDataToDatabse({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'closed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    fetchCompletedOrCanceledExercises() {
        this.db.collection('finishedExercises').valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
            });
    }

    private addDataToDatabse(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
