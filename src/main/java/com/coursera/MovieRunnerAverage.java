package com.coursera;

/**
 * Write a description of SecondRatings here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */

import java.util.*;

public class MovieRunnerAverage {
    public void printAverageRatings() {
        SecondRatings sr = new SecondRatings("data/ratedmoviesfull.csv", "data/ratings.csv");

        int minimalRaters = 12;
        ArrayList<Rating> avgRatings = sr.getAverageRatings(minimalRaters);
        Collections.sort(avgRatings);
        for (Rating rating : avgRatings) {
            String movieId = rating.getItem();
            String title = sr.getTitle(movieId);
            System.out.println(rating.getValue() + " " + title);
        }

    }
    public void getAverageRatingOneMovie() {
        SecondRatings secondRatings = new SecondRatings("data/ratedmoviesfull.csv", "data/ratings.csv");
        String title = "Vacation";
        String movieId = secondRatings.getID(title);
        if (movieId.equals("NO SUCH TITLE")) {
            System.out.println("Movie not found.");
            return;
        }
        // int minimalRaters = 0;
        // double avg = secondRatings.getAverageByID(movieId, minimalRaters);
    }
}