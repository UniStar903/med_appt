// ReviewForm.jsx
import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback!\nRating: ${rating}\nReview: ${review}`);
    setShowForm(false);
    setReview("");
    setRating(0);
  };

  return (
    <div className="review-container">
      <h2 className="review-title">Consultation Feedback</h2>
      <p className="review-description">
        We value your experience! Please share your feedback about your consultation.
      </p>

      {!showForm ? (
        <button className="review-btn" onClick={() => setShowForm(true)}>
          Provide Feedback
        </button>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <label>
            Rating (1–5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>

          <label>
            Review:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts..."
              required
            />
          </label>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
