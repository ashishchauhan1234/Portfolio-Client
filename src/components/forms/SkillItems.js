import React from "react";

function SkillItem({
  skillItem,
  index,
  handleChange,
  removeSkill,
  isRemoveDisabled,
  validationError = {},
}) {
  return (
    <div className="skill-item row g-3 mb-3">
      <div className="col-md-12 text-end">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => removeSkill(index)}
          disabled={isRemoveDisabled}
        >
          &times;
        </button>
      </div>

      <div className="col-md-6">
        <label className="form-label">Skill Name</label>
        <input
          type="text"
          value={skillItem.name}
          onChange={(e) => handleChange(index, "name", e.target.value)}
          className={`form-control ${validationError.name ? "is-invalid" : ""}`}
          placeholder="e.g., JavaScript"
        />
        {validationError.name && (
          <div className="invalid-feedback">{validationError.name}</div>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">Category</label>
        <select
          value={skillItem.category}
          onChange={(e) => handleChange(index, "category", e.target.value)}
          className={`form-select ${validationError.category ? "is-invalid" : ""}`}
        >
          <option value="">Select Category</option>
          <option value="Technical">Technical</option>
          <option value="Soft Skill">Soft Skill</option>
        </select>
        {validationError.category && (
          <div className="invalid-feedback">{validationError.category}</div>
        )}
      </div>
    </div>
  );
}

export default SkillItem;


// ----------------------------------

// import React from "react";

// function SkillItem({
//   skillItem,
//   index,
//   handleChange,
//   removeSkill,
//   isRemoveDisabled,
// }) {
//   return (
//     <div className="skill-item row g-3 mb-3">
//       <div className="col-md-12 text-end">
//         <button
//           type="button"
//           className="btn btn-danger"
//           onClick={() => removeSkill(index)}
//           disabled={isRemoveDisabled}
//         >
//           &times;
//         </button>
//       </div>

//       <div className="col-md-6">
//         <label className="form-label">Skill Name</label>
//         <input
//           type="text"
//           value={skillItem.name}
//           onChange={(e) => handleChange(index, "name", e.target.value)}
//           className="form-control"
//           placeholder="e.g., JavaScript"
//           required
//         />
//       </div>

//       <div className="col-md-6">
//         <label className="form-label">Category</label>
//         <select
//           value={skillItem.category}
//           onChange={(e) => handleChange(index, "category", e.target.value)}
//           className="form-select"
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Technical">Technical</option>
//           <option value="Soft Skill">Soft Skill</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default SkillItem;
