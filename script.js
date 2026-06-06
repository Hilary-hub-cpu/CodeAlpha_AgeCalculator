// cette fonction est appelee quand on clique sur le bouton
function calculate() {

    // on recupere les 3 champs par leur id
    var dayInput   = document.getElementById("day");
    var monthInput = document.getElementById("month");
    var yearInput  = document.getElementById("year");

    // on recupere la zone des messages d erreur
    var errorZone = document.getElementById("errMsg");

    // on efface les erreurs precedentes
    dayInput.classList.remove("error");
    monthInput.classList.remove("error");
    yearInput.classList.remove("error");
    errorZone.textContent = "";

    // on lit les valeurs et on les convertit en nombre entier
    var day   = parseInt(dayInput.value);
    var month = parseInt(monthInput.value);
    var year  = parseInt(yearInput.value);

    // verification 1 : tous les champs doivent etre remplis
    if (dayInput.value == "" || monthInput.value == "" || yearInput.value == "") {
        errorZone.textContent = "Please fill in all fields.";
        if (dayInput.value == "")   dayInput.classList.add("error");
        if (monthInput.value == "") monthInput.classList.add("error");
        if (yearInput.value == "")  yearInput.classList.add("error");
        return; // on arrete ici
    }

    // verification 2 : le jour doit etre entre 1 et 31
    if (day < 1 || day > 31) {
        errorZone.textContent = "Day must be between 1 and 31.";
        dayInput.classList.add("error");
        return;
    }

    // verification 3 : le mois doit etre entre 1 et 12
    if (month < 1 || month > 12) {
        errorZone.textContent = "Month must be between 1 and 12.";
        monthInput.classList.add("error");
        return;
    }

    // verification 4 : l annee doit etre entre 1900 et 2025
    if (year < 1900 || year > 2025) {
        errorZone.textContent = "Please enter a valid year between 1900 and 2025.";
        yearInput.classList.add("error");
        return;
    }

    // verification 5 : est-ce que la date existe vraiment
    // les mois en JS commencent a 0 donc on fait month - 1
    var birthDate = new Date(year, month - 1, day);

    // si JS a corrige la date automatiquement c est qu elle n existe pas
    if (birthDate.getDate() != day || birthDate.getMonth() != month - 1 || birthDate.getFullYear() != year) {
        errorZone.textContent = "This date does not exist.";
        dayInput.classList.add("error");
        monthInput.classList.add("error");
        return;
    }

    // verification 6 : la date ne doit pas etre dans le futur
    var today = new Date();
    if (birthDate > today) {
        errorZone.textContent = "Date of birth cannot be in the future.";
        dayInput.classList.add("error");
        monthInput.classList.add("error");
        yearInput.classList.add("error");
        return;
    }

    // calcul de l age
    var ageYears  = today.getFullYear() - year;
    var ageMonths = today.getMonth() - (month - 1);
    var ageDays   = today.getDate() - day;

    // si les jours sont negatifs on emprunte au mois precedent
    if (ageDays < 0) {
        ageMonths = ageMonths - 1;
        var lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays = ageDays + lastMonth.getDate();
    }

    // si les mois sont negatifs on emprunte a l annee precedente
    if (ageMonths < 0) {
        ageYears  = ageYears - 1;
        ageMonths = ageMonths + 12;
    }

    // on affiche les resultats dans le HTML
    document.getElementById("resYears").textContent  = ageYears;
    document.getElementById("resMonths").textContent = ageMonths;
    document.getElementById("resDays").textContent   = ageDays;

    // liste des mois pour afficher la date en toutes lettres
    var monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

    // on affiche Born on + la date formatee
    document.getElementById("bornOn").innerHTML = "Born on <span>" + monthNames[month - 1] + " " + day + ", " + year + "</span>";

    // on rend visible le separateur, les resultats et le texte born on
    document.getElementById("divider").classList.add("show");
    document.getElementById("results").classList.add("show");
    document.getElementById("bornOn").classList.add("show");
}

// on peut aussi valider en appuyant sur la touche Entree
document.getElementById("day").addEventListener("keydown", function(e) {
    if (e.key == "Enter") calculate();
});

document.getElementById("month").addEventListener("keydown", function(e) {
    if (e.key == "Enter") calculate();
});

document.getElementById("year").addEventListener("keydown", function(e) {
    if (e.key == "Enter") calculate();
});
























