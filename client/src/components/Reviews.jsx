import React from "react";
import Review from "./Review";

const reviewsArr = [
  {
    image: "",
    title: "An Epic Journey through a Rich Fantasy World",
    author: "Ned",
    game: "The Chronicles of Emberfall",
    rating: 4,
    body: "The Chronicles of Emberfall is an absolute gem of a video game. From the moment I stepped foot into the beautifully crafted fantasy world, I was captivated by its stunning visuals and immersive gameplay. The character development and storytelling are top-notch, making me feel emotionally invested in each character's journey. The combat mechanics are smooth and satisfying, offering a perfect blend of challenge and excitement. Whether you're exploring ancient ruins or facing formidable foes, Emberfall never fails to deliver an unforgettable adventure. A must-play for any RPG enthusiast!",
  },
  {
    image: "",
    title: "Conquer the Cosmos in a Space Strategy Masterpiece",
    author: "Jocinda",
    game: "Galactic Conquest: Space Odyssey",
    rating: 5,
    body: "Galactic Conquest: Space Odyssey is a strategic triumph that takes the genre to new heights. Its vast universe and diverse factions offer endless possibilities for intergalactic dominance. The attention to detail in designing each planet and spaceship is awe-inspiring. I was amazed by the depth of the research tree and the level of tactical planning required to outmaneuver opponents. Multiplayer matches are intense and rewarding, making every victory feel well-earned. Whether you're a seasoned space strategist or a newcomer to the genre, Galactic Conquest is an addictively fun experience you won't be able to put down!",
  },
  {
    image: "",
    title: "Dive into the Futuristic Abyss",
    author: "Lloyd",
    game: "Cybernetic Dreamscape",
    rating: 4,
    body: "Cybernetic Dreamscape offers a mesmerizing journey into a dystopian future. The game's cyberpunk aesthetic and pulsating soundtrack create an immersive atmosphere that pulls you right into its world. The hacking mechanics are cleverly implemented, providing a refreshing twist to classic puzzle-solving. The narrative is intriguing and often filled with unexpected twists that keep you guessing. While some combat sequences could be more polished, the overall experience is memorable and thought-provoking. If you're a fan of cyberpunk adventures, this game is a must-play.",
  },
  {
    image: "",
    title: "Unleash Your Creativity in a World of Wonders",
    author: "Patricia",
    game: "TerraForge: Reborn",
    rating: 4,
    body: "TerraForge: Reborn is a sandbox masterpiece that grants you the power of creation. The freedom to shape and mold the world to your imagination is breathtaking. The graphics are beautifully crafted, and the sheer variety of biomes and creatures is astounding. Building structures and designing landscapes is intuitive, making it accessible to players of all ages. The multiplayer mode lets you collaborate with friends, sparking endless creativity. I lost track of time while constructing my dream world, and I can't wait to see what the community comes up with. TerraForge: Reborn is a triumph for anyone who loves to build and explore.",
  },
  {
    image: "",
    title: "Unravel Mysteries in a Hauntingly Atmospheric Adventure",
    author: "Hubert",
    game: "Rift of Souls",
    rating: 5,
    body: "Rift of Souls delivers an eerie and immersive experience that gets under your skin. The hauntingly atmospheric world and cleverly designed puzzles create a sense of dread and excitement. The game's narrative is deeply engrossing, drawing you into a web of dark secrets waiting to be unraveled. I was thoroughly impressed with the attention to detail in the environments and the spine-chilling sound design. While the combat could be more polished, the focus on exploration and puzzle-solving compensates for it. Rift of Souls is a fantastic choice for fans of atmospheric horror games looking for a captivating and spine-tingling adventure.",
  },
];

export default function Reviews() {
  return (
    <div>
      <h2>See what people are saying about their favorite games</h2>
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
          />
        );
      })}
    </div>
  );
}
