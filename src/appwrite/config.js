import envConfig from "../envConfig/envConfig.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(envConfig.appwriteUrl)
      .setProject(envConfig.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.error("Appwrite service :: createPost :: ", err);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      console.error("Appwrite service :: updatePost :: ", err);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.error("Appwrite service :: deletePost :: ", err);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.error("Appwrite service :: getPost :: ", err);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        queries,
      );
    } catch (err) {
      console.error("Appwrite service :: getPosts :: ", err);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return this.bucket.createFile(
        envConfig.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.error("Appwrite service :: uploadFile :: ", err);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      this.bucket.deleteFile(envConfig.appwriteBucketId, fileId);
      return true;
    } catch (err) {
      console.error("Appwrite service :: deleteFile :: ", err);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(envConfig.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
