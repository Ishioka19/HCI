document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const popup = document.createElement("div");
    popup.classList.add("popup-container");
    popup.innerHTML = `
        <div class="popup-content">
            <img src="" id="popup-img" class="popup-img" alt="Teacher Image">
            <h3 id="popup-header" class="popup-header"></h3>
            <p id="popup-title" class="popup-title"></p>
            <div class="popup-details">
                <p><b>Teaching Schedule:</b> <span id="popup-schedule"></span></p>
                <p><b>Subjects:</b> <span id="popup-teacher"></span></p>
                <p><b>Biography:</b> <span id="popup-bio"></span></p>
                <p><b>Rate:</b> <span id="popup-rate"></span></p>
            </div>
            <button class="book-btn">Book Now</button>
            <button class="close-btn">Close</button>
        </div>
    `;

    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    document.body.appendChild(popup);
    document.body.appendChild(overlay);

    const bookingForm = document.createElement("div");
    bookingForm.classList.add("booking-container");
    bookingForm.style.display = "none";
    bookingForm.innerHTML = `
        <div class="booking-form">
            <h2>Book a Lesson</h2>
            <p><b>Teacher:</b> <span id="booking-teacher"></span></p>
            <p><b>Schedule:</b> <span id="booking-schedule"></span></p>
            <p><b>Subjects:</b> <span id="booking-subject"></span></p>

            <label for="studentName">Your Name:</label>
            <input type="text" id="studentName" required>

            <label for="email">Your Email:</label>
            <input type="email" id="email" required>

            <label for="date">Preferred Date:</label>
            <input type="date" id="date" required>

            <label for="time">Preferred Time:</label>
            <input type="time" id="time" required>

            <button id="submitBooking">Submit Booking</button>
            <button id="closeBooking">Cancel</button>
        </div>
    `;
    document.body.appendChild(bookingForm);

    const popupImg = document.getElementById("popup-img");
    const popupHeader = document.getElementById("popup-header");
    const popupTitle = document.getElementById("popup-title");
    const popupSchedule = document.getElementById("popup-schedule");
    const popupTeacher = document.getElementById("popup-teacher");
    const popupBio = document.getElementById("popup-bio");
    const closeButton = popup.querySelector(".close-btn");
    const bookButton = popup.querySelector(".book-btn");

    const bookingTeacher = document.getElementById("booking-teacher");
    const bookingSchedule = document.getElementById("booking-schedule");
    const bookingSubject = document.getElementById("booking-subject");

    const closeBookingButton = document.getElementById("closeBooking");
    const submitBooking = document.getElementById("submitBooking");
    const popupRate = document.getElementById("popup-rate");
   

    const teacherBios = {
        "Jacemay Lacamento": "Specializes in human behavior, social interactions, and cultural dynamics. Analyzes research and theories to understand cognitive processes, behavioral patterns, and societal interactions.",
        "Alexa Gillian Aladin": "Dedicated to making learning fun and interactive, simplifying complex subjects for all students.",
        "Jose Asher Bautista": "A curious and experienced lecturer who loves studying history, and public speaking, with 4 years of experience in both fields.",
        "Jhon Lloyd Pasacsac": "Dedicated to simplifying complex IT concepts, Jhon Lloyd helps students master programming, networking, and cybersecurity. His engaging approach makes learning both accessible and enjoyable for all skill levels.",
        "Janua Leah Panes": "Passionate about making economics practical and relevant, this tutor helps students understand microeconomics, macroeconomics, and market analysis. Lessons focus on real-world applications, empowering learners to make informed business and policy decisions.",
        "Marc Andrae Decolongon": "A passionate baker, finding joy in the simple act of transforming ingredients into delicious treats. From perfecting classic recipes to experimenting with new flavors, baking is both a creative outlet and a way to share happiness with others."
    };

    const teacherRates = {
        "Jacemay Lacamento": "₱650/hr",
        "Alexa Gillian Aladin": "₱700/hr",
        "Jose Asher Bautista": "₱300/hr",
        "Jhon Lloyd Pasacsac": "₱1,000/hr",
        "Janua Leah Panes": "₱760/hr",
        "Marc Andrae Decolongon": "₱800/hr"
    };
   
    
    function showPopup(header, schedule, teacher, imgSrc) {
        popupHeader.innerText = header;
        popupTitle.innerText = "Instructor";
        popupSchedule.innerText = schedule;
        popupTeacher.innerText = teacher;
        
        popupBio.innerText = teacherBios[header] || "Experienced educator in their field.";
        popupRate.innerText = teacherRates[header] || "Rate not available"; 

        popupImg.src = imgSrc || "profile-placeholder.jpg"; 
    
        popup.style.display = "block";
        overlay.style.display = "block";
    
        setTimeout(() => {
            popup.classList.add("active");
            overlay.classList.add("active");
        }, 10);
    }
    

    function hidePopup() {
        popup.classList.remove("active");
        overlay.classList.remove("active");

        setTimeout(() => {
            popup.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    }
    function showBookingForm() {
        bookingTeacher.innerText = popupHeader.innerText;
        bookingSchedule.innerText = popupSchedule.innerText;
        bookingSubject.innerText = popupTeacher.innerText;
        bookingForm.style.display = "block"; 
    }
    function hideBookingForm() {
        bookingForm.style.display = "none";
    }
    bookButton.addEventListener("click", function () {
        hidePopup();
        showBookingForm(); 
    });

    closeBookingButton.addEventListener("click", hideBookingForm);

    submitBooking.addEventListener("click", function () {
        const studentName = document.getElementById("studentName").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!studentName || !email || !date || !time) {
            alert("Please fill in all fields!");
            return;
        }

        alert("Booking successful! 🎉");
        console.log({
            Teacher: bookingTeacher.innerText,
            Schedule: bookingSchedule.innerText,
            Student: studentName,
            Email: email,
            Date: date,
            Time: time
        });

        hideBookingForm();
    });

    // Open popup when clicking a teacher card
    cards.forEach(card => {
        card.addEventListener("click", function (event) {
            event.preventDefault();
            const header = card.querySelector(".card-header").innerText;
            const schedule = card.querySelector(".card-body p:first-of-type").innerText;
            const teacher = card.querySelector(".teacher") ? card.querySelector(".teacher").innerText : "N/A";
            const img = card.querySelector(".profile-img") ? card.querySelector(".profile-img").src : "";

            showPopup(header, schedule, teacher, img);
        });
    });

    closeButton.addEventListener("click", hidePopup);
    overlay.addEventListener("click", hidePopup);
});

//nav-pane//
function toggleNav() {
    let sideNav = document.getElementById("sideNav");
    let menuIcon = document.getElementById("menu-icon");

    if (sideNav.style.width === "250px") {
        sideNav.style.width = "0"; 
        document.body.classList.remove("menu-open"); 
    } else {
        sideNav.style.width = "250px";
        document.body.classList.add("menu-open"); 
        
    }
}

//going back//

function showSection(tutors) {
    document.querySelectorAll('.container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(home).classList.add('active');
}

//Scrolling

window.onscroll = function () {
    let nav = document.querySelector(".nav-container");
    if (window.scrollY > 50) {
        nav.style.backgroundColor = "rgba(199, 199, 199, 0.9)";
    } else {
        nav.style.backgroundColor = "transparent";
    }
};

//booking

document.addEventListener("DOMContentLoaded", function () {

    let teacherCards = document.querySelectorAll(".card");
    let overlay = document.createElement("div"); 


    overlay.classList.add("modal-overlay");
    document.body.appendChild(overlay);

    teacherCards.forEach(card => {
        card.addEventListener("click", function () {
            let name = card.querySelector(".card-header").innerText;
            let schedule = card.querySelector(".sched + p").innerText;
            let subjects = card.querySelector(".teacher").innerText;
            let profileImg = card.querySelector(".profile-img").src;

            document.getElementById("modalName").innerText = name;
            document.getElementById("modalSchedule").innerText = schedule;
            document.getElementById("modalSubjects").innerText = subjects;
            document.getElementById("modalProfileImg").src = profileImg;
            document.getElementById("modalBio").innerText = "Dedicated to making learning engaging!"; 

            overlay.classList.add("active");

            let myModal = new bootstrap.Modal(document.getElementById("teacherModal"));
            myModal.show();

            document.getElementById("teacherModal").addEventListener("hidden.bs.modal", function () {
                overlay.classList.remove("active");
            });
        });
    });
});

function toggleNav() {
    document.getElementById("sideNav").classList.toggle("open");
}

function closeNav() {
    document.getElementById("sideNav").classList.remove("open");
}

//smooth scrolling
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetID = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetID);
            
            if (targetSection) {
                const offset = document.querySelector(".nav-container").offsetHeight; 
                
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: "smooth"
                });

                closeNav();
            }
        });
    });
});

function toggleNav() {
    document.getElementById("sideNav").classList.toggle("open");
}

function closeNav() {
    document.getElementById("sideNav").classList.remove("open");
}

//responsive ui
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const cards = document.querySelectorAll(".card");

    function adjustLayout() {
        if (window.innerWidth >= 1024) {
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(3, 1fr)";
            container.style.gap = "20px";
        } else if (window.innerWidth >= 768) {
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(2, 1fr)";
            container.style.gap = "20px";
        } else {
            container.style.display = "block";
        }
    }
    adjustLayout();
    window.addEventListener("resize", adjustLayout);
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "0.3s";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});
