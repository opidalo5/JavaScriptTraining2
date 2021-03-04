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
/* function makePostIt(postitDOM, postitValues) {
    //use a postit model to create new
    // var postitNode = document.querySelector('.post-it').cloneNode(true);
    //post break. issue retriveing document. have to build from scratch with a temp container called div then create command to go and fetch this temp content
    var postitNode = document.createElement('div');
    // this is the code to pick up that floating content from postitDOM
    postitNode.innerHTML = postitDOM.firstChild.outerHTML;

    postitNode.querySelector('.post-it-titre').innerHTML = postitValues.title;
    postitNode.querySelector('.post-it-adresse').innerHTML = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerHTML = postitValues.email;
    postitNode.querySelector('.post-it-description').innerHTML = postitValues.description;
    postitNode.querySelector('.post-it-author').innerHTML = postitValues.authorID;
    postitNode.querySelector('.post-it-date').innerHTML = 'Le ' + postitValues.date + ' a ' + postitValues.hour;

    document.querySelector('#post-it-liste').append(postitNode.firstChild); */
function makePostIt(postitDOM, postitValues) {
    /*/recuperation du postit model pour la creation des autres postit a remplir
    //clone permet d'obtenir un double non lié a l'element d'origine
    var postitNode = document.querySelector('.post-it').cloneNode(true);*/
    var postitNode = postitDOM.firstChild;
    var postitNode = document.createElement('div');
    //remplissage du contenu de la balise div vide par tout le contenu de la premiere balise de postitDOM
    postitNode.innerHTML = postitDOM.firstChild.outerHTML;
    //composition d'un post it rempli avec les valeurs recus en argument d'entree de fonction
    postitNode.querySelector('.post-it-titre').innerHTML = postitValues.title;
    postitNode.querySelector('.post-it-adresse').innerHTML = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerHTML = postitValues.email;
    postitNode.querySelector('.post-it-date').innerHTML = 'Le ' + postitValues.date + ' a ' + postitValues.hour;
    postitNode.querySelector('.post-it-date').innerHTML = 'Le <b>' + postitValues.date + '</b> a ' + postitValues.hour;
    postitNode.querySelector('.post-it-description').innerHTML = postitValues.description;
    postitNode.querySelector('.post-it-author').innerHTML = postitValues.authorID;

    //ajout à la fin de la liste du document de template postit rempli 
    document.querySelector('#post-it-liste').append(postitNode);
    document.querySelector('#post-it-liste').append(postitNode.firstChild);
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
