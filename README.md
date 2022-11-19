# Proiect TW - echipa Spider Webs - grupa 1091E (Tarba Sabin si Stoica Oana Larisa) - Anonymous grading

Tehnologii:
- frontend -> React
- backend -> NodeJS
- baza de date -> SQLite (momentan)

Aplicatia in sine permite logarea utilizatorilor in functie de anumite roluri si anume:
○ Profesor
○ Student

Profesor:
- se poate loga
- poate vedea o lista cu toate proiectele si evaluarea finala (bazate pe media notelor acordate intr-un mod anonim) pentru fiecare proiect, fără a vedea însă identitatea membrilor juriului (permisiune speciala pentru entitatea "profesor"), insa poate vedea membrii echipei proiectului

Student:
- se poate loga
- poate adauga un proiect
- poate defini livrabile partiale pentru un anumit proiect deja adaugat
- poate deveni in mod aleator jurat pentru un alt proiect:
                  -> poate adauga / modifica doar notele personale pentru un anumit livrabil al unui proiect (unde este in juriu) pe o perioada de timp definita de sistem

Functionalitate extra pentru final: creare pdf(stil raport) ce va contine numele profesorului, echipa si nota proiectului evaluat anonim de catre juriul de studenti.

Steps:
1. Descrierea sistemului si a functionalitatilor
2. Proiectarea bazei de date
3. Creare serviciilor REST
4. Conectarea logica a serviciilor REST
5. Testarea serviciilor REST (js unit tests)
6. Creare design-ului pentru frontend
7. Crearea interfetei
8. Testing


# API documentation
```SERVER: localhost```
```PORT: 8080```


<u><strong>Professor</strong></u> <br><br>
BASE_API_URL: <i>localhost:8080/professors</i> <br><br>
<strong>```POST```</strong> request -> BASE_API_URL -> save a professor <br> 
<strong>```GET```</strong> request -> BASE_API_URL -> get all professors <br>
<strong>```GET```</strong> request -> BASE_API_URL/students -> get all professors and their students <br>
<strong>```GET```</strong> request -> BASE_API_URL/```:id``` -> get a professor by id <br>
<strong>```GET```</strong> request -> BASE_API_URL/```:id```/students -> get the professor with specified id and the list of his students <br>
<strong>```DELETE```</strong> request -> BASE_API_URL/```:id``` -> delete a professor by id <br>
<strong>```PUT```</strong> request -> BASE_API_URL/```:id``` -> modify an existing professor <br>
