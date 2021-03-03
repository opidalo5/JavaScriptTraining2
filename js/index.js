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

function getFormulaire() {
    var formulaire = document.forms['my-form'];
    //    console.log('title :', formulaire['form-title'].value);
    //    console.log('author :', formulaire['form-author'].value);
    //    console.log('hour :', formulaire['form-hour'].value);
    //    console.log('date :', formulaire['form-date'].value);
    //    console.log('mail :', formulaire['form-email'].value);
    //    console.log('adresse :', formulaire['form-adresse'].value);
    //    console.log('description :', formulaire['form-description'].value);

    var unPostIt = {
        title: formulaire['form-title'].value,
        authorID: formulaire['form-author'].value,
        hour: formulaire['form-hour'].value,
        date: formulaire['form-date'].value,
        email: formulaire['form-email'].value,
        adresse: formulaire['form-adresse'].value,
        description: formulaire['form-description'].value
    }
    console.log(unPostIt);
    return unPostIt;

}
function makePostIt(postitValues) {
    //use a postit model to create new
    var postitNode = document.querySelector('.post-it').cloneNode(true);
    postitNode.querySelector('.post-it-titre').innerText = postitValues.title;
    postitNode.querySelector('.post-it-adresse').innerText = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerText = postitValues.email;
    postitNode.querySelector('.post-it-description').innerText = postitValues.description;
    postitNode.querySelector('.post-it-author').innerText = postitValues.authorID;
    postitNode.querySelector('.post-it-date').innerText = 'Le ' + postitValues.date + ' a ' + postitValues.hour;

    document.querySelector('#post-it-liste').append(postitNode)
}
function onformsubmit(evt) {
    evt.preventDefault();
    var postitValues = getFormulaire();
    makePostIt(postitValues)
    evt.target.reset();
}
//add a cloned filled postit
document.forms['my-form'].addEventListener('submit', onformsubmit);