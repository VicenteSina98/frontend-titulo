import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputPersonalDataForm from "./InputPersonalDataForm";

const PersonalDataForm = ({
  informacionPersonal,
  setPassword,
  setNextSection,
  setInformacionPersonal,
}) => {
  // schemas
  const personalDataSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe contener, al menos, 8 caracteres"),
    nombres: Yup.string().required("El nombre es obligatorio"),
    primerApellido: Yup.string().required("El primer apellido es obligatorio"),
    segundoApellido: Yup.string().required(
      "El segundo apellido es obligatorio"
    ),
    altura: Yup.number()
      .positive("Número no válido")
      .typeError("La altura debe ser un número"),
    peso: Yup.number()
      .positive("Número no válido")
      .typeError("El peso debe ser un número"),
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
    <div className="mx-auto flex flex-col gap-1 sm:w-5/6  md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
      <h2 className="text-md text-center font-bold dark:text-white sm:text-xl">
        Información Personal
      </h2>
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
            <Form className="flex flex-col gap-4">
              {/* nombre completo */}
              <div className="flex flex-col gap-4">
                <InputPersonalDataForm
                  labelContent={"Nombres"}
                  nameField={"nombres"}
                  typeField={"text"}
                  errors={errors}
                  touched={touched}
                />
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
                  <InputPersonalDataForm
                    labelContent={"Primer apellido"}
                    nameField={"primerApellido"}
                    typeField={"text"}
                    errors={errors}
                    touched={touched}
                  />
                  <InputPersonalDataForm
                    labelContent={"Segundo apellido"}
                    nameField={"segundoApellido"}
                    typeField={"text"}
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
              {/* email y contraseña */}
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
                <InputPersonalDataForm
                  labelContent={"Email"}
                  nameField={"email"}
                  typeField={"email"}
                  errors={errors}
                  touched={touched}
                />
                <InputPersonalDataForm
                  labelContent={"Contraseña"}
                  nameField={"password"}
                  typeField={"password"}
                  errors={errors}
                  touched={touched}
                />
              </div>
              {/* sexo y fecha de nacimiento */}
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
                <InputPersonalDataForm
                  labelContent={"Sexo"}
                  nameField={"sexo"}
                  typeField={"select"}
                  errors={errors}
                  touched={touched}
                  options={[
                    { valueOption: "M", contentOption: "Masuclino" },
                    { valueOption: "F", contentOption: "Femenino" },
                  ]}
                />
                <InputPersonalDataForm
                  labelContent={"Fecha de nacimiento"}
                  nameField={"fechaNacimiento"}
                  typeField={"date"}
                  errors={errors}
                  touched={touched}
                />
              </div>
              {/* peso y altura */}
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
                <InputPersonalDataForm
                  labelContent={"Altura"}
                  nameField={"altura"}
                  typeField={"number"}
                  errors={errors}
                  touched={touched}
                />
                <InputPersonalDataForm
                  labelContent={"Peso"}
                  nameField={"peso"}
                  typeField={"number"}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <input
                type="submit"
                value="Continuar con mis datos médicos"
                className="rounded-md bg-blue-700 px-1 py-2 text-xs text-white hover:cursor-pointer hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-base"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

PersonalDataForm.propTypes = {
  setNextSection: PropTypes.func,
  setPassword: PropTypes.func,
  setInformacionPersonal: PropTypes.func,
  informacionPersonal: PropTypes.object,
};

export default PersonalDataForm;
