function jsIsLoaded() {
    // loading a variable into the DIV called "jsLoaded"
    var jsLoaded = document.querySelector("#jsLoaded");

    // modification of the style css of the tag
    jsLoaded.style.backgroundColor = "green";

    // modification of the text content of the tag
    jsLoaded.innerText = "Le js est charge";

    console.log("Le fichier index.js a fini d'etre executer");


}
jsIsLoaded();

function logFormulaire() {
    var formulaire = document.forms['my-form'];
    console.log('title :', formulaire['form-title'].value);
    console.log('author :', formulaire['form-author'].value);
    console.log('hour :', formulaire['form-hour'].value);
    console.log('date :', formulaire['form-date'].value);
    console.log('mail :', formulaire['form-email'].value);
    console.log('adresse :', formulaire['form-adresse'].value);
    console.log('description :', formulaire['form-description'].value);

}
