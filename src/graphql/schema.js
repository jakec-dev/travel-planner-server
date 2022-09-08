const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    brand: String
    weight: Int
    url: String
    price: Float
    notes: String
  }

  input NewItemInput {
    name: String!
    brand: String
    weight: Int
    url: String
    price: Float
    notes: String
  }

  input ExistingItemInput {
    id: ID!
    name: String!
    brand: String
    weight: Int
    url: String
    price: Float
    notes: String
  }

  type Query {
    item(id: ID!): ItemResponse!
    items: ItemsResponse!
  }

  type Mutation {
    addItem(newItem: NewItemInput!): ItemResponse!
    updateItem(modifiedItem: ExistingItemInput!): ItemResponse!
    deleteItem(itemId: ID!): ItemIDResponse!
  }

  type ItemResponse {
    status: String!
    message: String
    data: Item
  }

  type ItemsResponse {
    status: String!
    message: String
    data: [Item]
  }

  type ItemIDResponse {
    status: String!
    message: String
    data: ID
  }
`;

module.exports = typeDefs;
