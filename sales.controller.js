import { ObjectId } from "bson";
import SalesDAO from "../dao/sales.dao.js"
import {User} from "./users.controller.js"

export default class SalesController {
    static async apiGetSales(req, res, next) {
        const SALES_PER_PAGE = 20
        const { salesList, totalNumSales } = await SalesDAO.getSales();
        let response = {
            sales: salesList,
            page: 0,
            filters: {},
            entries_per_page: SALES_PER_PAGE,
            total_results: totalNumSales,
        }
        res.json(response);
    }

    static async apiGetSalesById(req, res, next) {
        try {
            let id = req.params.id || {};
            let sale = await SalesDAO.getSalesByID(id);
            if (!sale) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            let updated_type = sale.lastupdated instanceof Date ? "Date" : "other";
            res.json({ sale, updated_type });
        }
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiPostSale(req, res, next) {
        try {
            const userJwt = req.get("Authorization").slice("Bearer ".length);
            const user = await User.decoded(userJwt);
            var { error } = user;
            if (error) {
                res.status(401).json({ error });
                return;
            }

            const sale = req.body;

            const saleResponse = await SalesDAO.addSale(
                sale
            );
            
            //const updatedSales = await SalesDAO.getSalesByID(saleResponse.insertedId);

            res.json({ status: "success", sale : sale });

        } 
        catch (e) {
            res.status(500).json({ e });
        }
    }

    static async apiDeleteSale(req, res, next) {
        try {
            const userJwt = req.get("Authorization").slice("Bearer ".length);
            const user = await User.decoded(userJwt);
            var { error } = user;
            if (error) {
                res.status(401).json({ error });
                return;
            }
            const saleId = req.params.id;

            const saleResponse = await SalesDAO.deleteSale(
                ObjectId(saleId),
            );

            res.json({status: "success"})
        }

            catch (e) {
                res.status(500).json({ e });
            }

        }

    static async apiUpdateSale(req, res, next) {
        try {
            const userJwt = req.get("Authorization").slice("Bearer ".length);
            const user = await User.decoded(userJwt);
            var { error } = user;
            if (error) {
                res.status(401).json({ error });
                return;
            }

            const sale = req.body;

            const saleResponse = await SalesDAO.updateSale(
                sale
            );

            res.json({ status: "success", sale : sale });

        } 
        catch (e) {
            res.status(500).json({ e });
        }
    }
}
