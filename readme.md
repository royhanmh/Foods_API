# Mock Foods API

Welcome to the Mock Foods API documentation. This API provides a collection of delicious Indonesian foods, including satay (sate), rendang, nasi goreng, and more. Use this API to develop your culinary website or restaurant application and showcase the rich flavors of Indonesian cuisine.

**Website**: [Mock Foods Dashboard](https://mockfoods.cyclic.app/dashboard)

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## API Endpoints

### Get Foods

- **Endpoint**: `/foods`
- **Description**: Get a list of all available food items.
- **HTTP Method**: GET

### Get Foods with Limit and Sort

- **Endpoint**: `/foods?limit=<number>&sort=<asc/desc>`
- **Description**: Get a limited number of food items with optional sorting.
- **HTTP Method**: GET

### Get Food Categories

- **Endpoint**: `/foods/categories`
- **Description**: Get a list of available food categories.
- **HTTP Method**: GET

### Get Foods by Category

- **Endpoint**: `/foods/category/<category-name>`
- **Description**: Get a list of food items in a specific category.
- **HTTP Method**: GET

### Get Food by ID

- **Endpoint**: `/foods/<food-id>`
- **Description**: Get details of a specific food item by its ID.
- **HTTP Method**: GET

### Add a New Food

- **Endpoint**: `/foods`
- **Description**: Add a new food item to the database.
- **HTTP Method**: POST

### Update Food

- **Endpoint**: `/foods/<food-id>`
- **Description**: Update an existing food item by its ID.
- **HTTP Method**: PUT

### Delete Food

- **Endpoint**: `/foods/<food-id>`
- **Description**: Delete a food item by its ID.
- **HTTP Method**: DELETE

## Usage Examples

### Example Using Axios

Here's how you can use Axios to interact with the API:

```javascript
axios
  .get("https://mockfoods.cyclic.app/foods")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Note

Please be aware that all POST, PUT, and DELETE routes do not add, update, or delete food data from the database. Instead, they are designed to return a success message if the request is made properly. The food data remains intact in the database for reference and can be retrieved as needed.

## Usage Examples

For more usage examples, refer to the Usage section.

## Getting Started

To get started with the Mock Foods API, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies.
3. Run the API server.
4. Start making API requests using your preferred method.

## Contributing

If you'd like to contribute to the Mock Foods API project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
