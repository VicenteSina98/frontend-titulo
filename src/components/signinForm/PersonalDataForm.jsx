import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormError from "../error/FormError";
import useQuoter from "../../hooks/useQuoter";
import PropTypes from "prop-types";

const PersonalDataForm = ({ setPassword, setNextSection }) => {
  const { informacionPersonal, setInformacionPersonal } = useQuoter();
  // continuar con los datos medicos
  const handleSubmit = async (values) => {
    setPassword(values.password);
    delete values.password;
    setInformacionPersonal(values);
    setNextSection(true);
  };
  // definir esquema para validacion
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
  return (
    <>
      <h2 className="mb-4 text-center text-lg font-bold dark:text-white">
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
            <Form className="flex flex-col gap-2 sm:mx-auto sm:w-96 md:w-80">
              {/* nombres */}
              <label
                htmlFor="nombres"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Nombres
              </label>
              <Field
                type="text"
                name="nombres"
                id="nombres"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.nombres && touched.nombres ? (
                <FormError message={errors.nombres} />
              ) : null}
              {/* primer apellido */}
              <label
                htmlFor="primerApellido"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Primer apellido
              </label>
              <Field
                type="text"
                name="primerApellido"
                id="primerApellido"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.primerApellido && touched.primerApellido ? (
                <FormError message={errors.primerApellido} />
              ) : null}
              {/* segundo apellido */}
              <label
                htmlFor="segundoApellido"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Segundo apellido
              </label>
              <Field
                type="text"
                name="segundoApellido"
                id="segundoApellido"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.segundoApellido && touched.segundoApellido ? (
                <FormError message={errors.segundoApellido} />
              ) : null}
              {/* sexo */}
              <label
                htmlFor="sexo"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Sexo
              </label>
              <Field
                as="select"
                name="sexo"
                id="sexo"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              >
                <option value="" selected disabled>
                  -- Seleccione una opción --
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Field>
              {/* <Field
                type="text"
                name="sexo"
                id="sexo"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              /> */}
              {errors.sexo && touched.sexo ? (
                <FormError message={errors.sexo} />
              ) : null}
              {/* fecha de nacimiento */}
              <label
                htmlFor="fechaNacimiento"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Fecha de nacimiento
              </label>
              <Field
                type="date"
                name="fechaNacimiento"
                id="fechaNacimiento"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.fechaNacimiento && touched.fechaNacimiento ? (
                <FormError message={errors.fechaNacimiento} />
              ) : null}
              {/* email */}
              <label
                htmlFor="email"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.email && touched.email ? (
                <FormError message={errors.email} />
              ) : null}
              {/* password */}
              <label
                htmlFor="password"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.password && touched.password ? (
                <FormError message={errors.password} />
              ) : null}
              {/* altura */}
              <label
                htmlFor="altura"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Altura
              </label>
              <Field
                type="number"
                name="altura"
                id="altura"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.altura && touched.altura ? (
                <FormError message={errors.altura} />
              ) : null}
              {/* peso */}
              <label
                htmlFor="peso"
                className="text-md dark:text-gray-200 lg:text-lg"
              >
                Peso
              </label>
              <Field
                type="number"
                name="peso"
                id="peso"
                className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
              />
              {errors.peso && touched.peso ? (
                <FormError message={errors.peso} />
              ) : null}
              <input
                type="submit"
                value="Continuar con mis datos médicos"
                className="text-md mt-4 rounded-md bg-blue-700 p-2 text-white hover:cursor-pointer hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 lg:text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

PersonalDataForm.propTypes = {
  setNextSection: PropTypes.func,
  setPassword: PropTypes.func,
};

export default PersonalDataForm;
