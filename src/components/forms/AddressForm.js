import React, { useState } from "react";

function AddressForm({ address, setAddress }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update address state
    setAddress((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Validate on change
    validateField(id, value);
  };

  const validateField = (field, value) => {
    let message = "";

    if (!value.trim) {
      message = "This field is required";
    } else if (field === "pincode" && !/^\d{5,6}$/.test(value)) {
      message = "Pincode must be 5 or 6 digits";
    }

    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  return (
    <section className="p-3">
      <h4 className="mb-4 text-primary">Address Details</h4>
      <div className="row g-3">
        {["location", "city", "pincode", "state", "country"].map((field) => (
          <div
            key={field}
            className={`col-md-${
              field === "location" || field === "city" ? "6" : "4"
            }`}
          >
            <label htmlFor={field} className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              className={`form-control ${errors[field] ? "is-invalid" : ""}`}
              id={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={address[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && (
              <div className="invalid-feedback">{errors[field]}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default AddressForm;

// import React from "react";

// function AddressForm({ address, setAddress }) {
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setAddress((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   return (
//     <section className="p-3">
//       <h4 className="mb-4 text-primary">Address Details</h4>
//       <div className="row g-3">
//         <div className="col-md-6">
//           <label htmlFor="location" className="form-label">
//             Location
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="location"
//             placeholder="House no, Street..."
//             value={address.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-6">
//           <label htmlFor="city" className="form-label">
//             City
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="city"
//             placeholder="City"
//             value={address.city}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="pincode" className="form-label">
//             Pincode
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="pincode"
//             placeholder="Postal Code"
//             value={address.pincode}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="state" className="form-label">
//             State
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="state"
//             placeholder="State"
//             value={address.state}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="col-md-4">
//           <label htmlFor="country" className="form-label">
//             Country
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="country"
//             placeholder="Country"
//             value={address.country}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AddressForm;

// -------------------------------------------
// import React from "react";

// function AddressForm({ address, setAddress }) {
//   return (
//     <div className="p-3">
//       <h5 className="mb-3">Address Details</h5>
//       <div className="row g-3">
//         <div className="col-md-6">
//           <label htmlFor="location" className="form-label">Location</label>
//           <input
//             type="text"
//             className="form-control"
//             id="location"
//             placeholder="House no, Street..."
//             value={address.location}
//             onChange={(e) => setAddress({ ...address, location: e.target.value })}
//             required
//           />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="city" className="form-label">City</label>
//           <input
//             type="text"
//             className="form-control"
//             id="city"
//             placeholder="City"
//             value={address.city}
//             onChange={(e) => setAddress({ ...address, city: e.target.value })}
//             required
//           />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="pincode" className="form-label">Pincode</label>
//           <input
//             type="text"
//             className="form-control"
//             id="pincode"
//             placeholder="Postal Code"
//             value={address.pincode}
//             onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//             required
//           />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="state" className="form-label">State</label>
//           <input
//             type="text"
//             className="form-control"
//             id="state"
//             placeholder="State"
//             value={address.state}
//             onChange={(e) => setAddress({ ...address, state: e.target.value })}
//             required
//           />
//         </div>
//         <div className="col-md-4">
//           <label htmlFor="country" className="form-label">Country</label>
//           <input
//             type="text"
//             className="form-control"
//             id="country"
//             placeholder="Country"
//             value={address.country}
//             onChange={(e) => setAddress({ ...address, country: e.target.value })}
//             required
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddressForm;
