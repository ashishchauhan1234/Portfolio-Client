import React, { useEffect, useState } from "react";

function ExperienceForm({ experience, setExperience }) {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log("ExperienceForm Mounted. Initial experience:", experience);
  }, [experience]);

  const validateField = (field, value, index, expObj) => {
    const newErrors = [...errors];
    if (!newErrors[index]) newErrors[index] = {};

    switch (field) {
      case "organization":
      case "role":
      case "job_type":
        newErrors[index][field] = !value ? "This field is required." : "";
        break;
      case "start_date":
        if (!value) {
          newErrors[index][field] = "Start date is required.";
        } else if (new Date(value) > new Date()) {
          newErrors[index][field] = "Start date cannot be in the future.";
        } else {
          newErrors[index][field] = "";
        }
        break;
      case "end_date":
        if (!expObj.is_current) {
          if (!value) {
            newErrors[index][field] = "End date is required unless current.";
          } else if (new Date(value) <= new Date(expObj.start_date)) {
            newErrors[index][field] = "End date must be after start date.";
          } else {
            newErrors[index][field] = "";
          }
        } else {
          newErrors[index][field] = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (
    index,
    field,
    value,
    experience,
    setExperience
  ) => {
    const updatedExperiences = [...experience];
    const expObj = { ...updatedExperiences[index] };

    if (field === "is_current") {
      expObj[field] = value === "yes";
      if (expObj[field]) {
        expObj["end_date"] = null;
      }
    } else {
      expObj[field] = value;
    }

    updatedExperiences[index] = expObj;
    setExperience(updatedExperiences);

    validateField(field, value, index, expObj);
  };

  const addNewExperience = (experience, setExperience) => {
    const newExp = {
      organization: "",
      role: "",
      job_type: "Full-Time",
      description: "",
      start_date: "",
      end_date: null,
      is_current: false,
    };
    setExperience([...experience, newExp]);
    setErrors([...errors, {}]);
  };

  const removeExperience = (index, experience, setExperience) => {
    const updatedExperiences = experience.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setExperience(updatedExperiences);
    setErrors(updatedErrors);
  };

  return (
    <div className="p-3">
      <h5 className="mb-3">Experience Details</h5>
      {experience.map((exp, index) => (
        <div className="row g-3 mb-4 border p-3" key={index}>
          <div className="col-md-12 text-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeExperience(index, experience, setExperience)}
              disabled={experience.length === 1}
            >
              &times;
            </button>
          </div>

          {/* Organization */}
          <div className="col-md-6">
            <label className="form-label">Organization</label>
            <input
              type="text"
              name="organization"
              value={exp.organization}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "organization",
                  e.target.value,
                  experience,
                  setExperience
                )
              }
              className={`form-control ${
                errors[index]?.organization ? "is-invalid" : ""
              }`}
              placeholder="e.g., Google"
            />
            <div className="invalid-feedback">
              {errors[index]?.organization}
            </div>
          </div>

          {/* Role */}
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <input
              type="text"
              name="role"
              value={exp.role}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "role",
                  e.target.value,
                  experience,
                  setExperience
                )
              }
              className={`form-control ${
                errors[index]?.role ? "is-invalid" : ""
              }`}
              placeholder="e.g., Software Engineer"
            />
            <div className="invalid-feedback">{errors[index]?.role}</div>
          </div>

          {/* Job Type */}
          <div className="col-md-6">
            <label className="form-label">Job Type</label>
            <select
              name="job_type"
              value={exp.job_type}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "job_type",
                  e.target.value,
                  experience,
                  setExperience
                )
              }
              className={`form-select ${
                errors[index]?.job_type ? "is-invalid" : ""
              }`}
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
            <div className="invalid-feedback">{errors[index]?.job_type}</div>
          </div>

          {/* Start Date */}
          <div className="col-md-6">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={exp.start_date}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "start_date",
                  e.target.value,
                  experience,
                  setExperience
                )
              }
              className={`form-control ${
                errors[index]?.start_date ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors[index]?.start_date}</div>
          </div>

          {/* Current Job */}
          <div className="col-md-6">
            <label className="form-label d-block">
              Are you currently working?
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name={`is_current_${index}`}
                value="yes"
                checked={exp.is_current === true}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "is_current",
                    e.target.value,
                    experience,
                    setExperience
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name={`is_current_${index}`}
                value="no"
                checked={exp.is_current === false}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "is_current",
                    e.target.value,
                    experience,
                    setExperience
                  )
                }
                className="form-check-input"
              />
              <label className="form-check-label">No</label>
            </div>
          </div>

          {/* End Date (only if not current) */}
          {!exp.is_current && (
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="end_date"
                value={exp.end_date || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "end_date",
                    e.target.value,
                    experience,
                    setExperience
                  )
                }
                className={`form-control ${
                  errors[index]?.end_date ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors[index]?.end_date}</div>
            </div>
          )}

          {/* Description */}
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "description",
                  e.target.value,
                  experience,
                  setExperience
                )
              }
              className="form-control"
              placeholder="Describe your role and responsibilities"
              rows="4"
            ></textarea>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary mt-2"
        onClick={() => addNewExperience(experience, setExperience)}
      >
        + Add Another Experience
      </button>
    </div>
  );
}

export default ExperienceForm;

// import React, { useEffect } from "react";

// function ExperienceForm({ experience, setExperience }) {
//   useEffect(() => {
//     console.log("ExperienceForm Mounted. Initial experience:", experience);
//   }, [experience]);
//   const handleInputChange = (
//     index,
//     field,
//     value,
//     experience,
//     setExperience
//   ) => {
//     const updatedExperiences = [...experience];
//     if (field === "is_current") {
//       updatedExperiences[index][field] = value === "yes";
//     } else {
//       updatedExperiences[index][field] = value;
//     }
//     setExperience(updatedExperiences);
//     console.log(`Updated experience[${index}][${field}] = ${value}`);
//     console.log("Updated experience list:", updatedExperiences);
//   };

//   // Add New Experience
//   const addNewExperience = (experience, setExperience) => {
//     const newExp = {
//       organization: "",
//       role: "",
//       job_type: "Full-Time",
//       description: "",
//       start_date: "",
//       end_date: null,
//       is_current: false,
//     };
//     const updated = [...experience, newExp];
//     setExperience(updated);
//     console.log("Added new experience entry:", newExp);
//     console.log("New experience list:", updated);
//   };

//   // Remove Experience
//   const removeExperience = (index, experience, setExperience) => {
//     const updatedExperiences = experience.filter((_, i) => i !== index);
//     setExperience(updatedExperiences);
//     console.log(`Removed experience at index ${index}`);
//     console.log("Updated experience list after removal:", updatedExperiences);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Experience Details</h5>
//       {experience.map((exp, index) => (
//         <div className="row g-3 mb-4 border p-3" key={index}>
//           <div className="col-md-12 text-end">
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => removeExperience(index, experience, setExperience)}
//               disabled={experience.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           {/* Form Fields */}
//           <div className="col-md-6">
//             <label className="form-label">Organization</label>
//             <input
//               type="text"
//               name="organization"
//               value={exp.organization}
//               onChange={(e) =>
//                 handleInputChange(
//                   index,
//                   "organization",
//                   e.target.value,
//                   experience,
//                   setExperience
//                 )
//               }
//               className="form-control"
//               placeholder="e.g., Google"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Role</label>
//             <input
//               type="text"
//               name="role"
//               value={exp.role}
//               onChange={(e) =>
//                 handleInputChange(
//                   index,
//                   "role",
//                   e.target.value,
//                   experience,
//                   setExperience
//                 )
//               }
//               className="form-control"
//               placeholder="e.g., Software Engineer"
//               required
//             />
//           </div>

//           {/* Job Type */}
//           <div className="col-md-6">
//             <label className="form-label">Job Type</label>
//             <select
//               name="job_type"
//               value={exp.job_type}
//               onChange={(e) =>
//                 handleInputChange(
//                   index,
//                   "job_type",
//                   e.target.value,
//                   experience,
//                   setExperience
//                 )
//               }
//               className="form-select"
//               required
//             >
//               <option value="">Select Job Type</option>
//               <option value="Full-Time">Full-Time</option>
//               <option value="Internship">Internship</option>
//               <option value="Freelance">Freelance</option>
//             </select>
//           </div>

//           {/* Dates */}
//           <div className="col-md-6">
//             <label className="form-label">Start Date</label>
//             <input
//               type="date"
//               name="start_date"
//               value={exp.start_date}
//               onChange={(e) =>
//                 handleInputChange(
//                   index,
//                   "start_date",
//                   e.target.value,
//                   experience,
//                   setExperience
//                 )
//               }
//               className="form-control"
//               required
//             />
//           </div>

//           {/* Current Job Option */}
//           <div className="col-md-6">
//             <label className="form-label d-block">
//               Are you currently working?
//             </label>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 name={`is_current_${index}`}
//                 value="yes"
//                 checked={exp.is_current === true}
//                 onChange={(e) =>
//                   handleInputChange(
//                     index,
//                     "is_current",
//                     e.target.value,
//                     experience,
//                     setExperience
//                   )
//                 }
//                 className="form-check-input"
//               />
//               <label className="form-check-label">Yes</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 name={`is_current_${index}`}
//                 value="no"
//                 checked={exp.is_current === false}
//                 onChange={(e) =>
//                   handleInputChange(
//                     index,
//                     "is_current",
//                     e.target.value,
//                     experience,
//                     setExperience
//                   )
//                 }
//                 className="form-check-input"
//               />
//               <label className="form-check-label">No</label>
//             </div>
//           </div>

//           {!exp.is_current && (
//             <div className="col-md-6">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={exp.end_date || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     index,
//                     "end_date",
//                     e.target.value,
//                     experience,
//                     setExperience
//                   )
//                 }
//                 className="form-control"
//               />
//             </div>
//           )}

//           {/* Description */}
//           <div className="col-12">
//             <label className="form-label">Description</label>
//             <textarea
//               name="description"
//               value={exp.description}
//               onChange={(e) =>
//                 handleInputChange(
//                   index,
//                   "description",
//                   e.target.value,
//                   experience,
//                   setExperience
//                 )
//               }
//               className="form-control"
//               placeholder="Describe your role and responsibilities"
//               rows="4"
//             ></textarea>
//           </div>
//         </div>
//       ))}
//       <button
//         type="button"
//         className="btn btn-outline-primary mt-2"
//         onClick={() => addNewExperience(experience, setExperience)}
//       >
//         + Add Another Experience
//       </button>
//     </div>
//   );
// }

// export default ExperienceForm;
// -------------------------------------------------------------------------------------------
// import React, { useEffect } from "react";

// function ExperienceForm({ experience, setExperience }) {
//   useEffect(() => {
//     console.log("ExperienceForm Mounted. Initial experience:", experience);
//   }, []);

//   const handleChange = (index, field, value) => {
//     const updatedExperiences = [...experience];
//     if (field === "is_current") {
//       updatedExperiences[index][field] = value === "yes";
//     } else {
//       updatedExperiences[index][field] = value;
//     }
//     setExperience(updatedExperiences);
//     console.log(`Updated experience[${index}][${field}] = ${value}`);
//     console.log("Updated experience list:", updatedExperiences);
//   };

//   const addNewExp = () => {
//     const newExp = {
//       organization: "",
//       role: "",
//       job_type: "Full-Time",
//       description: "",
//       start_date: "",
//       end_date: null,
//       is_current: false,
//     };
//     const updated = [...experience, newExp];
//     setExperience(updated);
//     console.log("Added new experience entry:", newExp);
//     console.log("New experience list:", updated);
//   };

//   const removeExp = (index) => {
//     const updatedExperiences = experience.filter((_, i) => i !== index);
//     setExperience(updatedExperiences);
//     console.log(`Removed experience at index ${index}`);
//     console.log("Updated experience list after removal:", updatedExperiences);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Experience Details</h5>
//       {experience.map((exp, index) => (
//         <div className="row g-3 mb-4 border p-3" key={index}>
//           <div className="col-md-12 text-end">
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => removeExp(index)}
//               disabled={experience.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Organization</label>
//             <input
//               type="text"
//               name="organization"
//               value={exp.organization}
//               onChange={(e) =>
//                 handleChange(index, "organization", e.target.value)
//               }
//               className="form-control"
//               placeholder="e.g., Google"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Role</label>
//             <input
//               type="text"
//               name="role"
//               value={exp.role}
//               onChange={(e) => handleChange(index, "role", e.target.value)}
//               className="form-control"
//               placeholder="e.g., Software Engineer"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Job Type</label>
//             <select
//               name="job_type"
//               value={exp.job_type}
//               onChange={(e) => handleChange(index, "job_type", e.target.value)}
//               className="form-select"
//               required
//             >
//               <option value="">Select Job Type</option>
//               <option value="Full-Time">Full-Time</option>
//               <option value="Internship">Internship</option>
//               <option value="Freelance">Freelance</option>
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Start Date</label>
//             <input
//               type="date"
//               name="start_date"
//               value={exp.start_date}
//               onChange={(e) =>
//                 handleChange(index, "start_date", e.target.value)
//               }
//               className="form-control"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label d-block">
//               Are you currently working?
//             </label>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 name={`is_current_${index}`}
//                 value="yes"
//                 checked={exp.is_current === true}
//                 onChange={(e) =>
//                   handleChange(index, "is_current", e.target.value)
//                 }
//                 className="form-check-input"
//                 id={`currentlyYes_${index}`}
//               />
//               <label
//                 className="form-check-label"
//                 htmlFor={`currentlyYes_${index}`}
//               >
//                 Yes
//               </label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 type="radio"
//                 name={`is_current_${index}`}
//                 value="no"
//                 checked={exp.is_current === false}
//                 onChange={(e) =>
//                   handleChange(index, "is_current", e.target.value)
//                 }
//                 className="form-check-input"
//                 id={`currentlyNo_${index}`}
//               />
//               <label
//                 className="form-check-label"
//                 htmlFor={`currentlyNo_${index}`}
//               >
//                 No
//               </label>
//             </div>
//           </div>

//           {!exp.is_current && (
//             <div className="col-md-6">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={exp.end_date || ""}
//                 onChange={(e) =>
//                   handleChange(index, "end_date", e.target.value)
//                 }
//                 className="form-control"
//               />
//             </div>
//           )}

//           <div className="col-12">
//             <label className="form-label">Description</label>
//             <textarea
//               name="description"
//               value={exp.description}
//               onChange={(e) =>
//                 handleChange(index, "description", e.target.value)
//               }
//               className="form-control"
//               placeholder="Describe your role and responsibilities"
//               rows="4"
//             ></textarea>
//           </div>
//         </div>
//       ))}
//       <button
//         type="button"
//         className="btn btn-outline-primary mt-2"
//         onClick={addNewExp}
//       >
//         + Add Another Experience
//       </button>
//     </div>
//   );
// }

// export default ExperienceForm;
