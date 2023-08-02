import React from "react";
import Review from "./Review";

const reviewsArr = [
  {
    image:
      "https://www.giantbomb.com/a/uploads/scale_small/41/414731/3094375-emberfallboxart.jpg",
    title: "An Epic Journey through a Rich Fantasy World",
    author: "Ned",
    game: "Emberfall",
    rating: 94,
    body: "Emberfall is an absolute gem of a video game. From the moment I stepped foot into the beautifully crafted world, to the first time I discovered",
    date: "June 12, 2017",
  },
  {
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1555930/capsule_616x353.jpg?t=1663965515",
    title: "An Emotional Journey Through Fantastical Worlds",
    author: "Jocinda",
    game: "Beyond Horizon",
    rating: 95,
    body: "Beyond Horizon is a beautifully crafted 2D platformer that delivers a heartfelt story and captivating gameplay. Players join a young explorer",
    date: "April 13, 2022",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg",
    title: "Dive into the Futuristic Abyss",
    author: "Lloyd",
    game: "CyberPunk 2077",
    rating: 84,
    body: "CyberPunk 2077 offers a mesmerizing journey into a dystopian future. The game's broody aesthetic and pulsating realism delivers a frenzy of",
    date: "December 2, 2021",
  },
  {
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2452900/capsule_616x353.jpg?t=1689248961",
    title: "Unleash Your Creativity in a World of Wonders",
    author: "Patricia",
    game: "TerraForge: Reborn",
    rating: 89,
    body: "TerraForge: Reborn is a sandbox masterpiece that grants you the power of creation. The freedom to shape and mold the world as you please is",
    date: "August 8, 2020",
  },
];

export default function Reviews() {
  return (
    <div>
      <h2 className="text-light text-center m-2 pt-4">
        See what people are saying about their favorite games
      </h2>
      <div className="reviews">
        {reviewsArr.map((review, key) => {
          return (
            <Review
              key={key}
              image={review.image}
              title={review.title}
              author={review.author}
              rating={review.rating}
              game={review.game}
              body={review.body}
              date={review.date}
            />
          );
        })}
      </div>
    </div>
  );
}
