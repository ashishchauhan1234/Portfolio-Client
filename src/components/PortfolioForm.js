import React, { useState } from "react";

// Form Components
import AddressForm from "./forms/AddressForm";
import ProfileLinkForm from "./forms/ProfileLinkForm";
import MyDetailsForm from "./forms/MyDetailsForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillForm from "./forms/SkillForm";
import ProjectForm from "./forms/ProjectForm";
import CertificateForm from "./forms/CertificateForm";

// API Services
import {
  saveAddress,
  saveCertificates,
  saveEducation,
  saveExperience,
  saveImage,
  saveMyDetails,
  saveProfileLinks,
  saveProjects,
  saveSkills,
} from "../save-api";

function PortfolioForm() {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Form state
  const [image, setImage] = useState([null]);
  const [file, setFile] = useState([null]);
  const [myDetails, setMyDetails] = useState({
    name: "",
    email: "",
    phone: "",
    profile_picture: "",
    bio: "",
    resume: "",
    address_id: 0,
  });
  const [address, setAddress] = useState([
    { location: "", city: "", pincode: "", state: "", country: "" },
  ]);
  const [profileLink, setProfileLink] = useState([
    { link_name: "", link_type: "LinkedIn", url: "" },
  ]);
  const [education, setEducation] = useState([
    {
      institute: "",
      course: "",
      score_type: "CGPA",
      score: "",
      start_date: "",
      end_date: "",
    },
  ]);
  const [experience, setExperience] = useState([
    {
      organization: "",
      role: "",
      job_type: "Full-Time",
      description: "",
      start_date: "",
      end_date: null,
      is_current: false,
    },
  ]);
  const [skill, setSkill] = useState([{ name: "", category: "Technical" }]);
  const [project, setProject] = useState([
    {
      proj_name: "",
      description: "",
      start_date: "",
      end_date: "",
      github_url: "",
      demo_url: "",
    },
  ]);
  const [certificate, setCertificate] = useState([
    {
      name: "",
      institute: "",
      certi_file: "",
      start_date: "",
      end_date: "",
      certificate_url: "",
    },
  ]);

  // Reset form after submission
  const resetForm = () => {
    setImage([null]);
    setFile([null]);
    setMyDetails({
      name: "",
      email: "",
      phone: "",
      profile_picture: "",
      bio: "",
      resume: "",
      address_id: 0,
    });
    setAddress([
      { location: "", city: "", pincode: "", state: "", country: "" },
    ]);
    setProfileLink([{ link_name: "", link_type: "LinkedIn", url: "" }]);
    setEducation([
      {
        institute: "",
        course: "",
        score_type: "CGPA",
        score: "",
        start_date: "",
        end_date: "",
      },
    ]);
    setExperience([
      {
        organization: "",
        role: "",
        job_type: "Full-Time",
        description: "",
        start_date: "",
        end_date: null,
        is_current: false,
      },
    ]);
    setSkill([{ name: "", category: "Technical" }]);
    setProject([
      {
        proj_name: "",
        description: "",
        start_date: "",
        end_date: "",
        github_url: "",
        demo_url: "",
      },
    ]);
    setCertificate([
      {
        name: "",
        institute: "",
        certi_file: "",
        start_date: "",
        end_date: "",
        certificate_url: "",
      },
    ]);
  };

  // Step validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          validateMyDetails() && validateAddress() && validateProfileLinks()
        );
      case 2:
        return (
          validateEducation() && validateProject() && validateCertificates()
        );
      case 3:
        return validateExperience() && validateSkills();
      default:
        return false;
    }
  };

  // Validation functions for each section
  const validateMyDetails = () => {
    const { name, email, phone } = myDetails;
    return name && email && phone;
  };

  const validateAddress = () => {
    const { location, city, pincode, state, country } = address[0];
    return location && city && pincode && state && country;
  };

  const validateProfileLinks = () => {
    const { link_name, url } = profileLink[0];
    return link_name && url;
  };

  const validateEducation = () => {
    return education.every((edu) => edu.institute && edu.course && edu.score);
  };

  const validateProject = () => {
    return project.every((proj) => proj.proj_name && proj.description);
  };

  const validateCertificates = () => {
    return certificate.every(
      (cert) => cert.name && cert.institute && cert.certificate_url
    );
  };

  const validateExperience = () => {
    return experience.every(
      (exp) => exp.organization && exp.role && exp.description && exp.start_date
    );
  };

  const validateSkills = () => {
    return skill.every((sk) => sk.name && sk.category);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🔄 Submitting Portfolio Data...");
      const imageFormData = new FormData();
      imageFormData.append("file", image.file);
      const imageResponse = await saveImage(imageFormData);
      const profile_picture_id = imageResponse.fileId;

      const addressResponse = await saveAddress(address);
      const address_id = addressResponse.insertId;

      const updatedDetails = {
        ...myDetails,
        profile_picture: profile_picture_id,
        address_id,
      };

      const fileIds = [];
      for (let i = 0; i < file.length; i++) {
        const fileFormData = new FormData();
        fileFormData.append("file", file[i]);
        try {
          const response = await saveImage(fileFormData);
          fileIds.push(response.fileId);
        } catch (error) {
          console.error(`❌ Failed to upload file at index ${i}:`, error);
          fileIds.push(null);
        }
      }

      const updatedCertificates = certificate.map((cert, index) => ({
        ...cert,
        certi_file: fileIds[index] || "",
      }));

      await Promise.all([
        saveProfileLinks(profileLink),
        saveExperience(experience),
        saveEducation(education),
        saveSkills(skill),
        saveProjects(project),
        saveCertificates(updatedCertificates),
        saveMyDetails(updatedDetails),
      ]);

      alert("✅ Portfolio data saved successfully!");
      resetForm();
    } catch (error) {
      console.error("❌ Error saving portfolio:", error);
      alert("Failed to save portfolio data.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Create Your Portfolio</h2>

      {/* Step navigation */}
      <div className="mb-4">
        <ul className="nav nav-pills justify-content-center">
          {["Personal Info", "Academics", "Work & Skills"].map((label, idx) => (
            <li className="nav-item" key={idx}>
              <span className={`nav-link ${step === idx + 1 ? "active" : ""}`}>
                Step {idx + 1}: {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="progress mt-2" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(step / 3) * 100}%` }}
            aria-valuenow={(step / 3) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      {/* Form Sections */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            {step === 1 && (
              <>
                <MyDetailsForm
                  myDetails={myDetails}
                  setMyDetails={setMyDetails}
                  image={image}
                  setImage={setImage}
                />
                <AddressForm address={address} setAddress={setAddress} />
                <ProfileLinkForm link={profileLink} setLinks={setProfileLink} />
              </>
            )}
            {step === 2 && (
              <>
                <EducationForm
                  education={education}
                  setEducation={setEducation}
                />
                <ProjectForm project={project} setProject={setProject} />
                <CertificateForm
                  certificate={certificate}
                  setCertificate={setCertificate}
                  file={file}
                  setFile={setFile}
                />
              </>
            )}
            {step === 3 && (
              <>
                <ExperienceForm
                  experience={experience}
                  setExperience={setExperience}
                />
                <SkillForm skill={skill} setSkill={setSkill} />
              </>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={prevStep}
            disabled={step === 1}
          >
            Previous
          </button>
          <div>
            {step === 3 ? (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PortfolioForm;

// import React, { useState } from "react";

// // Form Components
// import AddressForm from "./forms/AddressForm";
// import ProfileLinkForm from "./forms/ProfileLinkForm";
// import MyDetailsForm from "./forms/MyDetailsForm";
// import EducationForm from "./forms/EducationForm";
// import ExperienceForm from "./forms/ExperienceForm";
// import SkillForm from "./forms/SkillForm";
// import ProjectForm from "./forms/ProjectForm";
// import CertificateForm from "./forms/CertificateForm";

// // API Services
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
//   const [step, setStep] = useState(1);
//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   // Form state
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
//     { location: "", city: "", pincode: "", state: "", country: "" },
//   ]);
//   const [profileLink, setProfileLink] = useState([
//     { link_name: "", link_type: "LinkedIn", url: "" },
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
//   const [skill, setSkill] = useState([{ name: "", category: "Technical" }]);
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

//   // Reset form after submission
//   const resetForm = () => {
//     setImage([null]);
//     setFile([null]);
//     setMyDetails({
//       name: "",
//       email: "",
//       phone: "",
//       profile_picture: "",
//       bio: "",
//       resume: "",
//       address_id: 0,
//     });
//     setAddress([
//       { location: "", city: "", pincode: "", state: "", country: "" },
//     ]);
//     setProfileLink([{ link_name: "", link_type: "LinkedIn", url: "" }]);
//     setEducation([
//       {
//         institute: "",
//         course: "",
//         score_type: "CGPA",
//         score: "",
//         start_date: "",
//         end_date: "",
//       },
//     ]);
//     setExperience([
//       {
//         organization: "",
//         role: "",
//         job_type: "Full-Time",
//         description: "",
//         start_date: "",
//         end_date: null,
//         is_current: false,
//       },
//     ]);
//     setSkill([{ name: "", category: "Technical" }]);
//     setProject([
//       {
//         proj_name: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         github_url: "",
//         demo_url: "",
//       },
//     ]);
//     setCertificate([
//       {
//         name: "",
//         institute: "",
//         certi_file: "",
//         start_date: "",
//         end_date: "",
//         certificate_url: "",
//       },
//     ]);
//   };

//   // Form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("🔄 Submitting Portfolio Data...");
//       const imageFormData = new FormData();
//       imageFormData.append("file", image.file);
//       const imageResponse = await saveImage(imageFormData);
//       const profile_picture_id = imageResponse.fileId;

//       const addressResponse = await saveAddress(address);
//       const address_id = addressResponse.insertId;

//       const updatedDetails = {
//         ...myDetails,
//         profile_picture: profile_picture_id,
//         address_id,
//       };

//       const fileIds = [];
//       for (let i = 0; i < file.length; i++) {
//         const fileFormData = new FormData();
//         fileFormData.append("file", file[i]);
//         try {
//           const response = await saveImage(fileFormData);
//           fileIds.push(response.fileId);
//         } catch (error) {
//           console.error(`❌ Failed to upload file at index ${i}:`, error);
//           fileIds.push(null);
//         }
//       }

//       const updatedCertificates = certificate.map((cert, index) => ({
//         ...cert,
//         certi_file: fileIds[index] || "",
//       }));

//       await Promise.all([
//         saveProfileLinks(profileLink),
//         saveExperience(experience),
//         saveEducation(education),
//         saveSkills(skill),
//         saveProjects(project),
//         saveCertificates(updatedCertificates),
//         saveMyDetails(updatedDetails),
//       ]);

//       alert("✅ Portfolio data saved successfully!");
//       resetForm();
//     } catch (error) {
//       console.error("❌ Error saving portfolio:", error);
//       alert("Failed to save portfolio data.");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">Create Your Portfolio</h2>

//       {/* Step navigation */}
//       <div className="mb-4">
//         <ul className="nav nav-pills justify-content-center">
//           {["Personal Info", "Academics", "Work & Skills"].map((label, idx) => (
//             <li className="nav-item" key={idx}>
//               <span className={`nav-link ${step === idx + 1 ? "active" : ""}`}>
//                 Step {idx + 1}: {label}
//               </span>
//             </li>
//           ))}
//         </ul>

//         <div className="progress mt-2" style={{ height: "8px" }}>
//           <div
//             className="progress-bar bg-success"
//             role="progressbar"
//             style={{ width: `${(step / 3) * 100}%` }}
//             aria-valuenow={(step / 3) * 100}
//             aria-valuemin="0"
//             aria-valuemax="100"
//           />
//         </div>
//       </div>

//       {/* Form Sections */}
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-12">
//             {step === 1 && (
//               <>
//                 <MyDetailsForm
//                   myDetails={myDetails}
//                   setMyDetails={setMyDetails}
//                   image={image}
//                   setImage={setImage}
//                 />
//                 <AddressForm address={address} setAddress={setAddress} />
//                 <ProfileLinkForm link={profileLink} setLinks={setProfileLink} />
//               </>
//             )}
//             {step === 2 && (
//               <>
//                 <EducationForm
//                   education={education}
//                   setEducation={setEducation}
//                 />
//                 <ProjectForm project={project} setProject={setProject} />
//                 <CertificateForm
//                   certificate={certificate}
//                   setCertificate={setCertificate}
//                   file={file}
//                   setFile={setFile}
//                 />
//               </>
//             )}
//             {step === 3 && (
//               <>
//                 <ExperienceForm
//                   experience={experience}
//                   setExperience={setExperience}
//                 />
//                 <SkillForm skill={skill} setSkill={setSkill} />
//               </>
//             )}
//           </div>
//         </div>

//         {/* Navigation buttons */}
//         <div className="d-flex justify-content-between flex-wrap gap-2 mt-4">
//           {step > 1 && (
//             <button
//               type="button"
//               className="btn btn-outline-secondary"
//               onClick={prevStep}
//             >
//               ← Previous
//             </button>
//           )}
//           {step < 3 && (
//             <button
//               type="button"
//               className="btn btn-primary ms-auto"
//               onClick={nextStep}
//             >
//               Next →
//             </button>
//           )}
//           {step === 3 && (
//             <button type="submit" className="btn btn-success ms-auto">
//               Submit Portfolio
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PortfolioForm;
