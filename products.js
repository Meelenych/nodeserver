const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const productsPath = path.join(__dirname, "/db/products.json");
// console.log('productsPath', productsPath);

async function listProducts() {
  const data = await fs.readFile(productsPath);
  const products = JSON.parse(data);
  // console.log('products list', products);
  return products;
}

async function getProductById(productId) {
  const products = await listProducts();
  const result = products.find((product) => product.id === productId);
  if (!result) {
    return null;
  }
  // console.log('product by ID', result);
  return result;
}

async function updateProduct(productId, name, price, quantity, imagePath) {
  const products = await listProducts();
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) {
    return null;
  }
  products[index] = {id: products[index].id, name, price, quantity, imagePath};
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  // console.log('update product by ID', products[index]);
  return products[index];
}

async function removeProduct(productId) {
  const products = await listProducts();
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) {
    return null;
  }
  const removedProduct = products[index];
  products.splice(index, 1);
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  // console.log('remove product by ID', removedProduct);
  return removedProduct;
}

async function addProduct(name, price, quantity, imagePath) {
  const newProduct = {id: shortid.generate(), name, price, quantity, imagePath};
  const products = await listProducts();
  products.push(newProduct);
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  // console.log('add product', newProduct)
  return newProduct;
}

const allFunctions = {
  listProducts,
  getProductById,
  updateProduct,
  removeProduct,
  addProduct,
};

module.exports = allFunctions;
