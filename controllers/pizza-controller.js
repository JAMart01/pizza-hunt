const { Pizza } = require('../models');
const { db } = require('../models/Pizza');



const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
      Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // get one pizza by id
    getPizzabyId( {params}, res) {
        Pizza.findOne({_id: params.id})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // createPizza
    createPizza({ body }, res) {
        Pizza.create(body) 
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update pizza by id
    updatePizza ({ params, body}, res) {
        Pizza.findOneAndUpdate({ _id: params.id}, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete pizza by id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No Pizza with this id found!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}



module.exports = pizzaController;