import React, { useState } from "react";

interface Heart {
  id: number;
}

const LikeButton: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const handleLikeClick = () => {
    const newHeart: Heart = {
      id: Date.now(),
    };

    // Add a new heart to the array
    setHearts((prevHearts) => [...prevHearts, newHeart]);

    // Remove the heart after the animation is complete (1.5s here)
    setTimeout(() => {
      setHearts((prevHearts) =>
        prevHearts.filter((heart) => heart.id !== newHeart.id)
      );
    }, 1500);
  };

  return (
    <div className="like-button-container">
      <button onClick={handleLikeClick} className="like-button">
        Like ❤️
      </button>
      <div className="animation-container">
        {hearts.map((heart) => (
          <div key={heart.id} className="heart">
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikeButton;
