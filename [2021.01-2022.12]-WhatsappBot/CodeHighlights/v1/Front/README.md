All pages on the dashboard asre simple crud operations, so there's a factory pattern that receives a 'typed' payload that will dinamically build each page and its forms
Each entity has an Adapter that creates the payload based on its properties

The typing of the payload is on folder (Typing), the names are not typed on react since this TS file is a new version of this package, but I think it's possible to understand the idea
