import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Quiz} from "../../../models/quiz.model";
import {QuestionService} from "../../../services/question.service";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public questionService: QuestionService) {
    this.questionForm = this.formBuilder.group({
      label: [''],
      answers: this.formBuilder.array([])
    });
  }

  get answers(){
    return this.questionForm?.get('answers') as FormArray;
  }

  ngOnInit(): void {
  }


  private createAnswer(){
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());

    const questionToCreate: Question = this.questionForm.getRawValue() as Question;
    console.log('Add quiz: ', questionToCreate);

    // Now, add your quiz in the list!
    this.questionService.addQuestion(questionToCreate);
  }
}
