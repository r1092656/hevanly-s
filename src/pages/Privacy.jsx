import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="legal-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Privacyverklaring</h1>
          <p className="page-subtitle">Hevanly's Beautybar – Turnhout</p>
        </div>
      </div>

      <section className="section">
        <div className="container legal-container">

          <p className="legal-intro">
            Hevanly's Beautybar respecteert uw privacy en verwerkt uw persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR) en de Belgische privacywetgeving. Deze privacyverklaring legt uit welke gegevens wij verzamelen, waarvoor we ze gebruiken en wat uw rechten zijn.
          </p>

          <div className="legal-block">
            <h2>1. Wie zijn wij?</h2>
            <p><strong>Hevanly's Beautybar</strong></p>
            <p>Graatakker 118, Bus B, 2300 Turnhout, België</p>
            <p>E-mail: <a href="mailto:hello@hevanlysbeautybar.be">hello@hevanlysbeautybar.be</a></p>
            <p>Telefoon: +32 465 17 27 90</p>
            <p>Wij zijn de verwerkingsverantwoordelijke voor uw persoonsgegevens.</p>
          </div>

          <div className="legal-block">
            <h2>2. Welke gegevens verzamelen wij?</h2>
            <p>Wij verzamelen enkel gegevens die u zelf aan ons verstrekt:</p>
            <ul>
              <li><strong>Contactformulier:</strong> naam, e-mailadres, bericht</li>
              <li><strong>Afsprakenbeheer:</strong> naam, e-mailadres, telefoonnummer, gekozen behandeling, datum en tijd</li>
              <li><strong>Webshop:</strong> naam, e-mailadres, afleveradres, betalingsinformatie (verwerkt via externe betaalprovider)</li>
            </ul>
            <p>Wij verzamelen <strong>geen</strong> bijzondere categorieën persoonsgegevens (zoals gezondheidsgegevens) zonder uw uitdrukkelijke toestemming.</p>
          </div>

          <div className="legal-block">
            <h2>3. Waarvoor gebruiken wij uw gegevens?</h2>
            <ul>
              <li>Bevestigen en beheren van afspraken</li>
              <li>Beantwoorden van uw vragen via het contactformulier</li>
              <li>Verwerken en opvolgen van bestellingen</li>
              <li>Verzenden van een bevestigingsmail na boeking of aankoop</li>
            </ul>
            <p>Wij gebruiken uw gegevens <strong>niet</strong> voor marketingdoeleinden zonder uw uitdrukkelijke toestemming.</p>
          </div>

          <div className="legal-block">
            <h2>4. Rechtsgrond voor verwerking</h2>
            <ul>
              <li><strong>Uitvoering van een overeenkomst</strong> – voor het beheer van uw afspraak of bestelling</li>
              <li><strong>Toestemming</strong> – voor het contactformulier en optionele communicatie</li>
              <li><strong>Gerechtvaardigd belang</strong> – voor de beveiliging en het goede werking van onze website</li>
            </ul>
          </div>

          <div className="legal-block">
            <h2>5. Hoe lang bewaren wij uw gegevens?</h2>
            <ul>
              <li><strong>Afspraken:</strong> maximaal 2 jaar na de afspraakdatum</li>
              <li><strong>Contactberichten:</strong> maximaal 1 jaar na ontvangst</li>
              <li><strong>Bestellingen:</strong> maximaal 7 jaar (wettelijke boekhoudkundige bewaarplicht)</li>
            </ul>
            <p>Na verloop van deze termijnen worden uw gegevens veilig verwijderd.</p>
          </div>

          <div className="legal-block">
            <h2>6. Delen wij uw gegevens?</h2>
            <p>Wij verkopen uw gegevens nooit aan derden. Wij delen uw gegevens enkel met:</p>
            <ul>
              <li><strong>Betaalproviders</strong> (bijv. Payconiq) – uitsluitend voor betalingsverwerking</li>
              <li><strong>Hosting- en technische dienstverleners</strong> – voor het functioneren van de website, onder strikte vertrouwelijkheidsverplichtingen</li>
            </ul>
            <p>Al onze verwerkers zijn GDPR-conform en hebben een verwerkersovereenkomst met ons afgesloten.</p>
          </div>

          <div className="legal-block">
            <h2>7. Cookies</h2>
            <p>Onze website gebruikt enkel functionele cookies die noodzakelijk zijn voor de werking van de site. Wij gebruiken geen tracking- of advertentiecookies zonder uw toestemming. Voor Google Maps vragen wij uw toestemming voordat de kaart wordt geladen.</p>
          </div>

          <div className="legal-block">
            <h2>8. Beveiliging</h2>
            <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik. Dit omvat onder andere versleutelde verbindingen (HTTPS) en beperkte toegangsrechten.</p>
          </div>

          <div className="legal-block">
            <h2>9. Uw rechten</h2>
            <p>Onder de GDPR heeft u de volgende rechten:</p>
            <ul>
              <li><strong>Recht op inzage</strong> – u kunt opvragen welke gegevens wij over u bewaren</li>
              <li><strong>Recht op correctie</strong> – u kunt onjuiste gegevens laten corrigeren</li>
              <li><strong>Recht op verwijdering</strong> – u kunt vragen uw gegevens te laten wissen</li>
              <li><strong>Recht op beperking</strong> – u kunt de verwerking laten beperken</li>
              <li><strong>Recht op overdraagbaarheid</strong> – u kunt uw gegevens opvragen in een leesbaar formaat</li>
              <li><strong>Recht van bezwaar</strong> – u kunt bezwaar maken tegen de verwerking</li>
            </ul>
            <p>Stuur uw verzoek naar <a href="mailto:hello@hevanlysbeautybar.be">hello@hevanlysbeautybar.be</a>. Wij reageren binnen 30 dagen.</p>
            <p>U heeft ook het recht om klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit: <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">www.gegevensbeschermingsautoriteit.be</a></p>
          </div>

          <div className="legal-block">
            <h2>10. Wijzigingen</h2>
            <p>Wij kunnen deze privacyverklaring van tijd tot tijd aanpassen. De meest recente versie staat altijd op deze pagina. Laatste update: juni 2026.</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Privacy;
