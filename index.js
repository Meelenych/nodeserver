console.log('Welcome to backend server');

const {Command} = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "products operation")
  .option("-i, --id <type>", "product id")
  .option("-n, --name <type>", "product name")
  .option("-p, --price <type>", "product price")
  .option("-q, --quantity <type>", "product quantity")
  .option("-t, --imagePath <type>", "product imagePath");

const allFunctions = require("./products");

async function invokeAction({action, id, name, price, quantity, imagePath}) {
  switch (action) {
    case "list":
      const allProducts = await allFunctions.listProducts();
      console.table(allProducts);

    case "get":
      const productById = await allFunctions.getProductById(id);
      console.log(productById);
      break;

    case "add":
      const newProduct = await allFunctions.addProduct(name, price, quantity, imagePath);
      console.log(newProduct);
      break;

    case "update":
      const updateProduct = await allFunctions.updateProduct(
        id,
        name,
        price,
        quantity,
        imagePath
      );
      console.log(updateProduct);
      break;

    case "remove":
      const removedProduct = await allFunctions.removeProduct(id);
      console.log(removedProduct);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action: "list"});

// invokeAction({action: "get", id: "2"});

// invokeAction({
//   action: "add",
//   name: "Pepper",
//   price: "10.00",
//   quantity: "50",
//   imagePath: 'https://www.shutterstock.com/image-photo/colourful-bell-peper-260nw-1162528267.jpg'
// });

// invokeAction({
//   action: "update",
//   id: "pOSnxoaup",
//   name: "Red pepper",
// });

// invokeAction({action: "remove", id: "P5dU-y6EQ"});

program.parse(process.argv);
const options = program.opts();
invokeAction(options);
