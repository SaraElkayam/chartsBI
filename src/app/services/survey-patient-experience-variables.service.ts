import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PatientExperience } from '../models/patientExperience.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyPatientExperienceVariablesService {


  constructor(private http: HttpClient) {

  }
  public getSurveyPatientExperienceVariablesAPI(): Observable<Array<PatientExperience>> {
    const url: string = "https://datadashboard.health.gov.il/api/experienceInstitutes/surveyPatientExperienceVariables";
    return this.http.get(url, {}) as Observable<Array<PatientExperience>>;
  }
}
