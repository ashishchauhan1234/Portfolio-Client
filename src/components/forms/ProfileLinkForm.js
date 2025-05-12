import React, { useState } from "react";
import "../CSS/ProfileLink.css";

function ProfileLinkForm({ link, setLinks }) {
  const [errors, setErrors] = useState([]);

  const validateLink = (linkItem) => {
    const newErrors = {};

    if (!linkItem.link_name.trim()) {
      newErrors.link_name = "Link name is required.";
    } else if (linkItem.link_name.length < 3) {
      newErrors.link_name = "Link name must be at least 3 characters.";
    }

    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)*[\w-]+\.[a-z]{2,}([/\w.-]*)*\/?$/i;

    if (!linkItem.url.trim()) {
      newErrors.url = "URL is required.";
    } else if (!urlPattern.test(linkItem.url)) {
      newErrors.url = "Enter a valid URL.";
    }

    return newErrors;
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...link];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);

    const currentErrors = [...errors];
    const validationErrors = validateLink(updatedLinks[index]);
    currentErrors[index] = validationErrors;
    setErrors(currentErrors);
  };

  const addNewLink = () => {
    setLinks([...link, { link_name: "", link_type: "LinkedIn", url: "" }]);
    setErrors([...errors, {}]);
  };

  const removeLink = (index) => {
    const updatedLinks = link.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    setErrors(updatedErrors);
  };

  return (
    <div className="profile-links-form-container p-3">
      <h5 className="mb-3">Profile Links</h5>
      {link.map((item, index) => (
        <div
          key={index}
          className="link-item row g-3 align-items-end mb-2 border p-2 rounded"
        >
          <div className="col-md-3">
            <label className="form-label">Link Name</label>
            <input
              type="text"
              className={`form-control ${
                errors[index]?.link_name ? "is-invalid" : ""
              }`}
              placeholder="e.g., My GitHub"
              value={item.link_name}
              onChange={(e) =>
                handleLinkChange(index, "link_name", e.target.value)
              }
              required
            />
            {errors[index]?.link_name && (
              <div className="invalid-feedback">{errors[index].link_name}</div>
            )}
          </div>
          <div className="col-md-3">
            <label className="form-label">Link Type</label>
            <select
              className="form-select"
              value={item.link_type}
              onChange={(e) =>
                handleLinkChange(index, "link_type", e.target.value)
              }
              required
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="GitHub">GitHub</option>
              <option value="Portfolio">Portfolio</option>
              <option value="Blog">Blog</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-5">
            <label className="form-label">URL</label>
            <input
              type="url"
              className={`form-control ${
                errors[index]?.url ? "is-invalid" : ""
              }`}
              placeholder="https://example.com"
              value={item.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              required
            />
            {errors[index]?.url && (
              <div className="invalid-feedback">{errors[index].url}</div>
            )}
          </div>
          <div className="col-md-1 text-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeLink(index)}
              disabled={link.length === 1}
            >
              &times;
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline-primary mt-2"
        onClick={addNewLink}
      >
        + Add Another Link
      </button>
    </div>
  );
}

export default ProfileLinkForm;

// import React from "react";
// import "../CSS/ProfileLink.css";

// // ProfileLinkForm Component
// function ProfileLinkForm({ link, setLinks }) {
//   const handleLinkChange = (index, field, value) => {
//     const updatedLinks = [...link];
//     updatedLinks[index][field] = value;
//     setLinks(updatedLinks);
//   };

//   const addNewLink = () => {
//     setLinks([...link, { link_name: "", link_type: "LinkedIn", url: "" }]);
//   };

//   const removeLink = (index) => {
//     const updatedLinks = link.filter((_, i) => i !== index);
//     setLinks(updatedLinks);
//   };

//   return (
//     <div className="profile-links-form-container p-3">
//       <h5 className="mb-3">Profile Links</h5>
//       {link.map((item, index) => (
//         <div key={index} className="link-item row g-3 align-items-end mb-2 border p-2 rounded">
//           <div className="col-md-3">
//             <label className="form-label">Link Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="e.g., My GitHub"
//               value={item.link_name}
//               onChange={(e) => handleLinkChange(index, "link_name", e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-3">
//             <label className="form-label">Link Type</label>
//             <select
//               className="form-select"
//               value={item.link_type}
//               onChange={(e) => handleLinkChange(index, "link_type", e.target.value)}
//               required
//             >
//               <option value="LinkedIn">LinkedIn</option>
//               <option value="GitHub">GitHub</option>
//               <option value="Portfolio">Portfolio</option>
//               <option value="Blog">Blog</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="col-md-5">
//             <label className="form-label">URL</label>
//             <input
//               type="url"
//               className="form-control"
//               placeholder="https://example.com"
//               value={item.url}
//               onChange={(e) => handleLinkChange(index, "url", e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-1 text-end">
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => removeLink(index)}
//               disabled={link.length === 1}
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       ))}
//       <button
//         type="button"
//         className="btn btn-outline-primary mt-2"
//         onClick={addNewLink}
//       >
//         + Add Another Link
//       </button>
//     </div>
//   );
// }

// export default ProfileLinkForm;

// -----------------------------------------------------------
// import React from "react";

// function ProfileLinkForm({ link, setLinks }) {
//   const handleLinkChange = (index, field, value) => {
//     const updatedLinks = [...link];
//     updatedLinks[index][field] = value;
//     setLinks(updatedLinks);
//   };

//   const addNewLink = () => {
//     setLinks([...link, { link_name: "", link_type: "LinkedIn", url: "" }]);
//   };

//   const removeLink = (index) => {
//     const updatedLinks = link.filter((_, i) => i !== index);
//     setLinks(updatedLinks);
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Profile Links</h5>
//       {link.map((item, index) => (
//         <div
//           key={index}
//           className="row g-3 align-items-end mb-2 border p-2 rounded"
//         >
//           <div className="col-md-3">
//             <label className="form-label">Link Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="e.g., My GitHub"
//               value={item.link_name}
//               onChange={(e) =>
//                 handleLinkChange(index, "link_name", e.target.value)
//               }
//               required
//             />
//           </div>
//           <div className="col-md-3">
//             <label className="form-label">Link Type</label>
//             <select
//               className="form-select"
//               value={item.link_type}
//               onChange={(e) =>
//                 handleLinkChange(index, "link_type", e.target.value)
//               }
//               required
//             >
//               <option value="LinkedIn">LinkedIn</option>
//               <option value="GitHub">GitHub</option>
//               <option value="Portfolio">Portfolio</option>
//               <option value="Blog">Blog</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="col-md-5">
//             <label className="form-label">URL</label>
//             <input
//               type="url"
//               className="form-control"
//               placeholder="https://example.com"
//               value={item.url}
//               onChange={(e) => handleLinkChange(index, "url", e.target.value)}
//               required
//             />
//           </div>
//           <div className="col-md-1 text-end">
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => removeLink(index)}
//               disabled={link.length === 1}
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       ))}
//       <button
//         type="button"
//         className="btn btn-outline-primary mt-2"
//         onClick={addNewLink}
//       >
//         + Add Another Link
//       </button>
//     </div>
//   );
// }

// export default ProfileLinkForm;
