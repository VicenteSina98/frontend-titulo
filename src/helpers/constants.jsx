export const QUESTIONS_ARRAY = [
  "¿Presenta alguno/s de los siguientes síntomas?", // 0
  "¿Presenta problemas en alguno/s de los 5 sentidos?", // 1
  "¿Presenta inflamación en alguna/s de las siguientes partes de su cuerpo?", // 2
  "¿Presenta manchas en alguna/s de las siguientes partes de su cuerpo?", // 3
  "¿Presenta comezón en alguna/s de las siguientes partes de su cuerpo?", // 4
  "¿Siente alguno/s de los siguientes tipos de dolor?", // 5
  "¿Hace cuánto experimenta los síntomas?", // 6
  "¿Con qué frecuencia experimenta los síntomas?", // 7
  "¿Cuál/es de los siguientes medicamentos consume?", // 8
  "¿Ha tenido contacto con algún enfermo?", // 9
  "¿Qué diagnóstico tenía el enfermo?", // 10
  "¿Tenía síntomas relacionados a los suyos?", // 11
  "¿Ha tenido contacto con algún agente infeccioso o tóxico?", // 12
  "¿De qué tipo era dicho agente?", // 13
  "¿Ha viajado al extranjero recientemente?", // 14
  "¿A qué país/es viajó?", // 15
  "¿Cómo define su estado de ánimo? Especifique decaido, cansado, ansioso, normal, falta de apetito, etc.", // 16
];
export const OPTIONS_ARRAY = [
  [
    "Fiebre",
    "Tos",
    "Dificultad respiratorio",
    "Pérdida del conocimiento",
    "Alteración del sueño",
    "Fatiga",
    "Otros",
    "Ninguno",
  ], // 0
  ["Audición", "Gusto", "Olfato", "Tacto", "Vista", "Ninguno"], // 1
  [
    "Cabeza",
    "Extremidades superiores",
    "Extremidades inferiores",
    "Amígdalas",
    "Aparato reproductor",
    "Abdomen",
    "Otros",
    "Ninguno",
  ], // 2
  [
    "Cabeza",
    "Extremidades superiores",
    "Extremidades inferiores",
    "Cuello",
    "Espalda",
    "Aparato reproductor",
    "Abdomen",
    "Otros",
    "Ninguno",
  ], // 3
  [
    "Cabeza",
    "Extremidades superiores",
    "Extremidades inferiores",
    "Cuello",
    "Espalda",
    "Aparato reproductor",
    "Abdomen",
    "Otros",
    "Ninguno",
  ], // 4
  [
    "Dolor de cabeza",
    "Dolor en extremidades",
    "Dolor muscular",
    "Dolor abdominal",
    "Otros",
    "Ninguno",
  ], // 5
  ["Un día", "2 - 7 días", "Más de una semana", "Más de un mes"], // 6
  [
    "Varias veces al día",
    "Una vez al día",
    "2 - 4 veces a la semana",
    "Una vez a la semana",
    "Varias veces al mes",
    "Una vez al mes",
  ], // 7
  [
    "Anticoagulantes",
    "Analgésicos",
    "Antidepresivos",
    "Antihipertensivos",
    "Antidiabéticos",
    "Estatinas",
    "Otros",
    "Ninguno",
  ], // 8
  ["Si", "No"], // 9
  ["Covid-19", "Gripe", "ITS", "Otros", "Ninguno"], // 10
  ["Si", "No"], // 11
  ["Si", "No"], // 12
  ["Químico", "Biológico", "Otro"], // 13
  ["Si", "No"], // 14
  ["Australia", "Brasil", "China", "India", "Sudáfrica", "Otros"], // 15
  [ 
    "Decaido",
    "Cansado",
    "Ansioso",
    "Normal",
    "Falta de apetito",
    "Otros",
    "Ninguno",
  ], // 16
];
export const SIGNIN_OPTIONS = {
  enfermedadesCronicas: [
    {
      label: "Enfermedades cardiovasculares",
      value: "Enfermedades cardiovasculares",
    },
    {
      label: "Diabetes tipo 2",
      value: "Diabetes tipo 2",
    },
    {
      label: "EPOC",
      value: "EPOC",
    },
    {
      label: "Cáncer",
      value: "Cáncer",
    },
    {
      label: "Alzheimer",
      value: "Alzheimer",
    },
    {
      label: "Artritis",
      value: "Artritis",
    },
    {
      label: "Obesidad",
      value: "Obesidad",
    },
    {
      label: "Parkinson",
      value: "Parkinson",
    },
  ],
  historialAlergias: [
    {
      label: "Alergia al polen",
      value: "Alergia al polen",
    },
    {
      label: "Alergia polvo",
      value: "Alergia polvo",
    },
    {
      label: "Alergia al pelo de mascotas",
      value: "Alergia al pelo de mascotas",
    },
    {
      label: "Alergia a los insectos",
      value: "Alergia a los insectos",
    },
    {
      label: "Alergia al látex",
      value: "Alergia al látex",
    },
  ],
  historialCirugias: [
    {
      label: "Cirugía de cataratas",
      value: "Cirugía de cataratas",
    },
    {
      label: "Cirugía de apéndice",
      value: "Cirugía de apéndice",
    },
    {
      label: "Cirugía de hernia inguinal",
      value: "Cirugía de hernia inguinal",
    },
    {
      label: "Cirugía de vesícula biliar",
      value: "Cirugía de vesícula biliar",
    },
    {
      label: "Cirugía de corazón abierto",
      value: "Cirugía de corazón abierto",
    },
    {
      label: "Cirugía de bypass gástrico",
      value: "Cirugía de bypass gástrico",
    },
    {
      label: "Cirugía de tiroides",
      value: "Cirugía de tiroides",
    },
  ],
  historialMedicamentos: [
    {
      label: "Paracetamol",
      value: "Paracetamol",
    },
    {
      label: "Ibuprofeno",
      value: "Ibuprofeno",
    },
    {
      label: "Lisinopril",
      value: "Lisinopril",
    },
    {
      label: "Atorvastatina",
      value: "Atorvastatina",
    },
    {
      label: "Levothyroxine",
      value: "Levothyroxine",
    },
    {
      label: "Metformina",
      value: "Metformina",
    },
    {
      label: "Omeprazol",
      value: "Omeprazol",
    },
    {
      label: "Simvastatina",
      value: "Simvastatina",
    },
    {
      label: "Amlodipina",
      value: "Amlodipina",
    },
    {
      label: "Alprazolam",
      value: "Alprazolam",
    },
  ],
  historialEnfermedadesFamilia: [
    {
      label: "influenza",
      value: "influenza",
    },
    {
      label: "Hipertensión arterial",
      value: "Hipertensión arterial",
    },
    {
      label: "Depresión",
      value: "Depresión",
    },
  ],
  historialEnfermedadesInfecciosas: [
    {
      label: "Infecciones de las vías respiratorias superiores",
      value: "Infecciones de las vías respiratorias superiores",
    },
    {
      label: "Infecciones del tracto urinario",
      value: "Infecciones del tracto urinario",
    },
    {
      label: "Infecciones de la piel",
      value: "Infecciones de la piel",
    },
    {
      label: "Infecciones por hongos",
      value: "Infecciones por hongos",
    },
    {
      label: "Infecciones de transmisión sexual",
      value: "Infecciones de transmisión sexual",
    },
    {
      label: "Infecciones gastrointestinales",
      value: "Infecciones gastrointestinales",
    },
    {
      label: "Tuberculosis",
      value: "Tuberculosis",
    },
    {
      label: "Malaria",
      value: "Malaria",
    },
  ],
  historialHabitosSalud: [
    {
      label: "Fumar tabaco",
      value: "Fumar tabaco",
    },
    {
      label: "Consumir en exceso alcohol",
      value: "Consumir en exceso alcohol",
    },
    {
      label: "Comer en exceso y llevar una dieta poco saludable",
      value: "Comer en exceso y llevar una dieta poco saludable",
    },
    {
      label: "Faltar al ejercicio regular",
      value: "Faltar al ejercicio regular",
    },
    {
      label: "No dormir lo suficiente",
      value: "No dormir lo suficiente",
    },
  ],
};
export const EMPTY_OTROS = {
  sintomas: "", // index = 0
  inflamacion: "", // index = 2
  manchas: "", // index = 3
  comezon: "", // index = 4
  dolor: "", // index = 5
  consumeMedicamentos: "", // index = 8
  diagnosticoContacto: "", // index = 10
  agenteInfeccioso: "", // index = 13
  pais: "", // index = 15
  estadoAnimo: "", // index = 16
};
export const EMPTY_MEDICAL_DATA = {
  informacion_personal: {
    informacion_personal: "",
    antecedentes_medicos: "",
  },
  sintomas: "",
  problemas_sentidos: "",
  inflamacion: "",
  manchas: "",
  comezon: "",
  dolor: "",
  tiempo_sintomas: "",
  frecuencia_sintomas: "",
  consumo_medicamentos: "",
  contacto_enfermo: {
    ha_tenido_contacto: "",
    diagnostico: "",
    sintomas_relacionados: "",
  },
  contacto_toxico: {
    ha_tenido_contacto: "",
    tipo: "",
  },
  viaje_extranjero: {
    ha_viajado: "",
    paises: "",
  },
  estado_animo: "",
};
