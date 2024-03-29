// librerias
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// componentes
import { FormContainer } from "../outSessionBase/";
import { InputPersonalDataForm } from "../signinForm";
import { Subtitle } from "../../UI/base";
import { PrimaryButton } from "../../UI/buttons";
import { BlockNotification } from "../../UI/notifications";

export const PersonalDataForm = ({
  informacionPersonal,
  setPassword,
  setNextSection,
  setInformacionPersonal,
  accountCreated,
  sessionError,
}) => {
  // schemas
  const personalDataSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe contener al menos 8 caracteres"),
    nombres: Yup.string().required("Los nombres son obligatorios"),
    primerApellido: Yup.string().required("El primer apellido es obligatorio"),
    segundoApellido: Yup.string().required(
      "El segundo apellido es obligatorio"
    ),
    altura: Yup.number().positive(),
    peso: Yup.number().positive(),
    sexo: Yup.string().required("El sexo es obligatorio"),
    fechaNacimiento: Yup.date().required(
      "La fecha de nacimiento es obligatoria"
    ),
  });

  // states
  const cleanStates = async (values) => {
    setPassword(values.password);
    delete values.password;
    setInformacionPersonal(values);
    setNextSection(true);
  };

  // handlers
  const handleSubmit = async (values) => {
    await cleanStates(values);
  };
  return (
    <FormContainer>
      <Subtitle content="Información Personal" textWeight="font-bold" />
      {/* ERROR DE CORREO */}
      {sessionError?.email?.map((error, index) => (
        <div
          className="flex w-full flex-col items-center justify-center"
          key={index}
        >
          <BlockNotification
            content="Error en el correo"
            typeNotification="error"
          />
        </div>
      ))}
      {/* ERROR DE PASSWORD */}
      {sessionError?.password?.map((error, index) => (
        <div
          className="flex w-full flex-col items-center justify-center"
          key={index}
        >
          <BlockNotification
            content="Error en la contraseña"
            typeNotification="error"
          />
        </div>
      ))}
      {/* CUENTA CREADA */}
      {accountCreated ? (
        <div className="flex w-full flex-col items-center justify-center">
          <BlockNotification
            content="Cuenta creada, dirígete a la página de inicio de sesión"
            typeNotification="success"
          />
        </div>
      ) : null}
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: informacionPersonal.email,
          password: "",
          nombres: informacionPersonal.nombres,
          primerApellido: informacionPersonal.primerApellido,
          segundoApellido: informacionPersonal.segundoApellido,
          fechaNacimiento: informacionPersonal.fechaNacimiento,
          altura: informacionPersonal.altura,
          peso: informacionPersonal.peso,
          sexo: informacionPersonal.sexo,
        }}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={personalDataSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="flex w-full flex-col gap-6">
              <div className="flex w-full flex-col gap-4">
                {/* nombre completo */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                  <InputPersonalDataForm
                    labelContent="Nombres"
                    nameField="nombres"
                    typeField="text"
                    placeholderField="Ej: Juan Pedro"
                    errors={errors}
                    touched={touched}
                  />
                  <InputPersonalDataForm
                    labelContent="Primer apellido"
                    nameField="primerApellido"
                    typeField="text"
                    placeholderField="Ej: González"
                    errors={errors}
                    touched={touched}
                  />
                  <InputPersonalDataForm
                    labelContent="Segundo apellido"
                    nameField="segundoApellido"
                    typeField="text"
                    placeholderField="Ej: Pérez"
                    errors={errors}
                    touched={touched}
                  />
                </div>
                {/* email y contraseña y fecha de nacimiento */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                  <InputPersonalDataForm
                    labelContent="Fecha de nacimiento"
                    nameField="fechaNacimiento"
                    typeField="date"
                    errors={errors}
                    touched={touched}
                  />
                  <InputPersonalDataForm
                    labelContent="Email"
                    nameField="email"
                    typeField="email"
                    placeholderField="Ej: usuario@email.com"
                    errors={errors}
                    touched={touched}
                  />
                  <InputPersonalDataForm
                    labelContent="Contraseña"
                    nameField="password"
                    typeField="password"
                    placeholderField="********"
                    errors={errors}
                    touched={touched}
                  />
                </div>
                {/* peso y altura y sexo */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                  <InputPersonalDataForm
                    labelContent="Sexo"
                    nameField="sexo"
                    typeField="select"
                    errors={errors}
                    touched={touched}
                    options={[
                      { valueOption: "M", contentOption: "Masculino" },
                      { valueOption: "F", contentOption: "Femenino" },
                    ]}
                  />
                  <InputPersonalDataForm
                    labelContent="Altura (m)"
                    nameField="altura"
                    typeField="number"
                    placeholderField="Ej: 1.75"
                    errors={errors}
                    touched={touched}
                    required={false}
                  />
                  <InputPersonalDataForm
                    labelContent="Peso (kg)"
                    nameField="peso"
                    typeField="number"
                    placeholderField="Ej: 80"
                    errors={errors}
                    touched={touched}
                    required={false}
                  />
                </div>
              </div>
              <PrimaryButton valueButton="Continuar con mis datos médicos" />
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

PersonalDataForm.propTypes = {
  setNextSection: PropTypes.func,
  setPassword: PropTypes.func,
  setInformacionPersonal: PropTypes.func,
  informacionPersonal: PropTypes.object,
  accountCreated: PropTypes.bool,
  sessionError: PropTypes.object,
};

export default PersonalDataForm;
