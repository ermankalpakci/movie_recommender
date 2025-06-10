package com.coursera;


import java.util.Collections;
import java.util.ArrayList;

public class MovieRunnerWithFilters {
    public void printAverageRatings() {
        ThirdRatings thirdRatings = new ThirdRatings("data/ratings.csv");
        System.out.println("Number of raters: " + thirdRatings.getRaterSize());

        MovieDatabase.initialize("data/ratedmoviesfull.csv");

        int minimalRaters = 35;
        ArrayList<Rating> avgRatings = thirdRatings.getAverageRatings(minimalRaters);
        Collections.sort(avgRatings);

        for (Rating rating : avgRatings) {
            System.out.println(rating.getValue() + " " + MovieDatabase.getTitle(rating.getItem()));
        }
    }

    public void printAverageRatingsByYear() {
        ThirdRatings thirdRatings = new ThirdRatings("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        
        int year = 2000;
        Filter yearFilter = new YearAfterFilter(year);
        ArrayList<Rating> avgRatings = thirdRatings.getAverageRatingsByFilter(1, yearFilter);
        Collections.sort(avgRatings);

        for (Rating rating : avgRatings) {
            String id = rating.getItem();
            System.out.println(rating.getValue() + " " + MovieDatabase.getYear(id) + " " + MovieDatabase.getTitle(id));
        }
    }

    public void printAverageRatingsByGenre() {
        ThirdRatings thirdRatings = new ThirdRatings("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        
        String genre = "Crime";
        Filter genreFilter = new GenreFilter(genre);
        ArrayList<Rating> avgRatings = thirdRatings.getAverageRatingsByFilter(1, genreFilter);
        Collections.sort(avgRatings);

        for (Rating rating : avgRatings) {
            String id = rating.getItem();
            System.out.println(rating.getValue() + MovieDatabase.getTitle(id));
            System.out.println(MovieDatabase.getGenres(id));
        }
    }

    public void printAverageRatingsByMinutes() {
        ThirdRatings thirdRatings = new ThirdRatings("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        
        int min = 110;
        int max = 170;
        Filter minutesFilter = new MinutesFilter(min, max);
        ArrayList<Rating> avgRatings = thirdRatings.getAverageRatingsByFilter(1, minutesFilter);
        Collections.sort(avgRatings);

        for (Rating rating : avgRatings) {
            String id = rating.getItem();
            System.out.println(rating.getValue() + MovieDatabase.getMinutes(id) + MovieDatabase.getTitle(id));
        }
    }

    public void printAverageRatingsByDirectors() {
        ThirdRatings thirdRatings = new ThirdRatings("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        
        String directors = "Charles Chaplin,Michael Mann,Spike Jonze";
        Filter directorsFilter = new DirectorsFilter(directors);
        ArrayList<Rating> avgRatings = thirdRatings.getAverageRatingsByFilter(1, directorsFilter);
        Collections.sort(avgRatings);

        for (Rating rating : avgRatings) {
            String id = rating.getItem();
            System.out.println(rating.getValue() + " " + MovieDatabase.getTitle(id));
            System.out.println("    " + MovieDatabase.getDirector(id));
        }
    }

    public void printAverageRatingsByYearAfterAndGenre() {
        ThirdRatings thirdRatings = new ThirdRatings("data/ratings.csv");
        MovieDatabase.initialize("data/ratedmoviesfull.csv");
        
        AllFilters allFilters = new AllFilters();

        String directors = "Clint Eastwood,Joel Coen,Tim Burton,Ron Howard,Nora Ephron,Sydney Pollack";
        Filter directorsFilter = new DirectorsFilter(directors);
        int min = 90;
        int max = 180;
        Filter minutesFilter = new MinutesFilter(min, max);
        allFilters.addFilter(minutesFilter);
        allFilters.addFilter(directorsFilter);
        ArrayList<Rating> avgRatings = thirdRatings.getAverageRatingsByFilter(3, allFilters);
        Collections.sort(avgRatings);

        System.out.println("Found " + avgRatings.size() + " movies");

    }
}