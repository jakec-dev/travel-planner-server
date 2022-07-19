<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/jakec-dev/travel-planner-server">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Travel Planner Server</h3>

  <p align="center">
    Backend server for <a href="https://github.com/jakec-dev/travel-planner">Travel Planner</a> app. Performs CRUD operations on the Travel Planner database via REST APIs.
    <br />
    <a href="https://github.com/jakec-dev/travel-planner-server"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/jakec-dev/travel-planner-server">View Demo</a>
    ·
    <a href="https://github.com/jakec-dev/travel-planner-server/issues">Report Bug</a>
    ·
    <a href="https://github.com/jakec-dev/travel-planner-server/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#create-an-item">Create an Item</a></li>
        <li><a href="#update-an-item">Update an Item</a></li>
        <li><a href="#delete-an-item">Delete an Item</a></li>
        <li><a href="#fetch-a-specific-item">Fetch a Specific Item</a></li>
        <li><a href="#fetch-all-items">Fetch All Items</a></li>
        <li><a href="#access-api-documentation">Access API Documentation</a></li>
      </ul>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
      <ul>
        <li><a href="#version-1">Version 1</a></li>
      </ul>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
      <ul>
        <li><a href="#testing">Testing</a></li>
        <li><a href="#linting-&-formatting">Linting & Formatting</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is the Travel Planner backend server that's responsible for integrating the Travel Planner frontend app with the MySQL database that persists data. It deos this by providing REST API endpoints to allow the frontend app to perform CRUD operations on the database.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [![Node.js][node.js]][node-url]
- [![Express.js][express.js]][express-url]
- [![MySQL][mysql]][mysql-url]
- [![ESLint][eslint]][eslint-url]
- [![Prettier][prettier]][prettier-url]
- [![Mocha][mocha]][mocha-url]
- [![Chai][chai]][chai-url]
- [![Swagger][swagger]][swagger-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You will need the following software installed in your environment to run this app.

- [node][node-url] >= 18.2.0
- [yarn][yarn-url] >= 1.22.19

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jakec-dev/travel-planner-server.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Create an `.env` file in the project root directory and enter your database configuration settings
   ```sh
   DB_HOST=database.example.com
   DB_DATABASE=database-name
   DB_USER=username
   DB_PASSWORD=password
   ```
4. Start the server
   ```sh
   yarn start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This API is designed to be used in conjunction with the Travel Planner App. It provides the following functionality:

### Create an Item

Send a POST request to `/items`. The request body should contain the new item, for example:

```json
{
  "name": "New item name",
  "brand": "New item brand (optional)"
}
```

JavaScript/React example:

```js
const SERVER_URL = "https://api.example.com";

const createItem = async (newItem) => {
  try {
    const resp = await fetch(`${SERVER_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    }).then((res) => res.json());
    if (resp.status === "error") {
      throw Error(resp.message);
    }
    return resp.data;
  } catch (err) {
    throw Error(err);
  }
};

const result = createItem({
  name: "New item name",
  brand: "New item brand",
})
  .then((resp) => resp)
  .catch((err) => console.log(err));
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Update an Item

Send a PUT request to `/items`. The request body should contain the modified item. The modified item will entirely replace the original item, rather than merge fields, so be sure to merge any existing fields before sending the request. For example:

```json
{
  "id": 3,
  "name": "Original item name",
  "brand": "Updated item brand"
}
```

JavaScript/React example:

```js
const SERVER_URL = "https://api.example.com";

const updateItem = async (modifiedItem) => {
  try {
    const resp = await fetch(`${SERVER_URL}/items`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedItem),
    }).then((res) => res.json());
    if (resp.status === "error") {
      throw Error(resp.message);
    }
    return resp.data;
  } catch (err) {
    throw Error(err);
  }
};

const result = updateItem({
  id: 3,
  name: "Original item name",
  brand: "Updated item brand",
})
  .then((resp) => resp)
  .catch((err) => console.log(err));
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Delete an Item

Send a DELETE request to `/items/:id`, where `:id` is the ID of the item to be deleted. No request body is required.

JavaScript/React example:

```js
const SERVER_URL = "https://api.example.com";

const deleteItem = async (id) => {
  try {
    const resp = await fetch(`${SERVER_URL}/items/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    if (resp.status === "error") {
      throw Error(resp.message);
    }
    return resp.data;
  } catch (err) {
    throw Error(err);
  }
};

const result = deleteItem(4)
  .then((resp) => resp)
  .catch((err) => console.log(err));
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Fetch a Specific Item

Send a GET request to `/items/:id`, where `:id` is the ID of the item to be fetched. No request body is required.

JavaScript/React example:

```js
const SERVER_URL = "https://api.example.com";

const fetchItem = async (itemId) => {
  try {
    const resp = await fetch(`${SERVER_URL}/items/${itemId}`).then((res) =>
      res.json()
    );
    if (resp.status === "error") {
      throw Error(resp.message);
    }
    return resp.data;
  } catch (err) {
    throw Error(err);
  }
};

const result = fetchItem(2)
  .then((resp) => resp)
  .catch((err) => console.log(err));
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Fetch All Items

Send a GET request to `/items`. No request body is required.

JavaScript/React example:

```js
const SERVER_URL = "https://api.example.com";

const fetchAllItems = async (itemId) => {
  try {
    const resp = await fetch(`${SERVER_URL}/items`).then((res) => res.json());
    if (resp.status === "error") {
      throw Error(resp.message);
    }
    return resp.data;
  } catch (err) {
    throw Error(err);
  }
};

const result = fetchAllItems()
  .then((resp) => resp)
  .catch((err) => console.log(err));
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Access API Documentation

Navigate to `/api-docs` in a web browser.

[![API Docs][api-docs-screenshot]](https://github.com/jakec-dev/travel-planner-server)

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

### Version 1

- [x] Create database connection
- [x] Add route, controller, service and data layers for items
- [x] Add API documentation
- [x] Write unit and integration tests
- [x] Write project documentation

See the [open issues](https://github.com/jakec-dev/travel-planner-server/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

### Testing

This project uses Mocha, Chai, and Sinon for testing, and Istanbul for test coverage reports

```sh
yarn test
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Linting & Formatting

This project uses ESLint for linting using AirBNB's style guide, and Prettier for formatting.

```sh
yarn lint
yarn lint:fix

yarn format
yarn format:write
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Jake Clayton

&nbsp;&nbsp;e: [jake@jakec.dev][my-email-url]

&nbsp;&nbsp;w: [jakec.dev][my-website-url]

&nbsp;&nbsp;[![LinkedIn][linkedin-shield]][linkedin-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Harrison Croaker](https://github.com/HcroakerDev)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[my-email-url]: mailto:jake@jakec.dev
[my-website-url]: https://jakec.dev
[contributors-shield]: https://img.shields.io/github/contributors/jakec-dev/travel-planner-server.svg?style=for-the-badge
[contributors-url]: https://github.com/jakec-dev/travel-planner-server/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jakec-dev/travel-planner-server.svg?style=for-the-badge
[forks-url]: https://github.com/jakec-dev/travel-planner-server/network/members
[stars-shield]: https://img.shields.io/github/stars/jakec-dev/travel-planner-server.svg?style=for-the-badge
[stars-url]: https://github.com/jakec-dev/travel-planner-server/stargazers
[issues-shield]: https://img.shields.io/github/issues/jakec-dev/travel-planner-server.svg?style=for-the-badge
[issues-url]: https://github.com/jakec-dev/travel-planner-server/issues
[license-shield]: https://img.shields.io/github/license/jakec-dev/travel-planner-server.svg?style=for-the-badge
[license-url]: https://github.com/jakec-dev/travel-planner-server/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/jakeclayton
[api-docs-screenshot]: images/api-docs.png
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://express.js
[mysql]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
[mysql-url]: https://www.mysql.com
[eslint]: https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
[eslint-url]: https://eslint.org
[prettier]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
[prettier-url]: https://prettier.io/
[mocha]: https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white
[mocha-url]: https://mochajs.org
[chai]: https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white
[chai-url]: https://www.chaijs.com/
[swagger]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white
[swagger-url]: https://swagger.io
[yarn-url]: https://yarnpkg.com/
