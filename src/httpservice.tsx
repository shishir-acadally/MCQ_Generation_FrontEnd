import axios from 'axios';

const get_API_URL = 'https://leap-uat.acadally.com/learning_units';
const Ques_API_URL = 'http://127.0.0.1:8000';
const API_TOKEN = '698a2fc38522a684193eb0af8b44f1c4';

// Function to fetch grades
export const getGrades = () => {
  const url = `${get_API_URL}?token=${API_TOKEN}`;
  return axios.get(url).then(response => response.data);
};

// Function to fetch subjects based on grade
export const getSubjects = (grade: any) => {
  const url = `${get_API_URL}?grade=${grade}&token=${API_TOKEN}`;
  console.log(url);
  return axios.get(url).then(response => response.data);
};

// Function to fetch chapters based on grade and subject
export const getChapters = (grade: any, subject: any) => {
  const url = `${get_API_URL}?grade=${grade}&subject=${subject}&token=${API_TOKEN}`;
  console.log(url);
  return axios.get(url).then(response => response.data);
};

// Function to fetch learning units based on grade, subject, and chapter
export const getLUs = (grade: any, subject: any, chapter: any) => {
  const url = `${get_API_URL}?grade=${grade}&subject=${subject}&chapter=${chapter}&token=${API_TOKEN}`;
  console.log(url);
  return axios.get(url).then(response => response.data);
};

export const getLUQuestions = (lu_id: string) => {
  const url = `${Ques_API_URL}/LU_Questions`
  console.log("Url for getting data form database: ",url);
  const requestBody = {"lu_id": lu_id};
  return axios.post(url, requestBody).then(res => res.data);
}

export const generateQues = (lu_text: string, grade: string, subject: string, chapter: string) => {
  const url = `${Ques_API_URL}/generateQues`
  console.log("Url for generating MCQs: ", url, lu_text);
  const requestBody = {
    "lu_text": lu_text,
    "grade": grade,
    "subject": subject,
    "chapter": chapter
  }
  return axios.post(url, requestBody).then(res => res.data)
}
