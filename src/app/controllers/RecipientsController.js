import * as Yup from 'yup';
import Recipients from '../models/Recipients';
class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number(),
      complemento: Yup.string(),
      bairro: Yup.string().required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validação dos dados falhou!' });
    }

    const { id } = await Recipients.create(req.body);
    return res.json({ id, ...req.body });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      bairro: Yup.string(),
      cidade: Yup.string(),
      estado: Yup.string(),
      cep: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validação do dados falhou!' });
    }

    const destinatario = await Recipients.findByPk(req.body.id);

    if (!destinatario) {
      return res.status(400).json({ erro: 'Destinatario não encontrado!' });
    }

    return res.json(await destinatario.update(req.body));
  }
}

export default new RecipientsController();