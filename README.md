# Coffee_Journal_2021
Personal Project: CRUD app using React, Node.js, Express.js and PostgreSQL | Record coffee tasting notes.

# Functionalities

+ Sign up (email, password)
+ Google sign up
+ Login
+ Logout

+ View all beans
    - Get all beans of a user - need 
+ View all recipes
+ Add beans
+ Add recipe
+ Clone recipe
+ Add Origin range
+ Add Farmer range (name, location)
+ Add Process range
+ Add grade range
+ Add Roaster range (name, location)
+ Add Roast level range
+ Add Method range
+ Add Grinder range
+ Add Water range (name, location, ph)
+ Add Palates


# User Custom Ranges Naming Convention

ranges: The parent term for the custom ranges when they form a single list
range (rangeItems): Single range as an object such as origin_range, roaster_range, etc 
rangeItem: A single entry which resides in a specific range

ranges: {
  origin_range: {
    items: {
      1: {
        ...
      },
      2: {
        ...
      }
    },
    nextId: 3
  },
  roaster_range: {
    items: {
      1: {
        ...
      },
      2: {

      }
    },
    next_id: 3
  }
}

Object.keys(customRangeList).forEach(range => {
  const rangeItems = range['items'];
  Object.keys(rangeItems).forEach(rangeItem => {

  })
})