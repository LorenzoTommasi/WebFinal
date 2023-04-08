window.addEventListener('DOMContentLoaded', () => {
  const reviewData = window.reviewData;

  const reviewCards = document.getElementById('review-cards');

  // Generate a rating
  const generateRating = (rating) => {
    const maxRating = 5;
    const star = '<span class="star">&#9733;</span>';
    const emptyStar = '<span class="star">&#9734;</span>';

    let ratingString = '';

    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        ratingString += star;
      } else {
        ratingString += emptyStar;
      }
    }

    return ratingString;
  };

  // Generate a review card
  const generateReviewCard = (review) => {
    const card = document.createElement('div');
    card.classList.add('review-card');

    const name = document.createElement('h4');
    name.textContent = review.name;

    const date = document.createElement('div');
    date.classList.add('date');
    date.textContent = review.date.toLocaleDateString();

    const rating = document.createElement('div');
    rating.classList.add('rating');
    rating.innerHTML = generateRating(review.rating);

    const reviewText = document.createElement('div');
    reviewText.classList.add('review-text');
    reviewText.textContent = review.reviewText;

    card.appendChild(name);
    card.appendChild(date);
    card.appendChild(rating);
    card.appendChild(reviewText);

    return card;
  };

  // Generate all review cards
  const generateAllReviewCards = () => {
    reviewCards.innerHTML = '';
    for (let i = 0; i < reviewData.length; i++) {
      const review = reviewData[i];
      const card = generateReviewCard(review);
      reviewCards.appendChild(card);
    }
  };

  generateAllReviewCards();

  const addReviewForm = document.querySelector('form');

// Add new review
const addReview = (event) => {
  event.preventDefault();

  const name = event.target.elements['name'].value;
  const rating = event.target.elements['rating'].value;
  const reviewText = event.target.elements['reviewText'].value;
  const date = new Date();

  const newReview = {
    name: name,
    rating: rating,
    reviewText: reviewText,
    date: date,
  };

  reviewData.push(newReview);
  generateAllReviewCards();
  addReviewForm.reset();
};

addReviewForm.addEventListener('submit', addReview);

});
