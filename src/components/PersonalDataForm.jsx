// desde librerias
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Error from "./Error";

const PersonalDataForm = ({
  personalData,
  setPersonalData,
  setNextSection,
}) => {
  // continuar con los datos medicos
  const handleSubmit = async (values) => {
    console.log(values);
    // setNextSection(true);
  };
  // definir esquema para validacion
  const personalDataSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe contener, al menos, 8 caracteres"),
    height: Yup.number()
      .positive("Número no válido")
      .typeError("La altura debe ser un número"),
    weight: Yup.number()
      .positive("Número no válido")
      .typeError("El peso debe ser un número"),
    sex: Yup.string().required("El sexo es obligatorio"),
  });
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: personalData?.name,
        lastname: personalData?.lastname,
        email: personalData?.email,
        password: personalData?.password,
        height: personalData?.height,
        weight: personalData?.weight,
        sex: personalData?.sex,
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
            <label
              htmlFor="name"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Nombre
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
            {errors.name && touched.name ? (
              <Error message={errors.name} />
            ) : null}
            <label
              htmlFor="lastname"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Apellido
            </label>
            <Field
              type="text"
              name="lastname"
              id="lastname"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
            {errors.lastname && touched.lastname ? (
              <Error message={errors.lastname} />
            ) : null}
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
              <Error message={errors.email} />
            ) : null}
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
              <Error message={errors.password} />
            ) : null}
            <label
              htmlFor="height"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Altura
            </label>
            <Field
              type="number"
              name="height"
              id="height"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
            {errors.height && touched.height ? (
              <Error message={errors.height} />
            ) : null}
            <label
              htmlFor="weight"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Peso
            </label>
            <Field
              type="number"
              name="weight"
              id="weight"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
            {errors.weight && touched.weight ? (
              <Error message={errors.weight} />
            ) : null}
            <label
              htmlFor="sex"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Sexo
            </label>
            <Field
              type="text"
              name="sex"
              id="sex"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
            {errors.sex && touched.sex ? <Error message={errors.sex} /> : null}
            <input
              type="submit"
              value="Continuar con mis datos médicos"
              className="text-md mt-4 rounded-md bg-blue-700 p-2 text-white hover:cursor-pointer hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 lg:text-lg"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

PersonalDataForm.propTypes = {
  personalData: PropTypes.object,
  setPersonalData: PropTypes.func,
  setNextSection: PropTypes.func,
};

export default PersonalDataForm;
