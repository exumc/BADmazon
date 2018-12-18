// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.
var mysql = require("mysql");
var inquirer = require("inquirer");
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});


function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        inquirer.prompt([
            {
                type: "input",
                name: "itemID",
                message: "What it ID do you want to buy?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many do you want to buy?"
            }
        ]).then(function (res) {
            res.quantity = parseInt(res.quantity);
            if (res.itemID == 25) {
                console.log("Stop it! You can't afford to be that Stuntastic!");
                start();
            }

            else {
                connection.query("SELECT * FROM products WHERE ?",
                    [{
                        item_id: res.itemID
                    }],
                    function (err, data) {
                        if (data[0].stock_quantity >= res.quantity) {
                            data[0].stock_quantity -= res.quantity;
                            

                            connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: data[0].stock_quantity
                                    },
                                    {
                                        item_id: res.itemID
                                    }

                                ]
                            )
                            var cost = res.quantity * data[0].price;
                            console.log("Your total cost is: $" + cost);
                            inquirer.prompt([
                                {
                                    type: "confirm",
                                    name: "response",
                                    message: "Do you want to buy anything else?"
                                }
                            ]).then(function(res){
                                if(res.response === true){
                                    start();
                                }
                                else{
                                    console.log("Thank you for shopping with BADmazon! Have a wonderful day!");
                                    connection.end();
                                }
                            })
                        } else {
                            console.log("There is insufficient quantity to fulfill that order.");
                            inquirer.prompt([
                                {
                                    type: "confirm",
                                    name: "response",
                                    message: "Do you want to buy anything else?"
                                }
                            ]).then(function(res){
                                if(res.response === true){
                                    start();
                                }
                                else{
                                    console.log("Thank you for shopping with BADmazon! Have a wonderful day!");
                                    connection.end();
                                }
                            })
                        }


                        // start();
                    }
                )
            }
        })
    })
}