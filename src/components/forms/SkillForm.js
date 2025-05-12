import React, { useEffect, useState } from "react";
import SkillItem from "./SkillItems";
import "../CSS/Skill.css";

function SkillForm({ skill, setSkill }) {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log("SkillForm Mounted. Initial Skills:", skill);
  }, [skill]);

  const validateSkillItem = (item) => {
    const errors = {};
    if (!item.name.trim()) errors.name = "Skill name is required.";
    if (!item.category.trim()) errors.category = "Category is required.";
    return errors;
  };

  const validateAllSkills = (skills) => {
    const allErrors = skills.map(validateSkillItem);
    setErrors(allErrors);
    return allErrors.every((err) => Object.keys(err).length === 0);
  };

  const addNewSkill = (skill) => {
    const newSkill = { name: "", category: "" };
    return [...skill, newSkill];
  };

  const removeSkillAtIndex = (skill, index) => {
    return skill.filter((_, i) => i !== index);
  };

  const handleChange = (index, field, value) => {
    const updatedSkills = [...skill];
    updatedSkills[index][field] = value;
    setSkill(updatedSkills);
    validateAllSkills(updatedSkills); // live validation
  };

  const addSkill = () => {
    if (!validateAllSkills(skill)) {
      // Display error message instead of alert
      return;
    }
    const updatedSkills = addNewSkill(skill);
    setSkill(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = removeSkillAtIndex(skill, index);
    setSkill(updatedSkills);
    validateAllSkills(updatedSkills);
  };

  return (
    <div className="skill-form-container">
      <h5 className="skill-form-title">Skill Details</h5>

      {errors.length > 0 && (
        <div className="error-messages" style={{ color: 'red' }}>
          {errors.map((err, idx) => (
            <div key={idx}>{Object.values(err).join(", ")}</div>
          ))}
        </div>
      )}

      {skill.map((skillItem, index) => (
        <SkillItem
          key={index}
          skillItem={skillItem}
          index={index}
          handleChange={handleChange}
          removeSkill={removeSkill}
          isRemoveDisabled={skill.length === 1}
          validationError={errors[index] || {}}
        />
      ))}

      <button
        type="button"
        className="btn btn-outline-primary mt-3"
        onClick={addSkill}
      >
        + Add More Skills
      </button>
    </div>
  );
}

export default SkillForm;


// import React, { useEffect } from "react";
// import SkillItem from "./SkillItems";
// import "../CSS/Skill.css";

// function SkillForm({ skill, setSkill }) {
//   useEffect(() => {
//     console.log("SkillForm Mounted. Initial Skills:", skill);
//   }, []);

//   const addNewSkill = (skill) => {
//     const newSkill = { name: "", category: "" };
//     return [...skill, newSkill];
//   };

//   const removeSkillAtIndex = (skill, index) => {
//     return skill.filter((_, i) => i !== index);
//   };

//   const handleChange = (index, field, value) => {
//     const updatedSkills = [...skill];
//     updatedSkills[index][field] = value;
//     setSkill(updatedSkills);
//   };

//   const addSkill = () => {
//     const updatedSkills = addNewSkill(skill);
//     setSkill(updatedSkills);
//   };

//   const removeSkill = (index) => {
//     const updatedSkills = removeSkillAtIndex(skill, index);
//     setSkill(updatedSkills);
//   };

//   return (
//     <div className="skill-form-container">
//       <h5 className="skill-form-title">Skill Details</h5>

//       {skill.map((skillItem, index) => (
//         <SkillItem
//           key={index}
//           skillItem={skillItem}
//           index={index}
//           handleChange={handleChange}
//           removeSkill={removeSkill}
//           isRemoveDisabled={skill.length === 1}
//         />
//       ))}

//       <button
//         type="button"
//         className="btn btn-outline-primary mt-3"
//         onClick={addSkill}
//       >
//         + Add More Skills
//       </button>
//     </div>
//   );
// }

// export default SkillForm;

// --------------------------------------------------------------------

// import React, { useEffect } from "react";

// function SkillForm({ skill, setSkill }) {
//   useEffect(() => {
//     console.log("SkillForm Mounted. Initial Skills:", skill);
//   }, []);

//   const handleChange = (index, field, value) => {
//     const updatedSkills = [...skill];
//     updatedSkills[index][field] = value;
//     setSkill(updatedSkills);
//     console.log(`Updated skills[${index}][${field}] = ${value}`);
//     console.log("Updated skills list:", updatedSkills);
//   };

//   const addSkill = () => {
//     const newSkill = { name: "", category: "" };
//     const updatedSkills = [...skill, newSkill];
//     setSkill(updatedSkills);
//     console.log("Added new skill:", newSkill);
//     console.log("Updated skills list:", updatedSkills);
//   };

//   const removeSkill = (index) => {
//     const updatedSkills = skill.filter((_, i) => i !== index);
//     setSkill(updatedSkills);
//     console.log(`Removed skill at index ${index}`);
//     console.log("Updated skills list after removal:", updatedSkills);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Skill Details</h5>

//       {skill.map((skillItem, index) => (
//         <div className="row g-3 mb-3" key={index}>
//           <div className="col-md-12 text-end">
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => removeSkill(index)}
//               disabled={skill.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Skill Name</label>
//             <input
//               type="text"
//               value={skillItem.name}
//               onChange={(e) => handleChange(index, "name", e.target.value)}
//               className="form-control"
//               placeholder="e.g., JavaScript"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Category</label>
//             <select
//               value={skillItem.category}
//               onChange={(e) => handleChange(index, "category", e.target.value)}
//               className="form-select"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Technical">Technical</option>
//               <option value="Soft Skill">Soft Skill</option>
//             </select>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         className="btn btn-outline-primary mt-2"
//         onClick={addSkill}
//       >
//         + Add More Skills
//       </button>
//     </div>
//   );
// }

// export default SkillForm;
