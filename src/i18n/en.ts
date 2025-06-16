export const enJSON = {
    "citizenRegister":{
        required_ci: "CI is required",
        ci_min_length: "CI must be at least 5 digits",
        ci_max_length: "CI must not exceed 10 digits",
        ci_numeric: "CI must contain only numbers",
        required_birth_date: "Birth date is required",
        birth_date_max: "You must be at least 18 years old",
        name_min_length: "Name must be at least 2 characters",
        name_max_length: "Name must not exceed 25 characters",
        required_name: "Name is required",
        last_name_min_length: "Last name must be at least 2 characters",
        last_name_max_length: "Last name must not exceed 25 characters",
        required_last_name: "Last name is required",
        required_place: "Voting place is required",
        required_user_photo: "User photo is required",
        error_in_register: "Error in citizen registration",
    },
    "sidebar": {
        home: "Home",
        go_to_vote: "Go to Vote",
        voting_management: "Voting Management",
        user_management: "User Management",
        center_management: "Center Management",
        register_candidate: "Register Candidate",
        candidate_management: "Candidate Management",
        table_management: "Table Management",
        logout: "Logout"
    },
    "dashboard": {
        error_place: "Error fetching voting place",
        title: "Home",
        name: "Name(s)",
        lastName: "Last Name(s)",
        ci: "Identity Card",
        place: "Voting Place",
        numberPlace: "Table",
        birthDate: "Birth Date",
        hasVoted: "Voting Status",
        voted: "Voted",
        notVoted: "Not Voted"
    },
    "userManagement": {
        title: "User Management",
        addUser: "Add User",
        role: "Role",
        votingPlace: "voting Place",
        userPhoto: "User Photo",
        yes: "Yes",
        no: "No"
    },
    "cameraModal": {
        title: "Capture Photo",
        captureButton: "Capture",
        closeButton: "Close",
        cameraError: "Error accessing camera"
    }
}