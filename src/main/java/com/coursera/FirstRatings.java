package com.coursera;
import java.util.*;

import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import edu.duke.FileResource;


public class FirstRatings {
    
    public ArrayList<Movie> loadMovies(String filename) {
        ArrayList<Movie> movies = new ArrayList<>();
        FileResource fr = new FileResource(filename);
        CSVParser parser = fr.getCSVParser();
        for (CSVRecord record : parser) {
            String id = record.get("id");
            String title = record.get("title");
            String year = record.get("year");
            String country = record.get("country");
            String genre = record.get("genre");
            String director = record.get("director");
            String minutesStr = record.get("minutes");
            String poster = record.get("poster");
            int minutes = Integer.parseInt(minutesStr.trim());
            Movie movie = new Movie(id, title, year, genre, director, country, poster, minutes);
            movies.add(movie);
        }
        return movies;
    }

    // void testLoadMovies(){
    //     String filePath = "src/data/ratedmoviesfull.csv";
    //     ArrayList<Movie> movies = loadMovies(filePath);
    //     System.out.println("This many movies: " + movies.size());

    //     int comedyCount = 0;
    //     int longMovies = 0;
    //     for (Movie m : movies) {
    //         String[] genres = m.getGenres().split(",");
    //         for (String g : genres) {
    //             if (g.trim().equalsIgnoreCase("Comedy")) {
    //                 comedyCount++;
    //                 break;
    //             }
    //         }
    //         if (m.getMinutes() > 150) {
    //             longMovies++;
    //         }
    //     }

    //     HashMap<String, Integer> directorCounts = new HashMap<>();
    //     for (Movie m : movies) {
    //         String[] directors = m.getDirector().split(",");
    //         for (String d : directors) {
    //             String director = d.trim();
    //             directorCounts.put(director, directorCounts.getOrDefault(director, 0) + 1);
    //         }
    //     }

    //     int maxMovies = 0;
    //     for (int count : directorCounts.values()) {
    //         if (count > maxMovies) {
    //             maxMovies = count;
    //         }
    //     }

    //     List<String> maxDirectors = new ArrayList<>();
    //     for (String director : directorCounts.keySet()) {
    //         if (directorCounts.get(director) == maxMovies) {
    //             maxDirectors.add(director);
    //         }
    //     }
    // }

    public ArrayList<EfficientRater> loadRaters(String filename){
        ArrayList<EfficientRater> raters = new ArrayList<>();
        HashMap<String, EfficientRater> raterMap = new HashMap<>();
        FileResource fr = new FileResource(filename);
        CSVParser parser = fr.getCSVParser();
        for (CSVRecord record : parser) {
            String raterId = record.get("rater_id");
            String movieId = record.get("movie_id");
            double rating = Double.parseDouble(record.get("rating"));

            if (!raterMap.containsKey(raterId)) {
                EfficientRater newRater = new EfficientRater(raterId);
                raters.add(newRater);
                raterMap.put(raterId, newRater);
            }

            EfficientRater currentRater = raterMap.get(raterId);
            currentRater.addRating(movieId, rating);
        }
        return raters;
    }

    public void testLoadRaters() {
        ArrayList<EfficientRater> raters = loadRaters("src/data/ratings.csv");
        System.out.println("Number of raters: " + raters.size());

        String targetRaterId = "193";
        for (EfficientRater r : raters) {
            if (r.getID().equals(targetRaterId)) {
                System.out.println("Number of ratings for rater " + targetRaterId + ": " + r.numRatings());
                break;
            }
        }
        int maxRatings = 0;
        for (EfficientRater r : raters) {
            int current = r.numRatings();
            if (current > maxRatings) {
                maxRatings = current;
            }
        }

        // int countMaxRaters = 0;
        // for (EfficientRater r : raters) {
        //     if (r.numRatings() == maxRatings) {
        //         countMaxRaters++;
        //         System.out.println(r.getID());
        //     }
        // }


        // String targetMovieId = "1798709";
        // int ratingCount = 0;
        // for (EfficientRater r : raters) {
        //     if (r.hasRating(targetMovieId)) {
        //         ratingCount++;
        //     }
        // }

        HashSet<String> uniqueMovies = new HashSet<>();
        for (EfficientRater r : raters) {
            uniqueMovies.addAll(r.getItemsRated());
        }

    }


}

