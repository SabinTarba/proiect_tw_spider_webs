# Proiect TW - echipa Spider-webs - Anonymous grading- grupa 1091E<br>(Tarba Sabin și Stoica Oana Larisa) 💯
*******
# ***Tehnologii:***
- frontend -> React
- backend -> NodeJS
- baza de date -> SQLite (momentan)

Aplicatia in sine permite logarea utilizatorilor in functie de anumite roluri si anume: <br>
○ Profesor <br>
○ Student

### Profesor: 🧑‍🏫
- se poate loga
- poate vedea o lista cu toate proiectele si evaluarea finala (bazate pe media notelor acordate intr-un mod anonim) pentru fiecare proiect, fără a vedea însă identitatea membrilor juriului (permisiune speciala pentru entitatea "profesor"), insa poate vedea membrii echipei proiectului
- poate veadea listsa cu toti studentii pe care acestia i-a adaugat

### Student: 👨‍🎓
- se poate loga
- poate adauga un proiect
- poate defini livrabile partiale pentru un anumit proiect deja adaugat
- poate deveni in mod aleator jurat pentru un alt proiect:
                  -> poate adauga / modifica doar notele personale pentru un anumit proiect pentru care a fost ales in juriu (unde este in juriu) pe o perioada de timp definita de sistem

Functionalitate extra pentru final: creare pdf(stil raport) ce va contine numele profesorului, echipa si nota proiectului evaluat anonim de catre juriul de studenti.

<br><br>
*******

# ***Steps:***
1. Descrierea sistemului si a functionalitatilor
2. Proiectarea bazei de date
3. Creare serviciilor REST
4. Conectarea logica a serviciilor REST
5. Testarea serviciilor REST (js unit tests)
6. Creare design-ului pentru frontend
7. Crearea interfetei
8. Testing

<br>
*******
<br>

# ***Instrucțiuni de rulare:***
- [x] 1. Utilizăm funcția de clone ```git clone https://github.com/SabinTarba/proiect_tw_spider_webs.git ```/ download proiectului de pe git urmând să îl dezarhivăm și  să deschidem folderul din VS Code.<br>
- [x] 2. Ne poziționăm în directorul principal, utilizând linia de comanda, de exemplu: ```cd proiect``` (unde proiect este folderul principal)<br>
- [x] 3. Ne poziționăm în directorul backend, unde instalam **node modules** și pornim server-ul, comenzile fiind:
 ```
     cd backend
     npm i
     npm run server
 ```
- [x] 4. Ne poziționăm în directorul frontend unde instalam **node modules** și pornim aplicația:
 ```
    cd frontend
    npm i
    npm start
 ```
- [x] 5. Suntem direcţionaţi automat spre pagina de LOGIN, de unde paşii sunt deductibili.

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


<br><br>
*******
[DE FACUT DATA VIITOARE]: tabela Project, adaugare proiect de catre studentul lider de echipa + sa facem un get request special ca sa inseram date de test sa nu mai stam sa le bagam de mana + LIDERUL DE ECHIPA ESTE ALES DE CATRE PROFESOR (List of team page)
1. STUDENT NORMAL = student membru din echipa care nu are flag-ul de student lider SAU PROFESOR -> READ ONLY MODE
2. STUDENT LIDER DE ECHIPA (o sa fie un flag la nivel de tabela Team) -> READ & MODIFY MODE
