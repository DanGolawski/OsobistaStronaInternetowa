window.onload = function () {
    var tam = document.getElementById("tam_text");
    var cursor = document.getElementById("tam_cursor");
    var skills = ["IT Student", "Front End Programmer", "Mobile Programmer", "Creative Dreamer", "Varsovian & Poznanian"];
    var menu = document.querySelector('.menu');
    var hideBlocker = false;
    var container = document.querySelector('.mainContainer');
    var text = document.getElementById('textSection');



    // Animacja przy uruchomieniu
    backgroundAnimation();
    logoAnimation();
    setTimeout(function () {
        photoAnimation();
    }, 4000);
    tooltipAnimation();


    window.addEventListener('resize', () => {
        textMarginTop();
        console.log('zmiana');
    })



    menu.addEventListener('mouseenter', function () {
        hideBlocker = true;
    });


    container.addEventListener('mouseenter', function () {
        hideBlocker = false;
    });






    // functions


    function backgroundAnimation() {
        var container = document.getElementById('background');
        container.style.opacity = 1.0;
    }


    function logoAnimation() {
        var logo = document.getElementById('logo');
        logo.style.opacity = 1.0;
        setTimeout(function () {
            logo.style.left = '25%';
            setTimeout(function () {
                logo.style.top = '20px';
                logo.style.transform = "translate(-50%, 0)";
                textAnimation();
            }, 2000);
        }, 4000);
    }


    function photoAnimation() {
        var photo = document.getElementById('photo');
        photo.style.right = '10%';
        photo.style.opacity = 0.3;
    }

    function textMarginTop() {
        window.innerWidth > 991 ? text.style.top = '50%' : text.style.top = '60%';
    }

    function textAnimation() {
        // var text = document.getElementById('textSection');
        text.style.opacity = 1;
        textMarginTop();
        // text.style.top = '50%';
        setTimeout(function () {
            // Animacja dla #textAboutMe
            writingAnimation(0, 0);

        }, 2500);
        menuShow();
        menuAnimations();
    }





    function writingAnimation(index, i) {
        if (i < skills[index].length) {
            tam.innerHTML += skills[index].charAt(i);
            i++;
            setTimeout(function () {
                writingAnimation(index, i)
            }, 100);
        } else {
            cursor.id = "tam_cursor_blinking";
            setTimeout(function () {
                cursor.id = "tam_cursor";
                cleaningAnimation(index, i);
            }, 1500);
        }
    }

    function cleaningAnimation(index, i) {
        if (i > 0) {
            i--;
            tam.innerHTML = skills[index].substring(0, i);
            setTimeout(function () {
                cleaningAnimation(index, i)
            }, 70);
        } else {
            cursor.id = "tam_cursor_blinking";
            setTimeout(function () {
                cursor.id = "tam_cursor";
                writingAnimation((index + 1) % skills.length, 0);
            }, 1000);
        }
    }

    function menuAnimations() {
        var timeout;
        document.onmousemove = function () {
            menuShow();
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                menuHide()
            }, 3000);
        }
    }

    function menuShow() {
        // menu.style.transform = 'translate(-50%, -120%)';
        // menu.style.transform = `translate(-50%, -${120 * Math.sqrt(2)}%)`;
        menu.style.transform = 'translate(-50%, 0)';
    }

    function menuHide() {
        if (hideBlocker == false) {
            menu.style.transform = `translate(-50%, ${120 * Math.sqrt(2)}%)`;
        }

    }




    //Z WYKORZYSTANIEM SEKCJI KRYTYCZNEJ
    function tooltipAnimation() {
        var rectangles = document.querySelectorAll('.far, .fab');
        var menuElementsBlock = [false, false, false, false, false, false, false];
        var whoIsWaiting = [0, 0, 0, 0, 0, 0, 0];

        rectangles.forEach(function (element) {

            element.addEventListener('mouseenter', function () {
                if (menuElementsBlock[parseInt(element.getAttribute('index')) - 1] == false) {
                    textAppears(element);
                } else if (whoIsWaiting[parseInt(element.getAttribute('index')) - 1] != 1) {
                    // Ustawia metodę pojawiania się tektu jako oczekującą
                    whoIsWaiting[parseInt(element.getAttribute('index')) - 1] = 1;
                    console.log("1 is waiting");
                }
            });

            element.addEventListener('mouseout', function () {
                if (menuElementsBlock[parseInt(element.getAttribute('index')) - 1] == false) {
                    iconAppears(element);
                } else {
                    // Ustawia metodę pojawiania się ikonki jako oczekującą
                    whoIsWaiting[parseInt(element.getAttribute('index')) - 1] = 2;
                    console.log("2 is waiting");
                }

            });
            function textAppears(element) {
                menuElementsBlock[parseInt(element.getAttribute('index')) - 1] = true;
                whoIsWaiting[parseInt(element.getAttribute('index')) - 1] = 0;
                element.style.color = window.getComputedStyle(element, null).getPropertyValue("background-color");
                setTimeout(function () {
                    element.className = "far menuText";
                    element.innerHTML = element.getAttribute('text');
                    element.style.color = "white";
                    setTimeout(function () {
                        menuElementsBlock[parseInt(element.getAttribute('index')) - 1] = false;
                        if (whoIsWaiting[parseInt(element.getAttribute('index')) - 1] == 2) {
                            iconAppears(element);
                        }
                    });
                }, 1000);
            }

            function iconAppears(element) {
                menuElementsBlock[parseInt(element.getAttribute('index')) - 1] = true;
                whoIsWaiting[parseInt(element.getAttribute('index')) - 1] = 0;
                element.style.color = window.getComputedStyle(element, null).getPropertyValue("background-color");
                setTimeout(function () {
                    element.innerHTML = "";
                    element.className = "far menuIcon " + element.getAttribute('className');
                    element.style.color = "white";
                    setTimeout(function () {
                        menuElementsBlock[parseInt(element.getAttribute('index')) - 1] = false;
                        if (whoIsWaiting[parseInt(element.getAttribute('index')) - 1] == 1) {
                            textAppears(element);
                        }
                    })
                }, 1000);
            }
        });
    }








}


    // element.addEventListener('mouseenter', function () {
    //     if (menuElementsBlock == false) {
    //         menuElementsBlock = true;
    //         textAppears();
    //         setTimeout(function () {
    //             menuElementsBlock = false;
    //             if (waitinglistener == 2) {
    //                 textDisappears();
    //             }
    //         }, 1000);
    //     } else if (waitinglistener != 1) {
    //         waitinglistener = 1;
    //     }
    // });

    // element.addEventListener('mouseout', function () {
    //     if (menuElementsBlock == false) {
    //         menuElementsBlock = true;
    //         textDisappears();
    //         setTimeout(function () {
    //             menuElementsBlock = false;
    //             if (waitinglistener == 1) {
    //                 textAppears();
    //             }
    //         }, 1000);
    //     } else {
    //         waitinglistener = 2;
    //     }

    // });




/* function tooltipAnimation() {
                    var rectangles = document.querySelectorAll('.far, .fab');
                    rectangles.forEach(function (element) {
                        element.addEventListener('mouseenter', function () {
                            if (menuElementsBlock < 2) {
                                waitingFunction();
                                if (menuElementsBlock == 0) {
                                    menuElementsBlock = 1;
                                    element.style.color = window.getComputedStyle(element, null).getPropertyValue("background-color");
                                    setTimeout(function () {
                                        element.className = "far menuText";
                                        element.innerHTML = element.getAttribute('text');
                                        element.style.color = "white";
                                        setTimeout(function () {
                                            menuElementsBlock = 0
                                        }, 1000);
                                    }, 1000);
                                }

                            }

                        });
                        element.addEventListener('mouseout', function () {
                            if (menuElementsBlock < 2) {
                                waitingFunction();
                                if (menuElementsBlock == 0) {
                                    menuElementsBlock = 1;
                                    element.style.color = window.getComputedStyle(element, null).getPropertyValue("background-color");
                                    setTimeout(function () {
                                        element.innerHTML = "";
                                        element.className = "far menuIcon " + element.getAttribute('className');
                                        element.style.color = "white";
                                        setTimeout(function () {
                                            menuElementsBlock = 0
                                        }, 1000);
                                    }, 1000);
                                }
                            }

                        });
                    })
                } */