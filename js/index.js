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
// verify if postit is filled before allowing submission

function isFormFullFill() {

    for (var input of document.forms['my-form']) {
        if (input.localName !== 'button' && input.value === '') {
            input.style.backgroundColor = "tomato";
            return false;
        }
        else {
            if (!input.classList.contains('btn')) input.style.backgroundColor = "white";
        }
    }
    return true;

}

function getFormulaire() {

    // access a la balise form par document.forms
    var formulaire = document.forms['my-form'];
    //    console.log('title :', formulaire['form-title'].value);
    //    console.log('author :', formulaire['form-author'].value);
    //    console.log('hour :', formulaire['form-hour'].value);
    //    console.log('date :', formulaire['form-date'].value);
    //    console.log('mail :', formulaire['form-email'].value);
    //    console.log('adresse :', formulaire['form-adresse'].value);
    //    console.log('description :', formulaire['form-description'].value);

    //constitution d'un objet avec les champs issue du forms
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

/**
 * Clone d'un postit model pour la creation des 
 * @param {*} postitDOM @param {Document} postitDOM (document template )
 * @param {*} postitValues @param {postit} postitValues object the contains the postit to display
 */
function makePostIt(postitDOM, postitValues) {
    //use a postit model to create new
    // var postitNode = document.querySelector('.post-it').cloneNode(true);
    var postitNode = postitDOM;
    postitNode.querySelector('.post-it-titre').innerText = postitValues.title;
    postitNode.querySelector('.post-it-adresse').innerText = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerText = postitValues.email;
    postitNode.querySelector('.post-it-description').innerText = postitValues.description;
    postitNode.querySelector('.post-it-author').innerText = postitValues.authorID;
    postitNode.querySelector('.post-it-date').innerText = 'Le ' + postitValues.date + ' a ' + postitValues.hour;

    document.querySelector('#post-it-liste').append(postitNode)
}
function onformsubmit(evt) {
    // arret de l'execution par default de la soummission (rechargement de page)
    evt.preventDefault();
    // si le formulaire est pas rempli
    if (!isFormFullFill()) return;
    //recuperation des valeurs dans formulaire
    var postitValues = getFormulaire();

    getTemplateView('postit.xhtml',
        function (responseDocument) {
            //console.log(response)
            makePostIt(responseDocument, postitValues);
        }
    );

    //  makePostIt(postitValues)
    evt.target.reset();
}
//add a cloned filled postit
document.forms['my-form'].addEventListener('submit', onformsubmit);

function getTemplateView(templateFileName, callback) {
    // step 1 obtain an xhr object
    var xhr = new XMLHttpRequest();
    // step 2 preparing the request
    xhr.open('GET', 'vues/' + templateFileName);
    // Step 3 definition of the content to execute at every change of state
    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status !== 200) {
            console.log('ERROR XHR' + xhr.responseURL + ' -->:' + xhr.status + ':' + xhr.statusText);
        }
        console.log(evt.target);
        callback(xhr.responseXML);
    };
    // step 4
    xhr.send();
}
