import React from 'react';
import './Privacy.css';

const AlgemeneVoorwaarden = () => {
  return (
    <div className="legal-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Algemene Voorwaarden</h1>
          <p className="page-subtitle">Hevanly's Beautybar – Turnhout</p>
        </div>
      </div>

      <section className="section">
        <div className="container legal-container">

          <p className="legal-intro">
            Door gebruik te maken van onze diensten, het boeken van een afspraak of het plaatsen van een bestelling, gaat u akkoord met onderstaande algemene voorwaarden.
          </p>

          <div className="legal-block">
            <h2>1. Algemeen</h2>
            <p><strong>Hevanly's Beautybar</strong>, gevestigd te Graatakker 118, Bus B, 2300 Turnhout, België (hierna "de salon"), is verantwoordelijk voor de dienstverlening beschreven op deze website.</p>
            <p>E-mail: <a href="mailto:hello@hevanlysbeautybar.be">hello@hevanlysbeautybar.be</a> | Tel: +32 465 17 27 90</p>
          </div>

          <div className="legal-block">
            <h2>2. Afspraken & Boekingen</h2>
            <ul>
              <li>Een afspraak is pas definitief bevestigd na betaling van de vereiste aanbetaling.</li>
              <li>De aanbetaling bedraagt €25 voor behandelingen t/m €80, en €35 voor behandelingen boven €80.</li>
              <li>De aanbetaling wordt verrekend met het totaalbedrag van de behandeling.</li>
              <li>Bevestiging van uw boeking ontvangt u per e-mail na succesvolle betaling van de aanbetaling.</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>3. Annulering & Wijziging</h2>
            <ul>
              <li><strong>Annulering meer dan 48 uur van tevoren:</strong> de aanbetaling wordt volledig teruggestort.</li>
              <li><strong>Annulering tussen 24 en 48 uur van tevoren:</strong> de aanbetaling wordt voor 50% teruggestort.</li>
              <li><strong>Annulering minder dan 24 uur van tevoren of no-show:</strong> de aanbetaling vervalt en wordt niet teruggestort.</li>
              <li>Wijzigingen van datum of tijd zijn mogelijk tot 48 uur voor de afspraak via e-mail of telefoon, zonder extra kosten.</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>4. Laattijdig arriveren</h2>
            <p>Indien u meer dan 15 minuten te laat aankomt, behoudt de salon het recht de behandeling in te korten of te annuleren zonder terugbetaling van de aanbetaling, teneinde de planning voor andere klanten te respecteren.</p>
          </div>

          <div className="legal-block">
            <h2>5. Prijzen & Betaling</h2>
            <ul>
              <li>Alle prijzen op de website zijn inclusief btw en worden uitgedrukt in euro.</li>
              <li>De salon behoudt het recht prijzen te wijzigen. De prijs geldig op het moment van boeking is bindend.</li>
              <li>Het resterende bedrag na aanbetaling wordt contant of via Payconiq betaald bij de afspraak in de salon.</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>6. Webshop – Bestellingen & Levering</h2>
            <ul>
              <li>Bestellingen via onze webshop worden verwerkt na ontvangst van uw betaling.</li>
              <li>Levertijden zijn indicatief. Vertragingen buiten onze controle geven geen recht op schadevergoeding.</li>
              <li>Producten dienen correct opgeslagen en gebruikt te worden conform de instructies op de verpakking.</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>7. Herroepingsrecht (Webshop)</h2>
            <p>Voor producten aangekocht via onze webshop heeft u het recht uw aankoop te herroepen binnen 14 kalenderdagen na ontvangst, zonder opgave van reden. Producten moeten ongebruikt en in originele verpakking worden teruggestuurd. De kosten voor retourzending zijn voor de klant.</p>
            <p>Dit herroepingsrecht geldt <strong>niet</strong> voor behandelingen (diensten) die reeds zijn verricht.</p>
          </div>

          <div className="legal-block">
            <h2>8. Aansprakelijkheid</h2>
            <ul>
              <li>De salon is niet aansprakelijk voor allergische reacties of huidirritaties die het gevolg zijn van het niet opgeven van bekende allergieën vóór de behandeling.</li>
              <li>Klanten met een specifieke huid- of medische aandoening dienen dit vooraf te melden.</li>
              <li>De salon is niet verantwoordelijk voor verlies of beschadiging van persoonlijke eigendommen tijdens het bezoek.</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>9. Gedrag in de salon</h2>
            <p>Hevanly's Beautybar behoudt het recht klanten die ongepast gedrag vertonen te weigeren of te verwijderen, zonder terugbetaling.</p>
          </div>

          <div className="legal-block">
            <h2>10. Toepasselijk recht</h2>
            <p>Op deze voorwaarden is het Belgische recht van toepassing. Eventuele geschillen worden voorgelegd aan de bevoegde rechtbank van het arrondissement Antwerpen, afdeling Turnhout.</p>
          </div>

          <div className="legal-block">
            <h2>11. Wijzigingen</h2>
            <p>Hevanly's Beautybar behoudt het recht deze voorwaarden te allen tijde te wijzigen. De meest recente versie staat altijd op deze pagina. Laatste update: juni 2026.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AlgemeneVoorwaarden;
