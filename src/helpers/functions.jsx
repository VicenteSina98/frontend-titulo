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

export  const formatDatetime = (datetime) => {
  const splitDatetime = datetime.split("-");
  const year = splitDatetime[0];
  const month = splitDatetime[1];
  const day = splitDatetime[2].split("T")[0];
  return [day, month, year].join("-");
};
