import Entrega from '../models/Entrega';


class EntregaController {
  async store(req, res) {
    const {  id, nome_cliente, ponto_origem, ponto_destino, data_entrega } = await Entrega.create(req.body);

    return res.json({
      id,nome_cliente, ponto_origem, ponto_destino, data_entrega 
    });
  }

  async index(req, res) {
    let entregas;
    if(req.params.id){
        entregas = await Entrega.findOne({
            where: {
                id: req.params.id,
            },
         });
    }else{
        entregas = await Entrega.findAll();
    }
      console.log(entregas);
      return res.json(entregas);
  }


}
export default new EntregaController();