import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {QUESTION_ACTOR, QUIZ_LIST} from '../mocks/quiz-list.mock';
import {HttpClient} from "@angular/common/http";
import {Question} from "../models/question.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  public questions: Question;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public questions$: BehaviorSubject<Question> = new BehaviorSubject(QUESTION_ACTOR);

  constructor(public formBuilder: FormBuilder) {
    this.questions = QUESTION_ACTOR;
  }

  addQuestion(question: Question) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.questions = question;
  }

  deleteQuiz(questions: Question){
    this.questions;
  }

}
