package com.coursera;

import java.util.*;

public class SecondRatings {
    private ArrayList<Movie> myMovies;
    private ArrayList<EfficientRater> myRaters;
    
    public SecondRatings() {
        // default constructor
        this("data/ratedmoviesfull.csv", "data/ratings.csv");
    }

    public SecondRatings(String moviefile, String ratingsfile) {
        FirstRatings firstRatings = new FirstRatings();
        myMovies = firstRatings.loadMovies(moviefile);
        myRaters = firstRatings.loadRaters(ratingsfile);
    }
    public int getMovieSize() {
        return myMovies.size();
    }
    public int getRaterSize() {
        return myRaters.size();
    }
    public double getAverageByID(String id, int minimalRaters) {
        int count = 0;
        double sum = 0.0;
        for (EfficientRater rater : myRaters) {
            if (rater.hasRating(id)) {
                sum += rater.getRating(id);
                count++;
            }
        }
        if (count >= minimalRaters) {
            return sum / count;
        }
        return 0.0;
    }
    public ArrayList<Rating> getAverageRatings(int minimalRaters) {
        ArrayList<Rating> avgRatings = new ArrayList<>();
        for (Movie movie : myMovies) {
            String movieId = movie.getID();
            double avg = getAverageByID(movieId, minimalRaters);
            if (avg != 0.0) {
                avgRatings.add(new Rating(movieId, avg));
            }
        }
        return avgRatings;
    }
    public String getTitle(String id) {
        for (Movie movie : myMovies) {
            if (movie.getID().equals(id)) {
                return movie.getTitle();
            }
        }
        return "ID not found: " + id;
    }

    public String getID(String title) {
        for (Movie movie : myMovies) {
            if (movie.getTitle().equals(title)) {
                return movie.getID();
            }
        }
        return "NO SUCH TITLE";
    }
}