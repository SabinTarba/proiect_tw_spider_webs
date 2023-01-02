# Proiect TW - echipa Spider-webs - Anonymous grading- grupa 1091E<br>(Tarba Sabin și Stoica Oana Larisa) 💯
*******
# ***Technologies:***
- Frontend -> React
- Backend -> NodeJS
- Database -> SQLite (for the moment)

The application itself allows users to log in according to certain roles, namely: <br>
○ Professor <br>
○ Student

### Professor: 🧑‍🏫
- can log in
- can see a list of all the projects and the final evaluation (based on the average of the marks excluding the min and the max mark, awarded in an anonymous way) for each project, but without seeing the identity of the jury members (special permission for the "teacher" entity), but he can see the members of the project team
- can see his list with all the students he added
- can define a general deadline, and because of that the students cannot define a date for the deriverables after the professor's general deadline(it's a threshold)

### Student: 👨‍🎓
- can log in
- can add a project
- can define partial deliverables for a specific project already added by the team lider
- can randomly become a juror for another project:
                  -> can add / modify only his personal marks for a certain project for which he was chosen in the jury (where he is on the jury) for a period of time defined by the system(3 days after the general due date defined by the professor)
                  
Extra functionality for the end: pdf creation (report style) that will contain: the teacher's name, team and note of the project anonymously evaluated by the student jury.

<br><br>
*******

# ***Steps:***
1. Description of the system and functionalities
2. Database design
3. Creating the REST services
4. Logical connection of REST services
5. Testing REST services (js unit tests)
6. Creating the design for the frontend
7. Creating the interface
8. Testing

<br><br>
*******


# ***Running instructions:***
- [x] 1. We use the clone function ```git clone https://github.com/SabinTarba/proiect_tw_spider_webs.git ```/ download the project from the git, then we are going to unzip it and open the folder in VS Code.<br>
- [x] 2. We position ourselves in the main directory, using the command line, : ```cd proiect``` (where the project is the main folder in our example)<br>
- [x] 3. We position ourselves in the backend directory, where do you have to install **node modules** ; and we start the server, the command lines being:
 ```
     cd backend
     npm i
     npm run server
 ```
- [x] 4. We position ourselves in the frontend directory where we install **node modules** and start the application. The command lines are:
 ```
    cd frontend
    npm i
    npm start
 ```

- [x] 5. The following API endpoints must be accessed in order to be able to test the application (it is a test data generator):
 ```
    [GET] /data/professors -> pentru a insera data in tabela professors
    [GET] /data/students -> pentru a insera date in tabela students
    
    Example of professor account:
    - email: sabintarba01@gmail.com
    - password: parola mea
    
    Example of student account:
    - email: marinandreeastud@gmail.com
    - password: mandreea12
    
 ```
 
- [x] 6. We are automatically directed to the LOGIN page, from where all the steps are deductible.

<br><br>
*******
# ***API documentation:***
```SERVER: localhost```
```PORT: 8080```

## <u><strong>Professor</strong></u> 🧑‍🏫 <br><br>
BASE_PROFESSOR_API_URL: <i>localhost:8080/professors</i> <br><br>
<strong>```POST```</strong> request -> BASE_PROFESSOR_API_URL -> save a professor <br> 
<strong>```GET```</strong> request -> BASE_PROFESSOR_API_URL -> get all professors <br>
<strong>```GET```</strong> request -> BASE_PROFESSOR_API_URL/students -> get all professors and their students <br>
<strong>```GET```</strong> request -> BASE_PROFESSOR_API_URL/```:id``` -> get a professor by id <br>
<strong>```GET```</strong> request -> BASE_PROFESSOR_API_URL/```:id```/students -> get the professor with specified id and the list of his students <br>
<strong>```DELETE```</strong> request -> BASE_PROFESSOR_API_URL/```:id``` -> delete a professor by id <br>
<strong>```PUT```</strong> request -> BASE_PROFESSOR_API_URL/```:id``` -> modify an existing professor <br>

<strong>```POST```</strong> request -> BASE_PROFESSOR_API_URL/auth -> used for handle login request for Professors. Possible responses:<br>
<strong>✅ACCEPTED</strong>
```json
"authResponse": "ACCEPTED"
```
<strong>⛔DENIED</strong>
```json
"authResponse": "DENIED"
```
<strong>```GET```</strong> request -> BASE_PROFESSOR_API_URL/```:id```/teams -> get the professor with specified id and the list of his created teams <br>
<strong>```POST```</strong> request -> BASE_PROFESSOR_API_URL/generateTeams/```:id```/option-> used for generating teams. Professors can generate teams using ***option value*** which represents the number of students in each team. Possible option value:1, 2, 3, 4, 5. <br>
<strong>```POST```</strong> request -> BASE_PROFESSOR_API_URL/```/config/setGeneralDueDate``` -> define a general due date which represents a limit for students in choosing a due date for deliverables.(because students have to define their project & due date, but still they have to be limited) <br> 

<br><br>

## <u><strong>Student</strong></u> 🧑‍🎓 <br><br> 
BASE_STUDENT_API_URL: <i>localhost:8080/students</i> <br><br>
<strong>```POST```</strong> request -> BASE_STUDENT_API_URL -> save a student <br> 
<strong>```GET```</strong> request -> BASE_STUDENT_API_URL -> get all students <br>
<strong>```GET```</strong> request -> BASE_STUDENT_API_URL/```:id``` -> get a student by id <br>
<strong>```DELETE```</strong> request -> BASE_STUDENT_API_URL/```:id``` -> delete a student by id <br>
<strong>```PUT```</strong> request -> BASE_STUDENT_API_URL/```:id``` -> modify an existing student <br>

<strong>```POST```</strong> request -> BASE_STUDENT_API_URL/auth -> used for handle login request for Students. Possible responses:<br>
<strong>✅ACCEPTED</strong>
```json
"authResponse": "ACCEPTED"
```
<strong>⛔DENIED</strong>
```json
"authResponse": "DENIED"
```
<strong>```POST```</strong> request -> BASE_STUDENT_API_URL/auth/changePassword -> used to change the password of the account when it is the student's first log in session.


<br><br>

## <u><strong>Team 🧑‍🎓🧑‍🎓</strong></u> <br><br> 
BASE_TEAM_API_URL: <i>localhost:8080/teams</i> <br><br>
<strong>```GET```</strong> request -> BASE_TEAM_API_URL -> get all teams that has been created <br>
<strong>```GET```</strong> request -> BASE_TEAM_API_URL/```:id``` -> get a team by id <br>
<strong>```DELETE```</strong> request -> BASE_TEAM_API_URL/```:id``` -> delete a team by id <br>
<strong>```GET```</strong> request -> BASE_TEAM_API_URL/```:id```/students -> get the team with specified id and the list of his students which were assigned to that team <br>
<strong>```DELETE```</strong> request ->BASE_TEAM_API_URL/professor/```:professorId``` -> delete all the team by professor's id, which is the professor who created, generated all his teams <br>
<strong>```POST```</strong> request -> BASE_TEAM_API_URL/```setLeader``` -> is used to set a student leader for the team that he is already been part of. In that way, the student chosen to be the leader can define a project for this team.


<br><br>

## <u><strong>Project 📚🗂️</strong></u> <br><br> 
BASE_PROJECT_API_URL: <i>localhost:8080/projects</i> <br><br>
<strong>```POST```</strong> request -> BASE_PROJECT_API_URL -> save a project <br> 
<strong>```GET```</strong> request -> BASE_PROJECT_API_URL -> get all projects <br>
<strong>```GET```</strong> request -> BASE_PROJECT_API_URL/```:id``` -> get a project by id <br>
<strong>```DELETE```</strong> request -> BASE_PROJECT_API_URL/```:id``` -> delete a project by id <br>
<strong>```GET```</strong> request -> BASE_PROJECT_API_URL/team/```:teamId``` -> get a project by the team id. <br>


<br><br>

## <u><strong>Task 📌📈</strong></u> <br><br> 
BASE_TASK_API_URL: <i>localhost:8080/tasks</i> <br><br>
<strong>```PUT```</strong> request -> BASE_TASK_API_URL/project/```projectID``` ->
get all the tasks for a project defined by the projectId. Each project has an exact number of tasks defined by the team lider. 
<strong>```PUT```</strong> request -> BASE_TASK_API_URL/saveProgress -> save progress for one task of the project. <br> 

<br><br>
*******
[DE FACUT DATA VIITOARE]: 
1. Trebuie sa facem pagina pentru a acorda notele
2. Dupa ce se termina perioada de jurizare (globalDueDate al profesorului + 3 zile din sistem) atunci sa-i apara profesorului un buton in pagina de List of teams care sa calculeze punctajele. Dupa ce este apasata acest buton, daca punctajele au fost calculate cu succes, sa dispara si sa apara alt buton care deschide un modal unde se poate vedea un tabel de genul:
Team name | No. students | Project name | Team leader (name) | Grade | Professor name
si tot aici va fi disponibil un buton pentru generare PDF cu acest tabel.
3. Sa mai lucram la layout-uri (distanta dintre cele 2 butoane la profesor) + DACA VREM SA FACEM RESPONSIVE TREBUIE SA SCHIMBAM CU TOTUL NAVBAR UL SI SA-L FACEM RESPONSIVE
