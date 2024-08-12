import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { getQuestionWithId } from './httpservice';
import ViewPage from './Components/ViewQuestion';
import GetQuesPage from './Components/GetQuestions';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const App: React.FC = () => {
  const [clickedOnView, setClickedOnView] = useState(false);
  const [chosenQues, setChosenQues] = useState<{
    question: {
      Blooms_Level: string;
      Question: any;
      Correct_Answer: any;
      Explanation: any;
      option1: any;
      dr1: any;
      option2: any;
      dr2: any;
      option3: any;
      dr3: any;
    }
  }>({
    question: {
      Blooms_Level: "",
      Question: [],
      Correct_Answer: [],
      Explanation: [],
      option1: [],
      dr1: [],
      option2: [],
      dr2: [],
      option3: [],
      dr3: [],
    }
  });
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [lu, setLU] = useState('');
  const [bloom, setBloom] = useState('');
  const [question, setQuestion] = useState<any[]>([]);
  const [viewQue, setViewQue] = useState<any[]>([]);

  useEffect(() => {
    setQuestion(question);
    let tempViewQues = [];
    for (let que of question) {
      if (que.Blooms_Level === bloom) {
        tempViewQues.push({ question: que.Question });
      }
    }
    setViewQue(tempViewQues);
  }, [question]);

  useEffect(() => {
    console.log("Updated question in App:", question);
  }, [question]);

  const handleChildUpdate = (newState: any) => {
    setGrade(newState.grade);
    setSubject(newState.subject);
    setChapter(newState.chapter);
    setLU(newState.lu);
    setBloom(newState.bloom);
    setQuestion(newState.question);
    setViewQue(newState.viewQue);
  };

  const handleChildUpdate3 = (value: boolean, quest: any) => {
    setClickedOnView(value);
    setChosenQues(quest);
  };

  const getQuesWithID = (e: any) => {
    e.preventDefault();
    const formDet = new FormData(e.target);
    const formDetails = Object.fromEntries(formDet.entries());

    getQuestionWithId(formDetails.qid as string)
      .then((data: any) => {
        if (data.data.length === 0) {
          const MySwal = withReactContent(Swal)
          MySwal.fire(<p>No Question Found in the DataBase.</p>)
        }
        else {
          setQuestion(data.data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching question:", error);
      });
  };

  const [isChecked, setIsChecked] = useState(false);

  // Function to handle the switch change
  const handleChange = (event: any) => {
    setIsChecked(event.target.checked);
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

                {/* <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                </div> */}
                {clickedOnView === false ? (
                  <div>

                    <span className="form-check form-switch">
                      <input
                        type="checkbox"
                        role='switch'
                        style={{paddingTop : '22px', width: '43px',}}
                        className="mt-2 mx-3 form-check-input"
                        id="flexSwitchCheckDefault"
                        checked={isChecked}
                        onChange={handleChange}
                      />


                      <form name="SearchWithQID" className="d-flex" role="search" method='post' onSubmit={getQuesWithID}>
                        <input id='qid' name='qid' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit" disabled={!isChecked}>
                          Search
                        </button>
                      </form>
                    </span>
                  </div>

                ) : null}
              </div>
            </div>
          </nav>
        </div>

        <div className="col-lg-12">
          {clickedOnView ? (
            <div className='row'>
              <ViewPage quest={chosenQues} onUpdateClickedOnView={setClickedOnView} onUpdateState={setChosenQues}></ViewPage>
            </div>
          ) : (
            <div className="row">
              <GetQuesPage
                showIt={isChecked}
                grade={grade}
                subject={subject}
                chapter={chapter}
                lu={lu}
                bloom={bloom}
                question={question}
                viewQue={viewQue}
                onUpdateState={handleChildUpdate}
                onUpdateQuestions={setQuestion}
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
