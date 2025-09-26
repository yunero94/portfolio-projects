1. Dohvaćanje glavnih elemenata na stranici

const addButton = document.querySelector(".addButton");
const todoInput = document.querySelector(".todoInput");
const todoList = document.querySelector(".todoList");

const: Ova ključna riječ znači da ćemo definirati konstante. To znači da ove varijable ne možemo kasnije mijenjati (tj. ne možemo ih ponovno dodijeliti nekoj drugoj vrijednosti). addButton, todoInput, i todoList će biti konstantne, jer želimo da uvijek sadrže iste elemente iz HTML-a.

document.querySelector(): Ova funkcija omogućava da nađemo HTML element na stranici. Unutar zagrada pišemo CSS selektor (kao što su .addButton, .todoInput i .todoList), a ta funkcija vraća prvi element koji odgovara tom selektoru.

.addButton traži gumb za dodavanje zadatka.

.todoInput traži unosni okvir (input) u kojem korisnik upisuje tekst zadatka.

.todoList traži neurednu listu (ul) gdje će se prikazivati svi zadaci.

2. Funkcija za dodavanje novog zadatka

function handleAddTodo() {
  const text = getInputValue(); 
  if (!text) return; // Ako je unos prazno, prestajemo s daljnjim izvođenjem funkcije.

  const todoItem = createTodoItem(text);
  todoList.appendChild(todoItem); // Dodajemo novi zadatak u listu
  clearInput(); // Očistimo unos
}
function handleAddTodo(): Ovdje stvaramo funkciju koja će dodavati novi zadatak. Funkcija je poput blokova koda koji možeš pozvati kad god to želiš. Ime funkcije je handleAddTodo, što znači da se koristi za rukovanje (handle) dodavanjem zadatka.

const text = getInputValue();: Pozivamo funkciju getInputValue() da dobijemo tekst koji je korisnik unio u unosni okvir (input). Rezultat spremamo u varijablu text.

if (!text) return;: Ovdje provjeravamo da li je uneseni tekst prazan. Ako je prazno (ako korisnik nije ništa upisao), funkcija se prestiže (return), tj. ništa se neće dodati.

const todoItem = createTodoItem(text);: Pozivamo funkciju createTodoItem(text) koja stvara HTML element (novi zadatak) s tekstom koji je korisnik unio.

todoList.appendChild(todoItem);: Dodajemo novi zadatak (todoItem) u listu zadataka (todoList). appendChild znači "dodaj kao dijete" tog elementa.

clearInput();: Na kraju pozivamo funkciju koja čisti unosni okvir (input) i vraća fokus na njega, tako da korisnik može odmah unijeti novi zadatak.

3. Kreiranje novog zadatka

function createTodoItem(text) {
  const li = document.createElement("li");

  const checkbox = createCheckbox(li);
  const span = createText(text);
  const removeButton = createRemoveButton(li);

  appendTodoElements(li, checkbox, span, removeButton);

  return li;
}
function createTodoItem(text): Ovo je funkcija koja stvara novi zadatak. Funkcija prima jedan argument – text, koji je tekst zadatka koji korisnik unese.

const li = document.createElement("li");: Ovdje stvaramo HTML element tipa <li>, što predstavlja stavku liste (list item). Ovaj element će biti naš zadatak.

const checkbox = createCheckbox(li);: Pozivamo funkciju koja stvara checkbox (kutiju koju korisnik može označiti). Ona će biti povezana s našim zadatkom.

const span = createText(text);: Pozivamo funkciju koja stvara tekstualni element (<span>) u koji stavljamo tekst zadatka (text).

const removeButton = createRemoveButton(li);: Pozivamo funkciju koja stvara gumb za brisanje. Gumb će omogućiti korisnicima da obrišu zadatak.

appendTodoElements(li, checkbox, span, removeButton);: Pozivamo funkciju koja dodaje checkbox, tekst i gumb za brisanje u naš <li> element.

return li;: Na kraju funkcija vraća cijeli <li> element, koji sada sadrži sve potrebne komponente (checkbox, tekst, gumb za brisanje).

4. Funkcija za dodavanje elemenata u <li>


function appendTodoElements(li, checkbox, span, removeButton) {
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeButton);
}
function appendTodoElements(li, checkbox, span, removeButton): Ova funkcija prima četiri argumenta (element <li>, checkbox, tekst i gumb za brisanje), a njena svrha je dodati te elemente u <li>.

li.appendChild(checkbox);: Dodaje checkbox unutar <li> elementa.

li.appendChild(span);: Dodaje tekstualni element (span) unutar <li>.

li.appendChild(removeButton);: Dodaje gumb za brisanje unutar <li>.

5. Kreiranje checkboxa


function createCheckbox(li) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done");
  });
  return checkbox;
}
function createCheckbox(li): Ova funkcija stvara checkbox element za označavanje zadatka kao završenog ili nezavršenog.

const checkbox = document.createElement("input");: Stvaramo HTML element tipa <input>, koji ćemo koristiti kao checkbox.

checkbox.type = "checkbox";: Postavljamo tip ovog inputa na checkbox, što znači da će izgledati kao kutija koju korisnik može označiti.

checkbox.addEventListener("change", () => {...});: Ovdje dodajemo event listener. Kad god korisnik promijeni stanje checkboxa (označi ga ili odznači), poziva se funkcija koja dodaje ili uklanja klasu done s <li> elementa.

return checkbox;: Funkcija vraća checkbox koji je stvoren.

6. Kreiranje teksta za zadatak


function createText(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}
function createText(text): Ova funkcija stvara tekstualni element (<span>) koji sadrži zadani tekst.

const span = document.createElement("span");: Stvaramo element span, koji je HTML element za tekstualne sadržaje.

span.textContent = text;: Dodajemo tekst unutar span elementa.

return span;: Vraćamo stvoreni span element s tekstom.

7. Kreiranje gumba za brisanje


function createRemoveButton(li) {
  const button = document.createElement("button");
  button.textContent = "×";
  button.classList.add("removeButton");
  button.addEventListener("click", () => {
    li.remove();
  });
  return button;
}
function createRemoveButton(li): Ova funkcija stvara gumb za brisanje zadatka.

const button = document.createElement("button");: Stvaramo HTML element <button> za gumb.

button.textContent = "×";: Postavljamo tekst unutar gumba na "×" (simbol za brisanje).

button.classList.add("removeButton");: Dodajemo klasu removeButton ovom gumbu, tako da možemo stilizirati gumb pomoću CSS-a.

button.addEventListener("click", () => {...});: Dodajemo event listener koji čeka na klik na gumb. Kada gumb bude kliknut, poziva se funkcija koja briše zadatak (poziva li.remove()).

return button;: Funkcija vraća stvoreni gumb za brisanje.

8. Dodavanje event listenera za dodavanje zadataka

addButton.addEventListener("click", handleAddTodo);
todoInput.addEventListener("keypress", event => {
  if (event.key === "Enter") handleAddTodo();
});
addButton.addEventListener("click", handleAddTodo): Kada korisnik klikne na gumb za dodavanje zadatka, poziva se funkcija handleAddTodo() koja dodaje zadatak.

**`todoInput.addEventListener("keypress",
