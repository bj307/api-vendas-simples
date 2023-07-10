import { Request, Response } from 'express';
import ListCustumerService from '../services/ListCustumerService';
import ShowCustumerService from '../services/ShowCustumerService';
import CreateCustumerService from '../services/CreateCustumerService';
import UpdateCustumerService from '../services/UpdateCustumerService';
import DeleteCustumerService from '../services/DeleteCustumerService';

export default class CustumersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustumers = new ListCustumerService();

    const custumers = await listCustumers.execute();

    return response.json(custumers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustumer = new ShowCustumerService();

    const custumer = await showCustumer.execute({ id });

    return response.json(custumer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustumer = new CreateCustumerService();

    const custumer = await createCustumer.execute({ name, email });

    return response.json(custumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustumer = new UpdateCustumerService();

    const custumer = await updateCustumer.execute({ id, name, email });

    return response.json(custumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustumer = new DeleteCustumerService();

    await deleteCustumer.execute({ id });

    return response.json([]);
  }
}
