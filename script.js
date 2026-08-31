// Get HTML elements
const form = document.getElementById("registrationForm");
const table = document.getElementById("participantTable");
const search = document.getElementById("search");
const noData = document.getElementById("noData");

// Get saved participants from browser storage
let participants = JSON.parse(
    localStorage.getItem("participants")
) || [];

// Display participants when page loads
displayParticipants();


// Registration form
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const sport = document.getElementById("sport").value;
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();


    // Validate age
    if (age <= 0) {
        alert("Please enter a valid age.");
        return;
    }


    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }


    // Create participant object
    const participant = {

        id: Date.now(),

        name: name,

        age: age,

        gender: gender,

        sport: sport,

        phone: phone,

        email: email
    };


    // Add participant
    participants.push(participant);


    // Save data
    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );


    // Display updated list
    displayParticipants();


    // Clear form
    form.reset();


    alert("Registration successful!");

});


// Display participants
function displayParticipants(list = participants) {

    table.innerHTML = "";


    if (list.length === 0) {

        noData.style.display = "block";

        return;

    }


    noData.style.display = "none";


    list.forEach(function(participant, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${participant.name}</td>

            <td>${participant.age}</td>

            <td>${participant.gender}</td>

            <td>${participant.sport}</td>

            <td>${participant.phone}</td>

            <td>${participant.email}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteParticipant(${participant.id})"
                >
                    Delete
                </button>
            </td>

        `;


        table.appendChild(row);

    });

}


// Delete participant
function deleteParticipant(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this registration?"
    );


    if (!confirmDelete) {
        return;
    }


    participants = participants.filter(function(participant) {

        return participant.id !== id;

    });


    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );


    displayParticipants();

}


// Search participants
search.addEventListener("input", function() {

    const searchValue = search.value.toLowerCase();


    const filteredParticipants = participants.filter(
        function(participant) {

            return (

                participant.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                participant.sport
                    .toLowerCase()
                    .includes(searchValue)

                ||

                participant.email
                    .toLowerCase()
                    .includes(searchValue)

            );

        }
    );


    displayParticipants(filteredParticipants);

});
