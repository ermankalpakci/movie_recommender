package com.coursera;

import java.util.*;

public class RecommendationRunner implements Recommender {
    public ArrayList<String> getItemsToRate() {
        MovieDatabase.initialize("ratedmoviesfull.csv");
        Filter yearFilter = new YearAfterFilter(2013);
        ArrayList<String> movies = MovieDatabase.filterBy(yearFilter);
        Collections.shuffle(movies);
        
        ArrayList<String> selected = new ArrayList<>();
        for (int i = 0; i < 20 && i < movies.size(); i++) {
            selected.add(movies.get(i));
        }
        return selected;
    }

    public ArrayList<Rating> getRecommendations(String webRaterID, Filter filter, boolean filterFlag) {
        RaterDatabase.initialize("ratings.csv");
        MovieDatabase.initialize("ratedmoviesfull.csv");
        FourthRatings fourthRatings = new FourthRatings();
        ArrayList<Rating> recommendations;

        int numSimilarRaters = 20;
        int minimalRaters = 3;
        if(!filterFlag){
            recommendations = fourthRatings.getSimilarRatings(
                webRaterID, numSimilarRaters, minimalRaters
            );
        } else{
            recommendations = fourthRatings.getSimilarRatingsByFilter(
                webRaterID, numSimilarRaters, minimalRaters, filter
            );
        }


        Rater user = RaterDatabase.getRater(webRaterID);
        ArrayList<Rating> filteredRecs = new ArrayList<>();
        for (Rating r : recommendations) {
            String movieId = r.getItem();
            if (!user.hasRating(movieId)) {
                filteredRecs.add(r);
            }
        }
        return filteredRecs;
    }

    public void printRecommendationsFor(String webRaterID) {
    }
}