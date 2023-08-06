import React from "react";
import Review from "./Review";

const reviewsArr = [
  {
    image:
      "https://www.giantbomb.com/a/uploads/scale_small/41/414731/3094375-emberfallboxart.jpg",
    title: "An Epic Journey through Fantasy",
    author: "Ned",
    game: "Emberfall",
    rating: 94,
    body: "Emberfall is an absolute gem of a video game. From the moment I stepped foot into the beautifully crafted world, to the first time I discovered",
    date: "June 12, 2017",
    platform: "PC",
  },
  {
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1555930/capsule_616x353.jpg?t=1663965515",
    title: "Exploration at it's Cutest",
    author: "Jocinda",
    game: "Beyond Horizon",
    rating: 95,
    body: "Beyond Horizon is a beautifully crafted 2D platformer that delivers a heartfelt story and captivating gameplay. Players join a young explorer",
    date: "April 13, 2022",
    platform: "PC",
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
    platform: "PS4",
  },
  {
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2452900/capsule_616x353.jpg?t=1689248961",
    title: "Unleash Your Creativity",
    author: "Patricia",
    game: "TerraForge: Reborn",
    rating: 89,
    body: "TerraForge: Reborn is a sandbox masterpiece that grants you the power of creation. The freedom to shape and mold the world as you please is",
    date: "August 8, 2020",
    platform: "PC",
  },
];

export default function Reviews() {
  return (
    <div>
      <h2 className="reviewsHeader text-light text-center m-2 pt-4">
        SEE WHAT PEOPLE ARE SAYING ABOUT THEIR FAVORITE GAMES
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
              platform={review.platform}
            />
          );
        })}
      </div>
    </div>
  );
}
