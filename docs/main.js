/*
    Localization

    To add more locales, add to the html file with // (translated text)
    after each DOM elements with attr i18n

    And then add the language ISO key to the list below.
*/
let languages = ['en', 'zh', 'de'];


//Bind language change dropdown events
$(".dropdown").dropdown();
$("#language").on("change",function(){
   let newLang = $("#language").parent().dropdown("get value");
   i18n.changeLanguage(newLang);
   $("body").attr("class", newLang);
});

//Initialize the i18n dom library
var i18n = domI18n({
    selector: '[i18n]',
    separator: ' // ',
    languages: languages,
    defaultLanguage: 'en'
});

$(document).ready(function(){
    let userLang = navigator.language || navigator.userLanguage;
    console.log("User language: " + userLang);
    userLang = userLang.split("-")[0];
    if (!languages.includes(userLang)) {
        userLang = 'en';
    }
    i18n.changeLanguage(userLang);
    $("body").attr("class", userLang);
});


/* Main Menu */
$("#rwdmenubtn").on("click", function(){
    $("#mainmenu").slideToggle("fast");
})

//Handle resize 
$(window).on("resize", function(){
    if (window.innerWidth > 960){
        $("#mainmenu").show();
    }else{
        $("#mainmenu").hide();
    }
})

/*
    Download
*/

$('.menu .item').tab();

//Download webpack and binary at the same time
function handleDownload(releasename){
    let binaryURL = "https://github.com/tobychui/zoraxy/releases/latest/download/" + releasename;
    window.open(binaryURL);
}

/* RWD */
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || window.pageYOffset;
    var windowHeight = window.innerHeight;
    var hiddenDiv = document.querySelector('#backToTopBtn');

    if (scrollPosition > windowHeight / 2) {
    hiddenDiv.style.display = 'block';
    } else {
    hiddenDiv.style.display = 'none';
    }
});


function backToTop(){
    $('html, body').animate({scrollTop : 0},800, function(){
        window.location.hash = "";
    });
}