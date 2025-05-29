package com.coursera;

import java.util.*;

public class ThirdRatings {
    private ArrayList<EfficientRater> myRaters;
    
    public ThirdRatings() {
        // default constructor
        this("data/ratings.csv");
    }

    public ThirdRatings(String ratingsfile) {
        FirstRatings firstRatings = new FirstRatings();
        myRaters = firstRatings.loadRaters(ratingsfile);
    }

    public int getRaterSize() {
        return myRaters.size();
    }
    public double getAverageByID(String id, int minimalRaters) {
        int count = 0;
        double sum = 0.0;
        for (Rater rater : myRaters) {
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
        ArrayList<String> movies = MovieDatabase.filterBy(new TrueFilter());
        ArrayList<Rating> avgRatings = new ArrayList<>();
        for (String movieId : movies) {
            double avg = getAverageByID(movieId, minimalRaters);
            if (avg != 0.0) {
                avgRatings.add(new Rating(movieId, avg));
            }
        }
        return avgRatings;
    }

    public ArrayList<Rating> getAverageRatingsByFilter(int minimalRaters, Filter filterCriteria) {
        ArrayList<String> movies = MovieDatabase.filterBy(filterCriteria);
        ArrayList<Rating> avgRatings = new ArrayList<>();
        for (String movieId : movies) {
            double avg = getAverageByID(movieId, minimalRaters);
            if (avg != 0.0) {
                avgRatings.add(new Rating(movieId, avg));
            }
        }
        return avgRatings;
    }
}