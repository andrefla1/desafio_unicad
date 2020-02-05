import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
 
    const schema = Yup.object().shape({
        nome_cliente: Yup.string().required(),
        ponto_origem: Yup.string().required(),
        ponto_destino: Yup.string().required(),
        data_entrega: Yup.date().required(),
      });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};