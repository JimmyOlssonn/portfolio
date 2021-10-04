// Skills that will be shown in the About section. Structured by name and skill level [0-10]
var skills = [
    ["HTML", 10],
    ["CSS", 10],
    ["JavaScript", 8],
    ["Jquery", 8],
    ["PHP", 8],
    ["MySQL", 6],
    ["Github", 8],
    ["Bootstrap", 8],
    ["Vue.js", 4],
    ["Angular", 4],
    ["C++", 8],
    ["Java", 4]
]
// body-onload function 
function startUp() {
    cardTags();
    startAnimation();
    randomAnimation();
    addSkills();
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')); 
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
}
// Write out all skills and make a dot foreach skill-level
function addSkills() {
    var div = document.getElementById("skills");
    var text = "";
    var value;
    for (let i = 0; i < skills.length; i++) { // write out all the skills and remove all characters that are not letters or number on id
        value = (skills[i][1] * 10)
        text += '<div id="' + (skills[i][0]).replace(/[^\w\s]/g, '') + '" class="col-lg-3 col-md-4 col-sm-6"><div class="skill-box p-3 rounded mb-4"><h3 class="mb-2">' + skills[i][0] + '</h3><p>Erfarenhet<p>';
        text += '<div class="line"></div>';
        text += '</div></div>';
    }
    div.innerHTML = text;
    // If the skillsAnimation have already been triggered, style them without animation
    if (sessionStorage.getItem("skillsAnimation") == 1) {
        for (let i = 0; i < skills.length; i++) {
            document.getElementById(skills[i][0].replace(/[^\w\s]/g, '')).getElementsByClassName("line")[0].style.width = (skills[i][1] * 10) + '%'
        }
    }
}
// Add classed to each tag in projects
function cardTags() {
    $('p.tags').find('span').addClass('rounded bg-light text-dark px-2 mx-1');
}
// Random value for animation
var randomValue = function () {
    var random = anime.random(-35, 35) + "rem";
    return random;
};
// Animation for background
function randomAnimation() {
    var basicTimeline = anime.timeline({
        loop: false,
    });
    basicTimeline
        .add({
            targets: ".animation-ball",
            opacity: [{ value: 0.5 }, { value: 0 }],
            translateX: randomValue,
            translateY: randomValue,
            easing: 'linear',
            duration: 3500,
        });
    basicTimeline.complete = function () { randomAnimation(); };
}
// Animation for text and img on first page
function startAnimation() {
    // If startAnimation have not been triggered
    if (sessionStorage.getItem("startAnimation") != 1) {
        anime({
            targets: '#home-text',
            opacity: 1,
            translateX: -50,
            duration: 1500,
            zIndex: "1",
            easing: 'easeInOutQuad'
        });
        anime({
            targets: '#home-img',
            opacity: 1,
            translateX: 20,
            duration: 1500,
            zIndex: "1",
            easing: 'easeInOutQuad'
        });
        sessionStorage.setItem("startAnimation", 1);
    }
    // If startAnimation have been triggered, style without animation
    else { 
        document.getElementById("home-img").style.opacity = 1;
        document.getElementById("home-img").style.left = "0px";
        document.getElementById("home-text").style.opacity = 1;
        document.getElementById("home-text").style.left = "0px";
    }

}
// Determine if the element is in the viewport
function elementInViewport(el) {
    var rect = el[0].getBoundingClientRect();
    return (rect.top < $(window).height() - 150);
}
// On-scroll event listener
$(window).on('scroll resize', function () {
    // If startAnimation have not been triggered before
    if (sessionStorage.getItem("skillsAnimation") != 1) {
        $(".line").each(function () {
            var $this = $(this);
            if (elementInViewport($this)) {
                for (let i = 0; i < skills.length; i++) {
                    anime({
                        targets: '#' + skills[i][0].replace(/[^\w\s]/g, '') + ' .line',
                        width: (skills[i][1] * 10) + '%',
                        easing: 'easeInOutQuad'
                    });
                }
                sessionStorage.setItem("skillsAnimation", 1); // Save to sessionStorage that the animation have been triggered
            }
        });
    }
    $(".animation-ball").each(function () {
        anime({
            targets: ".animation-ball",
            opacity: 0.2
        });
    });
});


