import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getGrades, getSubjects, getChapters, getLUs, getLUQuestions, generateQues } from '../httpservice';
import { SyncLoader } from 'react-spinners';

// export let [clickedOnView, setClickedOnView] = useState(false);

interface Props {
    grade: string;
    subject: string;
    chapter: string;
    lu: string;
    question: {
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
    }[];
    viewQue: { question: string; }[];

    onUpdateState: (newState: {
        grade: string, subject: string, chapter: string, lu: string, question: {
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
        }[],
        viewQue: { question: string; }[],
    }) => void;

    onUpdateQuestions: (question: {
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
    }[]) => void;
    onUpdateClickedOnView: (value: boolean, question: {}) => void;
}


const GetQuesPage: React.FC<Props> = ({ grade, subject, chapter, lu, question, viewQue, onUpdateState, onUpdateClickedOnView }) => {
    const override: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "black",
    };

    let setErrorDisplay = 'none';
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); };
    const handleShow = () => setShow(true);

    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [lus, setLus] = useState<{ id: string; name: string; }[]>([]);
    const [viewQues, setviewQues] = useState<{ question: string; }[]>([]);
    const [questions, setQues] = useState<{
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

    const [isDisabled, setIsDisabled] = useState(true);
    const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);

    const [clickedOnView, setClickedOnView] = useState(false);

    useEffect(() => {
        localStorage.setItem('view', JSON.stringify(clickedOnView));
    }, [clickedOnView]);

    useEffect(() => {
        const items = localStorage.getItem('view');
        if (items) {
            setClickedOnView(JSON.parse(items));
        }
    }, []);

    useEffect(() => {
        getSubjects(grade)
            .then(data => {
                console.log("Subjects: ", data);
                setSubjects(data.subjects);

                // setQues([]);
                // setviewQues([]);
                onUpdateState({ grade, subject, chapter, lu, question: questions, viewQue: viewQues });
            })
            .catch(error => console.error('Error fetching subjects:', error));
    }, [grade]);

    useEffect(() => {
        getChapters(grade, subject)
            .then(data => {
                console.log("Chapters: ", data);
                setChapters(data.chapters);

                // setQues([]);
                // setviewQues([]);
                onUpdateState({ grade, subject, chapter, lu, question: questions, viewQue: viewQues });
            })
            .catch(error => console.error('Error fetching chapters:', error));
    }, [subject]);

    useEffect(() => {
        getLUs(grade, subject, chapter)
            .then(data => {
                console.log("LUs: ", data);
                let temp = [];
                for (let det of data.learning_units) {
                    temp.push({ id: det.ID, name: det.Name });
                }
                setLus(temp);

                if(questions.length === 0){handleSubmit();}
                // setQues([]);
                // setviewQues([]);
                onUpdateState({ grade, subject, chapter, lu, question: questions, viewQue: viewQues });
                console.log("LUs: ", data.learning_units);
            })
            .catch(error => console.error('Error fetching LUs:', error));
    }, [chapter]);

    useEffect(() => { }, [lu]);
    useEffect(() => { }, [questions]);
    // useEffect(() => {  },[lus]);

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = () => {
        getGrades()
            .then(data => {
                console.log("Grades: ", data);
                setGrades(data.grades);
            })
            .catch(error => console.error('Error fetching grades:', error));
    };

    const fetchSubjects = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGrade = event.target.value;
        onUpdateState({ grade: selectedGrade, subject, chapter, lu, question, viewQue });
    };

    const fetchChapters = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubject = event.target.value;
        onUpdateState({ grade, subject: selectedSubject, chapter, lu, question, viewQue });
    };

    const setLUID = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLU = event.target.value;

        // setQues([]);
        // setviewQues([]);
        console.log("final print .................");
        onUpdateState({ grade, subject, chapter, lu: selectedLU, question: questions, viewQue: viewQues });
        // onUpdateState({ grade, subject, chapter, lu: selectedLU , question, viewQue});
        
        setIsDisabled(false);
    };

    const fetchLUs = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChapter = event.target.value;
        onUpdateState({ grade, subject, chapter: selectedChapter, lu, question, viewQue });
    };

    const handleSubmit = () => {
        getLUQuestions(lu)
            .then((data: any) => {
                console.log("Questions: ", data);
                if (data.data.length === 0 && lu != "") {
                    handleShow();
                    setIsGenerateDisabled(false);
                    setQues([]);
                    setviewQues([]);
                    onUpdateState({ grade, subject, chapter, lu, question: questions, viewQue: viewQues });
                } else {

                    setQues(data.data);
                    onUpdateState({ grade, subject, chapter, lu, question: data.data, viewQue });
                    let temp1 = [];
                    for (let que_det of data.data) {
                        temp1.push({ 'question': que_det.Question });
                    }
                    // temp1.push({ 'question': data.data[0].Question })
                    setviewQues(temp1);
                    onUpdateState({ grade, subject, chapter, lu, question, viewQue: viewQues });
                    console.log("Questions:", viewQues);
                }
            })
            .catch((error: any) => console.error('Error fetching Questions:', error));
    };

    const generateQuestions = () => {
        //pass
        setLoading(true);
        let selected_lu = {};
        for(let l of lus){
            if (l.id === lu){
                selected_lu = l
                break
            }
            else{
                console.log("==========Something wrong======");
            }
        }

        console.log("LU data..............", selected_lu);
        generateQues(selected_lu, grade, subject, chapter,).then(
            data => {
                setLoading(false);
                console.log("Generated Ques ==============> ", data.data);

                setQues(data.data);
                onUpdateState({ grade, subject, chapter, lu, question: data.data, viewQue });
                let temp1 = [];
                for (let que_det of data.data) {
                    temp1.push({ 'question': que_det.Question });
                }
                // temp1.push({ 'question': data.data[0].Question })
                setviewQues(temp1);
                onUpdateState({ grade, subject, chapter, lu, question, viewQue: viewQues });
                console.log("Questions:", viewQues);
            }
        ).catch( error => {
            setLoading(false);
        })

        // setTimeout(() => {setLoading(false); handleSubmit();}, 3000);

    };


    const viewQuestion = (index: any) => {
        console.log("in Get Ques, ................", index);
        console.log("IN get ques................: Question ===>>", questions[index]);
        setClickedOnView(true);
        onUpdateClickedOnView(true, questions[index]);
    };

    return (
        <div className="row">
            <div className="col-md-12 mt-5">
                <h2 className="text-center">
                    Please select
                    <span className="fw-bold"> Grade </span>,
                    <span className="fw-bold">Subject </span>, and
                    <span className="fw-bold"> Chapter </span>
                    to review generated MCQs
                </h2>
            </div>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 d-flex justify-content-center py-2 mt-4">
                    <select className="btn dropdown-toggle border border-primary mx-3" style={{ maxWidth: '400px' }} value={grade} onChange={fetchSubjects}>
                        <option value="" disabled >Pick a grade</option>
                        {grades.map((grade, index) => (
                            <option key={index}>{grade}</option>
                        ))}
                    </select>

                    <select className="btn dropdown-toggle border border-primary mx-3" style={{ maxWidth: '400px' }} value={subject} onChange={fetchChapters}>
                        <option value="" disabled >Pick one of the given subjects</option>
                        {subjects.map((subject, index) => (
                            <option key={index}>{subject}</option>
                        ))}
                    </select>

                    <select className="btn dropdown-toggle border border-primary mx-3" style={{ maxWidth: '400px' }} value={chapter} onChange={fetchLUs}>
                        <option value="" disabled >Pick from the given chapters</option>
                        {chapters.map((chapter, index) => (
                            <option key={index}>{chapter}</option>
                        ))}
                    </select>

                    <select className="btn dropdown-toggle border border-primary mx-3" style={{ maxWidth: '400px' }} value={lu} onChange={setLUID}>
                        <option value="" disabled>Pick from the given LUs</option>
                        {lus.map((lu, index) => (
                            <option key={index} value={lu.id}>
                                {lu.id} &nbsp; {lu.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2"></div>
            </div>

            <div className="row d-flex justify-content-center mt-4">
                <button type="button" className="btn btn-primary me-3" style={{ width: '125px' }} disabled={isDisabled} onClick={handleSubmit}>
                    Submit
                </button>
                <button className="btn btn-primary btn-sm float-end ms-2" style={{ width: '125px' }} disabled={isGenerateDisabled} onClick={generateQuestions}>
                    GENERATE
                </button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>NOTE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        No generated questions found in the database. Please click on "GENERATE" button to generate questions!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>Understood</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            

            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-md-8 mb-2" style={{ backgroundColor: '#f9f9f9' }}>
                    {viewQues.map((question, index) => (
                        <div className="row" key={index}>
                            <div className="col-md-12 my-2">
                                Question Title: &nbsp; {question.question} &nbsp; &nbsp;
                                <button className="btn btn-primary btn-sm float-end" value={index} onClick={() => viewQuestion(index)}>
                                    VIEW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-5 mb-5 d-flex justify-content-center">
                <div className=" sweet-loading d-flex justify-content-center">
                    <SyncLoader
                        color={"black"}
                        loading={loading}
                        cssOverride={override}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={1}
                    />
                </div>
            </div>

        </div>
    );
};

export default GetQuesPage;