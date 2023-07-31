import React from "react";
import PostsList from "./PostsList";

const Slider = () => {
  return (
    <main>
      <article>
        <section class="section hero" id="home">
          <div class="container"></div>
        </section>
        <PostsList />
      </article>
    </main>
  );
};

export default Slider;
