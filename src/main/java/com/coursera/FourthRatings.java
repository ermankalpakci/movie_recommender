package com.coursera;

import java.util.*;

public class FourthRatings {
    
    private double dotProduct(Rater me, Rater r) {
        if (me == null || r == null) {
            System.err.println("Null rater detected!");
            System.err.println("me: " + (me == null ? "null" : me.getID()));
            System.err.println("r: " + (r == null ? "null" : r.getID()));
            return 0.0;
        }
        
        double product = 0.0;
        for (String movieId : me.getItemsRated()) {
            if (r.hasRating(movieId)) {
                double myRating = me.getRating(movieId) - 5;
                double theirRating = r.getRating(movieId) - 5;
                product += myRating * theirRating;
            }
        }
        return product;
    }

    private ArrayList<Rating> getSimilarities(String id) {
        ArrayList<Rating> similarities = new ArrayList<>();
        Rater me = RaterDatabase.getRater(id);
        for (Rater rater : RaterDatabase.getRaters()) {
            if (!rater.getID().equals(id)) {
                double similarity = dotProduct(me, rater);
                if (similarity > 0) {

                    similarities.add(new Rating(rater.getID(), similarity));
                }
            }
        }
        Collections.sort(similarities, Collections.reverseOrder());
        return similarities;
    }

    public ArrayList<Rating> getSimilarRatings(String id, int numSimilarRaters, int minimalRaters) {
        return getSimilarRatingsByFilter(id, numSimilarRaters, minimalRaters, new TrueFilter());
    }


    public ArrayList<Rating> getSimilarRatingsByFilter(String id, int numSimilarRaters, int minimalRaters, Filter filterCriteria) {
        ArrayList<Rating> similarRaters = getSimilarities(id);
        ArrayList<Rating> topRaters = new ArrayList<>(similarRaters.subList(0, Math.min(numSimilarRaters, similarRaters.size())));
        
        HashMap<String, Double> weightedSums = new HashMap<>();
        HashMap<String, Integer> counts = new HashMap<>();

        for (Rating raterRating : topRaters) {
            String raterId = raterRating.getItem();
            double weight = raterRating.getValue();
            Rater rater = RaterDatabase.getRater(raterId);
            for (String movieId : rater.getItemsRated()) {
                if (filterCriteria.satisfies(movieId)) {
                    double rating = rater.getRating(movieId);
                    weightedSums.put(movieId, weightedSums.getOrDefault(movieId, 0.0) + weight * rating);
                    counts.put(movieId, counts.getOrDefault(movieId, 0) + 1);
                }
            }
        }

        ArrayList<Rating> recommendations = new ArrayList<>();
        for (String movieId : weightedSums.keySet()) {
            int count = counts.get(movieId);
            if (count >= minimalRaters) {
                double score = weightedSums.get(movieId) / count;
                recommendations.add(new Rating(movieId, score));
            }

        }


        Collections.sort(recommendations, Collections.reverseOrder());
        return recommendations;
    }


    private double getAverageByID(String id, int minimalRaters) {
        int count = 0;
        double sum = 0.0;
        for (Rater rater : RaterDatabase.getRaters()) {
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
            if (avg > 0) {
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
            if (avg > 0) {
                avgRatings.add(new Rating(movieId, avg));
            }
        }
        return avgRatings;
    }
}