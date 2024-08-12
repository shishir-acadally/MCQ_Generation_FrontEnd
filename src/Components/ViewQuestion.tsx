import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { saveInDB, deleteQues } from "../httpservice";
import 'katex/dist/katex.min.css';
// import LatexRenderer from './LatexRenderer';
import RenderInline from "./RenderInline";


type ContentItem = {
  type: 'text' | 'latex';
  content: string;
};

interface QueState {
  question: {
    Blooms_Level: string;
    Question: ContentItem[];
    Correct_Answer: ContentItem[];
    Explanation: ContentItem[];
    option1: ContentItem[];
    dr1: ContentItem[];
    option2: ContentItem[];
    dr2: ContentItem[];
    option3: ContentItem[];
    dr3: ContentItem[];
  }
}

interface Props {
  onUpdateClickedOnView: (newValue: boolean) => void;
  //   quest: {
  //   Blooms_Level: string;
  //   Question: ContentItem[];
  //   Correct_Answer: ContentItem[];
  //   Explanation: ContentItem[];
  //   option1: ContentItem[];
  //   dr1: string;
  //   option2: ContentItem[];
  //   dr2: string;
  //   option3: ContentItem[];
  //   dr3: string;
  // };
  quest: any;

  onUpdateState: (newState: {
    question: {
      // _id: string;
      Blooms_Level: string;
      Question: ContentItem[];
      Correct_Answer: ContentItem[];
      Explanation: ContentItem[];
      option1: ContentItem[];
      dr1: ContentItem[];
      option2: ContentItem[];
      dr2: ContentItem[];
      option3: ContentItem[];
      dr3: ContentItem[];
    };
  }) => void;
}

const ViewPage: React.FC<Props> = ({
  onUpdateClickedOnView,
  onUpdateState,
  quest,
}) => {
  const [que, setQue] = useState<QueState>({
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
      dr3: []
    }
  });

  const [formData, setFormData] = useState<any>({});

  // const [updateQue, setUpdateQue] = useState()

  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Update que state when quest prop changes
    setQue(quest);
    console.log("============= Changed Que =================", que);
  }, [quest]);

  useEffect(() => {
    setFormData(que);
  }, [que]);

  const handleCLosePage = () => {
    onUpdateClickedOnView(false);
    console.log("IN view page.........", onUpdateClickedOnView);
    console.log("In view page ======================>");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    // console.log(formData);
    const formJson = Object.fromEntries(formData.entries());
    console.log("Form Data", formJson);
    // let temp: any = formJson;
    // setQue(temp);
    formJson["_id"] = quest["_id"];


    console.log("In view page...........", quest);
    let tempQuestion: any[] = [];
    let index1: number = 0;
    while (index1 < (quest.Question ? quest.Question : quest.question.Question).length) {
      if (`${index1}Quetext` in formJson) {
        tempQuestion.push({ "type": "text", "content": formJson[`${index1}Quetext`] });
      }
      if (`${index1}Quelatex` in formJson) {
        tempQuestion.push({ "type": "latex", "content": formJson[`${index1}Quelatex`] });
      }

      index1 += 1;
    }

    let tempAnswer: any[] = [];
    let index2: number = 0;
    while (index2 < (quest.Correct_Answer ? quest.Correct_Answer : quest.question.Correct_Answer).length) {
      if (`${index2}Anstext` in formJson) {
        tempAnswer.push({ "type": "text", "content": formJson[`${index2}Anstext`] });
      }
      if (`${index2}Anslatex` in formJson) {
        tempAnswer.push({ "type": "latex", "content": formJson[`${index2}Anslatex`] });
      }

      index2 += 1;
    }

    let tempExplain: any[] = [];
    let index3: number = 0;
    while (index3 < (quest.Explanation ? quest.Explanation : quest.question.Explanation).length) {
      if (`${index3}Exptext` in formJson) {
        tempExplain.push({ "type": "text", "content": formJson[`${index3}Exptext`] });
      }
      if (`${index3}Explatex` in formJson) {
        tempExplain.push({ "type": "latex", "content": formJson[`${index3}Explatex`] });
      }

      index3 += 1;
    }

    let tempOpt1: any[] = [];
    let index4: number = 0;
    while (index4 < (quest.option1 ? quest.option1 : quest.question.option1).length) {
      if (`${index4}Opt1text` in formJson) {
        tempOpt1.push({ "type": "text", "content": formJson[`${index4}Opt1text`] });
      }
      if (`${index4}Opt1latex` in formJson) {
        tempOpt1.push({ "type": "latex", "content": formJson[`${index4}Opt1latex`] });
      }

      index4 += 1;
    }

    let tempOpt2: any[] = [];
    let index5: number = 0;
    while (index5 < (quest.option2 ? quest.option2 : quest.question.option2).length) {
      if (`${index5}Opt2text` in formJson) {
        tempOpt2.push({ "type": "text", "content": formJson[`${index5}Opt2text`] });
      }
      if (`${index5}Opt2latex` in formJson) {
        tempOpt2.push({ "type": "latex", "content": formJson[`${index5}Opt2latex`] });
      }

      index5 += 1;
    }

    let tempOpt3: any[] = [];
    let index6: number = 0;
    while (index6 < (quest.option3 ? quest.option3 : quest.question.option3).length) {
      if (`${index6}Opt3text` in formJson) {
        tempOpt3.push({ "type": "text", "content": formJson[`${index6}Opt3text`] });
      }
      if (`${index6}Opt3latex` in formJson) {
        tempOpt3.push({ "type": "latex", "content": formJson[`${index6}Opt3latex`] });
      }

      index6 += 1;
    }

    let tempDR1: any[] = [];
    let index7: number = 0;
    while (index7 < (quest.dr1 ? quest.dr1 : quest.question.dr1).length) {
      if (`${index7}DR1text` in formJson) {
        tempDR1.push({ "type": "text", "content": formJson[`${index7}DR1text`] });
      }
      if (`${index7}DR1latex` in formJson) {
        tempDR1.push({ "type": "latex", "content": formJson[`${index7}DR1latex`] });
      }

      index7 += 1;
    }

    let tempDR2: any[] = [];
    let index8: number = 0;
    while (index8 < (quest.dr2 ? quest.dr2 : quest.question.dr2).length) {
      if (`${index8}DR2text` in formJson) {
        tempDR2.push({ "type": "text", "content": formJson[`${index8}DR2text`] });
      }
      if (`${index8}DR2latex` in formJson) {
        tempDR2.push({ "type": "latex", "content": formJson[`${index8}DR2latex`] });
      }

      index8 += 1;
    }

    let tempDR3: any[] = [];
    let index9: number = 0;
    while (index9 < (quest.dr3 ? quest.dr3 : quest.question.dr3).length) {
      if (`${index9}DR3text` in formJson) {
        tempDR3.push({ "type": "text", "content": formJson[`${index9}DR3text`] });
      }
      if (`${index9}DR3latex` in formJson) {
        tempDR3.push({ "type": "latex", "content": formJson[`${index9}DR3latex`] });
      }

      index9 += 1;
    }

    console.log("After clicking on View Changes ==========> ", tempQuestion, tempAnswer);
    quest = {
      _id: formJson["_id"],
      Blooms_Level: formJson.Blooms_Level,
      Question: tempQuestion,
      Correct_Answer: tempAnswer,
      Explanation: tempExplain,
      option1: tempOpt1,
      dr1: tempDR1,
      option2: tempOpt2,
      dr2: tempDR2,
      option3: tempOpt3,
      dr3: tempDR3,
    };

    // setQue(quest);
    console.log("second ====> ", quest, que);

    onUpdateState({
      question: quest
    });

    setSaveDisabled(false);
  };

  const PublishToDb = (e: any) => {
    e.preventDefault();

    let userConfirmed = window.confirm(
      "Are you sure you want to save these changes & publish them to the database?"
    );
    console.log("User's confirmation: ", userConfirmed);
    console.log("I updateDB: ", formData.question);
    if (userConfirmed === true) {
      saveInDB(formData.question)
        .then((data: any) => {
          console.log(data.result);
        })
        .finally(() => {
          handleCLosePage();
        });
    }
  };

  const RejectQuestion = (e: any) => {
    e.preventDefault();

    let questionDeleteConfirmed = window.confirm(
      "Are you sure you want to Delete this question from the database?"
      // We might not be able to recover it for you once deleted!"
    );

    console.log("User's confirmation: ", questionDeleteConfirmed);

    if (questionDeleteConfirmed === true) {
      // console.log(quest._id);
      deleteQues(quest._id)
        .then((data: any) => {
          console.log(data.result);
        })
        .finally(() => {
          handleCLosePage();
        });
    }
  }

  // const elements = [];

  // if (que && que.Question && Array.isArray(que.Question? que.Question : que.question.Question)) {
  //   // Iterate over que.Question using a for loop
  //   for (let index = 0; index < que.Question.length; index++) {
  //     const que_parts = que.Question[index];
  //     if (que_parts.type === "text") {
  //       elements.push(
  //         <span>
  //         <input
  //           className="border-0 shadow-0"
  //           key={index}
  //           name={index.toString() + "Quetext"}
  //           id={index.toString()}
  //           // size={60}
  //           style={{width: `${(que_parts.content.length + 1)*7}px`}}
  //           onChange={() => {
  //             setSaveDisabled(true);
  //           }}
  //           defaultValue={que_parts.content}
  //         />
  //         </span>
  //       );
  //     } else {
  //       elements.push(
  //         <span>
  //         <input
  //           className="border-0 shadow-0"
  //           key={index}
  //           name={index.toString() + "Quelatex"}
  //           id={index.toString()}
  //           // size={60}
  //           style={{width: `${(que_parts.content.length + 1)*7}px`}}
  //           onChange={() => {
  //             setSaveDisabled(true);
  //           }}
  //           defaultValue={que_parts.content}
  //         />
  //         </span>
  //       );
  //     }
  //   }
  // }

  // const [content, setContent] = useState<{
  //   type: 'text' | 'latex';
  //   content: string;
  // }[]>(que.Question);

  // const handleUpdate = (updatedItems: {
  //   type: 'text' | 'latex';
  //   content: string;
  // }[]) => {
  //   setContent(updatedItems);
  // };

  return (
    <div className="container-fluid">
      {/* <div className="row text-center mb-2">
      </div> */}
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 p-2">
          <form name="ReviewForm" method="post" onSubmit={handleSubmit}>
            <h4
              className="ps-2 mt-1"
              style={{ textDecoration: "underline",}}
            >
              Editable Questions
            </h4>
            <div className="col-md-11 p-2 card mt-3 mb-2">
              <div>
                <p className="mt-0 mb-1 fw-medium">Blooms Level: </p>
                {/* <label htmlFor="Blooms_Level" className="fw-bold p-2" style={{ backgroundColor: '#489d03', color: 'white',}}><span>Blooms Level</span></label> */}
                <input
                  id="Blooms_Level"
                  name="Blooms_Level"
                  className="blooms mb-2 p-1"
                  type="text"
                  placeholder="Blooms Level"
                  defaultValue={quest.Blooms_Level ? quest.Blooms_Level : quest.question.Blooms_Level}
                  onChange={() => {
                    setSaveDisabled(true);
                  }}
                />
              </div>
            </div>
            <div className="col-md-11 p-2 card mt-3 mb-2">
              <p className="mt-0 mb-1 fw-medium">Question:</p>
              {/* <textarea 
                name="Question"
                className="question"
                rows={3}
                defaultValue={que.Question[0].content + que.Question[1].content}
                onChange={() => {
                  setSaveDisabled(true);
                }}
              ></textarea> */}
              {/* <LatexRenderer latexString={que.Question}></LatexRenderer> */}
              <div style={{ border: 'solid black 1px' }}>
                {(quest.Question ? quest.Question : quest.question.Question).map((que_parts: any, index: any) => {
                  if (que_parts.type === "text") {
                    return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Quetext"} id={index.toString() + "Quetext"} style={{ width: `${(que_parts.content.length + 1) * 7}px` }} onChange={() => {
                      setSaveDisabled(true);
                    }} defaultValue={que_parts.content}></input>
                  }
                  else {
                    return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Quelatex"} id={index.toString() + "Quetext"} style={{ width: `${(que_parts.content.length + 1) * 7}px` }} onChange={() => {
                      setSaveDisabled(true);
                    }} defaultValue={que_parts.content}></input>
                  }
                  // return <LatexRenderer  key={index} latexString={que_parts.content} />
                })
                }
              </div>
            </div>
            <div className="col-md-11 p-2 card mb-2">
              <p className="mt-0 mb-0 pb-1 fw-medium">Correct Answer: </p>
              <div>
                <label
                  htmlFor="Correct_Answer"
                  className="fw-bold p-2"
                  style={{
                    backgroundColor: "#489d03",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span style={{marginLeft: '5px'}}>A</span>
                </label>

                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.Correct_Answer ? quest.Correct_Answer : quest.question.Correct_Answer).map((ans_parts: any, index: any) => {
                    if (ans_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Anstext"} id={index.toString() + "Anstext"} style={{ width: `${(ans_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={ans_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Anslatex"} id={index.toString() + "Anstext"} style={{ width: `${(ans_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={ans_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>

              <p className="mt-1 pt-2 mb-1 fw-medium">Options: </p>
              <div>
                <label
                  htmlFor="option1"
                  className="fw-bold p-2"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span style={{marginLeft: '5px'}}>B</span>
                </label>
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.option1 ? quest.option1 : quest.question.option1).map((opt_parts: any, index: any) => {
                    if (opt_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Opt1text"} id={index.toString() + "Opt1text"} style={{ width: `${(opt_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={opt_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Opt1latex"} id={index.toString() + "Opt1text"} style={{ width: `${(opt_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={opt_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>
              <div>
                <label
                  htmlFor="dr1"
                  className="fw-bold p-2 mt-1"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span>DR</span>
                </label>
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.dr1 ? quest.dr1 : quest.question.dr1).map((dr_parts: any, index: any) => {
                    if (dr_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "DR1text"} id={index.toString() + "DR11text"} style={{ width: `${(dr_parts.content.length + 2) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={dr_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "DR1latex"} id={index.toString() + "DR1latex"} style={{ width: `${(dr_parts.content.length + 2) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={dr_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>

              <div>
                <label
                  htmlFor="option2"
                  className="fw-bold p-2 mt-1"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span style={{marginLeft: '5px'}}>C</span>
                </label>
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.option2 ? quest.option2 : quest.question.option2).map((opt_parts: any, index: any) => {
                    if (opt_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Opt2text"} id={index.toString() + "Opt2text"} style={{ width: `${(opt_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={opt_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Opt2latex"} id={index.toString() + "Opt2text"} style={{ width: `${(opt_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={opt_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>
              <div>
              <label
                  htmlFor="dr2"
                  className="fw-bold p-2 mt-1"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span>DR</span>
                </label>
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.dr2 ? quest.dr2 : quest.question.dr2).map((dr_parts: any, index: any) => {
                    if (dr_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "DR2text"} id={index.toString() + "DR2text"} style={{ width: `${(dr_parts.content.length + 2) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={dr_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "DR2latex"} id={index.toString() + "DR2latex"} style={{ width: `${(dr_parts.content.length + 2) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={dr_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>

              <div>
                <label
                  htmlFor="option3"
                  className="fw-bold p-2 mt-1"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span style={{marginLeft: '5px'}}>D</span>
                </label>
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.option3 ? quest.option3 : quest.question.option3).map((opt_parts: any, index: any) => {
                    if (opt_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Opt3text"} id={index.toString() + "Opt3text"} style={{ width: `${(opt_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={opt_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Opt3latex"} id={index.toString() + "Opt3text"} style={{ width: `${(opt_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={opt_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>
              <div>
                <label
                  htmlFor="dr3"
                  className="fw-bold p-2 mt-1"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "40px",
                  }}
                >
                  <span>DR</span>
                </label>
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.dr3 ? quest.dr3 : quest.question.dr3).map((dr_parts: any, index: any) => {
                    if (dr_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "DR3text"} id={index.toString() + "DR3text"} style={{ width: `${(dr_parts.content.length + 2) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={dr_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "DR3latex"} id={index.toString() + "DR3latex"} style={{ width: `${(dr_parts.content.length + 2) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={dr_parts.content}></input>
                    }
                  })
                  }
                </span>
              </div>
            </div>
            <div className="col-md-11 p-2 card mb-2">
              <p className=" mt-0 mb-1 fw-medium">Solution:</p>
              {/* <textarea
                name="Explanation"
                className="solution"
                rows={5}
                // defaultValue={que.Explanation}
                onChange={() => {
                  setSaveDisabled(true);
                }}
              ></textarea> */}
              <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  {(quest.Explanation ? quest.Explanation : quest.question.Explanation).map((exp_parts: any, index: any) => {
                    if (exp_parts.type === "text") {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Exptext"} id={index.toString() + "Exptext"} style={{ width: `${(exp_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={exp_parts.content}></input>
                    }
                    else {
                      return <input className="border-0 shadow-0 " key={index} name={index.toString() + "Explatex"} id={index.toString() + "Exptext"} style={{ width: `${(exp_parts.content.length + 1) * 7}px` }} onChange={() => {
                        setSaveDisabled(true);
                      }} defaultValue={exp_parts.content}></input>
                    }
                  })
                  }
                </span>

            </div>

            <div className="btns col-md-11 pt-2 px-2 mb-5">
              <button className="btn btn-secondary mx-2 button" onClick={handleCLosePage}>Close</button>
              <button className="btn btn-success mx-2 button" type="submit">
                View Changes
              </button>
              <button
                className="btn btn-primary mx-2 button"
                onClick={PublishToDb}
                disabled={saveDisabled}
              >
                Save & Publish
              </button>
              <button className="btn btn-danger mx-2 button" onClick={RejectQuestion}>Reject</button>
            </div>
          </form>
        </div>

        <div className="col-md-6 p-2 ">
          <h4
            className="ps-2 mt-1"
            style={{ textDecoration: "underline",}}
          >
            Rendered Questions
          </h4>
          <div className="row rendered mb-5">
            <div className="col-md-11 p-2 card mt-3 mb-2">
              {/* <p className="mt-0 mb-1 fw-medium">Question:</p>
              <textarea
                className="question p-1"
                rows={3}
                value={que.Question}
                readOnly 
              ></textarea> */}
              <p className="m-0 pb-1 fw-medium">Question:</p>
              <div style={{ border: 'solid black 1px' }}>
                <RenderInline items={quest.Question ? quest.Question : quest.question.Question}></RenderInline>
              </div>
            </div>
            <div className="col-md-11 p-2 card">
              <p className="m-0 pb-1 fw-medium">Correct Answer:</p>
              <div className="mb-3">
                <label
                  htmlFor="correctAnswer"
                  className="fw-bold p-2"
                  style={{
                    backgroundColor: "#489d03",
                    color: "white",
                    width: "30px",
                  }}
                >
                  <span>A</span>
                </label>
                {/* <span className="fw-bold p-2" style={{ backgroundColor: '#489d03', color: 'white' }}>A</span> */}
                {/* <input
                  className="option1 mb-2 p-1 ms-2"
                  type="text"
                  placeholder="Correct Answer"
                  value={que.Correct_Answer}
                  readOnly // Ensure input is read-only if you don't need to edit
                /> */}
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                <RenderInline items={quest.Correct_Answer ? quest.Correct_Answer : quest.question.Correct_Answer}></RenderInline>
                </span>
              </div>

              <p className="mb-1 pb-0 fw-medium">Options:</p>
              {/* <label htmlFor="option2" className="fw-bold">B</label> */}
              <div>
                <label
                  htmlFor="option1"
                  className="fw-bold p-2"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "30px",
                  }}
                >
                  <span>B</span>
                </label>
                {/* <span className="fw-bold p-2" style={{ backgroundColor: 'grey', color: 'white' }}>B</span> */}
                {/* <input
                  id="option2"
                  className="option2 mb-1 p-1 ms-2"
                  type="text"
                  placeholder="Option 2"
                  // value={que.option1}
                  readOnly
                /> */}
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  <RenderInline items={quest.option1 ? quest.option1 : quest.question.option1}></RenderInline>
                </span>
              </div>

              <div>
                <label
                  htmlFor="option2"
                  className="fw-bold p-2"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "30px",
                  }}
                >
                  <span>C</span>
                </label>
                {/* <span className="fw-bold p-2" style={{ backgroundColor: 'grey', color: 'white' }}>C</span> */}
                {/* <input
                  className="option3 mb-1 p-1 ms-2"
                  type="text"
                  placeholder="Option 3"
                  // value={que.option2}
                  readOnly
                /> */}
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  <RenderInline items={quest.option2 ? quest.option2 : quest.question.option2}></RenderInline>
                </span>

              </div>

              <div>
                <label
                  htmlFor="option3"
                  className="fw-bold p-2"
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    width: "30px",
                  }}
                >
                  <span>D</span>
                </label>
                {/* <span className="fw-bold p-2" style={{ backgroundColor: 'grey', color: 'white' }}>D</span> */}
                {/* <input
                  className="option4 mb-1 p-1 ms-2"
                  type="text"
                  placeholder="Option 4"
                  // value={que.option3}
                  readOnly
                /> */}
                <span className="ms-2 p-2" style={{ border: 'solid black 1px' }}>
                  <RenderInline items={quest.option3 ? quest.option3 : quest.question.option3}></RenderInline>
                </span>
              </div>
            </div>

            <div className="col-md-11 p-2 mt-2 mb-2 card">
              <p className=" mt-0 mb-1 fw-medium">Solution:</p>
              {/* <textarea
                className="solution p-1"
                rows={5}
                // value={que.Explanation}
                readOnly
              ></textarea> */}
              <div className="p-2" style={{ border: 'solid black 1px' }}>
                <RenderInline items={quest.Explanation ? quest.Explanation : quest.question.Explanation}></RenderInline>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
