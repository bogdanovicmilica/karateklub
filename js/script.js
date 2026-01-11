document.addEventListener("DOMContentLoaded", function () {

    const forma = document.getElementById("clanForm");
    const poruka = document.getElementById("poruka");

    // Dinamički kreiramo listu prijava (DINAMIČKO KREIRANJE SADRŽAJA)
    const listaWrapper = document.createElement("div");
    listaWrapper.className = "container mb-5";

    const naslov = document.createElement("h4");
    naslov.className = "text-center mt-4";
    naslov.textContent = "Prijavljeni članovi";

    const lista = document.createElement("ul");
    lista.className = "list-group";
    lista.id = "listaPrijava";

    listaWrapper.appendChild(naslov);
    listaWrapper.appendChild(lista);

    document.body.insertBefore(listaWrapper, document.querySelector("footer"));

    forma.addEventListener("submit", function (e) {
        e.preventDefault();

        let ime = document.getElementById("ime").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefon = document.getElementById("telefon").value.trim();
        let uzrast = document.getElementById("uzrast").value;

        let greske = [];

        // REGULARNI IZRAZI
        let imeRegex = /^[A-ZŠĐČĆŽ][a-zšđčćž]+(\s[A-ZŠĐČĆŽ][a-zšđčćž]+)+$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let telefonRegex = /^06\d{7,8}$/;

        if (!imeRegex.test(ime)) {
            greske.push("Ime i prezime mora početi velikim slovom.");
        }

        if (!emailRegex.test(email)) {
            greske.push("Email adresa nije validna.");
        }

        if (!telefonRegex.test(telefon)) {
            greske.push("Telefon mora biti u formatu 06xxxxxxx.");
        }

        if (uzrast === "") {
            greske.push("Morate izabrati uzrast.");
        }

        poruka.innerHTML = "";

        if (greske.length > 0) {
            poruka.style.color = "yellow";
            poruka.innerHTML = greske.join("<br>");
            return;
        }

        poruka.style.color = "lightgreen";
        poruka.textContent = "Uspešno ste se prijavili!";

        dodajPrijavu(ime, email, telefon, uzrast);
        forma.reset();
    });

});

// FUNKCIJA ZA DINAMIČKO DODAVANJE SADRŽAJA
function dodajPrijavu(ime, email, telefon, uzrast) {

    const lista = document.getElementById("listaPrijava");

    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
        <strong>${ime}</strong><br>
        Email: ${email}<br>
        Telefon: ${telefon}<br>
        Uzrast: ${uzrast}
    `;

    lista.appendChild(li);
}
