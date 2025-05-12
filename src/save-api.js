import axios from "axios";

// Base URL for the API Gateway
export const API_GATEWAY_URL = "http://localhost:4010";

export const IMAGE_API_URL = `${API_GATEWAY_URL}/file-upload`;
export const ADDRESS_API_URL = `${API_GATEWAY_URL}/address`;
export const CERTIFICATE_API_URL = `${API_GATEWAY_URL}/certificate`;
export const EDUCATION_API_URL = `${API_GATEWAY_URL}/education`;
export const EXPERIENCE_API_URL = `${API_GATEWAY_URL}/experience`;
export const MY_DETAILS_API_URL = `${API_GATEWAY_URL}/my-details`;
export const PROJECT_API_URL = `${API_GATEWAY_URL}/project`;
export const PROFILE_API_URL = `${API_GATEWAY_URL}/profile-link`;
export const SKILL_API_URL = `${API_GATEWAY_URL}/skill`;

// Function to save profile image details
export const saveImage = async (formData) => {
  try {
    console.log("[API][saveImage] URL:", IMAGE_API_URL);
    console.log("[API][saveImage] FormData:", formData);
    const response = await axios.post(IMAGE_API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("[API][saveImage] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveImage] Error:", error);
    throw error;
  }
};

export const saveMyDetails = async (myDetails) => {
  try {
    console.log("[API][saveMyDetails] URL:", MY_DETAILS_API_URL);
    console.log("[API][saveMyDetails] Payload:", myDetails);
    const response = await axios.post(MY_DETAILS_API_URL, myDetails);
    console.log("[API][saveMyDetails] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveMyDetails] Error:", error);
    throw error;
  }
};

export const saveProjects = async (projects) => {
  try {
    console.log("[API][saveProjects] Payload:", projects);
    const response = await axios.post(PROJECT_API_URL, projects);
    console.log("[API][saveProjects] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveProjects] Error:", error);
    throw error;
  }
};

export const saveAddress = async (address) => {
  try {
    console.log("[API][saveAddress] Payload:", address);
    const response = await axios.post(ADDRESS_API_URL, address);
    console.log("[API][saveAddress] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveAddress] Error:", error);
    throw error;
  }
};

export const saveCertificates = async (certificates) => {
  try {
    console.log("[API][saveCertificates] Payload:", certificates);
    const response = await axios.post(CERTIFICATE_API_URL, certificates);
    console.log("[API][saveCertificates] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveCertificates] Error:", error);
    throw error;
  }
};

export const saveEducation = async (education) => {
  try {
    console.log("[API][saveEducation] Payload:", education);
    const response = await axios.post(EDUCATION_API_URL, education);
    console.log("[API][saveEducation] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveEducation] Error:", error);
    throw error;
  }
};

export const saveExperience = async (experience) => {
  try {
    console.log("[API][saveExperience] Payload:", experience);
    const response = await axios.post(EXPERIENCE_API_URL, experience);
    console.log("[API][saveExperience] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveExperience] Error:", error);
    throw error;
  }
};

export const saveProfileLinks = async (profileLinks) => {
  try {
    console.log("[API][saveProfileLinks] Payload:", profileLinks);
    const response = await axios.post(PROFILE_API_URL, profileLinks);
    console.log("[API][saveProfileLinks] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveProfileLinks] Error:", error);
    throw error;
  }
};

export const saveSkills = async (skills) => {
  try {
    console.log("[API][saveSkills] Payload:", skills);
    const response = await axios.post(SKILL_API_URL, skills);
    console.log("[API][saveSkills] Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API][saveSkills] Error:", error);
    throw error;
  }
};

// import axios from "axios";

// // Base URL for the API Gateway
// export const API_GATEWAY_URL = "http://localhost:4010";

// export const IMAGE_API_URL = `${API_GATEWAY_URL}/file-upload`;

// export const ADDRESS_API_URL = `${API_GATEWAY_URL}/address`;
// export const CERTIFICATE_API_URL = `${API_GATEWAY_URL}/certificate`;
// export const EDUCATION_API_URL = `${API_GATEWAY_URL}/education`;
// export const EXPERIENCE_API_URL = `${API_GATEWAY_URL}/experience`;
// export const MY_DETAILS_API_URL = `${API_GATEWAY_URL}/my-details`;
// export const PROJECT_API_URL = `${API_GATEWAY_URL}/project`;
// export const PROFILE_API_URL = `${API_GATEWAY_URL}/profile-link`;
// export const SKILL_API_URL = `${API_GATEWAY_URL}/skill`;

// // Function to save profile image details
// export const saveImage = async (formData) => {
//   try {
//     console.log("Save-api.... "+ IMAGE_API_URL + " :: " + formData );
//     const response = await axios.post(`${IMAGE_API_URL}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     throw error;
//   }
// };

// // Function to save all mydetails
// export const saveMyDetails = async (myDetails) => {
//   try {
//     console.log("Calling save mydetails function");
//     const response = await axios.post(`${MY_DETAILS_API_URL}`, myDetails);
//     console.log("end save mydetails function");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching my details:", error);
//     throw error;
//   }
// };

// // Function to save all profile links
// export const saveProjects = async (projects) => {
//   try {
//     const response = await axios.post(`${PROJECT_API_URL}`, projects);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching project:", error);
//     throw error;
//   }
// };

// // Function to save all addresses
// export const saveAddress = async (address) => {
//   try {
//     const response = await axios.post(`${ADDRESS_API_URL}`, address);
//     return response.data;
//   } catch (error) {
//     console.error("Error saving address:", error);
//     throw error;
//   }
// };

// // Function to save all certificates
// export const saveCertificates = async (certificates) => {
//   try {
//     const response = await axios.post(`${CERTIFICATE_API_URL}`, certificates);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching address:", error);
//     throw error;
//   }
// };
// // Function to save education details
// export const saveEducation = async (education) => {
//   try {
//     console.log("Calling save education function");
//     const response = await axios.post(`${EDUCATION_API_URL}`, education);
//     console.log("end save education function" + response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching education:", error);
//     throw error;
//   }
// };

// // Function to save experience details
// export const saveExperience = async (experience) => {
//   try {
//     const response = await axios.post(`${EXPERIENCE_API_URL}`, experience);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching experience:", error);
//     throw error;
//   }
// };

// // Function to save all profile links
// export const saveProfileLinks = async (profileLinks) => {
//   try {
//     console.log("Calling save project function");
//     const response = await axios.post(`${PROFILE_API_URL}`, profileLinks);
//     console.log("end save project function");
    
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile links:", error);
//     throw error;
//   }
// };

// // Function to save all skills
// export const saveSkills = async (skills) => {
//   try {
//     const response = await axios.post(`${SKILL_API_URL}`, skills);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching skills:", error);
//     throw error;
//   }
// };
