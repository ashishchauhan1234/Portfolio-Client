import React, { useState } from "react";
import { validateProject } from "./Validation";

function ProjectForm({ project, setProject }) {
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (index, field, value) => {
    const updatedProjects = [...project];
    updatedProjects[index][field] = value;

    // Run validation after updating the value
    const errors = validateProject(updatedProjects[index]);

    setProject(updatedProjects);
    setErrorMessages((prev) => ({ ...prev, [index]: errors }));
    console.log(`Updated project[${index}][${field}] = ${value}`);
  };

  const addProject = () => {
    const newProject = {
      proj_name: "",
      description: "",
      start_date: "",
      end_date: "",
      github_url: "",
      demo_url: "",
    };
    const updatedProjects = [...project, newProject];
    setProject(updatedProjects);
  };

  const removeProject = (index) => {
    const updatedProjects = project.filter((_, i) => i !== index);
    setProject(updatedProjects);
    setErrorMessages((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  return (
    <div className="p-3">
      <h5 className="mb-3">Project Details</h5>

      {project.map((proj, index) => (
        <div className="border rounded p-3 mb-4" key={index}>
          <div className="text-end mb-2">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeProject(index)}
              disabled={project.length === 1}
            >
              &times;
            </button>
          </div>

          <div className="row g-3">
            {[
              {
                label: "Project Name",
                name: "proj_name",
                type: "text",
                placeholder: "e.g., Portfolio Website",
              },
              { label: "Start Date", name: "start_date", type: "date" },
              { label: "End Date", name: "end_date", type: "date" },
              {
                label: "GitHub URL",
                name: "github_url",
                type: "url",
                placeholder: "e.g., https://github.com/username/project",
              },
              {
                label: "Demo URL",
                name: "demo_url",
                type: "url",
                placeholder: "e.g., https://demo.com/project",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div className="col-12 col-md-6" key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={proj[name]}
                  onChange={(e) => handleChange(index, name, e.target.value)}
                  className="form-control"
                  placeholder={placeholder || ""}
                  required
                />
                {errorMessages[index]?.[name] && (
                  <p className="text-danger">{errorMessages[index][name]}</p>
                )}
              </div>
            ))}

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={proj.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="form-control"
                rows="3"
                placeholder="Describe the project"
                required
              />
              {errorMessages[index]?.description && (
                <p className="text-danger">
                  {errorMessages[index].description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={addProject}
      >
        + Add More Projects
      </button>
    </div>
  );
}

export default ProjectForm;

// import React, { useState } from "react";
// import { End_Date_Validation } from "./Validation";

// function ProjectForm({ project, setProject }) {
//   const [errorMessages, setErrorMessages] = useState({});

//   const handleChange = (index, field, value) => {
//     const updatedProjects = [...project];

//     if (field === "end_date") {
//       // Validate end date before updating
//       const isValid = End_Date_Validation(updatedProjects[index].start_date, value);
//       if (isValid) {
//         updatedProjects[index][field] = value;
//         setErrorMessages((prev) => ({ ...prev, [index]: "" })); // Clear error for this index
//       } else {
//         setErrorMessages((prev) => ({ ...prev, [index]: "End date cannot be before start date." }));
//         return;
//       }
//     } else {
//       updatedProjects[index][field] = value;
//     }

//     setProject(updatedProjects);
//     console.log(`Updated project[${index}][${field}] = ${value}`);
//   };

//   const addProject = () => {
//     const newProject = {
//       proj_name: "",
//       description: "",
//       start_date: "",
//       end_date: "",
//       github_url: "",
//       demo_url: "",
//     };
//     const updatedProjects = [...project, newProject];
//     setProject(updatedProjects);
//     console.log("Added new project:", newProject);
//   };

//   const removeProject = (index) => {
//     const updatedProjects = project.filter((_, i) => i !== index);
//     setProject(updatedProjects);
//     setErrorMessages((prev) => {
//       const newState = { ...prev };
//       delete newState[index]; // Remove any error related to the removed project
//       return newState;
//     });
//     console.log(`Removed project at index ${index}`);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Project Details</h5>

//       {project.map((proj, index) => (
//         <div className="border rounded p-3 mb-4" key={index}>
//           <div className="text-end mb-2">
//             <button
//               type="button"
//               className="btn btn-danger btn-sm"
//               onClick={() => removeProject(index)}
//               disabled={project.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="row g-3">
//             <div className="col-12 col-md-6">
//               <label className="form-label">Project Name</label>
//               <input
//                 type="text"
//                 name="proj_name"
//                 value={proj.proj_name}
//                 onChange={(e) => handleChange(index, "proj_name", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., Portfolio Website"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">Description</label>
//               <textarea
//                 name="description"
//                 value={proj.description}
//                 onChange={(e) => handleChange(index, "description", e.target.value)}
//                 className="form-control"
//                 rows="3"
//                 placeholder="Describe the project"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={proj.start_date}
//                 onChange={(e) => handleChange(index, "start_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={proj.end_date}
//                 onChange={(e) => handleChange(index, "end_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//               {errorMessages[index] && <p className="text-danger">{errorMessages[index]}</p>}
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">GitHub URL</label>
//               <input
//                 type="url"
//                 name="github_url"
//                 value={proj.github_url}
//                 onChange={(e) => handleChange(index, "github_url", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., https://github.com/username/project"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">Demo URL</label>
//               <input
//                 type="url"
//                 name="demo_url"
//                 value={proj.demo_url}
//                 onChange={(e) => handleChange(index, "demo_url", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., https://demo.com/project"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         className="btn btn-outline-primary"
//         onClick={addProject}
//       >
//         + Add More Projects
//       </button>
//     </div>
//   );
// }

// export default ProjectForm;

// ----------------------------------------------------------

// import React from "react";
// import { End_Date_Validation } from "./Validation";

// function ProjectForm({ project, setProject }) {
//   const handleChange = (index, field, value) => {
//     const updatedProjects = [...project];
//     if(field === "end_date" && End_Date_Validation(project.start_date, value)){
//       updatedProjects[index][field] = value;
//       setProject(updatedProjects);
//     }
//     console.log(`Updated project[${index}][${field}] = ${value}`);
//   };

//   const addProject = () => {
//     const newProject = {
//       proj_name: "",
//       description: "",
//       start_date: "",
//       end_date: "",
//       github_url: "",
//       demo_url: "",
//     };
//     const updatedProjects = [...project, newProject];
//     setProject(updatedProjects);
//     console.log("Added new project:", newProject);
//   };

//   const removeProject = (index) => {
//     const updatedProjects = project.filter((_, i) => i !== index);
//     setProject(updatedProjects);
//     console.log(`Removed project at index ${index}`);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Project Details</h5>

//       {project.map((proj, index) => (
//         <div className="border rounded p-3 mb-4" key={index}>
//           <div className="text-end mb-2">
//             <button
//               type="button"
//               className="btn btn-danger btn-sm"
//               onClick={() => removeProject(index)}
//               disabled={project.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="row g-3">
//             <div className="col-12 col-md-6">
//               <label className="form-label">Project Name</label>
//               <input
//                 type="text"
//                 name="proj_name"
//                 value={proj.proj_name}
//                 onChange={(e) => handleChange(index, "proj_name", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., Portfolio Website"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">Description</label>
//               <textarea
//                 name="description"
//                 value={proj.description}
//                 onChange={(e) => handleChange(index, "description", e.target.value)}
//                 className="form-control"
//                 rows="3"
//                 placeholder="Describe the project"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={proj.start_date}
//                 onChange={(e) => handleChange(index, "start_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={proj.end_date}
//                 onChange={(e) => handleChange(index, "end_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">GitHub URL</label>
//               <input
//                 type="url"
//                 name="github_url"
//                 value={proj.github_url}
//                 onChange={(e) => handleChange(index, "github_url", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., https://github.com/username/project"
//                 required
//               />
//             </div>

//             <div className="col-12 col-md-6">
//               <label className="form-label">Demo URL</label>
//               <input
//                 type="url"
//                 name="demo_url"
//                 value={proj.demo_url}
//                 onChange={(e) => handleChange(index, "demo_url", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., https://demo.com/project"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         className="btn btn-outline-primary"
//         onClick={addProject}
//       >
//         + Add More Projects
//       </button>
//     </div>
//   );
// }

// export default ProjectForm;

// ----------------------------------------------------------------
// import React from "react";

// function ProjectForm({ project, setProject }) {
//   const handleChange = (index, field, value) => {
//     const updatedProjects = [...project];
//     updatedProjects[index][field] = value;
//     setProject(updatedProjects);
//     console.log(`Updated project[${index}][${field}] = ${value}`);
//   };

//   const addProject = () => {
//     const newProject = {
//       proj_name: "",
//       description: "",
//       start_date: "",
//       end_date: "",
//       github_url: "",
//       demo_url: "",
//     };
//     const updatedProjects = [...project, newProject];
//     setProject(updatedProjects);
//     console.log("Added new project:", newProject);
//   };

//   const removeProject = (index) => {
//     const updatedProjects = project.filter((_, i) => i !== index);
//     setProject(updatedProjects);
//     console.log(`Removed project at index ${index}`);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Project Details</h5>

//       {project.map((proj, index) => (
//         <div className="border rounded p-3 mb-4" key={index}>
//           <div className="text-end mb-2">
//             <button
//               type="button"
//               className="btn btn-danger btn-sm"
//               onClick={() => removeProject(index)}
//               disabled={project.length === 1}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label">Project Name</label>
//               <input
//                 type="text"
//                 name="proj_name"
//                 value={proj.proj_name}
//                 onChange={(e) => handleChange(index, "proj_name", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., Portfolio Website"
//                 required
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label">Description</label>
//               <textarea
//                 name="description"
//                 value={proj.description}
//                 onChange={(e) => handleChange(index, "description", e.target.value)}
//                 className="form-control"
//                 rows="3"
//                 placeholder="Describe the project"
//                 required
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label">Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={proj.start_date}
//                 onChange={(e) => handleChange(index, "start_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={proj.end_date}
//                 onChange={(e) => handleChange(index, "end_date", e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label">GitHub URL</label>
//               <input
//                 type="url"
//                 name="github_url"
//                 value={proj.github_url}
//                 onChange={(e) => handleChange(index, "github_url", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., https://github.com/username/project"
//                 required
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label">Demo URL</label>
//               <input
//                 type="url"
//                 name="demo_url"
//                 value={proj.demo_url}
//                 onChange={(e) => handleChange(index, "demo_url", e.target.value)}
//                 className="form-control"
//                 placeholder="e.g., https://demo.com/project"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         className="btn btn-outline-primary"
//         onClick={addProject}
//       >
//         + Add More Projects
//       </button>
//     </div>
//   );
// }

// export default ProjectForm;
