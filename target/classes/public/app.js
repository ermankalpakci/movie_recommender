document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');
    const submitBtn = document.getElementById('submit-btn');
    const recommendations = document.getElementById('recommendations');
    const loading = document.getElementById('loading');

    let userRatings = {};

    // Fetch movies to rate
    fetch('/get-movies')
        .then(response => response.json())
        .then(movieIds => {
            loading.textContent = 'Please rate these movies:';

            const promises = movieIds.map(movieId =>
                fetch(`/movie-info?id=${movieId}`)
                    .then(res => res.json())
            );

            Promise.all(promises)
                .then(movies => {
                    movies.forEach((movie, index) => {
                        const movieId = movieIds[index];
                        const div = document.createElement('div');
                        div.className = 'movie-item';
                        div.innerHTML = `
                            <h3>${movie.title} (${movie.year})</h3>
                            <p>${movie.genres}</p>
                            <div class="rating-display">Rating: <span id="rating-${movieId}">None</span></div>
                            <div class="rating-buttons" data-movie="${movieId}">
                                ${Array.from({ length: 10 }, (_, i) =>
                                    `<button class="rate-btn" data-rating="${i + 1}" data-movie="${movieId}">${i + 1}</button>`
                                ).join(' ')}
                            </div>
                        `;
                        movieList.appendChild(div);
                    });

                    document.querySelectorAll('.rate-btn').forEach(button => {
                        button.addEventListener('click', function () {
                            const movieId = this.dataset.movie;
                            const rating = parseInt(this.dataset.rating);

                            userRatings[movieId] = rating;
                            document.getElementById(`rating-${movieId}`).textContent = rating;

                            const allButtons = this.parentElement.querySelectorAll('.rate-btn');
                            allButtons.forEach(btn => btn.classList.remove('selected'));
                            this.classList.add('selected');

                            submitBtn.disabled = Object.keys(userRatings).length < 5;
                        });
                    });
                });
        });
    document.addEventListener("DOMContentLoaded", function () {
        const filterToggles = [
            { checkboxId: "toggle-genres", controlIds: ["genres"] },
            { checkboxId: "toggle-year", controlIds: ["min-year", "max-year"] },
            { checkboxId: "toggle-runtime", controlIds: ["min-minutes", "max-minutes"] },
            { checkboxId: "toggle-directors", controlIds: ["directors"] }
        ];

        filterToggles.forEach(group => {
            const checkbox = document.getElementById(group.checkboxId);
            checkbox.addEventListener("change", () => {
                group.controlIds.forEach(id => {
                    document.getElementById(id).disabled = !checkbox.checked;
                });
            });
        });
    });

    // Handle form submission
    submitBtn.addEventListener('click', function () {
        recommendations.innerHTML = '<div class="loading">Generating recommendations...</div>';

        fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRatings)
        })
            .then(response => response.json())
            .then(recommendationsData => {
                recommendations.innerHTML = `
                    <h2>Recommended Movies</h2>
                    <div class="recommendation-list">
                        ${recommendationsData.map(movie => `
                            <div class="movie-recommendation">
                                <h3>${movie.title} (${movie.year})</h3>
                                <div class="details">
                                    <span>Predicted Rating: ${movie.rating.toFixed(1)}</span>
                                    <p>Genres: ${movie.genre}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            })
            .catch(error => {
                recommendations.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            });
    });
});
