export function End_Date_Validation(startDate, endDate) {
  if (!startDate || !endDate) return true;

  const start = new Date(startDate);
  const end = new Date(endDate);

  return end >= start;
}

export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isNonEmpty(str) {
  return str.trim().length > 0;
}

export const validateProject = (project) => {
  const errors = {};

  if (!project.proj_name.trim()) {
    errors.proj_name = "Project name is required.";
  }

  if (!project.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!project.start_date) {
    errors.start_date = "Start date is required.";
  }

  if (!project.end_date) {
    errors.end_date = "End date is required.";
  } else if (!End_Date_Validation(project.start_date, project.end_date)) {
    errors.end_date = "End date cannot be before start date.";
  }

  if (!project.github_url.trim()) {
    errors.github_url = "GitHub URL is required.";
  } else if (!/^https?:\/\/.+/.test(project.github_url)) {
    errors.github_url = "GitHub URL must be a valid URL.";
  }

  if (!project.demo_url.trim()) {
    errors.demo_url = "Demo URL is required.";
  } else if (!/^https?:\/\/.+/.test(project.demo_url)) {
    errors.demo_url = "Demo URL must be a valid URL.";
  }

  return errors;
};
