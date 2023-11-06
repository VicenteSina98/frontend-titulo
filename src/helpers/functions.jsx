export const isNo = (text) => {
  const textLowerCase = text.toLowerCase();
  if (textLowerCase.includes("no")) return "no";
  else return text;
};

export const generateData = (
  name,
  birthday,
  height,
  weight,
  sex,
  antecedentesMedicos,
  chatData
) => {
  let data = {
    nombre: name,
    fecha_nacimiento: birthday,
    altura: height,
    peso: weight,
    sexo: sex,
    antecedentes_medicos: antecedentesMedicos,
    alergias_medicamentos: chatData[0].answer,
    alergias_alimentos: chatData[1].answer,
    sintomas: chatData[2].answer,
    problemas_sentidos: chatData[3].answer,
    inflamacion: chatData[4].answer,
    manchas: chatData[5].answer,
    comezon: chatData[6].answer,
    dolor: chatData[7].answer,
    tiempo_sintomas: chatData[8].answer,
    frecuencia_sintomas: chatData[9].answer,
    consumo_medicamentos: chatData[10].answer,
  };
  // contacto enfermo
  if (isNo(chatData[11].answer) === "no") {
    // no
    data = {
      ...data,
      contacto_enfermo: {
        ha_tenido_contacto: null,
        diagnostico: null,
        sintomas_relacionados: null,
      },
    };
    // contacto toxico
    if (isNo(chatData[12].answer) === "no") {
      // no
      data = {
        ...data,
        contacto_toxico: {
          ha_tenido_contacto: null,
          tipo: null,
        },
      };
      // viaje extranjero
      if (isNo(chatData[13].answer) === "no") {
        // no
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: null,
            paises: null,
          },
          estado_animo: chatData[14].answer,
        };
        return data;
      } else {
        // si
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: true,
            paises: chatData[14].answer,
          },
          estado_animo: chatData[15].answer,
        };
        return data;
      }
    } else {
      // si
      data = {
        ...data,
        contacto_toxico: {
          ha_tenido_contacto: true,
          tipo: chatData[13].answer,
        },
      };
      // viaje extranjero
      if (isNo(chatData[14].answer) === "no") {
        // no
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: null,
            paises: null,
          },
          estado_animo: chatData[15].answer,
        };
        return data;
      } else {
        // si
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: true,
            paises: chatData[15].answer,
          },
          estado_animo: chatData[16].answer,
        };
        return data;
      }
    }
  } else {
    // si
    data = {
      ...data,
      contacto_enfermo: {
        ha_tenido_contacto: true,
        diagnostico: chatData[12].answer,
        sintomas_relacionados: chatData[13].answer,
      },
    };
    // contacto toxico
    if (isNo(chatData[14].answer) === "no") {
      // no
      data = {
        ...data,
        contacto_toxico: {
          ha_tenido_contacto: null,
          tipo: null,
        },
      };
      // viaje extranjero
      if (isNo(chatData[15].answer) === "no") {
        // no
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: null,
            paises: null,
          },
          estado_animo: chatData[16].answer,
        };
        return data;
      } else {
        // si
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: true,
            paises: chatData[16].answer,
          },
          estado_animo: chatData[17].answer,
        };
        return data;
      }
    } else {
      // si
      data = {
        ...data,
        contacto_toxico: {
          ha_tenido_contacto: true,
          tipo: chatData[15].answer,
        },
      };
      // viaje extranjero
      if (isNo(chatData[16].answer) === "no") {
        // no
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: null,
            paises: null,
          },
          estado_animo: chatData[17].answer,
        };
        return data;
      } else {
        // si
        data = {
          ...data,
          viaje_extranjero: {
            ha_viajado: true,
            paises: chatData[17].answer,
          },
          estado_animo: chatData[18].answer,
        };
        return data;
      }
    }
  }
};

export const objHasOnlyEmpty = (obj) => {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != "") return false;
  }
  return true;
};

export const matrixToObject = (matrix) => {
  let obj = {};
  matrix.forEach((row, index) => {
    obj[index] = {};
    row.forEach((value) => {
      obj[index][value] = false;
    });
  });
  return obj;
};

export const formatDatetime = (datetime) => {
  const splitDatetime = datetime.split("-");
  const year = splitDatetime[0];
  const month = splitDatetime[1];
  const day = splitDatetime[2].split("T")[0];
  return [day, month, year].join("-");
};

export const multipleOptionsSelected = (check, index) => {
  const optionsFlags = check[index];
  for (let option in optionsFlags)
    if (option !== "Ninguno") if (optionsFlags[option]) return true;
  return false;
};

export const updateOtrosBySubmit = ({
  informacionPersonal,
  antecedentesMedicos,
  answers,
  extraAnswers,
}) => ({
  informacion_personal: {
    informacion_personal: informacionPersonal,
    antecedentes_medicos: antecedentesMedicos,
  },
  sintomas: answers[0],
  problemas_sentidos: answers[1],
  inflamacion: answers[2],
  manchas: answers[3],
  comezon: answers[4],
  dolor: answers[5],
  tiempo_sintomas: answers[6],
  frecuencia_sintomas: answers[7],
  consumo_medicamentos: answers[8],
  contacto_enfermo: {
    ha_tenido_contacto: answers[9],
    diagnostico: answers[9] === "No" ? answers[10] : extraAnswers[10],
    sintomas_relacionados: answers[9] === "No" ? answers[11] : extraAnswers[11],
  },
  contacto_toxico: {
    ha_tenido_contacto: answers[9] === "No" ? answers[10] : answers[12],
    tipo:
      answers[9] === "No"
        ? answers[10] === "No"
          ? extraAnswers[13]
          : answers[11]
        : answers[12] === "No"
        ? extraAnswers[13]
        : answers[13],
  },
  viaje_extranjero: {
    ha_viajado:
      answers[9] === "No"
        ? answers[10] === "No"
          ? answers[11]
          : answers[12]
        : answers[12] === "No"
        ? answers[13]
        : answers[14],
    paises:
      answers[9] === "No"
        ? answers[10] === "No"
          ? answers[11] === "No"
            ? extraAnswers[15]
            : answers[12]
          : answers[12] === "No"
          ? extraAnswers[15]
          : answers[13]
        : answers[12] === "No"
        ? answers[13] === "No"
          ? extraAnswers[15]
          : answers[14]
        : answers[14] === "No"
        ? extraAnswers[15]
        : answers[15],
  },
  estado_animo: answers[12],
});
