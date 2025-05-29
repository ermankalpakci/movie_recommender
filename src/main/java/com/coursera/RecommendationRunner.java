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

    // New method to get recommendations as data
    public ArrayList<Rating> getRecommendations(String webRaterID) {
        RaterDatabase.initialize("ratings.csv");
        MovieDatabase.initialize("ratedmoviesfull.csv");
        FourthRatings fourthRatings = new FourthRatings();

        int numSimilarRaters = 20;
        int minimalRaters = 3;
        ArrayList<Rating> recommendations = fourthRatings.getSimilarRatings(
            webRaterID, numSimilarRaters, minimalRaters
        );

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

    // Original method kept for compatibility, but not used in web interface
    public void printRecommendationsFor(String webRaterID) {
        ArrayList<Rating> recommendations = getRecommendations(webRaterID);
        
        System.out.println("<style>");
        System.out.println("table { border-collapse: collapse; width: 100%; }");
        System.out.println("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }");
        System.out.println("tr:nth-child(even) { background-color: #f2f2f2; }");
        System.out.println("</style>");
        System.out.println("<table>");
        System.out.println("<tr><th>Title</th><th>Year</th><th>Genre</th><th>Predicted Rating</th></tr>");

        if (recommendations.isEmpty()) {
            System.out.println("<tr><td colspan='4'>No recommendations found. Try rating more movies!</td></tr>");
        } else {
            recommendations.stream()
                .limit(20)
                .forEach(r -> {
                    String movieId = r.getItem();
                    System.out.printf(
                        "<tr><td>%s</td><td>%d</td><td>%s</td><td>%.2f</td></tr>%n",
                        MovieDatabase.getTitle(movieId),
                        MovieDatabase.getYear(movieId),
                        MovieDatabase.getGenres(movieId),
                        r.getValue()
                    );
                });
        }
        System.out.println("</table>");
    }
}