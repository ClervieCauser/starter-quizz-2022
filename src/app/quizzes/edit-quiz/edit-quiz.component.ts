import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {QUIZ_LIST} from "../../../mocks/quiz-list.mock";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quizEdit: Quiz;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              public formBuilder: FormBuilder) {
    this.quizEdit = QUIZ_LIST[0];
  }

  ngOnInit() {
    this.getQuizzesId();
  }

  getQuizzesId(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuizId(id)
      .subscribe(q => this.quizEdit = q);
  }
}
