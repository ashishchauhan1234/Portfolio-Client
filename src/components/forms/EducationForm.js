import React, { useState } from "react";
import "../CSS/Education.css";

function EducationForm({ education, setEducation }) {
  const [errors, setErrors] = useState({});

  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;

    const edu = updatedEducation[index];
    const newErrors = { ...errors };

    if (field === "score") {
      const scoreNum = parseFloat(value);
      if (
        isNaN(scoreNum) ||
        scoreNum < 0 ||
        (edu.score_type === "CGPA" && scoreNum > 10) ||
        (edu.score_type === "Percentage" && scoreNum > 100)
      ) {
        newErrors.score = "Invalid score based on selected score type.";
      } else {
        delete newErrors.score;
      }
    }

    if (field === "end_date" && edu.start_date && value < edu.start_date) {
      newErrors.end_date = "End date cannot be earlier than start date.";
    } else {
      delete newErrors.end_date;
    }

    if (field === "start_date" && edu.end_date && edu.end_date < value) {
      newErrors.start_date = "Start date cannot be after end date.";
    } else {
      delete newErrors.start_date;
    }

    setErrors(newErrors);
    setEducation(updatedEducation);
    console.log(`Updated education[${index}][${field}] = ${value}`);
  };

  const addNewEdu = () => {
    const lastEdu = education[education.length - 1];
    const newErrors = { ...errors };

    if (
      !lastEdu.institute ||
      !lastEdu.course ||
      !lastEdu.score ||
      !lastEdu.start_date ||
      !lastEdu.end_date
    ) {
      newErrors.add_new =
        "Please complete the current education entry before adding a new one.";
    } else {
      delete newErrors.add_new;
    }

    setErrors(newErrors);

    if (!newErrors.add_new) {
      const newEdu = {
        institute: "",
        course: "",
        score_type: "CGPA",
        score: "",
        start_date: "",
        end_date: "",
      };
      const updatedEdu = [...education, newEdu];
      setEducation(updatedEdu);
    }
  };

  const removeEdu = (index) => {
    const updatedEdu = education.filter((_, i) => i !== index);
    setEducation(updatedEdu);
  };

  return (
    <div className="form-section">
      <h5 className="form-section-title">Education Details</h5>

      {education.map((edu, index) => (
        <div className="education-entry" key={index}>
          <div className="remove-btn-container">
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeEdu(index)}
              disabled={education.length === 1}
            >
              &times;
            </button>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="form-label">Institute</label>
              <input
                type="text"
                name="institute"
                value={edu.institute}
                onChange={(e) =>
                  handleChange(index, "institute", e.target.value)
                }
                className="form-control"
                placeholder="e.g., MIT"
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label className="form-label">Course</label>
              <input
                type="text"
                name="course"
                value={edu.course}
                onChange={(e) => handleChange(index, "course", e.target.value)}
                className="form-control"
                placeholder="e.g., Computer Science"
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label className="form-label">Score Type</label>
              <select
                name="score_type"
                value={edu.score_type}
                onChange={(e) =>
                  handleChange(index, "score_type", e.target.value)
                }
                className="form-select"
                required
              >
                <option value="">Select Score Type</option>
                <option value="CGPA">CGPA</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="form-label">Score</label>
              <input
                type="number"
                name="score"
                value={edu.score}
                onChange={(e) => handleChange(index, "score", e.target.value)}
                className="form-control"
                min="0"
                max={edu.score_type === "CGPA" ? "10" : "100"}
                placeholder="e.g., 8.5 or 85"
                required
              />
              {errors.score && (
                <div className="error-message">{errors.score}</div>
              )}
            </div>

            <div className="form-group col-md-6">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={edu.start_date}
                onChange={(e) =>
                  handleChange(index, "start_date", e.target.value)
                }
                className="form-control"
                required
              />
              {errors.start_date && (
                <div className="error-message">{errors.start_date}</div>
              )}
            </div>

            <div className="form-group col-md-6">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="end_date"
                value={edu.end_date}
                onChange={(e) =>
                  handleChange(index, "end_date", e.target.value)
                }
                className="form-control"
                required
              />
              {errors.end_date && (
                <div className="error-message">{errors.end_date}</div>
              )}
            </div>
          </div>
        </div>
      ))}

      {errors.add_new && <div className="error-message">{errors.add_new}</div>}

      <div className="add-more-container">
        <button
          type="button"
          className="btn btn-outline-primary add-more-btn"
          onClick={addNewEdu}
        >
          + Add More Education
        </button>
      </div>
    </div>
  );
}

export default EducationForm;

// import React, { useEffect } from "react";
// import "../CSS/Education.css";

// function EducationForm({ education, setEducation }) {
//   useEffect(() => {
//     console.log("EducationForm Mounted. Initial Education:", education);
//   }, []);

//   const handleChange = (index, field, value) => {
//     const updatedEducation = [...education];
//     updatedEducation[index][field] = value;
//     setEducation(updatedEducation);
//     console.log(`Updated education[${index}][${field}] = ${value}`);
//   };

//   const addNewEdu = () => {
//     const newEdu = {
//       institute: "",
//       course: "",
//       score_type: "CGPA",
//       score: "",
//       start_date: "",
//       end_date: "",
//     };
//     const updatedEdu = [...education, newEdu];
//     setEducation(updatedEdu);
//   };

//   const removeEdu = (index) => {
//     const updatedEdu = education.filter((_, i) => i !== index);
//     setEducation(updatedEdu);
//   };

//   return (
//     <div className="form-section">
//       <h5 className="form-section-title">Education Details</h5>

//       {education.map((edu, index) => (
//         <div className="education-entry" key={index}>
//           <div className="remove-btn-container">
//             <button
//               type="button"
//               className="remove-btn"
//               onClick={() => removeEdu(index)}
//               disabled={education.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label className="form-label">Institute</label>
//               <input
//                 type="text"
//                 name="institute"
//                 value={edu.institute}
//                 onChange={(e) => handleChange(index, "institute", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., MIT"
//                 required
//               />
//             </div>

//             <div className="form-group col-md-6">
//               <label className="form-label">Course</label>
//               <input
//                 type="text"
//                 name="course"
//                 value={edu.course}
//                 onChange={(e) => handleChange(index, "course", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., Computer Science"
//                 required
//               />
//             </div>

//             <div className="form-group col-md-6">
//               <label className="form-label">Score Type</label>
//               <select
//                 name="score_type"
//                 value={edu.score_type}
//                 onChange={(e) => handleChange(index, "score_type", e.target.value)}
//                 className="form-select"
//                 required
//               >
//                 <option value="">Select Score Type</option>
//                 <option value="CGPA">CGPA</option>
//                 <option value="Percentage">Percentage</option>
//               </select>
//             </div>

//             <div className="form-group col-md-6">
//               <label className="form-label">Score</label>
//               <input
//                 type="number"
//                 name="score"
//                 value={edu.score}
//                 onChange={(e) => handleChange(index, "score", e.target.value)}
//                 className="form-control"
//                 min="0"
//                 max="100"
//                 placeholder="e.g., 85"
//                 required
//               />
//             </div>

//             <div className="form-group col-md-6">
//               <label className="form-label">Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={edu.start_date}
//                 onChange={(e) => handleChange(index, "start_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="form-group col-md-6">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={edu.end_date}
//                 onChange={(e) => handleChange(index, "end_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="add-more-container">
//         <button
//           type="button"
//           className="btn btn-outline-primary add-more-btn"
//           onClick={addNewEdu}
//         >
//           + Add More Education
//         </button>
//       </div>
//     </div>
//   );
// }

// export default EducationForm;

// -----------------------------------------------------------------
// import React, { useEffect } from "react";

// function EducationForm({ education, setEducation }) {
//   useEffect(() => {
//     console.log("ExperienceForm Mounted. Initial Education:", education);
//   }, []);

//   const handleChange = (index, field, value) => {
//     const updatedEducation = [...education];
//     updatedEducation[index][field] = value;
//     setEducation(updatedEducation);
//     console.log(`Updated education[${index}][${field}] = ${value}`);
//     console.log("Updated education list:", updatedEducation);
//   };

//   const addNewEdu = () => {
//     const newEdu = {
//       institute: "",
//       course: "",
//       score_type: "CGPA",
//       score: "",
//       start_date: "",
//       end_date: "",
//     };
//     const updatedEdu = [...education, newEdu];
//     setEducation(updatedEdu);
//     console.log("Added new Education entry:", newEdu);
//     console.log("New education list:", updatedEdu);
//   };

//   const removeEdu = (index) => {
//     const updatedEdu = education.filter((_, i) => i !== index);
//     setEducation(updatedEdu);
//     console.log(`Removed education at index ${index}`);
//     console.log("Updated educaation list after removal:", updatedEdu);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Education Details</h5>

//       {education.map((edu, index) => (
//         <div className="row g-3" key={index}>
//           <div className="col-md-12 text-end">
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => removeEdu(index)}
//               disabled={education.length === 1}
//             >
//               &times;
//             </button>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Institute</label>
//             <input
//               type="text"
//               name="institute"
//               onChange={(e) => handleChange(index, "institute", e.target.value)}
//               className="form-control"
//               placeholder="e.g., MIT"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Course</label>
//             <input
//               type="text"
//               name="course"
//               onChange={(e) => handleChange(index, "course", e.target.value)}
//               className="form-control"
//               placeholder="e.g., Computer Science"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Score Type</label>
//             <select
//               name="score_type"
//               onChange={(e) =>
//                 handleChange(index, "score_type", e.target.value)
//               }
//               className="form-select"
//               required
//             >
//               <option value="">Select Score Type</option>
//               <option value="CGPA">CGPA</option>
//               <option value="Percentage">Percentage</option>
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Score</label>
//             <input
//               type="number"
//               name="score"
//               onChange={(e) => handleChange(index, "score", e.target.value)}
//               className="form-control"
//               min="0"
//               max="100"
//               placeholder="e.g., 85"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Start Date</label>
//             <input
//               type="date"
//               name="start_date"
//               onChange={(e) =>
//                 handleChange(index, "start_date", e.target.value)
//               }
//               className="form-control"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">End Date</label>
//             <input
//               type="date"
//               name="end_date"
//               onChange={(e) => handleChange(index, "end_date", e.target.value)}
//               className="form-control"
//               required
//             />
//           </div>
//         </div>
//       ))}
//       <button
//         type="button"
//         className="btn btn-outline-primary mt-2"
//         onClick={addNewEdu}
//       >
//         + Add More Education
//       </button>
//     </div>
//   );
// }

// export default EducationForm;
