// librerias
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
// auxiliares
import { register } from "../../../helpers/auth";
import { SIGNIN_OPTIONS } from "../../../helpers/constants";
import useQuoter from "../../../hooks/useQuoter";
// componentes
import { FormContainer, FieldContainer } from "../outSessionBase";
import { Subtitle, Label } from "../../UI/base";
import { PrimaryButton, SecondaryButton } from "../../UI/buttons";
import { BlockNotification } from "../../UI/notifications";
import { MultiselectItem } from "./MultiselectItem";

export const MedicalDataForm = ({
  informacionPersonal,
  password,
  sessionError,
  accountCreated,
  setInformacionPersonal,
  setPassword,
  setAntecedentesMedicos,
  setSessionError,
  setNextSection,
  setAccountCreated,
}) => {
  const strings = {
    allItemsAreSelected: "Todas las opciones seleccionadas",
    clearSearch: "Descartar búsqueda",
    clearSelected: "Descartar selección",
    noOptions: "No hay opciones",
    search: "Buscar...",
    selectAll: "Seleccionar todo",
    selectAllFiltered: "Seleccionar todo (filtrado)",
    selectSomeItems: "Select...",
    create: "Agregar",
  };
  // states
  const { isDark, setIsDark } = useQuoter();
  const [enfermedadesCronicas, setEnfermedadesCronicas] = useState([]);
  const [historialAlergias, setHistorialAlergias] = useState([]);
  const [historialCirugias, setHistorialCirugias] = useState([]);
  const [historialMedicamentos, setHistorialMedicamentos] = useState([]);
  const [historialEnfermedadesFamilia, setHistorialEnfermedadesFamilia] =
    useState([]);
  const [
    historialEnfermedadesInfecciosas,
    setHistorialEnfermedadesInfecciosas,
  ] = useState([]);
  const [historialHabitosSalud, setHistorialHabitosSalud] = useState([]);
  const cleanStates = async () => {
    setInformacionPersonal({});
    setPassword("");
    setNextSection(false);
    setAccountCreated(true);
    setSessionError({});
  };
  const valueRenderer = (value) => {
    if (!value.length) return "Seleccione";
    return value.map(({ label, value }) => (
      <MultiselectItem key={label} content={value} />
    ));
  };
  const getValues = (arrOptions) =>
    arrOptions.map(({ value }) => value).join(", ");

  // handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      enfermedadesCronicas: getValues(enfermedadesCronicas),
      historialAlergias: getValues(enfermedadesCronicas),
      historialCirugias: getValues(enfermedadesCronicas),
      historialMedicamentos: getValues(enfermedadesCronicas),
      historialEnfermedadesFamilia: getValues(enfermedadesCronicas),
      historialEnfermedadesInfecciosas: getValues(enfermedadesCronicas),
      historialHabitosSalud: getValues(enfermedadesCronicas),
    };
    setAntecedentesMedicos(data);
    const { error } = await register({
      informacionPersonal: { ...informacionPersonal, password },
      antecedentesMedicos: data,
    });
    if (!error) {
      await cleanStates();
      return;
    }
    setSessionError(error);
    console.log(error);
  };
  const handleNewField = (value) => {
    return {
      label: value,
      value,
    };
  };
  // dark mode
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) =>
        setIsDark(event.matches ? true : false)
      );
  }, [setIsDark]);

  return (
    <FormContainer>
      <Subtitle content="Información Médica" textWeight="font-bold" />
      <div
        className={`flex w-full flex-col items-center justify-center gap-2 ${
          sessionError?.email?.length === 0 &&
          sessionError?.password?.length === 0 &&
          !accountCreated
            ? "hidden"
            : ""
        }`}
      >
        {sessionError?.email?.map((error, index) => (
          <BlockNotification
            key={index}
            content={`Error en el correo: ${error}`}
            typeNotification="error"
          />
        ))}
        {sessionError?.password?.map((error, index) => (
          <BlockNotification
            key={index}
            content={`Error en la contraseña: ${error}`}
            typeNotification="error"
          />
        ))}
        {accountCreated ? (
          <BlockNotification
            content="Cuenta creada, dirígete a la página de inicio de sesión"
            typeNotification="success"
          />
        ) : null}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-4">
          {/* enfermedades cronicas */}
          <FieldContainer>
            <Label
              forInput="enfermedadesCronicas"
              content="Enfermedades crónicas"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.enfermedadesCronicas}
              value={enfermedadesCronicas}
              onChange={setEnfermedadesCronicas}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
          {/* historial alergias */}
          <FieldContainer>
            <Label
              forInput="historialAlergias"
              content="Historial de alergias"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.historialAlergias}
              value={historialAlergias}
              onChange={setHistorialAlergias}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
          {/* historial cirugias */}
          <FieldContainer>
            <Label
              forInput="historialCirugias"
              content="Historial de cirugías"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.historialCirugias}
              value={historialCirugias}
              onChange={setHistorialCirugias}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
          {/* historial medicamentos */}
          <FieldContainer>
            <Label
              forInput="historialMedicamentos"
              content="Historial de uso de medicamentos"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.historialMedicamentos}
              value={historialMedicamentos}
              onChange={setHistorialMedicamentos}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
          {/* historial enfermedades familia */}
          <FieldContainer>
            <Label
              forInput="historialEnfermedadesFamilia"
              content="Historial de enfermedades en la familia"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.historialEnfermedadesFamilia}
              value={historialEnfermedadesFamilia}
              onChange={setHistorialEnfermedadesFamilia}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
          {/* historial enfermedades infecciosas */}
          <FieldContainer>
            <Label
              forInput="historialEnfermedadesInfecciosas"
              content="Historial de enfermedades infecciosas"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.historialEnfermedadesInfecciosas}
              value={historialEnfermedadesInfecciosas}
              onChange={setHistorialEnfermedadesInfecciosas}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
          {/* historial habitos salud */}
          <FieldContainer>
            <Label
              forInput="historialHabitosSalud"
              content="Historial de hábitos de salud"
              required={false}
            />
            <MultiSelect
              options={SIGNIN_OPTIONS.historialHabitosSalud}
              value={historialHabitosSalud}
              onChange={setHistorialHabitosSalud}
              isCreatable={true}
              onCreateOption={handleNewField}
              valueRenderer={valueRenderer}
              className={isDark ? "dark" : ""}
              overrideStrings={strings}
            />
          </FieldContainer>
        </div>
        <div className="flex w-full flex-col gap-4 lg:flex-row-reverse">
          <PrimaryButton valueButton="Crear mi cuenta" width="w-full lg:w-3/4" />
          <SecondaryButton
            valueButton="Volver atrás"
            onClickFn={setNextSection}
            onClickParams={[false]} width="w-full lg:w-1/4"
          />
        </div>
      </form>
    </FormContainer>
  );
};

MedicalDataForm.propTypes = {
  informacionPersonal: PropTypes.object,
  password: PropTypes.string,
  sessionError: PropTypes.object,
  accountCreated: PropTypes.bool,
  antecedentesMedicos: PropTypes.object,
  setInformacionPersonal: PropTypes.func,
  setPassword: PropTypes.func,
  setAntecedentesMedicos: PropTypes.func,
  setSessionError: PropTypes.func,
  setNextSection: PropTypes.func,
  setAccountCreated: PropTypes.func,
  isDark: PropTypes.bool,
};

export default MedicalDataForm;
