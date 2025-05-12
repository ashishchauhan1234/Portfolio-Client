// import React, { useState } from "react";
// import AddressForm from "./forms/AddressForm";
// import ProfileLinkForm from "./forms/ProfileLinkForm";
// import MyDetailsForm from "./forms/MyDetailsForm";
// import EducationForm from "./forms/EducationForm";
// import ExperienceForm from "./forms/ExperienceForm";
// import SkillForm from "./forms/SkillForm";
// import ProjectForm from "./forms/ProjectForm";
// import CertificateForm from "./forms/CertificateForm";
// import {
//   saveAddress,
//   saveCertificates,
//   saveEducation,
//   saveExperience,
//   saveImage,
//   saveMyDetails,
//   saveProfileLinks,
//   saveProjects,
//   saveSkills,
// } from "../save-api";

// function PortfolioForm() {
//   const [image, setImage] = useState(null);
//   const [file, setFile] = useState(null);
  
//   const [address, setAddress] = useState({
//     location: "",
//     city: "",
//     pincode: "",
//     state: "",
//     country: "",
//   });


//   const [profileLink, setProfileLink] = useState([
//     {
//       link_name: "",
//       link_type: "LinkedIn",
//       url: "",
//     },
//   ]);

//   const [myDetails, setMyDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     profile_picture: "",
//     bio: "",
//     resume: "",
//     address_id: 0,
//   });

//   const [education, setEducation] = useState({
//     institute: "",
//     course: "",
//     score_type: "CGPA",
//     score: "",
//     start_date: "",
//     end_date: "",
//   });

//   const [experience, setExperience] = useState({
//     organization: "",
//     role: "",
//     job_type: "Full-Time",
//     description: "",
//     start_date: "",
//     end_date: null,
//     is_current: false,
//   });

//   const [skill, setSkill] = useState({
//     name: "",
//     category: "Technical",
//   });

//   const [project, setProject] = useState({
//     proj_name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     github_url: "",
//     demo_url: "",
//   });

//   const [certificate, setCertificate] = useState({
//     name: "",
//     institute: "",
//     certi_file: "",
//     start_date: "",
//     end_date: "",
//     certificate_url: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Implement the logic to send this data to your backend here
//     try {
//       console.log("Submitting Portfolio Data:", {
//         image,
//         myDetails,
//         address,
//         education,
//         profileLink,
//         experience,
//         skill,
//         project,
//         certificate,
//         file
//       });

//       // const formData = new FormData();
//       // formData.append("file", image.file);
//       // const response = await saveImage(formData);
//       // const image_id = response.fileId;
//       // console.log(image_id);
//       // const address_id = await saveAddress(address);
//       // console.log("ID ::" + address_id.insertId);

//       // const updatedDetails = {
//       //   ...myDetails,
//       //   profile_picture: image_id,
//       //   address_id: address_id.insertId,
//       // };

//       // setMyDetails(updatedDetails);
//       // console.log("Final myDetails:", updatedDetails);
//       // const updatedEducation = {
//       //   ...education,
//       //   address_id: address_id.insertId,
//       // };
//       // console.log(updatedEducation);
//       // await saveEducation(updatedEducation);
//       // await saveExperience(experience);
//       // await saveProfileLinks(profileLink);

//       // await saveSkills(skill);
//       // await saveProjects(project);

//       const formData = new FormData();
//       formData.append("file", file.file);
//       const response = await saveImage(formData);
//       const file_id = response.fileId;
//       console.log(file_id);
//       const updatedCertificates = {
//         ...certificate,
//         certi_file: file_id,
//       };

//       await saveCertificates(updatedCertificates);

//       // await saveMyDetails(updatedDetails);

//       alert("Portfolio data saved successfully!");
//     } catch (error) {
//       console.error("Error saving portfolio:", error);
//       alert("Failed to save portfolio data.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create Your Portfolio</h2>
//       <form onSubmit={handleSubmit}>
//         <MyDetailsForm
//           myDetails={myDetails}
//           setMyDetails={setMyDetails}
//           image={image}
//           setImage={setImage}
//         />
//         {/* <EducationForm education={education} setEducation={setEducation} /> */}
//         {/* <ExperienceForm experience={experience} setExperience={setExperience} /> */}
//         {/* <SkillForm skill={skill} setSkill={setSkill} /> */}
//         {/* <ProjectForm project={project} setProject={setProject} /> */}
//         <CertificateForm
//           certificate={certificate}
//           setCertificate={setCertificate}
//           file={file}
//           setFile={setFile}
//         />
//         {/* <ProfileLinkForm link={profileLink} setLinks={setProfileLink} /> */}
//         {/* <AddressForm address={address} setAddress={setAddress} /> */}
//         <button type="submit" className="btn btn-success">
//           Submit Portfolio
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PortfolioForm;
// ----------------------------------------------------------------


// import React, { useState } from "react";
// import AddressForm from "./forms/AddressForm";
// import ProfileLinkForm from "./forms/ProfileLinkForm";
// import MyDetailsForm from "./forms/MyDetailsForm";
// import EducationForm from "./forms/EducationForm";
// import ExperienceForm from "./forms/ExperienceForm";
// import SkillForm from "./forms/SkillForm";
// import ProjectForm from "./forms/ProjectForm";
// import CertificateForm from "./forms/CertificateForm";
// import {
//   saveAddress,
//   saveCertificates,
//   saveEducation,
//   saveExperience,
//   saveImage,
//   saveMyDetails,
//   saveProfileLinks,
//   saveProjects,
//   saveSkills,
// } from "../save-api";

// function PortfolioForm() {
//   const [image, setImage] = useState([null]);
//   const [file, setFile] = useState([null]);

//   const [myDetails, setMyDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     profile_picture: "",
//     bio: "",
//     resume: "",
//     address_id: 0,
//   });

//   const [address, setAddress] = useState([
//     {
//       location: "",
//       city: "",
//       pincode: "",
//       state: "",
//       country: "",
//     },
//   ]);

//   const [profileLink, setProfileLink] = useState([
//     {
//       link_name: "",
//       link_type: "LinkedIn",
//       url: "",
//     },
//   ]);

//   const [education, setEducation] = useState([
//     {
//       institute: "",
//       course: "",
//       score_type: "CGPA",
//       score: "",
//       start_date: "",
//       end_date: "",
//     },
//   ]);

//   const [experience, setExperience] = useState([
//     {
//       organization: "",
//       role: "",
//       job_type: "Full-Time",
//       description: "",
//       start_date: "",
//       end_date: null,
//       is_current: false,
//     },
//   ]);

//   const [skill, setSkill] = useState([
//     {
//       name: "",
//       category: "Technical",
//     },
//   ]);

//   const [project, setProject] = useState([
//     {
//       proj_name: "",
//       description: "",
//       start_date: "",
//       end_date: "",
//       github_url: "",
//       demo_url: "",
//     },
//   ]);

//   const [certificate, setCertificate] = useState([
//     {
//       name: "",
//       institute: "",
//       certi_file: "",
//       start_date: "",
//       end_date: "",
//       certificate_url: "",
//     },
//   ]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting Portfolio Data:", {
//         image,
//         myDetails,
//         address,
//         education,
//         profileLink,
//         experience,
//         skill,
//         project,
//         certificate,
//         file,
//       });

//       const imageFormData = new FormData();
//       imageFormData.append("file", image.file);
//       const image_response = await saveImage(imageFormData);
//       console.log("image id : " + image_response.fileId);
//       const address_id = await saveAddress(address);
//       console.log("ID ::" + address_id.insertId);

//       const updatedDetails = {
//         ...myDetails,
//         profile_picture: image_response.fileId,
//         address_id: address_id[0].insertId,
//       };
//       console.log("Final myDetails:", updatedDetails);
//       setMyDetails(updatedDetails);

//       const updatedEducation = education.map((edu) => ({
//         ...edu,
//         address_id: address_id[0].insertId,
//       }));
//       console.log(updatedEducation);
//       await saveEducation(updatedEducation);
//       await saveExperience(experience);
//       await saveProfileLinks(profileLink);

//       await saveSkills(skill);
//       await saveProjects(project);

//       const formData = new FormData();
//       formData.append("file", file.file);
//       const response = await saveImage(formData);
//       const file_id = response.fileId;
//       console.log(file_id);
//       const updatedCertificates = certificate.map((cert) => ({
//         ...cert,
//         certi_file: file_id,
//       }));
//       console.log("Updated cetificate detiaails :: " + updatedCertificates);
//       await saveCertificates(updatedCertificates);

//       await saveMyDetails(updatedDetails);

//       alert("Portfolio data saved successfully!");
//     } catch (error) {
//       console.error("Error saving portfolio:", error);
//       alert("Failed to save portfolio data.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create Your Portfolio</h2>
//       <form onSubmit={handleSubmit}>
//         <MyDetailsForm
//           myDetails={myDetails}
//           setMyDetails={setMyDetails}
//           image={image}
//           setImage={setImage}
//         />
//         <EducationForm education={education} setEducation={setEducation} />
//         <ExperienceForm experience={experience} setExperience={setExperience} />
//         <SkillForm skill={skill} setSkill={setSkill} />
//         <ProjectForm project={project} setProject={setProject} />
//         <CertificateForm
//           certificate={certificate}
//           setCertificate={setCertificate}
//           file={file}
//           setFile={setFile}
//         />
//         <ProfileLinkForm link={profileLink} setLinks={setProfileLink} />
//         <AddressForm address={address} setAddress={setAddress} />
//         <button type="submit" className="btn btn-success">
//           Submit Portfolio
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PortfolioForm;
