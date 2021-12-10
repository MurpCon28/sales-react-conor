import { ObjectId } from 'bson';

let sales;
let supplies;
const DEFAULT_SORT = [["tomatoes.viewer.numSales", -1]]

class SalesDAO {
    static async injectDB(conn) {
        if (sales) {
            return
        }
        try {
            supplies = await conn.db(process.env.DB_NAME);
            sales = await supplies.collection("sales");
        } 
        catch (e) {
            console.error(`Unable to establish a collection handle in salesDAO: ${e}`);
        }
    }

    static async getSales(query = {}, project = {}, sort = DEFAULT_SORT, page = 0, salesPerPage = 20) {
        let cursor;
        try {
            cursor = await sales.find(query).project(project).sort(sort);
        } 
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { salesList: [], totalNumSales: 0 }
        }
    
        const displayCursor = cursor.skip(salesPerPage*page).limit(salesPerPage);
    
        try {
            const salesList = await displayCursor.toArray();
            const totalNumSales = (page === 0) ? await sales.countDocuments(query) : 0;
        
            return { salesList, totalNumSales }
        } 
        catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { salesList: [], totalNumSales: 0 }
        }
    }

    static async getSalesByID(id) {
        try {
            const pipeline = [
                {
                    '$match': {'_id': new ObjectId(id)}
                }, 
                {
                    '$lookup': {
                        'from': 'sales', 
                        'let': {'id': '$_id'}, 
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$eq': [
                                        '$sale_id', '$$id'
                                        ]
                                    }
                                }
                            }, 
                            {
                                '$sort': {'date': -1}
                            }
                        ], 
                        'as': 'sales'
                    }
                }
            ];
    
          return await sales.aggregate(pipeline).next();
        }
        catch (e) {
            console.error(`Something went wrong in getSalesByID: ${e}`);
            console.error(`e log: ${e.toString()}`);
            return null;
        }
    }
    
    static async addSale(sale) {
        try {
            return await sales.insertOne(sale);
        } 
        catch (e) {
            console.error(`Unable to post sale: ${e}`);
            return { error: e };
        }
    }

    static async deleteSale(saleId) {
        try {
            const deleteResponse = await sales.deleteOne({
                _id: ObjectId(saleId), 
            })

            return deleteResponse
        } 
        catch (e) {
            console.error(`Error occurred while deleting sale, ${e}`);
            return { error: e };
        }
    }

    //used https://docs.mongodb.com/realm/mongodb/actions/collection.deleteOne/ to help with the update function
    static async updateSale(sale) {
        try {
            return await sales.updateOne(sale);
        } 
        catch (e) {
            console.error(`Unable to update sale: ${e}`);
            return { error: e };
        }
    }
};

export default SalesDAO;