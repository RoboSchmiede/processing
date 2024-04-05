//-------------------------------------------------------------------
// FloodItGame
//-------------------------------------------------------------------
// Spielfeld - Jedes Feld hat den Index der enthaltenen Farbe
// 2D-Array als Spielfeld erstellen
var Spielfeld = new Array(14); // 14 Zeilen
// Initialisiere das 2D-Array
for (let i = 0; i < 14; i++) {
  Spielfeld[i] = new Array(14); // 14 Spalten in jeder Zeile
} // Next i
// Flutfeld - Felder, die Teil der Flut sind werden mit true gekennzeichnet
// 2D-Array als Flutfeld erstellen
var Flutfeld = new Array(14); // 14 Zeilen
// Initialisiere das 2D-Array
for (let i = 0; i < 14; i++) {
  Flutfeld[i] = new Array(14); // 14 Spalten in jeder Zeile
} // Next i

var Farbe = ['Red', 'Blue', 'Yellow', 'Lime', 'DarkViolet', 'Orange'];
var Zug;
var aktFarbe;
var Erfolgsmeldung = "Das Spielfeld wurde in 25 Zügen geflutet";

function setup() {
  createCanvas(600, 830);
  textAlign(CENTER);
  NeuesSpiel();
} // Ende function setup()

function draw() {
  background('Beige');
  // Rahmen zeichnen
  stroke('Black');
  fill('Goldenrod');
  beginShape();
  vertex(18.5, 224.5);
  vertex(15, 228);
  vertex(27, 240);
  vertex(27, 255);
  vertex(15, 255);
  vertex(15, 825);
  vertex(585, 825);
  vertex(585, 255);
  vertex(53, 255);
  vertex(53, 240);
  vertex(65, 228);
  vertex(61.5, 224.5);
  vertex(48, 238);
  vertex(48, 260);
  vertex(580, 260);
  vertex(580, 820);
  vertex(20, 820);
  vertex(20, 260);
  vertex(32, 260);
  vertex(32, 238);
  endShape(CLOSE);
  // Pfeil zeichnen
  beginShape();
  vertex(50, 199);
  quadraticVertex(38, 205.6, 38, 219);
  vertex(35, 219);
  vertex(40, 231);
  vertex(45, 219);
  vertex(42, 219);
  quadraticVertex(42, 208, 52, 202.5);
  endShape(CLOSE);
  // Button Neues Spiel zeichnen
  rect(378, 30, 160, 60);
  fill('Pink');
  rect(382, 34, 152, 52);
  // Texte schreiben
  fill('Goldenrod');
  textSize(22);
  text('Klick eine Farbe', 140, 210);
  text(Erfolgsmeldung, 350, 242);
  text('Neues Spiel', 458, 65);
  text('Ziel:', 434, 180);
  text('25', 480, 180);
  textSize(28);
  text('Zug', 434, 150);
  text(Zug, 480, 150);
  // Farbwähler zeichnen
  fill(Farbe[0]);
  rect(60, 30, 60, 60);
  fill(Farbe[1]);
  rect(160, 30, 60, 60);
  fill(Farbe[2]);
  rect(260, 30, 60, 60);
  fill(Farbe[3]);
  rect(60, 110, 60, 60);
  fill(Farbe[4]);
  rect(160, 110, 60, 60);
  fill(Farbe[5]);
  rect(260, 110, 60, 60);
  // Spielfeld Farben zeichnen
  noStroke();
  for (let Zeile = 0; Zeile < 14; Zeile++) {
    for (let Spalte = 0; Spalte < 14; Spalte++) {
      let index = Spielfeld[Zeile][Spalte]
        let fa = Farbe[index]
        fill(fa);
      rect(Spalte*40+20, Zeile*40+260, 40, 40);
    } // Next Spalte
  } // Next Zeile

  // ----- nur für Debug: Inhalt des Flutfeldes anzeigen -----
  //fill('Black');
  //for (let Zeile = 0; Zeile < 14; Zeile++) {
  //  for (let Spalte = 0; Spalte < 14; Spalte++) {
  //    if (Flutfeld[Zeile][Spalte] == true) {
  //      rect(Spalte*40+20+15, Zeile*40+260+15, 10, 10);
  //    } // End if
  //  } // Next Spalte
  //} // Next Zeile
  // ----- nur für Debug: Inhalt des Flutfeldes anzeigen -----
} // Ende function draw()

//-----------------------------------------------------------
function mouseClicked() {
  //-----------------------------------------------------------
  // welcher Button wurde geklicht?
  let mausX = mouseX;
  let mausY = mouseY;
  // Buttons in der oberen Zeile
  if (mausY>30 && mausY<90 ) {
    if (mausX>60 && mausX<120 ) { // Button 'Red'
      aktFarbe=0;
      Zug += 1;
    }
    if (mausX>160 && mausX<220 ) { // Button 'Blue'
      aktFarbe=1;
      Zug += 1;
    }
    if (mausX>260 && mausX<320 ) { // Button 'Yellow'
      aktFarbe=2;
      Zug += 1;
    }
    if (mausX>382 && mausX<534 ) { // Button Neues Spiel
      NeuesSpiel();
    }
  } // End if
  // Buttons in der unteren Zeile
  if (mausY>110 && mausY<170 ) {
    if (mausX>60 && mausX<120 ) { // Button 'Lime'
      aktFarbe=3;
      Zug += 1;
    }
    if (mausX>160 && mausX<220 ) { // Button 'DarkViolet'
      aktFarbe=4;
      Zug += 1;
    }
    if (mausX>260 && mausX<320 ) { // Button 'Orange'
      aktFarbe=5;
      Zug += 1;
    }
  } // End if

  // Alle true Felder des Flutfeld mit der aktFarbe im Spielfeld füllen
  for (let Zeile = 0; Zeile < 14; Zeile++) {
    for (let Spalte = 0; Spalte < 14; Spalte++) {
      if (Flutfeld[Zeile][Spalte] == true) {
        Spielfeld[Zeile][Spalte] = aktFarbe;
      } // End if
    } // Next Spalte
  } // Next Zeile

  // Neu verbundene Farbfelder im Flutfeld auf true setzen
  FlutfeldAktualisieren();
} // Ende function mouseClicked()

//-----------------------------------------------------------
function NeuesSpiel() {
  //-----------------------------------------------------------
  // Startwerte festlegen
  Zug = 0;
  Erfolgsmeldung = '';
  // neue Farben für das Spielfeld auswürfeln
  for (let Zeile = 0; Zeile < 14; Zeile++) {
    for (let Spalte = 0; Spalte < 14; Spalte++) {
      let Farbindex = floor(random(6))
        Spielfeld[Zeile][Spalte] = Farbindex;
    } // Next Spalte
  } // Next Zeile
  // Flutfeld initialisieren
  for (let Zeile = 0; Zeile < 14; Zeile++) {
    for (let Spalte = 0; Spalte < 14; Spalte++) {
      Flutfeld[Zeile][Spalte] = false;
    } // Next Spalte
  } // Next Zeile
  Flutfeld[0][0] = true; // Feld oben links als geflutet kennzeichnen
  aktFarbe = Spielfeld[0][0]; // Farbe des gefluteten Startfeldes links oben
  // Am Startfeld anliegende Felder gleicher Farbe einordnen
  FlutfeldAktualisieren();
} // Ende function NeuesSpiel()

//-----------------------------------------------------------
function FlutfeldAktualisieren() {
  //-----------------------------------------------------------
  // Alle neu gefluteten Felder im Flutfeld auf True setzen
  let fertig = false;
  while (fertig == false) {
    fertig = true; // Schleife nur wiederholen, wenn fertig auf false gesetzt wird
    //-----------------------------------------------------------
    // Startfeld oben links
    if (Flutfeld[0][1] == false) {
      if (Spielfeld[0][1] == aktFarbe) {
        Flutfeld[0][1] = true; // Feld ist geflutet
        fertig = false;        // Schleife erneut ausführen
      } // End if
    } // End if
    if (Flutfeld[1][0] == false) {
      if (Spielfeld[1][0] == aktFarbe) {
        Flutfeld[1][0] = true; // Feld ist geflutet
        fertig = false;        // Schleife erneut ausführen
      } // End if
    } // End if
    //-----------------------------------------------------------
    // Ecke oben rechts
    if (Flutfeld[0][13] == true) { // wenn das Feld geflutet ist
      // Feld links prüfen ---------------------------------
      if (Flutfeld[0][12] == false) {       // nicht gekennzeichnet
        if (Spielfeld[0][12] == aktFarbe) { // hat aber die aktFarbe
          Flutfeld[0][12] = true; // Feld ist geflutet
          fertig = false; // Schleife erneut ausführen
        } // End if
      } // End if
      // Feld unten prüfen ---------------------------------
      if (Flutfeld[1][13] == false) {       // nicht gekennzeichnet
        if (Spielfeld[1][13] == aktFarbe) { // hat aber die aktFarbe
          Flutfeld[1][13] = true; // Feld ist geflutet
          fertig = false; // Schleife erneut ausführen
        } // End if
      } // End if
    } // End if
    //-----------------------------------------------------------
    // Ecke unten links Zeile 13, Spalte 0
    if (Flutfeld[13][0] == true) { // wenn das Feld geflutet ist
      // Feld rechts prüfen ---------------------------------
      if (Flutfeld[13][1] == false) {       // nicht gekennzeichnet
        if (Spielfeld[13][1] == aktFarbe) { // hat aber die aktFarbe
          Flutfeld[13][1] = true; // Feld ist geflutet
          fertig = false; // Schleife erneut ausführen
        } // End if
      } // End if
      // Feld oben prüfen ---------------------------------
      if (Flutfeld[12][0] == false) {       // nicht gekennzeichnet
        if (Spielfeld[12][0] == aktFarbe) { // hat aber die aktFarbe
          Flutfeld[12][0] = true; // Feld ist geflutet
          fertig = false; // Schleife erneut ausführen
        } // End if
      } // End if
    } // End if
    //-----------------------------------------------------------
    // Ecke unten rechts Zeile 13, Spalte 13
    if (Flutfeld[13][13] == true) { // wenn das Feld geflutet ist
      // Feld links prüfen ---------------------------------
      if (Flutfeld[13][12] == false) {       // nicht gekennzeichnet
        if (Spielfeld[13][12] == aktFarbe) { // hat aber die aktFarbe
          Flutfeld[13][12] = true; // Feld ist geflutet
          fertig = false; // Schleife erneut ausführen
        } // End if
      } // End if
      // Feld oben prüfen ---------------------------------
      if (Flutfeld[12][13] == false) {       // nicht gekennzeichnet
        if (Spielfeld[12][13] == aktFarbe) { // hat aber die aktFarbe
          Flutfeld[12][13] = true; // Feld ist geflutet
          fertig = false; // Schleife erneut ausführen
        } // End if
      } // End if
    } // End if
    //-----------------------------------------------------------
    // alle Innenfelder oben, Zeile 0, Spalten 1...12
    for (let Spalte = 1; Spalte < 13; Spalte ++) {
      if (Flutfeld[0][Spalte] == true) { // wenn das Feld geflutet ist
        // Feld rechts prüfen ---------------------------------
        if (Flutfeld[0][Spalte+1] == false) {       // nicht gekennzeichnet
          if (Spielfeld[0][Spalte+1] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[0][Spalte+1] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld links prüfen ---------------------------------
        if (Flutfeld[0][Spalte-1] == false) {       // nicht gekennzeichnet
          if (Spielfeld[0][Spalte-1] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[0][Spalte-1] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld unten prüfen ---------------------------------
        if (Flutfeld[1][Spalte] == false) {       // nicht gekennzeichnet
          if (Spielfeld[1][Spalte] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[1][Spalte] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
      } // End if
    } // Next Spalte
    //-----------------------------------------------------------
    // alle Innenfelder unten, Zeile 13, Spalten 1...12
    for (let Spalte = 1; Spalte < 13; Spalte ++) {
      if (Flutfeld[13][Spalte] == true) { // wenn das Feld geflutet ist
        // Feld rechts prüfen ---------------------------------
        if (Flutfeld[13][Spalte+1] == false) {       // nicht gekennzeichnet
          if (Spielfeld[13][Spalte+1] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[13][Spalte+1] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld links prüfen ---------------------------------
        if (Flutfeld[13][Spalte-1] == false) {       // nicht gekennzeichnet
          if (Spielfeld[13][Spalte-1] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[13][Spalte-1] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld oben prüfen ---------------------------------
        if (Flutfeld[12][Spalte] == false) {       // nicht gekennzeichnet
          if (Spielfeld[12][Spalte] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[12][Spalte] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
      } // End if
    } // Next Spalte
    //-----------------------------------------------------------
    // alle Innenfelder links, Zeilen 1...12, Spalte 0
    for (let Zeile = 1; Zeile < 13; Zeile ++) {
      if (Flutfeld[Zeile][0] == true) { // wenn das Feld geflutet ist
        // Feld rechts prüfen ---------------------------------
        if (Flutfeld[Zeile][1] == false) {       // nicht gekennzeichnet
          if (Spielfeld[Zeile][1] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[Zeile][1] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld oben prüfen ---------------------------------
        if (Flutfeld[Zeile-1][0] == false) {       // nicht gekennzeichnet
          if (Spielfeld[Zeile-1][0] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[Zeile-1][0] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld unten prüfen ---------------------------------
        if (Flutfeld[Zeile+1][0] == false) {       // nicht gekennzeichnet
          if (Spielfeld[Zeile+1][0] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[Zeile+1][0] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
      } // End if
    } // Next Zeile
    //-----------------------------------------------------------
    // alle Innenfelder rechts, Zeilen 1...12, Spalte13
    for (let Zeile = 1; Zeile < 13; Zeile ++) {
      if (Flutfeld[Zeile][13] == true) { // wenn das Feld geflutet ist
        // Feld links prüfen ---------------------------------
        if (Flutfeld[Zeile][12] == false) {       // nicht gekennzeichnet
          if (Spielfeld[Zeile][12] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[Zeile][12] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld oben prüfen ---------------------------------
        if (Flutfeld[Zeile-1][13] == false) {       // nicht gekennzeichnet
          if (Spielfeld[Zeile-1][13] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[Zeile-1][13] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
        // Feld unten prüfen ---------------------------------
        if (Flutfeld[Zeile+1][13] == false) {       // nicht gekennzeichnet
          if (Spielfeld[Zeile+1][13] == aktFarbe) { // hat aber die aktFarbe
            Flutfeld[Zeile+1][13] = true; // Feld ist geflutet
            fertig = false; // Schleife erneut ausführen
          } // End if
        } // End if
      } // End if
    } // Next Zeile

    //-----------------------------------------------------------
    // alle Innenfelder Zeilen 1...12, Spalten 1...12
    for (let Zeile = 1; Zeile < 13; Zeile ++) {
      for (let Spalte = 1; Spalte < 13; Spalte ++) {
        if (Flutfeld[Zeile][Spalte] == true) { // wenn das Feld geflutet ist
          // Feld rechts prüfen ---------------------------------
          if (Flutfeld[Zeile][Spalte+1] == false) {       // nicht gekennzeichnet
            if (Spielfeld[Zeile][Spalte+1] == aktFarbe) { // hat aber die aktFarbe
              Flutfeld[Zeile][Spalte+1] = true; // Feld ist geflutet
              fertig = false; // Schleife erneut ausführen
            } // End if
          } // End if
          // Feld links prüfen ---------------------------------
          if (Flutfeld[Zeile][Spalte-1] == false) {       // nicht gekennzeichnet
            if (Spielfeld[Zeile][Spalte-1] == aktFarbe) { // hat aber die aktFarbe
              Flutfeld[Zeile][Spalte-1] = true; // Feld ist geflutet
              fertig = false; // Schleife erneut ausführen
            } // End if
          } // End if
          // Feld oben prüfen ---------------------------------
          if (Flutfeld[Zeile-1][Spalte] == false) {       // nicht gekennzeichnet
            if (Spielfeld[Zeile-1][Spalte] == aktFarbe) { // hat aber die aktFarbe
              Flutfeld[Zeile-1][Spalte] = true; // Feld ist geflutet
              fertig = false; // Schleife erneut ausführen
            } // End if
          } // End if
          // Feld unten prüfen ---------------------------------
          if (Flutfeld[Zeile+1][Spalte] == false) {       // nicht gekennzeichnet
            if (Spielfeld[Zeile+1][Spalte] == aktFarbe) { // hat aber die aktFarbe
              Flutfeld[Zeile+1][Spalte] = true; // Feld ist geflutet
              fertig = false; // Schleife erneut ausführen
            } // End if
          } // End if
        } // End if
      } // Next Spalte
    } // Next Zeile
    //-----------------------------------------------------------
  } // End while

  // prüfen, ob die Aufgabe gelöst wurde
  let gelöst = true;
  for (let Zeile = 0; Zeile < 14; Zeile ++) {
    for (let Spalte = 0; Spalte < 14; Spalte ++) {
      if (Flutfeld[Zeile][Spalte] == false) { // wenn das Feld nicht geflutet ist
        gelöst = false;
      } // End if
    } // Next Spalte
  } // Next Zeile
  // Erfolgsmeldung ausgeben
  if (gelöst) {
    Erfolgsmeldung = 'Das Spielfeld wurde in ' + Zug + ' Zügen geflutet'
  }
} // Ende function FlutfeldAktualisieren()