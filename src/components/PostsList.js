import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "../firebase/firebase";
import { initializeApp } from "firebase/app";
import useFirestore from "../hooks/useFirestore";
import { Link } from "react-router-dom";
import LoadingCard from "./LoadingCard";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const PostsList = () => {
  const { posts, loading } = useFirestore(); // Step 1: State to hold the list of posts and loading status

  return (
    <div>
      <section class="section featured-car" id="featured-car">
        <div class="container">
          <div class="title-wrapper">
            <h2 class="h2 section-title">Featured cars</h2>

            <a href="#" class="featured-car-link">
              <span>View more</span>

              <ion-icon name="arrow-forward-outline"></ion-icon>
            </a>
          </div>

          <ul class="featured-car-list">
            {loading ? (
              // Render a loading spinner while the data is still loading
              <LoadingCard />
            ) : (
              <>
                {posts.map((post) => (
                  <li key={post.id}>
                    <div class="featured-car-card">
                      <figure class="card-banner">
                        <img
                          src={post.images[0]}
                          alt="Toyota RAV4 2021"
                          loading="lazy"
                          width="440"
                          height="300"
                          class="w-100"
                        />
                      </figure>

                      <div class="card-content">
                        <div class="card-title-wrapper">
                          <h3 class="h3 card-title">
                            <a href="#">Toyota RAV4</a>
                          </h3>

                          <data class="year" value="2021">
                            2021
                          </data>
                        </div>

                        <ul class="card-list">
                          <li class="card-list-item">
                            <ion-icon name="people-outline"></ion-icon>

                            <span class="card-item-text">4 People</span>
                          </li>

                          <li class="card-list-item">
                            <ion-icon name="flash-outline"></ion-icon>

                            <span class="card-item-text">Hybrid</span>
                          </li>

                          <li class="card-list-item">
                            <ion-icon name="speedometer-outline"></ion-icon>

                            <span class="card-item-text">6.1km / 1-litre</span>
                          </li>

                          <li class="card-list-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>

                            <span class="card-item-text">Automatic</span>
                          </li>
                        </ul>

                        <div class="card-price-wrapper">
                          <p class="card-price">
                            <strong>$440</strong> / month
                          </p>

                          <button
                            class="btn fav-btn"
                            aria-label="Add to favourite list"
                          >
                            <ion-icon name="heart-outline"></ion-icon>
                          </button>

                          <button class="btn">Rent now</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PostsList;
