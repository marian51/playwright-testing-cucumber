import dotenv from "dotenv";
dotenv.config()

export const DELEGATION_FORM = {
  TEXT_FIELDS: [
    "Subject",
    "Place Of Departure", 
    "Place Of Arrival", 
    "Travel Purpose", 
    "Registration Number", 
    "Engine Capacity [cm3]", 
    "Distance [km]"
  ],

  DROPDOWN_SELECT: [
    "Status",
    "Accommodation",
    "Travel Type",
    "Transport Type",
    "Acceptance Of Mileage Allowance",
    "Breakfast"
  ],

  DATE_PICKERS: [
    "Start Date",
    "End Date"
  ],

  SEARCH_SELECT: [
    "Project",
    "Traveler"
  ]
};

export const COST_FORM = {
  TEXT_FIELDS: [
    "Business Trip Cost Name",
    "Amount"
  ],

  DROPDOWN_SELECT: [
    "Type",
    "Paid By"
  ]
}

export const USERS: {[key: string]: {USERNAME: string; PASSWORD: string}} = {
  administrative: {
    USERNAME: process.env.SF_TEST_OFFICE_USERNAME as string,
    PASSWORD: process.env.SF_TEST_OFFICE_PASSWORD as string
  }
}