import { useState } from "react";
import topics from "./../../assets/data/topics.json";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { countWords } from "../../utils/utils";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddNote = ({ addNote, alertMessage }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();


  const [selectedOption, setSelectedOption] = useState(null);

  // handle onChange event of the dropdown
  const handleSelectChange = (e) => {
    //   console.log(e);
    //{value:"",label:}
    setSelectedOption(e);
  };
  const isNUmberOfWordsValid = () => {
    if (countWords(getValues("note")) < 20) return false;
    return true;
  };

  const submit=({note,title})=>{
      if(selectedOption){
        addNote({
          topic:selectedOption.value,
          note:note,
          title:title
        });
        return true
      }
  }
  return (
    <div className="add-note-container">
      <h4 id="note-title">Would you like to share what you learnt? Add it!</h4>
      {alertMessage.message ? (
        <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(submit)}>
        <Select
          className="add-note-fields"
          name="topic"
          id="topic"
          placeholder="I want to talk about..."
          value={selectedOption}
          options={topics}
          onChange={handleSelectChange}
        />
        <p className="text-danger">
          {!selectedOption && <small>select a topic</small>}
        </p>
        <input 
             className="add-note-fields"
             name="title"
             id="title"
             placeholder="Title"
             {...register("title", {
                minLength: 4,
              })}
        />
        <p className="text-danger">
          {errors.title && <small>Title must be 4 characters and above</small>}
        </p>
        <textarea
          id="note"
          name="note"
          placeholder="note"
          className="add-note-fields"
          {...register("note", {
            required: true,
            validate: isNUmberOfWordsValid,
          })}
        ></textarea>

        <p className="text-danger">
          {errors.note && <small>Your note cannot be less than 20 words</small>}
        </p>
         <div className="mt-4">
        <button className=" btn btn-lg add-note-btn" type="submit">
          Post Note
        </button>
          <Link className="btn btn-lg add-note-btn" to="/notes" role="button">
           view Notes
          </Link>
        </div>
      </form>
    </div>
  );
};
export default AddNote;
