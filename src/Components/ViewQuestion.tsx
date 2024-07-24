import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface QueState {
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
}

interface Props {
  onUpdateClickedOnView: (newValue: boolean) => void;
  quest: any;
}

const ViewPage: React.FC<Props> = ({ onUpdateClickedOnView, quest }) => {
  const [que, setQue] = useState<QueState>({
    Blooms_Level: "",
    Question: "",
    Correct_Answer: "",
    Explanation: "",
    option1: "",
    dr1: "",
    option2: "",
    dr2: "",
    option3: "",
    dr3: ""
  });

  useEffect(() => {
    // Update que state when quest prop changes
    setQue(quest);
  }, [quest]);

  const handleCLosePage = () => {
    onUpdateClickedOnView(false);
    console.log("IN view page.........", onUpdateClickedOnView);
    console.log("In view page ======================>");
  };

  return (
    <div className="container-fluid">
      <div className="row text-center mt-1 mb-4">
        <h2>Generated Questions</h2>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="col-md-11 p-2 card mt-2 mb-4">
            <p className="mt-0 mb-1 fw-medium">Question:</p>
            <textarea
              className="question p-1"
              rows={5}
              value={que.Question}
              readOnly // Ensure textarea is read-only if you don't need to edit
            ></textarea>
          </div>
          <div className="col-md-11 p-2 card">
            <p className="m-0 pb-1 fw-medium">Correct Answer:</p>
            <div>
            <span className="fw-bold p-2" style={{backgroundColor: '#489d03', color: 'white'}}>A</span>
            <input
              className="option1 mb-2 p-1 ms-2"
              type="text"
              placeholder="Correct Answer"
              value={que.Correct_Answer}
              readOnly // Ensure input is read-only if you don't need to edit
            />
            </div>
            <p className="mb-1 pb-0 fw-medium">Options:</p>
            {/* <label htmlFor="option2" className="fw-bold">B</label> */}
            <div >
               <span className="fw-bold p-2" style={{backgroundColor: 'grey', color: 'white'}}>B</span><input
              id="option2"
              className="option2 mb-1 p-1 ms-2"
              type="text"
              placeholder="Option 2"
              value={que.option1}
              readOnly
            />
              </div>
            
            <div>
            <span className="fw-bold p-2" style={{backgroundColor: 'grey', color: 'white'}}>C</span>
            <input
              className="option3 mb-1 p-1 ms-2"
              type="text"
              placeholder="Option 3"
              value={que.option2}
              readOnly
            />
            </div>
            
            <div>
            <span className="fw-bold p-2" style={{backgroundColor: 'grey', color: 'white'}}>D</span><input
              className="option4 mb-1 p-1 ms-2"
              type="text"
              placeholder="Option 4"
              value={que.option3}
              readOnly
            />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="col-md-11 p-2 mt-2 mb-4 card">
            <p className=" mt-0 mb-1 fw-medium">Solution:</p>
            <textarea
              className="solution p-1"
              rows={5}
              value={que.Explanation}
              readOnly
            ></textarea>
          </div>

          <div className="btns px-2">
            <button className="btn btn-success mx-2 button" onClick={handleCLosePage}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
