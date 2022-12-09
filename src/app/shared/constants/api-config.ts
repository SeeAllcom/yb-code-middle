import { environment } from '../../../environments/environment';

export class ApiConfig {
  public static API = environment.API;

  public static products = `${ApiConfig.API}/products/`
}
