# Welcome to BADmazon!
BADmazon is a full self-service shop for all your shopping needs! Please enjoy using this amazing experience!

# Required to work!
* Please populate the database in MySql with the provided BADmazon_products.csv file.
* User must do "npm install" to install all the required dependencies

### Overview

## User Experience

* Upon logging into BADmazon through NODEjs the user is given a list of every item in our store.
  * The user is then asked which item they would like to purchase and how many of said items they will require.
  * Currently the user must tell us the item_id of the item in order for our system to properly process their purchase.
  * This data is used to calculate the users total cost for this specific purchase.
  * The number of purchased items is removed from the inventory database and the user is given their total cost.
  * If the store inventory does not contain enough to cover the requested purchase the user is informed of this unfortunate event and given the option to start over.

* When the user completes their purchase they are asked if they would like to purchase more items or leave
  * If the user wants to keep spending they are given the inventory again and the process starts over.
  * If they do not want to give us more money the program terminates. :(
