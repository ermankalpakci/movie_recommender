package com.coursera;


import java.util.*;

public class MovieRunnerSimilarRatings {

    public void printSimilarRatings() {
        RaterDatabase.initialize("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        FourthRatings fr = new FourthRatings();
        
        String raterId = "71";
        int numSimilar = 20;
        int minRaters = 5;
        
        ArrayList<Rating> recs = fr.getSimilarRatings(raterId, numSimilar, minRaters);
        System.out.println("Top Recommendations:");
        for (Rating r : recs) {
            System.out.printf("%s %.2f%n", MovieDatabase.getTitle(r.getItem()), r.getValue());
        }
    }

    public void printSimilarRatingsByGenre() {
        RaterDatabase.initialize("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        FourthRatings fr = new FourthRatings();
        
        String raterId = "964";
        int numSimilar = 20;
        int minRaters = 5;
        Filter filter = new GenreFilter("Mystery");
        
        ArrayList<Rating> recs = fr.getSimilarRatingsByFilter(raterId, numSimilar, minRaters, filter);
        System.out.println("Top Action Recommendations:");
        for (Rating r : recs) {
            String movieId = r.getItem();
            System.out.printf("%s %.2f%nGenres: %s%n", MovieDatabase.getTitle(movieId), r.getValue(), MovieDatabase.getGenres(movieId));
        }
    }

    public void printSimilarRatingsByDirector() {
        RaterDatabase.initialize("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        FourthRatings fr = new FourthRatings();
        
        String raterId = "120";
        int numSimilar = 10;
        int minRaters = 2;
        Filter filter = new DirectorsFilter("Clint Eastwood,J.J. Abrams,Alfred Hitchcock,Sydney Pollack,David Cronenberg,Oliver Stone,Mike Leigh");
        
        ArrayList<Rating> recs = fr.getSimilarRatingsByFilter(raterId, numSimilar, minRaters, filter);
        System.out.println("Top Director Recommendations:");
        for (Rating r : recs) {
            String movieId = r.getItem();
            System.out.printf("%s %.2f%nDirectors: %s%n", MovieDatabase.getTitle(movieId), r.getValue(), MovieDatabase.getDirector(movieId));
        }
    }

    public void printSimilarRatingsByGenreAndMinutes() {
        RaterDatabase.initialize("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        FourthRatings fr = new FourthRatings();
        
        String raterId = "168";
        int numSimilar = 10;
        int minRaters = 3;
        AllFilters filter = new AllFilters();
        filter.addFilter(new GenreFilter("Drama"));
        filter.addFilter(new MinutesFilter(80, 160));
        
        ArrayList<Rating> recs = fr.getSimilarRatingsByFilter(raterId, numSimilar, minRaters, filter);
        for (Rating r : recs) {
            String movieId = r.getItem();
            System.out.printf("%s %d mins %.2f%nGenres: %s%n", 
                MovieDatabase.getTitle(movieId), 
                MovieDatabase.getMinutes(movieId),
                r.getValue(),
                MovieDatabase.getGenres(movieId));
        }
    }

    public void printSimilarRatingsByYearAfterAndMinutes() {
        RaterDatabase.initialize("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        FourthRatings fr = new FourthRatings();
        
        String raterId = "314";
        int numSimilar = 10;
        int minRaters = 5;
        AllFilters filter = new AllFilters();
        filter.addFilter(new YearAfterFilter(1975));
        filter.addFilter(new MinutesFilter(70, 200));
        
        ArrayList<Rating> recs = fr.getSimilarRatingsByFilter(raterId, numSimilar, minRaters, filter);
        for (Rating r : recs) {
            String movieId = r.getItem();
            System.out.printf("%s (%d) %d mins %.2f%n", 
                MovieDatabase.getTitle(movieId),
                MovieDatabase.getYear(movieId),
                MovieDatabase.getMinutes(movieId),
                r.getValue());
        }
    }
}