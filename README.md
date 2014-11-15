mailbox
=======

#### minified

<a href="https://rawgit.com/leo/mailbox/master/jquery.mailbox.min.js">herunterladen</a>

#### Was und warum?

Vor wenigen Wochen fing es an: Ich machte mir Gedanken zum Thema "mailto:"-Links. Die Dinger kennt jeder - und zwar nicht nur die web-affinen Entwickler, sondern auch jeder andere der Mal eine Webseite besucht hat, die kein Kontaktformular hat.

Die Sache ist folgende: Jeder Benutzer, der ein Mail-Programm auf seinem PC/Mac hat, wird mit jedes mal nach dem Klick auf einen mailto-Link mit dem Ladevorgang des jeweiligen Programms belästigt. Nur um eine kleine Nachricht zu senden. Selbst wenn man so viel Grips hat und den entsprechenden Eventhandler im eigenen Browser anpasst, bleibt einem neben dem Mail-Programm nur noch das automatische Öffnen eines online-Webmailers.

Ich dachte mir: Warum macht man das denn nicht viel einfacher, und vor allem angenehmer für die Nutzer? Also hab ich mir ein jQuery-Plugin namens "mailbox" (Der Name sollte kurz und prägnant sein) geschrieben, welches bei Klick auf einen mailto-Link ein schniekes Kontaktformular bereitstellt.

Die Idee zum Aussehen von <b>mailbox</b> kam übrigends von <a target="_blank" href="https://balloon.io/">Balloon.io</a>.


### Installation

Zunächst solltest du einfach die nötigen Datein in den head-Bereich deiner Seite einbinden:

```html
<link rel="stylesheet" type="text/css" href="mailbox.css" />
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="jquery.mailbox.js"></script>
```

Anschließen muss mailbox nurnoch ein Link zugewiesen werden:

```js
$(function(){
    $('a[href^="mailto:"]').mailbox();
});
```


### Konfiguration

Natürlich soll dir und den Besuchern deiner Website das Plugin auch gefallen. Aus diesem Grund hast du die Möglichkeit, einige Änderungen an mailbox vorzunehmen, ohne überhaupt den Sourcecode berühren zu müssen. Hierfür bietet sich die Konfiguration bestimmter Variablen an. Im folgenden sind alle möglichen Optionen sowie dazugehörige Beispiel-Texte aufgelistet.

```js
  $('a[href^="mailto:"]').mailbox({
        send_text: 'Nachricht senden',    // Inhalt des Buttons, der zum senden der Nachricht dient
		success_text: 'Deine Nachricht wurde erfolgreich versendet!',   // Text in der Sendungs-Bestätigung
		label: {
			name: 'Dein Name',    // Titel des Namen-Feldes
			email: 'E-Mail',    // Titel des E-Mail-Feldes
			subject: 'Betreff',   // Titel des Betreff-Feldes
			message: 'Nachricht'    // Titel des Nachrichten-Feldes
		},
		send_url: 'mb_send.php',    // URL zum PHP-Script (zuständig fürs Versenden)
		complete: function() { alert( 'Done!' ); }    // Diese Funktion wird nach erfolgreicher Sendung ausgeführt
  });
```


#### Das beste an der ganzen Sache

Es ist weder notwendig, eine Empfänger-Adresse im Script zu definieren, noch irgendwelche anderen wichtigen Dinge wie z.B. den Betreff oder die E-Mail-Adresse zu konfigurieren, an die eine Kopie/Blindkopie gehen soll. 

Warum nicht? Ganz einfach: Wie wir ja alle wissen, können mailto-Links neben der E-Mail-Adresse des Empfängers auch noch andere Attribute wie z.B. den gewünschten Betreff, den Inhalt der Nachricht oder auch die Adresse enthalten, an die eine Kopie der Nachricht geschickt werden soll. Das bedeutet für die Entwickler: Neben dem Einbinden der Scripts müssen an den Mail-Links keine Änderungen vorgenommen werden. Somit ganz schön einfach, nicht war? ;-)
