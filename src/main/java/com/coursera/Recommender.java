package com.coursera;

import java.util.*;


public interface Recommender {

    public ArrayList<String> getItemsToRate ();

    /**
     * @param webRaterID 
     */
    public void printRecommendationsFor (String webRaterID);
}
