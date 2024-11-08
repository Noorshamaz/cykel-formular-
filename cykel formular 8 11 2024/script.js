function checkAvailability() {
    // Få e-mail-adressen indtastet af brugeren
    const email = document.getElementById('email').value;
    
    // Tjek om e-mailen er i et gyldigt format
    if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById('availabilityMessage').textContent = "Indtast venligst en korrekt e-mailadresse.";
    document.getElementById('availabilityMessage').style.color = '#F95858';
    return; // Stop yderligere validering, hvis e-mailen er forkert
    }
    
    // Hent værdier fra andre formularfelter
    const roomNumber = document.getElementById('roomNumber').value;
    const adultBikes = parseInt(document.getElementById('adultBikes').value) || 0;
    const childBikes7 = parseInt(document.getElementById('childBikes7').value) || 0;
    const childBikes15 = parseInt(document.getElementById('childBikes15').value) || 0;
    const date = document.getElementById('date').value;
    const privacyPolicy = document.getElementById('privacyPolicy').checked;
    
    // Beregn det samlede antal af cykler
    const totalBikes = adultBikes + childBikes7 + childBikes15;
    
    // Hent reservationsknappen og tilgængelighedsmeddelelseselementet for feedback
    const bookButton = document.getElementById('bookButton');
    const availabilityMessage = document.getElementById('availabilityMessage');

    // Basis validering
    if (!email || !roomNumber || !date || !privacyPolicy) {
        availabilityMessage.textContent = "Alle felter skal udfyldes, og du skal acceptere privatlivspolitikken.";
        availabilityMessage.style.color = '#F95858';
        bookButton.disabled = true; // Deaktiver reservationsknappen, hvis valideringen mislykkes
        return;
    }
    // Tjek om der er valgt mindst én cykel
    if (totalBikes === 0) {
        availabilityMessage.textContent = "Vælg venligst mindst én cykel.";
        availabilityMessage.style.color = '#F95858';
        bookButton.disabled = true; // Deaktiver reservationsknappen, hvis ingen cykler er valgt
        return;
    }

    // Definer det maksimale antal tilgængelige cykler for hver kategori
    const maxAdultBikes = 4;
    const maxChildBikes7 = 3;
    const maxChildBikes15 = 2;
    
     // Tilføj datoer, hvor cykler ikke er tilgængelige
        const unavailableDates = ["2024-12-12"]; // Format: "YYYY-MM-DD"

        // Tjek om den valgte dato er utilgængelig
        if (unavailableDates.includes(date)) {
            availabilityMessage.textContent = "Cykler er desværre ikke tilgængelige på den valgte dato.";
            availabilityMessage.style.color = '#F95858';
            bookButton.disabled = true; // Deaktiver reservationsknappen, hvis datoen er utilgængelig
            return;
        }

    // Tjek om de ønskede cykler overstiger det tilgængelige lager
    if (adultBikes > maxAdultBikes || childBikes7 > maxChildBikes7 || childBikes15 > maxChildBikes15) {
        availabilityMessage.textContent = "Vi har desværre ikke nok cykler til de valgte datoer.";
        availabilityMessage.style.color = '#F95858';
        bookButton.disabled = true; // Deaktiver reservationsknappen, hvis der ikke er nok cykler
    } else {
       // Hvis cykler er tilgængelige, tillad brugeren at fortsætte med reservationen
        availabilityMessage.textContent = "Cykel(r) til rådighed! Du kan fortsætte bookingen.";
        availabilityMessage.style.color = '#39C289';
        bookButton.disabled = false; // Aktiver reservationsknappen
    }
}

// Klikregistrering og meddelelsesvisning.
        document.getElementById("bookButton").addEventListener("click", function() {
            // Besked
            const message = document.getElementById("successMessage");
            // Wyświetlenie wiadomości
            message.style.display = "block";
        });
