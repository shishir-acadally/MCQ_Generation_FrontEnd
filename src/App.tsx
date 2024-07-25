import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { getGrades, getSubjects, getChapters, getLUs, getLUQuestions } from './httpservice';
import { ClipLoader, SyncLoader } from 'react-spinners';
import ViewPage from './Components/ViewQuestion';
import GetQuesPage from './Components/GetQuestions';
import { createTypeReferenceDirectiveResolutionCache } from 'typescript';

const App: React.FC = () => {

  const [clickedOnView, setClickedOnView] = useState(false);
  const [chosenQues, setChosenQues] = useState<{}>({});
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [lu, setLU] = useState('');
  const [bloom, setBloom] = useState('');
  // const [blooms, setBlooms] = useState<string[]>(["Remember", "Understand", "Apply", "Analyse"]);
  const [question, setQuestion] = useState<
    {
      Blooms_Level: string;
      Question: string;
      Correct_Answer: string;
      Explanation: string;
      option1: string;
      dr1: string;
      option2: string;
      dr2: string;
      option3: string;
      dr3: string;
    }[]>([]);

  const [viewQue, setViewQue] = useState<{ question: string; }[]>([]);



  // Add state for grade, subject ,chapter, LU
  // 2 way binding for grade subject, chapter and LU

  useEffect(() => {

  }, [chosenQues]);

  const handleChildUpdate = (newState: any) => {
    setGrade(newState.grade);
    setSubject(newState.subject);
    setChapter(newState.chapter);
    setLU(newState.lu);
    setBloom(newState.bloom);
    setQuestion(newState.question);
    setViewQue(newState.viewQue);
    console.log("In app page ...................", viewQue);
    console.log("In app page ==================>", question);
    // Update parent component state
  };

  const handleChildUpdate2 = (value: boolean) => {
    setClickedOnView(value);
    console.log("In app file........................................", clickedOnView, chosenQues) // Update parent component state
  };

  const handleChildUpdate3 = (value: any, quest: any) => {
    console.log("IN app file ===============================", value, quest);
    setClickedOnView(value);

    setChosenQues(quest);
    console.log("In app file........................................", clickedOnView, chosenQues)
  }

  const handleChildQuestionsUpdate = (newQuestions: any) => {
    setQuestion(newQuestions);
};


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 d-flex">

          <nav className="navbar navbar-expand-md mt-1 col-lg-12" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container-fluid">

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <a className="fw-bolder mt-1" aria-current="page" href="#"><img src="Acadally logo mark.png" alt="" style={{ width: '40px' }} /></a>

                  <li className="nav-item">
                    <a className="nav-link active fw-bolder" aria-current="page" href="#" style={{ fontSize: '22px' }}>AcadAlly</a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>

        <div className="col-lg-12">
        {clickedOnView ? (
          <div>
            <ViewPage quest={chosenQues} onUpdateClickedOnView={handleChildUpdate2}></ViewPage>
          </div>
        ) : (
          <div className="row">
            <GetQuesPage grade={grade}
              subject={subject}
              chapter={chapter}
              lu={lu}
              bloom={bloom}
              question={question}
              viewQue={viewQue}
              onUpdateState={handleChildUpdate}
              onUpdateQuestions={handleChildQuestionsUpdate}
              onUpdateClickedOnView={handleChildUpdate3}></GetQuesPage>
          </div>
        )
        }
        </div>




      </div>
    </div>
  );
}

export default App;
