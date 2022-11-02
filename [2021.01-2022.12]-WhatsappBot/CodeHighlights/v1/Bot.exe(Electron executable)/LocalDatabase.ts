// IDEA:
// Uses a package called NeDb to create database as files on the user computer so that some information can be store before sending to back end, works as a cache but also save logs for our employees to give remote support if necessary

import Datastore = require("nedb-promises");
import { Service } from "typedi";
import { City, Country, State } from "../../../Data/DTOs/BranchData";
import { Locations } from "../../../Data/DTOs/Locations";
import LocationsDb from '../locationsDataConfig';
import DatabaseFactory from "../Shared/DatabaseFactory";
const errorHandler = require('../Shared/errorHandler')

@Service()
class LocationsDb {
  countriesDb : Datastore
  statesDb : Datastore
  citiesDb : Datastore

  constructor() {
    this.countriesDb = DatabaseFactory.Create("branchData/countriesData.db")
    this.statesDb = DatabaseFactory.Create("branchData/statesData.db")
    this.citiesDb = DatabaseFactory.Create("branchData/citiesData.db")


    this.countriesDb.on('__error__', (datastore, event, error) => {
      errorHandler(datastore, event, error)
    })

    this.statesDb.on('__error__', (datastore, event, error) => {
      errorHandler(datastore, event, error)
    })

    this.citiesDb.on('__error__', (datastore, event, error) => {
      errorHandler(datastore, event, error)
    })
  }
} 

export default LocationsDb



// All the information saved by the repository will be saved on a DB folder on the user computer with files that which can be accessed vis mongoDb syntax

import Datastore = require("nedb-promises");

@Service()
export default class LocationsRepository {
  constructor(
    private readonly LocationsDb : LocationsDb,
  ) {
  }

  async CleanUp() : Promise<void> {
    await this.LocationsDb.citiesDb.remove({}, { multi: true })
    await this.LocationsDb.countriesDb.remove({}, { multi: true })
    await this.LocationsDb.statesDb.remove({}, { multi: true })
  }

  async InsertLocations(locations : Locations) : Promise<void> {
    const { countries, states, cities } = locations
    await this.LocationsDb.citiesDb.insert(cities)
    await this.LocationsDb.countriesDb.insert(countries)
    await this.LocationsDb.statesDb.insert(states)

  }

  async GetCountryById(id : number) : Promise<Country> {
    return await this.LocationsDb.countriesDb.findOne({ id }) as Country
  }

  async GetStateByCountryId(countryId : number) : Promise<Array<State>> {
    return await this.LocationsDb.statesDb.find({ countryId })

  }
  
  async GetCityByStateId(stateId : number) : Promise<Array<City>> {
    return await this.LocationsDb.citiesDb.find({ stateId })
  }
  // async GetCityById(countryId : number, stateId : number, id : number)
}

