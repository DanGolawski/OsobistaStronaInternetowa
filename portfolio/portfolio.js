window.onload = function () {

    var firebaseConfig = {
        apiKey: "AIzaSyDF6zSWpKlLLE6qwxK8sab-DKJp4t132tU",
        authDomain: "osobista-strona-internetowa.firebaseapp.com",
        databaseURL: "https://osobista-strona-internetowa.firebaseio.com",
        projectId: "osobista-strona-internetowa",
        storageBucket: "osobista-strona-internetowa.appspot.com",
        messagingSenderId: "10959856538",
        appId: "1:10959856538:web:975e132ec48fb03b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);




    ///////////////////////////////////////////////////////////////////////// MAIN FUNCTION
    let container = document.querySelector('#portfolioContainer');
    let projectList = [];
    let newElementList = [];

    getData();




    function getData() {
        let ref = firebase.database().ref('portfolio');
        let projects = [];
        ref.once('value', (snapshot) => {
            snapshot.forEach((elem) => {
                let pelem = new portfolioElement(elem.key, elem.child('link').val(), elem.child('description').val(), elem.child('image').val(), elem.child('url').val(), Object.values(elem.child('technologies').val())); //DO SPRAWDZENIA !!!!!!!!!!!!!
                projectList.push(pelem);
            })
            displayProjects(projectList);
        })
    }


    // TYMCZASOWE TWORZENIE ELEMENTÓW
    // for (let i = 0; i < 10; i++) {
    //     let project = new portfolioElement("Mercedes W222", 'www.mercedes.com', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ipsa adipisci officia perferendis esse quis dicta in vel aut dolore, quas voluptatibus hic sunt quibusdam, quasi atque fugit minima nesciunt?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ipsa adipisci officia perferendis esse quis dicta in vel aut dolore, quas voluptatibus hic sunt quibusdam, quasi atque fugit minima nesciunt?', 'https://www.autocentrum.pl/ac-file/car-version/59999b1b582c7d7f068b4579/mercedes-klasa-s-w222-limuzyna-wersja-dluga-facelifting.jpg', ['Java', 'Python', 'CSS', 'HTML', 'C#', "JavaScript", 'React'])
    //     projectList.push(project);
    // }








    function displayProjects(list) {
        for (let i in list) {
            let newElem = document.createElement('div');
            newElem.className = 'card';
            newElem.innerHTML = list[i].createHTMLelement();
            container.appendChild(newElem);
            newElementList.push(newElem)
            appearAnimation(newElem, i);
        }


    }


    function appearAnimation(e, m) {
        setTimeout(() => {
            e.style.opacity = 1;
            e.style.transform = 'translate(0,0)';
        }, m * 300)
    }


}