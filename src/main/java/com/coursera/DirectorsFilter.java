package com.coursera;

public class DirectorsFilter implements Filter {
    private String[] myDirectors;

    public DirectorsFilter(String directors) {
        myDirectors = directors.split(",");
    }

    @Override
    public boolean satisfies(String id) {
        String movieDirectors = MovieDatabase.getDirector(id);
        for (String d : myDirectors) {
            if (movieDirectors.contains(d.trim())) {
                return true;
            }
        }
        return false;
    }
}