package com.coursera;

import java.util.*;
import static spark.Spark.*;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;


public class WebApp {
    public static void main(String[] args) {
        // Initialize databases
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        RaterDatabase.initialize("data/ratings.csv");
        
        staticFiles.externalLocation(System.getProperty("user.dir") + "/src/main/resources/public");
        staticFiles.location("/public");
        // Add this before your routes
        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST");
            res.header("Access-Control-Allow-Headers", "Content-Type");
        });
        get("/", (req, res) -> {
            res.redirect("/index.html");
            return null;
        });
        
        get("/get-movies", (req, res) -> {
            res.type("application/json");
            RecommendationRunner runner = new RecommendationRunner();
            ArrayList<String> movies = runner.getItemsToRate();
            return new Gson().toJson(movies);
        });

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
            JsonObject json = JsonParser.parseString(req.body()).getAsJsonObject();

            Map<String, Double> ratings = new Gson().fromJson(json.getAsJsonObject("ratings"),
            new TypeToken<Map<String, Double>>(){}.getType());

            String userId = "web_user_" + System.currentTimeMillis();
            
            boolean filterFlag = false;
            EfficientRater newRater = new EfficientRater(userId);
            for (Map.Entry<String, Double> entry : ratings.entrySet()) {
                newRater.addRating(entry.getKey(), entry.getValue());
            }
            RaterDatabase.addRater(newRater);
            JsonObject filters = json.has("filters") ? json.getAsJsonObject("filters") : new JsonObject();
            AllFilters filter = new AllFilters();
            
            if (filters.has("genres")) {
                for (JsonElement g : filters.getAsJsonArray("genres")) {
                    filter.addFilter(new GenreFilter(g.getAsString()));
                    filterFlag = true;
                }
            }

            if (filters.has("year")) {
                filter.addFilter(new YearAfterFilter(filters.get("year").getAsInt()));
                filterFlag = true;
            }

            if (filters.has("minMinutes") && filters.has("maxMinutes")) {
                filter.addFilter(new MinutesFilter(
                    filters.get("minMinutes").getAsInt(), 
                    filters.get("maxMinutes").getAsInt()
                ));
                filterFlag = true;
            }

            if (filters.has("directors")) {
                String directorsString = filters.get("directors").getAsString();
                filter.addFilter(new DirectorsFilter(directorsString));
                filterFlag = true;
            }
            RecommendationRunner runner = new RecommendationRunner();
            ArrayList<Rating> recommendations = runner.getRecommendations(userId, filter, filterFlag);
            
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