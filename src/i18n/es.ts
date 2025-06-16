export const esJSON = {
    "citizenRegister":{
        required_ci: "El CI es obligatorio",
        ci_min_length: "El CI debe tener al menos 5 dígitos",
        ci_max_length: "el CI no debe exceder los 10 dígitos",
        ci_numeric: "El CI debe contener solo números",
        required_birth_date: "La fecha de nacimiento es obligatoria",
        birth_date_max: "Debes tener al menos 18 años",
        name_min_length: "El nombre debe tener al menos 2 caracteres",
        name_max_length: "El nombre no debe exceder los 25 caracteres",
        required_name: "El nombre es obligatorio",
        last_name_min_length: "El apellido debe tener al menos 2 caracteres",
        last_name_max_length: "El apellido no debe exceder los 25 caracteres",
        required_last_name: "El apellido es obligatorio",
        required_place: "El lugar de votación es obligatorio",
        required_user_photo: "La foto del usuario es obligatoria",
        error_in_register: "Error en el registro del ciudadano",
    },
    "sidebar": {
        home: "Inicio",
        go_to_vote: "Ir a Votar",
        voting_management: "Gestión de Votación",
        user_management: "Gestión de Usuarios",
        center_management: "Gestión de Centros",
        register_candidate: "Registrar Candidato",
        candidate_management: "Gestión de Candidatos",
        table_management: "Gestión de Mesas",
        logout: "Cerrar Sesión"
    },
    "dashboard": {
        error_place: "Error al obtener el recinto",
        title: "Inicio",
        name: "Nombre(s)",
        lastName: "Apellido(s)",
        ci: "Carnet de Identidad",
        place: "Recinto",
        numberPlace: "Mesa",
        birthDate: "Fecha de Nacimiento",
        hasVoted: "Estado de Voto",
        voted: "Votó",
        notVoted: "No votó"
    },
    "userManagement": {
        title: "Gestión de Usuarios",
        addUser: "Agregar Usuario",
        role: "Rol",
        votingPlace: "Centro de Votación",
        userPhoto: "Foto de Usuario",
        yes: "Sí",
        no: "No"
    },
    "cameraModal": {
        title: "Capturar Foto",
        captureButton: "Capturar",
        closeButton: "Cerrar",
        cameraError: "Error al acceder a la cámara"
    }
}