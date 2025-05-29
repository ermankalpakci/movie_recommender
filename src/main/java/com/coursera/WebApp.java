package com.coursera;

import java.util.*;
import static spark.Spark.*;
import com.google.gson.Gson;

import com.google.gson.reflect.TypeToken;


public class WebApp {
    public static void main(String[] args) {
        // Initialize databases
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        RaterDatabase.initialize("data/ratings.csv");
        
        // Configure static files
        staticFiles.externalLocation(System.getProperty("user.dir") + "/src/main/resources/public");
        staticFiles.location("/public");
        
        // Root route to serve index.html
        get("/", (req, res) -> {
            res.redirect("/index.html");
            return null;
        });
        
        // Endpoint to get movies to rate
        get("/get-movies", (req, res) -> {
            res.type("application/json");
            RecommendationRunner runner = new RecommendationRunner();
            ArrayList<String> movies = runner.getItemsToRate();
            return new Gson().toJson(movies);
        });

        // Endpoint to get movie details
        get("/movie-info", (req, res) -> {
            res.type("application/json");
            String movieId = req.queryParams("id");
            Movie movie = MovieDatabase.getMovie(movieId);
            if (movie != null) {
                return new Gson().toJson(Map.of(
                    "title", movie.getTitle(),
                    "year", movie.getYear(),
                    "genres", movie.getGenres()
                ));
            }
            res.status(404);
            return "Movie not found";
        });
        post("/recommend", (req, res) -> {
            res.type("application/json");
            String userId = "web_user_" + System.currentTimeMillis();
            
            // Parse ratings from JSON
            Map<String, Double> ratings = new Gson().fromJson(req.body(), new TypeToken<Map<String, Double>>(){}.getType());
            
            // Create and add new rater
            EfficientRater newRater = new EfficientRater(userId);
            for (Map.Entry<String, Double> entry : ratings.entrySet()) {
                newRater.addRating(entry.getKey(), entry.getValue());
            }
            RaterDatabase.addRater(newRater);
            
            // Generate recommendations
            RecommendationRunner runner = new RecommendationRunner();
            ArrayList<Rating> recommendations = runner.getRecommendations(userId);
            
            // Prepare response
            List<Map<String, Object>> results = new ArrayList<>();
            for (Rating rating : recommendations) {
                String movieId = rating.getItem();
                Map<String, Object> movieData = new HashMap<>();
                movieData.put("title", MovieDatabase.getTitle(movieId));
                movieData.put("rating", rating.getValue());
                movieData.put("year", MovieDatabase.getYear(movieId));
                movieData.put("genre", MovieDatabase.getGenres(movieId));
                results.add(movieData);
            }
            
            return new Gson().toJson(results);
        });
   }
}