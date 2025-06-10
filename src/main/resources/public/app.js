document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements with null checks
    const movieList = document.getElementById('movie-list');
    const submitBtn = document.getElementById('submit-btn');
    const recommendations = document.getElementById('recommendations');
    const directorsContainer = document.getElementById('directors-container');
    const selectedDirectorsContainer = document.getElementById('selected-directors');
    const directorSearch = document.getElementById('director-search');
    const genresContainer = document.getElementById('genre-container');
    const selectedGenresContainer = document.getElementById('selected-genres');
    const genreSearch = document.getElementById('genre-search');
    const resetBtn = document.getElementById('resetBtn');

    if (!movieList || !submitBtn || !recommendations || 
        !directorsContainer || !selectedDirectorsContainer || !directorSearch || 
        !genresContainer || !selectedGenresContainer || !genreSearch) {
        console.error('Critical DOM elements missing');
        return;
    }

    const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Adventure', 'Animation', 'Biography', 'Crime', 'Documentary', 'Family', 'Fantasy', 'Film-Noir', 'Game-Show', 'History', 'Horror', 'Music', 'Mystery', 'Reality-TV', 'Romance', 'Short', 'Thriller', 'War', 'Western'];
    const directors = ['A. Taner Elhan', 'A.R. Murugadoss', 'Aamir Khan', 'Aanand Rai', 'Aaron Harvey', 'Aaron Katz', 'Aaron Seltzer', 'Abbas Kiarostami', 'Abdellatif Kechiche', 'Abderrahmane Sissako', 'Abel Ferrara', 'Abhishek Kapoor', 'Adam Carolla', 'Adam Gierasch', 'Adam Green', 'Adam MacDonald', 'Adam McKay', 'Adam Robitel', 'Adam Shankman', 'Adam Wingard', 'Adel Adelson', 'Adil El Arbi', 'Adrian Grunberg', 'Adrian Lyne', 'Adrian Powers', 'Afonso Poyart', 'Ahmed El Maanouni', 'Akira Kurosawa', 'Akiva Goldsman', 'Akiva Schaffer', 'Alan Mak', 'Alan Parker', 'Alan Polsky', 'Alan Shapiro', 'Alan Taylor', 'Alan White', 'Albert Brooks', 'Albert Hughes', 'Alberto Arvelo', 'Alberto Rodriguez', 'Alec Berg', 'Alejandro Agresti', 'Alejandro Amenábar', 'Alejandro González Iñárritu', 'Alejandro Hidalgo', 'Alejandro Jodorowsky', 'Alejandro Monteverde', 'Aleksander Bach', 'Aleksandr Dulerayn', 'Aleksandr Pavlovskiy', 'Aleksandr Petrov', 'Aleksandr Veledinskiy', 'Aleksandr Zeldovich', 'Aleksey Chupov', 'Aleksey Uchitel', 'Alex Garland', 'Alex Gibney', 'Alex Proyas', 'Alex van Warmerdam', 'Alexander Payne', 'Alexander Witt', 'Alexandre Aja', 'Alexandre Moors', 'Alexandre de La Patellière', 'Alexis Dos Santos', 'Alfonso Cuarón', 'Alfonso Gomez-Rejon', 'Alfred Hitchcock', 'Ali Abbas Zafar', 'Ali Atay', 'Allan Ungar', 'Allen Coulter', 'Allen Hughes', 'Amma Asante', 'Amole Gupte', 'Amy Berg', 'Amy Heckerling', 'Ana Lily Amirpour', 'Anand Gandhi', 'Anand Tucker', 'Anatole Litvak', 'Anatoly Eyramdzhan', 'Andrea Arnold', 'Andreas Öhman', 'Andrew Adamson', 'Andrew Bergman', 'Andrew Black', 'Andrew Currie', 'Andrew Davis', 'Andrew Dominik', 'Andrew Erwin', 'Andrew Haigh', 'Andrew Jarecki', 'Andrew Levitas', 'Andrew Niccol', 'Andrew Stanton', 'Andrew V. McLaglen', 'Andrey Konchalovskiy', 'Andrey Zvyagintsev', 'André van Duren', 'Andrés Muschietti', 'Andy De Emmony', 'Andy Fickman', 'Andy Tennant', 'Andy Wachowski', 'Ang Lee', 'Angel Gracia', 'Angelina Jolie', 'Anna Boden', 'Anne Fletcher', 'Anne Fontaine', 'Anne Sundberg', 'Anonymous', 'Anthony C. Ferrante', 'Anthony Chen', 'Anthony DiBlasi', 'Anthony Hemingway', 'Anthony Leonardi III', 'Anthony M. Lanza', 'Anthony Minghella', 'Anthony Russo', 'Anthony Silverston', 'Anthony Stacchi', 'Antoine Fuqua', 'Antoinette Beumer', 'Anton Corbijn', 'Anton Megerdichev', 'Antonio Negret', 'Antonio Tublen', 'Antonis Aggelopoulos', 'Antti Jokinen', 'Anurag Basu', 'Anurag Kashyap', 'Apichatpong Weerasethakul', 'Aram Gülyüz', 'Aramis Tatu', 'Ari Sandel', 'Ariel Schulman', 'Ariel Vromen', 'Ariel Zeitoun', 'Arif Ali', 'Armand Mastroianni', 'Armando Iannucci', 'Armen Evrensel', 'Arnon Goldfinger', 'Arthur Penn', 'Arthur Rankin Jr.', 'Asger Leth', 'Asghar Farhadi', 'Ashima Chibber', 'Ashutosh Gowariker', 'Asif Kapadia', 'Atom Egoyan', 'Ava DuVernay', 'Ayan Mukherjee', 'BJ McDonnell', 'Bahman Ghobadi', 'Baltasar Kormákur', 'Banksy', 'Baran bo Odar', 'Barbara Schroeder', 'Barbra Streisand', 'Barry Cook', 'Barry Levinson', 'Barry Shear', 'Barry Sonnenfeld', 'Bart Freundlich', 'Bart Layton', 'Baz Luhrmann', 'Ben Affleck', 'Ben Lewin', 'Ben Palmer', 'Ben Plazzer', 'Ben Rivers', 'Ben Shapiro', 'Ben Sharpsteen', 'Ben Stiller', 'Ben Wheatley', 'Benh Zeitlin', 'Benjamin Christensen', 'Benjamin Renner', 'Benjamin Stoloff', 'Benjamin Turner', 'Bennett Miller', 'Benson Lee', 'Bent Hamer', 'Bernard Rose', 'Bernardo Bertolucci', 'Bertrand Blier', 'Bertrand Tavernier', 'Beth Aala', 'Bibo Bergeron', 'Bilal Lashari', 'Bilall Fallah', 'Bill Condon', 'Bill Kroyer', 'Bill Paxton', 'Bill Plympton', 'Bill Pohlad', 'Bille Woodruff', 'Billy Bob Thornton', "Billy O'Brien", 'Billy Ray', 'Billy Wilder', 'Biyi Bandele', 'Björn Stein', 'Björne Larson', 'Bo Mathorne', 'Boaz Yakin', 'Bob Clark', 'Bob Dolman', 'Bob Odenkirk', 'Bob Peterson', 'Bob Rafelson', 'Bobby Boermans', 'Bobby Farrelly', 'Bobcat Goldthwait', 'Boris Aljinovic', 'Brad Anderson', 'Brad Bird', 'Brad Furman', 'Brad Lewis', 'Brad Peyton', 'Brad Silberling', 'Bradley Parker', 'Brandon Camp', 'Breck Eisner', 'Brenda Chapman', 'Brett Kelly', 'Brett Leonard', 'Brett Morgen', 'Brett Ratner', 'Brett Simmons', 'Brian A Miller', 'Brian Dannelly', 'Brian De Palma', 'Brian G. Hutton', 'Brian Helgeland', 'Brian Herzlinger', 'Brian Holden', 'Brian Klugman', 'Brian Knappenberger', 'Brian Percival', 'Brian Pulido', 'Brian Savelson', 'Brian Spitz', 'Brian Taylor', 'Brian Trenchard-Smith', 'Brigitte Sy', 'Brin Hill', 'Bronwen Hughes', 'Bruce A. Evans', 'Bruce Beresford', 'Bruce McDonald', 'Bruce Robinson', 'Bruno Dumont', 'Bruno Forzani', 'Bruno Irizarry', 'Bruno Podalydès', 'Bryan Bertino', 'Bryan Singer', 'Bryan Spicer', 'Buddy Van Horn', 'Burak Aksak', 'Burr Steers', 'Buster Keaton', 'Byeong-gil Jeong', 'Byron Howard', 'Byung-seo Kim', 'Bülent Isbilen', 'C. Jay Cox', 'C. Thomas Howell', 'C.J. Hunt', 'Calin Peter Netzer', 'Cameron Crowe', 'Camille Delamarre', 'Campbell Scott', 'Caradog W. James', 'Carl Christman', 'Carl Franklin', 'Carl Rinsch', 'Carlo A. Sigon', 'Carlos Marques-Marcet', 'Carlos Saldanha', 'Carol Morley', 'Carol Reed', 'Cary Joji Fukunaga', 'Cate Shortland', 'Catherine Corsini', 'Catherine Hardwicke', 'Cem Yilmaz', 'Cemal San', 'Chad Stahelski', 'Chad Villella', 'Chan-wook Park', 'Charles Barton', 'Charles Chaplin', 'Charles Jarrott', 'Charles Kaufman', 'Charles Laughton', 'Charles Shyer', 'Charles Stone III', 'Charlie McDowell', 'Charlotte Brändström', 'Chris Buck', 'Chris Butler', 'Chris Carter', 'Chris Columbus', 'Chris Crow', 'Chris Gorak', 'Chris Hopewell', 'Chris Kentis', 'Chris Lofing', 'Chris Miller', 'Chris Renaud', 'Chris Sanders', 'Chris Smith', 'Chris Wedge', 'Chris Weitz', 'Chris Williams', 'Christian Ditter', 'Christian Petzold', 'Christine Cynn', 'Christine Jeffs', 'Christophe Offenstein', 'Christopher Doyle', 'Christopher Landon', 'Christopher McQuarrie', 'Christopher Menaul', 'Christopher Miller', 'Christopher Neil', 'Christopher Nolan', 'Christopher Smith', 'Ciarán Foy', 'Claire Carré', 'Clark Gregg', 'Clark Johnson', 'Claude Goretta', 'Claude Lelouch', 'Claudia Llosa', 'Clint Eastwood', 'Clio Barnard', 'Clive Barker', 'Clément Michel', 'Cody Cameron', 'Colin Minihan', 'Colin Strause', 'Colin Trevorrow', 'Conrad Vernon', 'Corey Grant', 'Corey Yuen', 'Courteney Cox', 'Courtney Hunt', 'Courtney Solomon', 'Craig Brewer', 'Craig Gillespie', 'Craig Johnson', 'Craig Monahan', 'Craig Moss', 'Craig Zobel', 'Crispian Mills', 'Cristi Puiu', 'Cristian Mungiu', 'Curt Morgan', 'Curtis Hanson', 'Cédric Klapisch', 'D.J. Caruso', 'Daan Veldhuizen', 'Damian Lee', 'Damien Chazelle', 'Damián Szifrón', 'Damon Beesley', 'Dan Bradley', 'Dan Gilroy', 'Dan Mazer', 'Dan Scanlon', 'Daniel Alfredson', 'Daniel Barnz', 'Daniel Benmayor', 'Daniel Cohen', 'Daniel Espinosa', 'Daniel G. Karslake', 'Daniel Geller', 'Daniel Hsia', 'Daniel Lee', 'Daniel Lindsay', 'Daniel Lusko', 'Daniel Monzón', 'Daniel Nettheim', 'Daniel Ribeiro', 'Daniel Schechter', 'Daniel Stamm', 'Daniela Thomas', 'Danny Boyle', 'Danny Cannon', 'Danny DeVito', 'Danny Leiner', 'Danny Pang', 'Dany Boon', 'Dariush Mehrjui', 'Darren Aronofsky', 'Darren Lynn Bousman', 'Dave Green', 'David A. Armstrong', 'David Anspaugh', 'David Ayer', 'David Beaird', 'David Boyd', 'David Brooks', 'David Bruckner', 'David Chase', 'David Cronenberg', 'David Dobkin', 'David Dodson', 'David Fincher', 'David Foenkinos', 'David Frankel', 'David Gelb', 'David Gordon Green', 'David Guy Levy', 'David Hackl', 'David Hand', 'David Koepp', 'David Lean', 'David Leitch', 'David Lowery', 'David Lynch', 'David M. Rosenthal', 'David Mackenzie', 'David Mandel', 'David McNally', 'David Michôd', 'David Mirkin', 'David O. Russell', 'David Palmer', 'David Peers', 'David R. Ellis', 'David Robert Mitchell', 'David S. Goyer', 'David Sandberg', 'David Scheinmann', 'David Schwimmer', 'David Siegel', 'David Silverman', 'David Slade', 'David Soren', 'David Twohy', 'David Wain', 'David Winning', 'David Yates', 'David Zellner', 'David Zucker', 'Davide Manuli', 'Davis Guggenheim', 'Dax Shepard', 'Dayna Goldfine', 'Dean DeBlois', 'Dean Israelite', 'Dean Parisot', 'Debra Granik', 'Declan Donnellan', 'Declan Lowney', 'Denis Henry Hennelly', 'Denis Villeneuve', 'Dennie Gordon', 'Dennis Bots', 'Dennis Dugan', 'Dennis Gansel', 'Dennis Iliadis', 'Denzel Washington', 'Derek Cianfrance', 'Derek Savage', 'Destin Daniel Cretton', 'Dexter Fletcher', 'Diablo Cody', 'Diane English', 'Dibakar Banerjee', 'Dick Tuinder', 'Dictynna Hood', 'Diederick Koopal', 'Diederik Ebbinge', 'Diederik Van Rooijen', 'Diego Kaplan', 'Diego Luna', 'Diego Quemada-Díez', 'Dino Risi', 'Dito Montiel', 'Dmitriy Dyachenko', 'Dmitriy Meskhiev', 'Dominic Harari', 'Dominic Sena', 'Dominique Deruddere', 'Don Bluth', 'Don Chaffey', 'Don Hahn', 'Don Hall', 'Don Mancini', 'Don McKellar', 'Don Roos', 'Don Scardino', 'Don Siegel', 'Don Taylor', 'Donald Crisp', 'Dong-hoon Choi', 'Donovan Cook', 'Doug Ellin', 'Doug Liman', 'Douglas Aarniokoski', 'Douglas McGrath', 'Drake Doremus', 'Drew Barrymore', 'Drew Goddard', 'Drew Pearce', 'Drew Tobia', 'Dror Moreh', 'Duncan Jones', 'Duncan Tucker', 'Dustin Hoffman', 'Dwight H. Little', 'Dylan C. Brown', 'Earl Palma', 'Ed Bye', 'Ed Gass-Donnelly', 'Ed Harris', 'Edgar Wright', 'Edoardo Leo', 'Eduardo Sánchez', 'Edward Zwick', 'Eiichirô Hasumi', 'Elaine Constantine', 'Eli Roth', 'Eli Sasich', 'Elia Kazan', 'Elise Robertson', 'Elizabeth Allen Rosenbaum', 'Elizabeth Banks', 'Ellie Kanner', 'Elliot Silverstein', 'Elliott Lester', 'Emanuel Hoss-Desmarais', 'Emile Edwin Smith', 'Emilio Portes', 'Emir Kusturica', 'Emmanuel Benbihy', 'Emmanuel Mouret', 'Eran Creevy', 'Eran Riklis', 'Eric Bress', 'Eric Darnell', 'Eric Goldberg', 'Eric Heisserer', 'Eric Hurt', 'Eric Lartigau', 'Eric Rohmer', 'Eric Steel', 'Eric Toledano', 'Eric Tsang', 'Ericson Core', 'Erik Van Looy', 'Ernie Barbarash', 'Erol Özlevi', 'Espen Sandberg', 'Etan Cohen', 'Ethan Coen', 'Ettore Scola', 'Eugenio Derbez', 'Eugenio Mira', 'Evan Goldberg', 'Evelyn Purcell', 'Eyad Zahra', 'F. Gary Gray', 'Fabián Bielinsky', 'Farah Khan', 'Fatih Akin', 'Fede Alvarez', 'Federico Fellini', 'Felix Chong', 'Felix Herngren', 'Felix van Groeningen', 'Fenton Bailey', 'Fernando Lavanderos Montero', 'Fernando Meirelles', 'Fernando Méndez', 'Ferzan Ozpetek', 'Ficarra', 'Fisher Stevens', 'Flip Van der Kuil', 'Florian Henckel von Donnersmarck', 'Forugh Farrokhzad', 'Franc Roddam', 'Francesca Archibugi', 'Francesco Rosi', 'Francis Ford Coppola', 'Francis Glebas', 'Francis Lawrence', 'Francis Veber', 'Franck Khalfoun', 'Franco Zeffirelli', 'Frank A. Cappello', 'Frank Capra', 'Frank Coraci', 'Frank Darabont', 'Frank Miller', 'Frank Oz', 'Frank Perry', 'Franklin J. Schaffner', 'Franz Antel', 'François Girard', 'François Ozon', 'François Truffaut', 'Fred C. Newmeyer', 'Fred Cavayé', 'Fred M. Wilcox', 'Fred Schepisi', 'Fred Zinnemann', 'Frederick Wiseman', 'Fredi M. Murer', 'Fritz Kiersch', 'Fritz Lang', 'Frédéric Auburtin', 'Frédéric Tcheng', 'Gabe Ibáñez', 'Gabe Polsky', 'Gabe Torres', 'Gabe Turner', 'Gabriela Cowperthwaite', 'Gabriela Pichler', 'Gabriele Muccino', 'Gareth Edwards', 'Gareth Evans', 'Garry Marshall', 'Garth Jennings', 'Gary Eck', 'Gary Fleder', 'Gary McKendry', 'Gary Ross', 'Gary Shore', 'Gary Trousdale', 'Gary Winick', 'Gaspar Noé', 'Gauri Shinde', 'Gavin Hood', "Gavin O'Connor", 'Gaëtan Brizzi', 'Gene Kelly', 'Gennaro Nunziante', 'Genndy Tartakovsky', 'Geoffrey Fletcher', 'Geoffrey Sax', 'George Armitage', 'George C. Wolfe', 'George Clooney', 'George Cukor', 'George Gallo', 'George Hencken', 'George Lucas', 'George Miller', 'George Nolfi', 'George P. Cosmatos', 'George Pal', 'George Pavlou', 'George Ratliff', 'George Roy Hill', 'George Stevens', 'George Tillman Jr.', 'Georges Franju', 'Georgiy Daneliya', 'Gerrard Verhage', 'Gil Junger', 'Gil Kenan', 'Gilles Paquet-Brenner', 'Gillian Robespierre', 'Gillo Pontecorvo', 'Gina Prince-Bythewood', 'Giovanni Columbu', 'Giuseppe Tornatore', 'Glenn Ficarra', 'Glenn Gordon Caron', 'Glenn Leyburn', 'Glenn McQuaid', 'Godfrey Reggio', 'Gonzalo López-Gallego', 'Gore Verbinski', 'Gorô Miyazaki', 'Gotham Chopra', 'Graham Annable', 'Grant Heslov', "Greg 'Freddy' Camalier", 'Greg Berlanti', 'Greg Francis', 'Greg McLean', 'Greg Mottola', 'Greg Strause', 'Gregg Araki', 'Gregg Hale', 'Gregor Jordan', 'Gregory Hoblit', 'Griffin Dunne', 'Grégory Levasseur', 'Guillaume Canet', 'Guillaume Gallienne', 'Guillem Morales', 'Guillermo Arriaga', 'Guillermo del Toro', 'Gurinder Chadha', 'Gus Van Sant', 'Guy Hamilton', 'Guy Ritchie', 'Gérard Depardieu', 'Gérard Oury', 'H. Bruce Humberstone', 'Haifaa Al-Mansour', 'Hakan Yonat', 'Hamid Jebeli', 'Hamid Nematollah', 'Han-min Kim', 'Hannes Holm', 'Hans Petter Moland', 'Hany Abu-Assad', 'Harald Siepermann', 'Harald Zwart', 'Harmony Korine', 'Harold Becker', 'Harold Cronk', 'Harold Ramis', 'Hayao Miyazaki', 'Heitor Dhalia', 'Hella Joof', 'Hendel Butoy', 'Henrik Ruben Genz', 'Henry Alex Rubin', 'Henry Bean', 'Henry Hathaway', 'Henry Hobson', 'Henry Joost', 'Henry King', 'Henry Koster', 'Henry Selick', 'Herbert Ross', 'Herk Harvey', 'Herman Yau', 'Hettie Macdonald', 'Hiner Saleem', 'Hirokazu Koreeda', 'Hiromasa Yonebayashi', 'Hiroshi Teshigahara', 'Hiroyuki Okiura', 'Hong-jin Na', 'Hong-seon Kim', 'Hoon-jung Park', 'Hossein Amini', 'Howard Hawks', 'Howard McCain', 'Hua-Tao Teng', 'Hugh Parks', 'Hélène Cattet', 'Hüseyin Tabak', 'Iain Forsyth', 'Iain Morris', 'Iain Softley', 'Ilmar Raag', 'Imtiaz Ali', 'Ingmar Bergman', 'Ira Sachs', 'Irvin Kershner', 'Irwin Winkler', 'Isabel Coixet', 'Isao Takahata', 'Israel Luna', 'Isshin Inudô', 'Ivan Reitman', 'J. Lee Thompson', 'J. Mackye Gruber', 'J.A. Bayona', 'J.B. Whirtley', 'J.C. Calciano', 'J.C. Chandor', 'J.D. Chakravarthi', 'J.J. Abrams', 'J.T. Petty', 'Jacek Borcuch', 'Jack Heller', 'Jack Perez', 'Jack Sholder', 'Jackie Chan', 'Jaco Van Dormael', 'Jacob Aaron Estes', 'Jacob Hatley', 'Jacob Vaughan', 'Jacques Audiard', 'Jacques Tati', 'Jake Kasdan', 'Jake Schreier', 'Jalil Lespert', 'Jalmari Helander', 'James Algar', 'James Bobin', 'James Cameron', 'James DeMonaco', 'James Dearden', 'James Duffy', 'James Fargo', 'James Foley', 'James Gray', 'James Griffiths', 'James Gunn', 'James Ivory', 'James Keach', 'James Kent', 'James L. Brooks', 'James Mangold', 'James Marsh', 'James Mather', 'James McTeigue', 'James Merendino', 'James Nguyen', 'James Nunn', 'James Ponsoldt', 'James Strong', 'James Swirsky', 'James Wan', 'James Ward Byrkit', 'James Watkins', 'James Whale', 'James Wong', 'Jamie Babbit', 'Jamie Bradshaw', 'Jamie Travis', 'Jan Komasa', 'Jan Pinkava', 'Jan de Bont', 'Jane Campion', 'Jane Pollard', 'Jared Leto', 'Jason Bateman', 'Jason Eisener', 'Jason Friedberg', 'Jason Lapeyre', 'Jason Moore', 'Jason Reitman', 'Jason Spingarn-Koff', 'Jason Trost', 'Jaume Balagueró', 'Jaume Collet-Serra', 'Jay Bulger', 'Jay Duplass', 'Jay Kanzler', 'Jay Lavender', 'Jay Roach', 'Jean Becker', 'Jean Eustache', 'Jean Girault', 'Jean Loubignac', 'Jean Renoir', 'Jean Vigo', 'Jean-Claude La Marre', 'Jean-François Richet', 'Jean-Jacques Annaud', 'Jean-Luc Godard', 'Jean-Marc Minéo', 'Jean-Marc Vallée', 'Jean-Pierre Dardenne', 'Jean-Pierre Jeunet', 'Jeannot Szwarc', 'Jee-woon Kim', 'Jeethu Joseph', 'Jeff Baena', 'Jeff Nichols', 'Jeff Orlowski', 'Jeff Renfroe', 'Jeff Schaffer', 'Jeff Tremaine', 'Jeff Wadlow', 'Jeffrey Friedman', 'Jeffrey Schwarz', 'Jehane Noujaim', 'Jemaine Clement', 'Jen McGowan', 'Jennifer Kent', 'Jennifer Lee', 'Jennifer Siebel Newsom', 'Jeremiah S. Chechik', 'Jeremy Garelick', 'Jeremy Kipp Walker', 'Jeremy Leven', 'Jeremy Saulnier', 'Jeremy Sims', 'Jerome Robbins', 'Jerome Sable', 'Jerry Rothwell', 'Jerry Schatzberg', 'Jerry Zucker', 'Jerzy Skolimowski', 'Jesse Lawrence', 'Jesse V. Johnson', 'Jessica Oreck', 'Jessie Nelson', 'Jessy Terrero', 'Jesús Monllaó', 'Jijy Philip', 'Jim Abrahams', 'Jim Field Smith', 'Jim Henson', 'Jim Jarmusch', 'Jim Mickle', 'Jim Rash', 'Jim Sharman', 'Jim Sheridan', 'Jim Taihuttu', 'Jimmy Hayward', 'Jirí Menzel', 'Joachim Rønning', 'Joan C. Gratz', 'Joann Sfar', 'Joanna Hogg', 'Joby Harold', 'Jocelyn Moorhouse', 'Jodie Foster', 'Joe Carnahan', 'Joe Chappelle', 'Joe Dante', 'Joe Johnston', 'Joe Lynch', 'Joe Nussbaum', 'Joe Pytka', 'Joe Raffa', 'Joe Ranft', 'Joe Roth', 'Joe Russo', 'Joe Smalley', 'Joe Swanberg', 'Joe Wright', 'Joel Coen', 'Joel Edgerton', 'Joel Schumacher', 'Joel Zwick', 'Johan Earl', 'John Badham', 'John Boorman', 'John Butler', 'John Cameron Mitchell', 'John Carney', 'John Carpenter', 'John Crowley', 'John Curran', 'John Dahl', 'John Duigan', 'John Erick Dowdle', 'John Ford', 'John Francis Daley', 'John Frankenheimer', 'John G. Avildsen', 'John Gatins', 'John Glen', 'John Guillermin', 'John Gulager', 'John Hillcoat', 'John Huddles', 'John Hughes', 'John Huston', 'John Hyams', 'John Irvin', 'John Krokidas', 'John Landis', 'John Lasseter', 'John Lee Hancock', 'John Luessenhop', 'John Madden', 'John McNaughton', 'John McTiernan', 'John Michael McDonagh', 'John Milius', 'John Mitchell', 'John Moore', 'John Musker', 'John N. Smith', 'John Pasquin', 'John Patrick Shanley', 'John Pogue', 'John Poliquin', 'John R. Leonetti', 'John Requa', 'John Roberts', 'John Sayles', 'John Schlesinger', 'John Singleton', 'John Slattery', 'John Stevenson', 'John Stockwell', 'John Sturges', 'John Turturro', 'John Wells', 'John Woo', 'Johnnie To', 'Joko Anwar', 'Jon Amiel', 'Jon Avnet', 'Jon Erwin', 'Jon Favreau', 'Jon Kasdan', 'Jon Lucas', 'Jon M. Chu', 'Jon Poll', 'Jon S. Baird', 'Jon Stewart', 'Jon Turteltaub', 'Jonas Alexander Arnby', 'Jonas Mekas', 'Jonathan Brough', 'Jonathan Dayton', 'Jonathan Demme', 'Jonathan English', 'Jonathan Glazer', 'Jonathan Hensleigh', 'Jonathan Kaplan', 'Jonathan Levine', 'Jonathan Liebesman', 'Jonathan Lynn', 'Jonathan M. Goldstein', 'Jonathan Mostow', 'Jonathan Newman', 'Jonathan Segal', 'Jonathan Sobol', 'Jonathan Teplitzky', 'Jonathan Tzachor', 'Jonathan van Tulleken', 'Joon Ho Bong', 'Jordan Scott', 'Jordan Vogt-Roberts', 'Jorge R. Gutiérrez', 'Jorge Torregrossa', 'Joseph Anthony', 'Joseph Garner', 'Joseph Gordon-Levitt', 'Joseph Kosinski', 'Joseph L. Mankiewicz', 'Joseph M. Newman', 'Joseph Ruben', 'Josh Boone', 'Josh Gordon', 'Josh Radnor', 'Josh Schwartz', 'Josh Stolberg', 'Josh Trank', 'Joshua Logan', 'Joshua Marston', 'Joshua Michael Stern', 'Joshua Oppenheimer', 'Joss Whedon', 'José Padilha', 'Joël Vanhoebrouck', 'Juan Carlos Fresnadillo', 'Juan José Campanella', 'Juan Solanas', 'Judd Apatow', 'Judith Krant', 'Jules Bass', 'Jules Stewart', 'Julian Farino', 'Julian Jarrold', 'Julie Anne Robinson', 'Julie Delpy', 'Julie Taymor', 'Julien Leclercq', 'Julio Medem', 'Justin Chadwick', 'Justin Kelly', 'Justin Lin', 'Justin Martinez', 'Justin Reardon', 'Justin Simien', 'Justin Zackham', 'K. Selvaraghavan', 'Kaare Andrews', 'Kabir Khan', 'Kadir Balci', 'Kaige Chen', 'Kamal Tabrizi', 'Kambuzia Partovi', 'Kaneto Shindô', 'Kanti Shah', 'Kar Wai Wong', 'Kar-wai Wong', 'Karan Johar', 'Karen Oganesyan', 'Kari Anne Moe', 'Karin Fahlén', 'Karl Lear', 'Karl Mueller', 'Karyn Kusama', 'Kasper Barfoed', 'Kat Coiro', 'Kathryn Bigelow', 'Katrin Gebbe', 'Katsuhiro Ôtomo', 'Kazuaki Kiriya', 'Keanu Reeves', 'Keenen Ivory Wayans', 'Kees van Nieuwkerk', 'Keishi Ohtomo', 'Keith Parmer', 'Kelly Dolen', 'Kelly Reichardt', 'Ken Annakin', 'Ken Kwapis', 'Ken Loach', 'Ken Scott', 'Kenneth Branagh', 'Kenneth Lonergan', 'Keoni Waxman', 'Kevin Bray', 'Kevin Carraway', 'Kevin Connolly', 'Kevin Goetz', 'Kevin Greutert', 'Kevin Hench', 'Kevin James Barry', 'Kevin Macdonald', 'Kevin Reynolds', 'Kevin Smith', 'Kevin Tancharoen', 'Ki-duk Kim', 'Kieran Darcy-Smith', 'Kim Farrant', 'Kimberlee Acquaro', 'Kimberly Peirce', 'King Vidor', 'Kinji Fukasaku', 'Kinka Usher', 'Kirby Dick', 'Kirk De Micco', 'Kirk Jones', 'Kirk Wise', 'Kivanc Baruonu', 'Kjell Sundvall', 'Klay Hall', 'Kleber Mendonça Filho', 'Konstantin Bronzit', 'Kris Pearn', 'Krishna D.K.', 'Kriv Stenders', 'Krzysztof Kieslowski', 'Kunal Kohli', 'Kurt Wimmer', 'Kyle Balda', 'Kátia Lund', 'Kôji Morimoto', 'Lake Bell', 'Lana Wachowski', 'Larry Charles', 'Larry Clark', 'Larry Morey', 'Lars von Trier', 'Larysa Kondracki', 'Lasse Hallström', 'Laura Lau', 'Laura Poitras', 'Laurent Malaquais', 'Laurent Tirard', 'Lawrence Kasdan', 'Lee Daniels', 'Lee Sternthal', 'Lee Tamahori', 'Lee Toland Krieger', 'Lee Unkrich', 'Leigh Whannell', 'Len Wiseman', 'Lena Koppel', 'Leni Riefenstahl', 'Lenny Abrahamson', 'Leo McCarey', 'Leonid Gayday', 'Leos Carax', 'Les Mayfield', 'Leslie Iwerks', 'Leslie Small', 'Leslye Headland', 'Leticia Tonos', 'Levan Gabriadze', 'Lewis Gilbert', 'Lewis Teague', 'Lexi Alexander', 'Liam Lynch', 'Linda Bloodworth-Thomason', 'Lisa Azuelos', "Lisa Barros D'Sa", 'Lisa Cholodenko', 'Lisanne Pajot', 'Liz Garbus', 'Liz W. Garcia', 'Lola Bessis', 'Lone Scherfig', 'Lorene Scafaria', 'Louie Psihoyos', 'Louis Leterrier', 'Louis Malle', 'Louise Friedberg', 'Louise Osmond', 'Loveleen Tandan', 'Luc Besson', 'Luc Dardenne', 'Luc Jacquet', 'Luca Guadagnino', 'Lucía Puenzo', 'Luis Buñuel', 'Luis Carlos Hueck', 'Luis Mandoki', 'Luis Piedrahita', 'Luis Prieto', 'Luiso Berdejo', 'Luke Greenfield', 'Lynn Shelton', 'Lynne Ramsay', 'M. Night Shyamalan', 'Maarten Treurniet', 'Mabrouk El Mechri', 'Madhur Bhandarkar', 'Maggie Carey', 'Mahsun Kirmizigül', 'Majid Majidi', 'Makinov', 'Makoto Kamiya', 'Makoto Shinkai', 'Malcolm D. Lee', 'Malik Bendjelloul', 'Mamoru Hosoda', 'Mani Haghighi', 'Manish Gupta', 'Manny Rodriguez', 'Manuel Martín Cuenca', 'Manuel Sicilia', 'Marc Forster', 'Marc Lawrence', 'Marc Webb', 'Marcel Carné', 'Marcello Macchia', 'Marcos Jorge', 'Marcus Dunstan', 'Marcus Markou', 'Marcus Nispel', 'Mario Van Peebles', 'Mario Zampi', 'Marisa Miller Wolfson', 'Marius Balchunas', 'Marjane Satrapi', 'Mark A.Z. Dippé', 'Mark Andrews', 'Mark Ashmore', 'Mark Duplass', 'Mark Hartley', 'Mark Helfrich', 'Mark Levinson', 'Mark Mylod', 'Mark Neveldine', 'Mark Osborne', 'Mark Pavia', 'Mark Pellington', 'Mark Simon Hewis', 'Mark Steven Johnson', 'Mark Tonderai', 'Mark Verkerk', 'Mark Waters', 'Marlen Khutsiev', 'Marte Vold', 'Martha Stephens', 'Martin Brest', 'Martin Campbell', 'Martin McDonagh', 'Martin Ritt', 'Martin Scorsese', 'Martin Williams', 'Mary Harron', 'Massy Tadjedin', 'Mat Whitecross', 'Mathieu Kassovitz', 'Matt Bettinelli-Olpin', 'Matt Duffer', 'Matt Reeves', 'Matt Shakman', 'Matteo Garrone', 'Matthew Chapman', 'Matthew Robinson', 'Matthew Ryan Hoge', 'Matthew Vaughn', 'Matthew Warchus', 'Matthew Weiner', 'Matthieu Delaporte', 'Matthijs van Heijningen Jr.', 'Max Joseph', 'Max Ophüls', 'Maïwenn', 'McG', 'Megan Griffiths', 'Megan Mylan', 'Mehdi Rahmani', 'Mel Brooks', 'Mel Gibson', 'Menhaj Huda', 'Mervyn LeRoy', 'Michael A. Nickles', 'Michael Anderson', 'Michael Apted', 'Michael Bay', 'Michael Brandt', 'Michael Caton-Jones', 'Michael Chapman', 'Michael Cimino', 'Michael Crichton', 'Michael Cuesta', 'Michael Curtiz', 'Michael D. Olmos', 'Michael Dowse', 'Michael Goetz', 'Michael Greenspan', 'Michael Haneke', 'Michael Hoffman', 'Michael J. Bassett', 'Michael Lander', 'Michael Laughlin', 'Michael Lembeck', 'Michael Mann', 'Michael McCarthy', 'Michael Pavone', 'Michael Pressman', 'Michael Radford', 'Michael Rasmussen', 'Michael Ritchie', 'Michael Spierig', 'Michael Sucsy', 'Michael T. Vollmann', 'Michael Tiddes', 'Michael Webber', 'Michael Winterbottom', 'Michal Socha', 'Michaël Cohen', 'Michaël R. Roskam', 'Michaël Youn', 'Michel Franco', 'Michel Gondry', 'Michel Hazanavicius', 'Michelangelo Antonioni', 'Michelangelo Frammartino', 'Michelle Schumacher', 'Michiel ten Horn', 'Mickey Liddell', 'Miguel Arteta', 'Mikael Håfström', 'Mikael Salomon', 'Mikael Syrén', 'Mike Cahill', 'Mike Flanagan', 'Mike Hodges', 'Mike Johnson', 'Mike Judge', 'Mike Leigh', 'Mike Maguire', 'Mike Mills', 'Mike Mitchell', 'Mike Myers', 'Mike Newell', 'Mike Nichols', 'Mike Thurmeier', 'Mikhail Segal', 'Mikhail Tumanishvili', 'Mikhaël Hers', 'Mikio Naruse', 'Mikkel Brænne Sandemose', 'Milind Ukey', 'Milos Forman', 'Mimi Leder', 'Mira Nair', 'Mitchell Lichtenstein', 'Mohammad Rasoulof', 'Mohammed Saeed Harib', 'Mohit Suri', 'Mohsen Makhmalbaf', 'Morgan Matthews', 'Morgan Neville', "Morgan O'Neill", 'Morgan Spurlock', 'Morten Tyldum', 'Mrigdeep Singh Lamba', 'Mukunda Michael Dewil', 'Måns Mårlind', 'N/A', 'Nadav Schirman', 'Nadine Labaki', 'Nagesh Kukunoor', 'Nagisa Ôshima', 'Nancy Meyers', 'Nat Faxon', 'Natalie Portman', 'Natalya Merkulova', 'Nathan Greno', 'Navaniat Singh', 'Ned Benson', 'Neeraj Pandey', 'Neil Burger', 'Neil Jordan', 'Neil LaBute', 'Neil Marshall', 'Neil Oseman', 'Neill Blomkamp', 'Nelson McCormick', 'Nicholas Fackler', 'Nicholas Hytner', 'Nicholas Jarecki', 'Nicholas McCarthy', 'Nicholas Meyer', 'Nicholas Ray', 'Nicholas Smith', 'Nicholas Stoller', 'Nicholaus Goossen', 'Nick Broomfield', 'Nick Cassavetes', 'Nick Castle', 'Nick Hamm', 'Nick Love', 'Nick Murphy', 'Nick Ormerod', 'Nick Tomnay', 'Nicolas Winding Refn', 'Nicole Holofcener', 'Nicole Kassell', 'Nicolás López', 'Niels Arden Oplev', 'Nigel Cole', 'Niki Caro', 'Nikita Mikhalkov', 'Nikolaj Arcel', 'Nikolay Lebedev', 'Nima Nourizadeh', 'Nimród Antal', 'Nina Paley', 'Nir Paniry', 'Noah Baumbach', 'Noam Murro', 'Noboru Iguchi', 'Nobuhiro Suwa', 'Noel Clarke', 'Nora Ephron', 'Norman Jewison', 'Norman Taurog', 'Nuri Bilge Ceylan', 'Olaf de Fleur Johannesson', 'Olatunde Osunsanmi', 'Ole Bornedal', 'Ole Giæver', 'Oliver Hirschbiegel', 'Oliver Parker', 'Oliver Schmitz', 'Oliver Stone', 'Olivier Assayas', 'Olivier Dahan', 'Olivier Megaton', 'Olivier Nakache', 'Omid Nooshin', 'Oren Peli', 'Oriol Paulo', 'Orson Welles', 'Osman Sinav', 'Otto Lang', 'Otto Preminger', 'Owen Hurley', 'Oxide Chun Pang', 'Pablo Larraín', 'Paco Cabezas', 'Paco Plaza', 'Paddy Considine', 'Paolo Sorrentino', 'Paolo Virzì', 'Paris Barclay', 'Parviz Shahbazi', 'Pascal Chaumeil', 'Pascal Laugier', 'Pascale Pouzadoux', 'Pat Holden', "Pat O'Connor", 'Patrice Leconte', 'Patricia Birch', 'Patrick Hughes', 'Patrick Lussier', 'Patrick Read Johnson', 'Patrick Skeyhill', 'Patrick Tatopoulos', 'Patrik Forsberg', 'Patty Jenkins', 'Paul Andrew Williams', 'Paul Brickman', 'Paul Brizzi', 'Paul Feig', 'Paul Greengrass', 'Paul Haggis', 'Paul Harather', 'Paul Hyett', 'Paul King', 'Paul McGuigan', 'Paul Michael Glaser', 'Paul Scheuring', 'Paul Schrader', 'Paul Thomas Anderson', 'Paul Tibbitt', 'Paul Verhoeven', 'Paul W.S. Anderson', 'Paul Weiland', 'Paul Weitz', 'Paul Wendkos', 'Paul Wright', 'Pawel Pawlikowski', 'Pedro Almodóvar', 'Pedro Urrutia', 'Pegi Vail', 'Penelope Spheeris', 'Penny Marshall', 'Perce Pearce', 'Perry Blackshear', 'Pete Docter', 'Pete Travis', 'Peter Berg', 'Peter Cattaneo', 'Peter Chan', 'Peter Chelsom', 'Peter Cornwell', 'Peter Faiman', 'Peter Farrelly', 'Peter Hedges', 'Peter Hewitt', 'Peter Howitt', 'Peter Hyams', 'Peter Jackson', 'Peter Landesman', 'Peter Lepeniotis', 'Peter MacDonald', 'Peter Medak', 'Peter Mullan', 'Peter R. Hunt', 'Peter Ramsey', 'Peter Sattler', 'Peter Segal', 'Peter Sollett', 'Peter Spierig', 'Peter Stebbings', 'Peter Templeman', 'Peter Webber', 'Peter Weir', 'Peter Wellington', 'Peter Winther', 'Peter Yates', 'Peter de Baan', 'Peyman Moaadi', 'Peyton Reed', 'Phil Lord', 'Phil Traill', 'Philip G. Atwell', 'Philip Kaufman', 'Philipp Stölzl', 'Philippe Falardeau', 'Philippe Setbon', 'Phillip Noyce', 'Phyllida Lloyd', 'Picone', 'Pierre Coffin', 'Pierre Morel', 'Pietro Francisci', 'Pietro Germi', 'Pif', 'Pixote Hunt', 'Pou-Soi Cheang', 'Prachya Pinkaew', 'Prawaal Raman', 'Q. Allan Brocka', 'Quang Dung Nguyen', 'Quentin Dupieux', 'Quentin Tarantino', 'R.J. Cutler', 'RZA', 'Radio Silence', 'Rainer Werner Fassbinder', 'Raj Nidimoru', 'Raja Gosnell', 'Rajkumar Hirani', 'Rakeysh Omprakash Mehra', 'Ralph Eggleston', 'Ralph Fiennes', 'Ralph Levy', 'Ram Gopal Varma', 'Randall Balsmeyer', 'Randall Wallace', 'Randy Barbato', 'Randy Moore', 'Raoul Walsh', 'Raul del Busto', 'Rawson Marshall Thurber', 'Raymond De Felitta', 'Rebecca Miller', 'Rebecca Thomas', 'Rebecca Zlotowski', 'Reem Kherici', 'Reginald Le Borg', 'Renny Harlin', 'René Clair', 'Rezo Gigineishvili', 'Rian Johnson', 'Ric Roman Waugh', 'Rich Christiano', 'Rich Moore', 'Richard Attenborough', 'Richard Ayoade', 'Richard C. Sarafian', 'Richard Clabaugh', 'Richard Curtis', 'Richard Donner', 'Richard Eyre', 'Richard Fleischer', 'Richard Franklin', 'Richard Glatzer', 'Richard Kelly', 'Richard LaGravenese', 'Richard Linklater', 'Richard Loncraine', 'Richard Marquand', 'Richard Schenkman', 'Richard Shepard', 'Rick Ernst', 'Rick Rosenthal', 'Rick Rowley', 'Ricki Stern', 'Ricky Gervais', 'Ridley Scott', 'Rikki Beadle Blair', 'Ritesh Batra', 'Roar Uthaug', 'Rob Bowman', 'Rob Cohen', 'Rob Epstein', 'Rob Letterman', 'Rob Marshall', 'Rob Minkoff', 'Rob Pearlstein', 'Rob Reiner', 'Rob Thomas', 'Rob Zombie', 'Robert Aldrich', 'Robert Altman', 'Robert B. Weide', 'Robert Ben Garant', 'Robert Benton', 'Robert Bresson', 'Robert Clouse', 'Robert Harmon', 'Robert Heath', 'Robert Houston', 'Robert Kenner', 'Robert Kurtzman', 'Robert Lorenz', 'Robert Luketic', 'Robert Mitchum', 'Robert Mulligan', 'Robert Parrish', 'Robert Pulcini', 'Robert Redford', 'Robert Rodriguez', 'Robert Schwentke', 'Robert Stevenson', 'Robert Stromberg', 'Robert Wilson', 'Robert Wise', 'Robert Zemeckis', 'Roberto Benigni', 'Robin Budd', 'Rod Lurie', 'Rodney Ascher', 'Rodrigo Cortés', 'Rodrigo Sopeña', 'Roel Reiné', 'Roger Allers', 'Roger Corman', 'Roger Donaldson', 'Roger Michell', 'Roger Spottiswoode', 'Rohan Sippy', 'Rohit Dhawan', 'Rohit Shetty', 'Roland Emmerich', 'Roland Joffé', 'Roman Coppola', 'Roman Karimov', 'Roman Polanski', 'Roman Prygunov', 'Ron Clements', 'Ron Howard', 'Ron Morales', 'Ronnie Del Carmen', 'Ronnie Thompson', 'Ross Duffer', 'Rouhollah Hejazi', 'Rowan Joffe', 'Rowdy Herrington', 'Roy Andersson', 'Roy Ward Baker', 'Ruairi Robinson', 'Ruba Nadda', 'Ruben Amar', 'Ruben Fleischer', 'Ruben Smit', 'Ruben Östlund', 'Rufus Norris', 'Rupert Goold', 'Rupert Sanders', 'Rupert Wyatt', 'Russell Crowe', 'Russell Mulcahy', 'Rusty Cundieff', 'Ryan Coogler', 'Ryan Fleck', 'Ryan Kawamoto', 'Ryan Little', 'Ryan Murphy', 'Ryuichi Yagi', 'Ryûhei Kitamura', 'Sacha Gervasi', 'Sajid Khan', 'Saket Chaudhary', 'Sam Benstead', 'Sam Fell', 'Sam Mendes', 'Sam Miller', 'Sam Peckinpah', 'Sam Raimi', 'Sam Taylor', 'Sam Taylor-Johnson', 'Sam Wood', 'Sanaa Hamri', 'Sandra Nettelbeck', 'Sandy Collora', 'Sang-il Lee', 'Sang-yoon Lim', 'Sanjay Leela Bhansali', 'Sanne Vogel', 'Sarah Gavron', 'Sarah Polley', 'Sarah Smith', 'Saschka Unseld', 'Saul Dibb', 'Scott Cooper', 'Scott Derrickson', 'Scott Frank', 'Scott Hicks', 'Scott Kalvert', 'Scott McGehee', 'Scott Moore', 'Scott Stewart', 'Scott Walker', 'Scott Waugh', 'Scottnes L. Smith', 'Sean Anders', 'Sean Baker', 'Sean Durkin', 'Sean Ellis', 'Sean McConville', 'Sean McCormack', 'Sean Penn', 'Sean S. Cunningham', 'Sean Tretta', 'Sebastian Gutierrez', 'Sebastian del Amo', 'Sebastián Cordero', 'Sebastián Silva', 'Seong-hoon Kim', 'Sepideh Farsi', 'Sergei Parajanov', 'Sergey Bodrov', 'Sergey Loznitsa', 'Sergey Mokritskiy', 'Sergio Bianchi', 'Sergio Castellitto', 'Sergio Leone', 'Seth Gordon', 'Seth MacFarlane', 'Seth Rogen', 'Seung-wan Ryoo', 'Severin Fiala', 'Shaad Ali', 'Shana Feste', 'Shane Abbess', 'Shane Black', 'Shane Carruth', 'Shane Meadows', 'Shane Salerno', 'Sharat Katariya', 'Shari Springer Berman', 'Shashanka Ghosh', 'Shawn Christensen', 'Shawn Levy', 'Shawn Rasmussen', 'Shekhar Kapur', 'Sheree Folkson', 'Shimit Amin', 'Shinichirô Watanabe', 'Shinji Aramaki', 'Shinsuke Sato', 'Shion Sono', 'Shoojit Sircar', 'Shuki Levy', 'Shunji Iwai', 'Sidney Lanfield', 'Sidney Lumet', 'Sidney Poitier', 'Silvio Soldini', 'Simon Barrett', 'Simon Curtis', 'Simon J. Smith', 'Simon West', 'Simon Wincer', 'Simone Scafidi', 'Skip Woods', 'Sngmoo Lee', 'So Yong Kim', 'Sofia Coppola', 'Sohail Khan', 'Spike Jonze', 'Spike Lee', 'Sriram Raghavan', 'Stan Winston', 'Stanley Donen', 'Stanley Kramer', 'Stanley Kubrick', 'Stanley Tucci', 'Stefan Ruzowitzky', 'Stefen Fangmeier', 'Steffen Haars', 'Stephan Elliott', 'Stephen Chbosky', 'Stephen Daldry', 'Stephen Elliott', 'Stephen Finnigan', 'Stephen Frears', 'Stephen Herek', 'Stephen Hopkins', 'Stephen Merchant', 'Stephen Sommers', 'Stephen St. Leger', 'Steve Barron', 'Steve Buscemi', 'Steve Carr', 'Steve Clark', 'Steve Gomer', 'Steve James', 'Steve Martino', 'Steve McQueen', 'Steve Pink', 'Steve Purcell', 'Steven Baigelman', 'Steven Brill', 'Steven Knight', 'Steven Quale', 'Steven R. Monroe', 'Steven Soderbergh', 'Steven Spielberg', 'Steven Suderman', 'Stewart Wade', 'Stiles White', 'Stu Zicherman', 'Stuart Baird', 'Stuart Beattie', 'Stuart Blumberg', 'Stuart Hazeldine', 'Stuart Ortiz', 'Stuart Rosenberg', 'Stuart Simpson', 'Stéphane Aubier', 'Stéphane Foenkinos', 'Subhash Kapoor', 'Sung-bo Shim', 'Susan Seidelman', 'Susan Youssef', 'Susannah Grant', 'Susanne Bier', 'Sydney Pollack', 'Sydney Sibilia', 'Sylvain Chomet', 'Sylvester Stallone', 'Sébastien Lifshitz', 'Søren Kragh-Jacobsen', 'T.J. Martin', 'Tadayoshi Yamamuro', 'Taika Waititi', 'Takashi Miike', 'Takashi Shimizu', 'Takashi Yamazaki', 'Takeshi Kitano', 'Tamara Jenkins', 'Tamra Davis', 'Taner Gündöner', 'Tara Johns', 'Tarsem Singh', 'Tate Taylor', 'Taylor Hackford', 'Ted Demme', 'Ted Kotcheff', 'Ted Post', 'Teddy Chan', 'Tensai Okamura', 'Terence Davies', 'Terence Young', 'Teresa Pelegri', 'Teresa Suarez', 'Terrence Malick', 'Terry George', 'Terry Gilliam', 'Terry Jastrow', 'Terry Jones', 'Terry Sanders', 'Terry Zwigoff', 'Tess Smalley', 'Tetsuichirô Tsuta', 'The Vicious Brothers', 'Theodore Melfi', 'Thomas Bezucha', 'Thomas Carter', 'Thomas Lennon', 'Thomas Vinterberg', 'Thor Freudenthal', 'Ti West', 'Till Schauder', 'Tim Burton', 'Tim Johnson', 'Tim McCanlies', 'Tim Oliehoek', 'Tim Robbins', 'Tim Story', 'Timo Tjahjanto', 'Timo Vuorensola', 'Timur Bekmambetov', 'Tobe Hooper', 'Tobias Lindholm', 'Toby Genkel', 'Todd Berger', 'Todd Field', 'Todd Haynes', 'Todd Phillips', 'Todd Solondz', 'Todd Strauss-Schulson', 'Tom Berninger', 'Tom Brady', 'Tom DiCillo', 'Tom Gormican', 'Tom Green', 'Tom Harper', 'Tom Hooper', 'Tom Kuntz', 'Tom Logan', 'Tom McCarthy', 'Tom McGrath', 'Tom Putnam', 'Tom Shadyac', 'Tom Tykwer', 'Tomas Alfredson', 'Tomm Moore', 'Tommy Lee Jones', 'Tommy Wirkola', 'Tonie Marshall', 'Tony Giglio', 'Tony Gilroy', 'Tony Kaye', 'Tony Oliver', 'Tony Richardson', 'Tony Scott', 'Tran Anh Hung', 'Travis Cluff', 'Travis Mathews', 'Trey Parker', 'Trish Sie', 'Troy Duffy', 'Tsz Ming Wong', 'Tyler Gillett', 'Tyler Oliver', 'Tyler Perry', 'Tze Chun', 'Ui-seok Jo', 'Ursula Meier', 'Uwe Boll', 'Val Guest', 'Valerie Faris', 'Vasili Pichul', 'Veronika Franz', 'Vic Armstrong', 'Vicky Jenson', 'Victor Fleming', 'Victor Levin', 'Victor Salva', 'Vikas Bahl', 'Vikram Bhatt', 'Vikramaditya Motwane', 'Vincent Paronnaud', 'Vincent Patar', 'Vincent Ward', 'Vincente Minnelli', 'Vincenzo Natali', 'Vishal Bhardwaj', 'Vitaliy Manskiy', 'Vittorio De Sica', 'Vivek Shah', 'Vladimir Bortko', 'Víctor González', 'W.S. Van Dyke', 'Wai-Keung Lau', 'Wally Pfister', 'Walter Hill', 'Walter Salles', 'Wash Westmoreland', 'Wayne Kramer', 'Wei Lo', 'Wei Zhao', 'Wen Jiang', 'Werner Herzog', 'Wes Anderson', 'Wes Ball', 'Wes Craven', 'Wilfred Jackson', 'Will Canon', 'Will Gluck', 'Will Graham', 'Will Speck', 'William Baker', 'William Brent Bell', 'William Cottrell', 'William Eubank', 'William Friedkin', 'William Kaufman', 'William Keighley', 'William Monahan', 'William Wyler', 'Wilson Yip', 'Wolfgang Becker', 'Wolfgang Groos', 'Wolfgang Petersen', 'Wolfgang Reitherman', 'Woo-Ping Yuen', 'Woody Allen', 'Xavier Beauvois', 'Xavier Dolan', 'Xavier Gens', 'Yann Arthus-Bertrand', 'Yann Demange', 'Yann Samuell', 'Yaron Zilberman', 'Yash Chopra', 'Yasujirô Ozu', 'Yimou Zhang', 'Yorgos Lanthimos', 'Yoshifumi Kondô', 'Youssef Delara', 'Yuri Mamin', 'Yuriy Bykov', 'Yvan Attal', 'Yôjirô Takita', 'Yûichi Satô', 'Yûya Ishii', 'Zach Braff', 'Zachary Donohue', 'Zachary Heinzerling', 'Zack Parker', 'Zack Snyder', 'Zak Hilditch', 'Zal Batmanglij', 'Zalman King', 'Zaza Urushadze', 'Zhora Kryzhovnikov', 'Zoya Akhtar', 'Álex de la Iglesia', 'Çagan Irmak', 'Ömer Faruk Sorak'];

    let selectedDirectors = [];
    let selectedGenres = [];
    let userRatings = {};

    function renderDirectorList(searchTerm = '') {
        if (!directorsContainer) return;
        directorsContainer.innerHTML = '';
        
        const filteredDirectors = directors.filter(director => 
            director.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredDirectors.length === 0) {
            directorsContainer.innerHTML = '<div class="no-results">No directors found</div>';
            return;
        }
        
        filteredDirectors.forEach(director => {
            const directorItem = document.createElement('div');
            directorItem.className = 'director-item';
            
            const isSelected = selectedDirectors.includes(director);
            const directorId = `director-${director.replace(/\s+/g, '-')}`;
            
            directorItem.innerHTML = `
                <input type="checkbox" id="${directorId}" 
                       ${isSelected ? 'checked' : ''}>
                <label for="${directorId}">${director}</label>
            `;
            
        directorItem.addEventListener('click', function(e) {
            if (e.target instanceof HTMLElement && e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input');
                if (checkbox instanceof HTMLInputElement) {
                    checkbox.checked = !checkbox.checked;
                }
            }
            toggleDirectorSelection(director);
        });


            
            directorsContainer.appendChild(directorItem);
        });
    }

    function toggleDirectorSelection(director) {
        if (selectedDirectors.includes(director)) {
            selectedDirectors = selectedDirectors.filter(d => d !== director);
        } else {
            selectedDirectors.push(director);
        }
        renderSelectedDirectors();
    }
    
    function renderSelectedDirectors() {
        if (!selectedDirectorsContainer) return;
        selectedDirectorsContainer.innerHTML = '';
        
        if (selectedDirectors.length === 0) {
            selectedDirectorsContainer.innerHTML = '<div class="empty-tags">No directors selected yet</div>';
            return;
        }
        
        selectedDirectors.forEach(director => {
            const tag = document.createElement('div');
            tag.className = 'director-tag';
            tag.innerHTML = `
                ${director}
                <button class="remove-btn" data-director="${director}">X</button>
            `;
            selectedDirectorsContainer.appendChild(tag);
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const director = this.getAttribute('data-director');
                removeDirector(director);
            });
        });
    }
    
    function removeDirector(director) {
        selectedDirectors = selectedDirectors.filter(d => d !== director);
        renderSelectedDirectors();
        renderDirectorList(directorSearch instanceof HTMLInputElement ? directorSearch.value : '');
    }

    function renderGenreList(searchTerm = '') {
        if (!genresContainer) return;
        genresContainer.innerHTML = '';
        
        const filteredGenres = genres.filter(genre => 
            genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredGenres.length === 0) {
            genresContainer.innerHTML = '<div class="no-results">No genres found matching your search</div>';
            return;
        }
        
        filteredGenres.forEach(genre => {
            const genreItem = document.createElement('div');
            genreItem.className = 'genre-item';
            
            const isSelected = selectedGenres.includes(genre);
            const genreId = `genre-${genre.replace(/\s+/g, '-')}`;
            
            genreItem.innerHTML = `
                <input type="checkbox" id="${genreId}" 
                       ${isSelected ? 'checked' : ''}>
                <label for="${genreId}">${genre}</label>
            `;
            
        genreItem.addEventListener('click', function(e) {
            if (e.target instanceof HTMLElement && e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input');
                if (checkbox instanceof HTMLInputElement) {
                    checkbox.checked = !checkbox.checked;
                }
            }
            toggleGenreSelection(genre);
        });
            
            genresContainer.appendChild(genreItem);
        });
    }

    function renderSelectedGenres() {
        if (!selectedGenresContainer) return;
        selectedGenresContainer.innerHTML = '';
        
        if (selectedGenres.length === 0) {
            selectedGenresContainer.innerHTML = '<div class="empty-tags">No genres selected yet</div>';
            return;
        }
        
        selectedGenres.forEach(genre => {
            const tag = document.createElement('div');
            tag.className = 'genre-tag';
            tag.innerHTML = `
                ${genre}
                <button class="remove-btn" data-genre="${genre}">X</button>
            `;
            selectedGenresContainer.appendChild(tag);
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const genre = this.getAttribute('data-genre');
                removeGenre(genre);
            });
        });
    }

    function toggleGenreSelection(genre) {
        if (selectedGenres.includes(genre)) {
            selectedGenres = selectedGenres.filter(g => g !== genre);
        } else {
            selectedGenres.push(genre);
        }
        renderSelectedGenres();
    }
    
    // Remove genre
    function removeGenre(genre) {
        selectedGenres = selectedGenres.filter(g => g !== genre);
        renderSelectedGenres();
        renderGenreList(genreSearch instanceof HTMLInputElement ? genreSearch.value : '');
    }
    
    // Reset selections
    function resetSelection() {
        selectedDirectors = [];
        selectedGenres = [];
        if (directorSearch instanceof HTMLInputElement) directorSearch.value = '';
        if (genreSearch instanceof HTMLInputElement) genreSearch.value = '';

        renderSelectedDirectors();
        renderDirectorList();
        renderSelectedGenres();
        renderGenreList();
    }

    if (directorSearch) {
        directorSearch.addEventListener('input', function() {
        if (this instanceof HTMLInputElement) {
            renderDirectorList(this.value);
        }

        });
    }
    
    if (genreSearch) {
        genreSearch.addEventListener('input', function() {
        if (this instanceof HTMLInputElement) {
            renderGenreList(this.value);
        }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSelection);
    }

    // Initialize UI
    renderDirectorList();
    renderSelectedDirectors();
    renderGenreList();
    renderSelectedGenres();

    // Fetch movies to rate
    fetch('/get-movies')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(movieIds => {
        const promises = movieIds.map(originalId => 
            fetch(`/movie-info?id=${originalId}`)
            .then(res => res.json())
            .then(movieInfo => ({ 
                id: originalId,  
                movieInfo        
            }))
        );
        return Promise.all(promises);
        })

        .then(moviesWithIds => {
        moviesWithIds.forEach(item => {
            const movie = item.movieInfo;
            const movieId = item.id;
            
            if (!movie?.title || !movie?.year || !movie?.genres) return;
            
            const div = document.createElement('div');
            div.className = 'movie-item';
            div.innerHTML = `
            <h3>${movie.title} (${movie.year})</h3>
            <p>${movie.genres}</p>
            <div class="rating-display">Rating: <span id="rating-${movieId}">None</span></div>
            <div class="rating-buttons" data-movie="${movieId}">
                ${Array.from({ length: 10 }, (_, i) => 
                `<button class="rate-btn" 
                        data-rating="${i+1}" 
                        data-movie="${movieId}">${i+1}</button>`
                ).join('')}
            </div>
            `;
            movieList.appendChild(div);
        });

            document.querySelectorAll('.rate-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const movieId = this.dataset.movie;
                    const rating = parseInt(this.dataset.rating);
                    
                    if (!movieId || isNaN(rating)) return;
                    
                    userRatings[movieId] = rating;
                    const ratingDisplay = document.getElementById(`rating-${movieId}`);
                    if (ratingDisplay) ratingDisplay.textContent = String(rating);
                    
                    const allButtons = this.parentElement.querySelectorAll('.rate-btn');
                    allButtons.forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    if (submitBtn instanceof HTMLButtonElement) {
                        submitBtn.disabled = Object.keys(userRatings).length < 5;
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error loading movies:', error);
        });

    const filterToggles = [
        { checkboxId: "toggle-genres", controlIds: ["genres"] }
    ];

    filterToggles.forEach(group => {
        const checkbox = document.getElementById(group.checkboxId);
        if (!checkbox) return;
        
        checkbox.addEventListener("change", () => {
            group.controlIds.forEach(id => {
                const control = document.getElementById(id);
                if (control instanceof HTMLInputElement || 
                    control instanceof HTMLSelectElement || 
                    control instanceof HTMLButtonElement ||
                    control instanceof HTMLTextAreaElement) {

                    if (checkbox instanceof HTMLInputElement) {
                        checkbox.addEventListener("change", () => {
                            group.controlIds.forEach(id => {
                                const control = document.getElementById(id);
                                if (control && "disabled" in control) {
                                    control.disabled = !checkbox.checked;
                                }
                            });
                        });
                    }
                }
            });
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (!recommendations) return;
            recommendations.innerHTML = '<div class="loading">Generating recommendations...</div>';
            
            const filters = {};

            if (selectedGenres.length > 0) {
                filters.genres = selectedGenres;
            }


            const yearInput = document.getElementById('min-year');
            if (yearInput instanceof HTMLInputElement && yearInput.value) {
                filters.year = parseInt(yearInput.value);
            }

            const minMinutesInput = document.getElementById("min-minutes");
            const maxMinutesInput = document.getElementById("max-minutes");
            if (minMinutesInput instanceof HTMLInputElement && minMinutesInput.value) {
                filters.minMinutes = parseInt(minMinutesInput.value);
            }
            if (maxMinutesInput instanceof HTMLInputElement && maxMinutesInput.value) {
                filters.maxMinutes = parseInt(maxMinutesInput.value);
            }

            if (selectedDirectors.length > 0) {
                filters.directors = selectedDirectors;
            }
            const payload = {
                ratings: userRatings,
                filters: Object.keys(filters).length > 0 ? filters : undefined
            };
            fetch('/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    // Get more detailed error message
                    return response.text().then(text => {
                        throw new Error(`${response.status}: ${text}`);
                    });
                }
                return response.json();
            })
            .then(recommendationsData => {
                if (!recommendationsData || !Array.isArray(recommendationsData)) {
                    throw new Error('Invalid recommendations data');
                }
                
                recommendations.innerHTML = `
                    <h2>Recommended Movies</h2>
                    <div class="recommendation-list">
                        ${recommendationsData.map(movie => `
                            <div class="movie-recommendation">
                                <h3>${movie.title || 'Unknown'} (${movie.year || '?'})</h3>
                                <div class="details">
                                    <span>Predicted Rating: ${movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
                                    <p>Genres: ${movie.genre || 'Unknown'}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            })
            .catch(error => {
                console.error('Recommendation error:', error);
                recommendations.innerHTML = `<div class="error">Error: ${error.message || 'Unknown error'}</div>`;
            });
        });
    }
});