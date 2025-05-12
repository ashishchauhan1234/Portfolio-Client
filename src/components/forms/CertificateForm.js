import React from "react";

function CertificateForm({ certificate, setCertificate, file, setFile }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCertificates = [...certificate];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [name]: value,
    };
    setCertificate(updatedCertificates);
  };

  const handleChangeFile = (e, index) => {
    const selectedFile = e.target.files[0];
    const updatedCertificates = [...certificate];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      file_name: selectedFile?.name || "",
    };
    setCertificate(updatedCertificates);

    const updatedFiles = [...file];
    updatedFiles[index] = selectedFile;
    setFile(updatedFiles);
  };

  const handleAddCertificate = () => {
    const newCertificate = {
      name: "",
      institute: "",
      certi_file: "",
      start_date: "",
      end_date: "",
      certificate_url: "",
    };
    setCertificate([...certificate, newCertificate]);
    setFile([...file, null]);
  };

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = certificate.filter((_, i) => i !== index);
    const updatedFiles = file.filter((_, i) => i !== index);
    setCertificate(updatedCertificates);
    setFile(updatedFiles);
  };

  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-4 fw-bold">Certificate Details</h4>

      {certificate.map((certi, index) => {
        const dateError =
          certi.start_date && certi.end_date && !validateDates(certi.start_date, certi.end_date);
        const urlError = certi.certificate_url && !isValidUrl(certi.certificate_url);

        return (
          <div key={index} className="row g-3 border rounded-4 mb-4 p-4 shadow-sm bg-light">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h5 className="mb-3">Certificate #{index + 1}</h5>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleRemoveCertificate(index)}
                disabled={certificate.length === 1}
              >
                Remove
              </button>
            </div>

            <div className="col-md-6">
              <label htmlFor={`name-${index}`} className="form-label">Certificate Name</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={certi.name}
                onChange={(e) => handleChange(e, index)}
                className={`form-control ${!certi.name && "is-invalid"}`}
                placeholder="e.g., React Developer Certification"
                required
              />
              {!certi.name && <div className="invalid-feedback">Name is required.</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor={`institute-${index}`} className="form-label">Institute Name</label>
              <input
                type="text"
                id={`institute-${index}`}
                name="institute"
                value={certi.institute}
                onChange={(e) => handleChange(e, index)}
                className={`form-control ${!certi.institute && "is-invalid"}`}
                placeholder="e.g., Coursera, Udemy"
                required
              />
              {!certi.institute && <div className="invalid-feedback">Institute is required.</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor={`file-${index}`} className="form-label">Upload Certificate</label>
              <input
                type="file"
                id={`file-${index}`}
                name="file"
                accept=".pdf,image/*"
                onChange={(e) => handleChangeFile(e, index)}
                className="form-control"
              />
              {file[index] && (
                <div className="form-text text-success mt-1">
                  Selected file: {file[index].name}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor={`url-${index}`} className="form-label">Certificate URL</label>
              <input
                type="url"
                id={`url-${index}`}
                name="certificate_url"
                value={certi.certificate_url}
                onChange={(e) => handleChange(e, index)}
                className={`form-control ${urlError && "is-invalid"}`}
                placeholder="https://example.com/certificate"
              />
              {urlError && <div className="invalid-feedback">Enter a valid URL.</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor={`start-${index}`} className="form-label">Start Date</label>
              <input
                type="date"
                id={`start-${index}`}
                name="start_date"
                value={certi.start_date}
                onChange={(e) => handleChange(e, index)}
                className={`form-control ${dateError && "is-invalid"}`}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor={`end-${index}`} className="form-label">End Date</label>
              <input
                type="date"
                id={`end-${index}`}
                name="end_date"
                value={certi.end_date}
                onChange={(e) => handleChange(e, index)}
                className={`form-control ${dateError && "is-invalid"}`}
                required
              />
              {dateError && <div className="invalid-feedback">End date must be after start date.</div>}
            </div>
          </div>
        );
      })}

      <div className="text-end">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleAddCertificate}
        >
          + Add Another Certificate
        </button>
      </div>
    </div>
  );
}

export default CertificateForm;

// import React from "react";

// function CertificateForm({ certificate, setCertificate, file, setFile }) {

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedCertificates = [...certificate];
//     updatedCertificates[index] = {
//       ...updatedCertificates[index],
//       [name]: value,
//     };
//     setCertificate(updatedCertificates);
//   };

//   const handleChangeFile = (e, index) => {
//     const selectedFile = e.target.files[0];

//     const updatedCertificates = [...certificate];
//     updatedCertificates[index] = {
//       ...updatedCertificates[index],
//       file_name: selectedFile?.name || "",
//     };
//     setCertificate(updatedCertificates);

//     const updatedFiles = [...file];
//     updatedFiles[index] = selectedFile;
//     setFile(updatedFiles);
//   };

//   const handleAddCertificate = () => {
//     const newCertificate = {
//       name: "",
//       institute: "",
//       certi_file: "",
//       start_date: "",
//       end_date: "",
//       certificate_url: "",
//     };
//     setCertificate([...certificate, newCertificate]);
//     setFile([...file, null]);
//   };

//   const handleRemoveCertificate = (index) => {
//     const updatedCertificates = certificate.filter((_, i) => i !== index);
//     const updatedFiles = file.filter((_, i) => i !== index);
//     setCertificate(updatedCertificates);
//     setFile(updatedFiles);
//   };

//   return (
//     <div className="p-3">
//       <h4 className="mb-4 fw-bold">Certificate Details</h4>

//       {certificate.map((certi, index) => (
//         <div key={index} className="row g-3 border rounded-4 mb-4 p-4 shadow-sm bg-light">
//           <div className="col-12 d-flex justify-content-between align-items-center">
//             <h5 className="mb-3">Certificate #{index + 1}</h5>
//             <button
//               type="button"
//               className="btn btn-outline-danger btn-sm"
//               onClick={() => handleRemoveCertificate(index)}
//               disabled={certificate.length === 1}
//             >
//               Remove
//             </button>
//           </div>

//           <div className="col-md-6">
//             <label htmlFor={`name-${index}`} className="form-label">Certificate Name</label>
//             <input
//               type="text"
//               id={`name-${index}`}
//               name="name"
//               value={certi.name}
//               onChange={(e) => handleChange(e, index)}
//               className="form-control"
//               placeholder="e.g., React Developer Certification"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor={`institute-${index}`} className="form-label">Institute Name</label>
//             <input
//               type="text"
//               id={`institute-${index}`}
//               name="institute"
//               value={certi.institute}
//               onChange={(e) => handleChange(e, index)}
//               className="form-control"
//               placeholder="e.g., Coursera, Udemy"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor={`file-${index}`} className="form-label">Upload Certificate</label>
//             <input
//               type="file"
//               id={`file-${index}`}
//               name="file"
//               accept=".pdf,image/*"
//               onChange={(e) => handleChangeFile(e, index)}
//               className="form-control"
//             />
//             {file[index] && (
//               <div className="form-text text-success mt-1">
//                 Selected file: {file[index].name}
//               </div>
//             )}
//           </div>

//           <div className="col-md-6">
//             <label htmlFor={`url-${index}`} className="form-label">Certificate URL</label>
//             <input
//               type="url"
//               id={`url-${index}`}
//               name="certificate_url"
//               value={certi.certificate_url}
//               onChange={(e) => handleChange(e, index)}
//               className="form-control"
//               placeholder="https://example.com/certificate"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor={`start-${index}`} className="form-label">Start Date</label>
//             <input
//               type="date"
//               id={`start-${index}`}
//               name="start_date"
//               value={certi.start_date}
//               onChange={(e) => handleChange(e, index)}
//               className="form-control"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor={`end-${index}`} className="form-label">End Date</label>
//             <input
//               type="date"
//               id={`end-${index}`}
//               name="end_date"
//               value={certi.end_date}
//               onChange={(e) => handleChange(e, index)}
//               className="form-control"
//               required
//             />
//           </div>
//         </div>
//       ))}

//       <div className="text-end">
//         <button
//           type="button"
//           className="btn btn-outline-primary"
//           onClick={handleAddCertificate}
//         >
//           + Add Another Certificate
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CertificateForm;
