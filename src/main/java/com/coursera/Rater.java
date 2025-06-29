package com.coursera;

import java.util.*;


public interface Rater {
    void addRating(String item, double rating);
    boolean hasRating(String item);
    String getID();
    double getRating(String item);
    int numRatings();
    ArrayList<String> getItemsRated();
}