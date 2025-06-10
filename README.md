Users can rate movies, apply filters based on preferences, and receive personalized recommendations based on their ratings and selections.

![Screenshot From 2025-06-10 23-46-58](https://github.com/user-attachments/assets/2da9eecc-02bb-47e8-b9cb-c5e7b3fd50a1)

![Screenshot From 2025-06-10 23-48-02](https://github.com/user-attachments/assets/a868fcfc-9db2-4a60-b69d-5f5f0e9fab5a)

![Screenshot From 2025-06-10 23-48-23](https://github.com/user-attachments/assets/bed19fc1-a2ed-4fd6-abb6-fec2b325188c)

### Features
- Get movie suggestions based on your ratings
- Filter by genres, directors, release year, and runtime
- Rate movies with a simple 1-10 scale

### Prerequisites
- Java JDK 8 or higher
- Maven

### Tech
- Java 8+, Spark Java Framework
- Google Gson for JSON processing
- Movie and Rating Databases (CSV-based)

### Installation
```bash
git clone git@github.com:ermankalpakci/movie_recommender.git
cd movie-recommender
mvn clean install
mvn exec:java -Dexec.mainClass="com.coursera.WebApp"
```
Open your browser and visit:
http://localhost:4567

