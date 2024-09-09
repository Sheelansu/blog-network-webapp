import envConfig from "../envConfig/envConfig.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(envConfig.appwriteUrl)
      .setProject(envConfig.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (err) {
      console.error("Appwrite service :: createAccount :: ", err);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.error("Appwrite service :: login :: ", err);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.error("Appwrite service :: getCurrentUser :: ", err);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.error("Appwrite service :: logout :: ", err);
    }
  }
}

const authService = new AuthService();

export default authService;
