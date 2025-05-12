import React, { useState } from "react";

function MyDetailsForm({ myDetails, setMyDetails, image, setImage }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Full name is required." : "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Enter a valid email address.";
      case "phone":
        return /^[0-9]{10}$/.test(value)
          ? ""
          : "Enter a valid 10-digit phone number.";
      case "resume":
        return value && !/^https?:\/\/.+/.test(value)
          ? "Enter a valid URL (http/https)."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);

    setMyDetails({ ...myDetails, [name]: value });
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setErrors({ ...errors, file: "Please upload a valid image file." });
      setImage(null);
    } else {
      setErrors({ ...errors, file: "" });
      setImage({ file });
    }
  };

  return (
    <div className="p-3">
      <h5 className="mb-3">My Personal Details</h5>
      <div className="row g-3">
        {/* Full Name */}
        <div className="col-sm-12 col-md-6">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={myDetails.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            placeholder="John Doe"
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="col-sm-12 col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={myDetails.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            placeholder="john@example.com"
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="col-sm-12 col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={myDetails.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            placeholder="9876543210"
            maxLength="10"
            required
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Profile Picture */}
        <div className="col-sm-12 col-md-6">
          <label htmlFor="profile-picture" className="form-label">Profile Picture</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChangeImage}
            className={`form-control ${errors.file ? "is-invalid" : ""}`}
            id="profile-picture"
          />
          {errors.file && <div className="invalid-feedback">{errors.file}</div>}
        </div>

        {/* Bio */}
        <div className="col-12">
          <label htmlFor="bio" className="form-label">Short Bio</label>
          <textarea
            name="bio"
            value={myDetails.bio}
            onChange={handleChange}
            className="form-control"
            id="bio"
            rows="3"
            placeholder="Tell us something about yourself..."
          />
        </div>

        {/* Resume */}
        <div className="col-sm-12 col-md-6">
          <label htmlFor="resume" className="form-label">Resume URL</label>
          <input
            type="url"
            name="resume"
            value={myDetails.resume}
            onChange={handleChange}
            className={`form-control ${errors.resume ? "is-invalid" : ""}`}
            id="resume"
            placeholder="https://resume.url"
          />
          {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
        </div>
      </div>
    </div>
  );
}

export default MyDetailsForm;


// import React from "react";

// function MyDetailsForm({ myDetails, setMyDetails, image, setImage }) {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMyDetails({ ...myDetails, [name]: value });
//   };

//   const handleChangeImage = (e) => {
//     const file = e.target.files[0];
//     setImage({ file });
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">My Personal Details</h5>
//       <div className="row g-3">
//         <div className="col-sm-12 col-md-6">
//           <label htmlFor="name" className="form-label">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={myDetails.name}
//             onChange={handleChange}
//             className="form-control"
//             id="name"
//             placeholder="John Doe"
//             required
//             aria-required="true"
//           />
//         </div>

//         <div className="col-sm-12 col-md-6">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={myDetails.email}
//             onChange={handleChange}
//             className="form-control"
//             id="email"
//             placeholder="john@example.com"
//             required
//             aria-required="true"
//           />
//         </div>

//         <div className="col-sm-12 col-md-6">
//           <label htmlFor="phone" className="form-label">
//             Phone
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={myDetails.phone}
//             onChange={handleChange}
//             className="form-control"
//             id="phone"
//             placeholder="+91 9876543210"
//             pattern="[0-9]{10}"
//             aria-describedby="phoneHelp"
//           />
//           <small id="phoneHelp" className="form-text text-muted">
//             Enter a 10-digit phone number.
//           </small>
//         </div>

//         <div className="col-sm-12 col-md-6">
//           <label htmlFor="profile-picture" className="form-label">
//             Profile Picture URL
//           </label>
//           <input
//             type="file"
//             name="file"
//             accept="image/*"
//             onChange={handleChangeImage}
//             className="form-control"
//             id="profile-picture"
//             aria-describedby="profilePictureHelp"
//           />
//           <small id="profilePictureHelp" className="form-text text-muted">
//             Upload your profile picture.
//           </small>
//         </div>

//         <div className="col-12">
//           <label htmlFor="bio" className="form-label">
//             Short Bio
//           </label>
//           <textarea
//             name="bio"
//             value={myDetails.bio}
//             onChange={handleChange}
//             className="form-control"
//             id="bio"
//             rows="3"
//             placeholder="Tell us something about yourself..."
//             aria-describedby="bioHelp"
//           />
//           <small id="bioHelp" className="form-text text-muted">
//             Share a brief description of yourself.
//           </small>
//         </div>

//         <div className="col-sm-12 col-md-6">
//           <label htmlFor="resume" className="form-label">
//             Resume URL
//           </label>
//           <input
//             type="url"
//             name="resume"
//             value={myDetails.resume}
//             onChange={handleChange}
//             className="form-control"
//             id="resume"
//             placeholder="https://resume.url"
//             aria-describedby="resumeHelp"
//           />
//           <small id="resumeHelp" className="form-text text-muted">
//             Enter the URL to your online resume.
//           </small>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyDetailsForm;
// -----------------------------------------------------------------

// import React from "react";

// function MyDetailsForm({ myDetails, setMyDetails, image, setImage }) {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMyDetails({ ...myDetails, [name]: value });
//   };
//   const handleChangeImage = (e) => {
//     const file = e.target.files[0];
//     setImage({ file });
//   };

//   return (
//     <div className="p-3">
//       <h5 className="mb-3">My Personal Details</h5>
//       <div className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={myDetails.name}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="John Doe"
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={myDetails.email}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="john@example.com"
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={myDetails.phone}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="+91 9876543210"
//             pattern="[0-9]{10}"
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Profile Picture URL</label>
//           <input
//             type="file"
//             name="file"
//             accept="image/*"
//             onChange={handleChangeImage}
//             className="form-control"
//             placeholder="https://img.url"
//           />
//         </div>
//         <div className="col-12">
//           <label className="form-label">Short Bio</label>
//           <textarea
//             name="bio"
//             value={myDetails.bio}
//             onChange={handleChange}
//             className="form-control"
//             rows="3"
//             placeholder="Tell us something about yourself..."
//           />
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Resume URL</label>
//           <input
//             type="url"
//             name="resume"
//             value={myDetails.resume}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="https://resume.url"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyDetailsForm;
