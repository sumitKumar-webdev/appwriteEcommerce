import { Client, Databases, ID, Query, Storage } from "appwrite";
import Conf from "../Conf/Conf";

export class appwriteServices {
    client = new Client();
    databases;
    bucket;
    constructor() {
       this.client
       .setEndpoint(Conf.appwriteUrl)
       .setProject(Conf.appwriteProjectId)
       
       this.databases = new Databases(this.client);
       this.bucket = new Storage(this.client);


    }
    async storeUserInfo({userId, countryCode, address, pincode, Phone}){
        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteUserInfoCollectionId,
                userId,
                {
                    address,
                    pincode,
                    countryCode,
                    Phone,
                }
            );
            
        } catch (error) {
            console.log("Appwrite Service :: storeUserInfo :: error", error);
            throw error
        }
    }

     getProductImg(fileID){
        try {
            return  this.bucket.getFilePreview(
                Conf.appwriteBucketId,
                fileID,
            )
            
        } catch (error) {
            console.log("Appwrite Service :: getProductImg :: error", error);
            throw error
            
        }
    }
    async getProduct(productId){
        try {
            return await this.databases.getDocument(
                Conf.appwriteDatabaseId,
                appwriteProductCollectionId,
                productId
            )
        } catch (error) {
            console.log("Appwrite Service :: getProduct :: error", error);
            throw error
        }
    }
    async getAllProducts(category, limit=25){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteProductCollectionId,
                [
                    Query.equal('category', category),
                    Query.limit(limit)
                ]
                
            );
            
        } catch (error) {
            console.log("Appwrite Service :: getAllProducts :: error", error);
            throw error
        }
    }

    // Database Storage and services
    async addToCart(userId, productId, size){
        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                ID.unique(),
                {
                    userId,
                    productId,
                    size
                }
            ) 
        } catch (error) {
            console.log("Appwrite Service :: addToCart :: error", error);
            throw error
            
        }
    }
    
    async removeFromCart(documentId){
        try {
            return await this.databases.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                documentId
            )
        } catch (error) {
            console.log("Appwrite Service :: removeFromCart :: error", error);
            throw error
        }
    }

    async updateProduct(documentId,item){
        try {
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                documentId,
                {...item}
            )
        } catch (error) {
            console.log("Appwrite Service :: updateProdouct :: error", error);
            throw error
        }
    }

    async getAllCartProduct(userId){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                [
                    Query.equal('user_id', userId)
                ]

            )
        } catch (error) {
            console.log("Appwrite Service :: getAllCartProduct :: error", error);
            throw error
        }
    }
}

const Service = new appwriteServices();
export default Service;