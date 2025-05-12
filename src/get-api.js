import axios from 'axios';

// Base URL for the API Gateway
export const API_GATEWAY_URL = 'http://localhost:4010';

export const ADDRESS_API_URL = `${API_GATEWAY_URL}/address`;
export const CERTIFICATE_API_URL = `${API_GATEWAY_URL}/certificate`;
export const EDUCATION_API_URL = `${API_GATEWAY_URL}/education`;
export const EXPERIENCE_API_URL = `${API_GATEWAY_URL}/experience`;
export const MY_DETAILS_API_URL = `${API_GATEWAY_URL}/my-details`;
export const PROJECT_API_URL = `${API_GATEWAY_URL}/project`;
export const PROFILE_API_URL = `${API_GATEWAY_URL}/profile-link`;
export const SKILL_API_URL = `${API_GATEWAY_URL}/skill`;

// Function to get all addresses
export const getAddress = async () => {
  try {
    const response = await axios.get(`${ADDRESS_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};

// Function to get all certificates
export const getCertificates = async () => {
  try {
    const response = await axios.get(`${CERTIFICATE_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};
// Function to get education details
export const getEducation = async () => {
  try {
    const response = await axios.get(`${EDUCATION_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching education:', error);
    throw error;
  }
};

// Function to get experience details
export const getExperience = async () => {
  try {
    const response = await axios.get(`${EXPERIENCE_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    throw error;
  }
};  

// Function to get all mydetails
export const getMyDetails = async () => {
  try {
    const response = await axios.get(`${MY_DETAILS_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my details:', error);
    throw error;
  }
}

// Function to get all profile links
export const getProjects = async () => {
  try {
    const response = await axios.get(`${PROJECT_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
}
// Function to get all profile links
export const getProfileLinks = async () => {
  try {
    const response = await axios.get(`${PROFILE_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile links:', error);
    throw error;
  }
}

// Function to get all skills
export const getSkills = async () => {
  try {
    const response = await axios.get(`${SKILL_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}
