import React, { useState } from "react";
import "./ReviewForm.css";

// Function component for patient feedback
function ReviewForm() {
  // State variables
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  // Handle button click to open form
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle rating selection
  const handleRatingSelect = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowWarning(false);
      setIsSubmitted(true);
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Provide Feedback</h2>

      {!showForm && !isSubmitted ? (
        <button className="feedback-btn" onClick={handleButtonClick}>
          Click Here
        </button>
      ) : null}

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Give Your Feedback</h3>
          {showWarning && <p className="warning">Please fill out all fields.</p>}

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Write your feedback..."
            />
          </div>

          <div className="form-group rating-group">
            <label>Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? "selected" : ""}`}
                  onClick={() => handleRatingSelect(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}

      {submittedMessage && (
        <div className="submitted-section">
          <h3>Submitted Feedback</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {submittedMessage.rating} / 5</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
