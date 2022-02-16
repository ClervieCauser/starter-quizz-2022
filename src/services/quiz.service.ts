import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = QUIZ_LIST;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(QUIZ_LIST);

  public urlQuiz: string = "https://raw.githubusercontent.com/NablaT/starter-quiz-two/master/mock-quiz.json";

  constructor(private http: HttpClient) {
    this.getQuizzes();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.addId(quiz);
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz){
    const index: number = this.quizzes.indexOf(quiz);
    if(index !== -1){
      this.quizzes.splice(index, 1);
    }

    this.quizzes$.next(this.quizzes);
  }

  getQuizzes(){
    this.http.get<Quiz[]>(this.urlQuiz)
      .subscribe((quizzes) => {
          quizzes.forEach(q => this.addQuiz(q));
      });
  }

  getQuizId(id: number): Observable<Quiz> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const quiz = QUIZ_LIST.find(q => q.id === id)!;
    return of(quiz);
  }

  addId(quiz: Quiz){
    let id = 0;
    this.quizzes.map(q=> q.id).forEach(qid => id=Math.max(qid, qid+1));
    quiz.id = id;
  }
}
