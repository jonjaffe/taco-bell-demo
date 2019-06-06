import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as contentful from 'contentful';
const contentfulClient = contentful.createClient({
  space: 'mv79s9r86hsh',
  accessToken: 'jgYg8-y4KHK5M_eYYeobyJ8i70cr9vk3QSqrZgp_dOc'
});

class Locations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: null
    }
  }

  componentWillMount() {
    document.title = "Taco Bell Locations | Find Taco Bell Nearby"
    contentfulClient.getEntries({content_type: 'storeLocation', order: 'fields.city'}).then(data => {
      console.log(data);
      var obj = {}
      for (let i = 0; i < data.items.length; i++) {
        obj[data.items[i].fields.city] = data.items[i]
      }
      this.setState({locations: obj}, () => {
        console.log(this.state);
      })
    })
  }

  render() {
    if (!this.state.locations) {
      return <div>loading</div>
    }

    let results = Object.keys(this.state.locations).map((location, i) => {
      return (
        <li key={this.state.locations[location].sys.id}>
          <Link to={`/locations/${this.state.locations[location].fields.id}`} className='list-location'>{location}</Link>
        </li>
      )
    })

    return (
        <div style={{ textAlign: "center",marginTop:'10rem' }}>
          <h1>Locations</h1>
          {results}
        </div>
    );
  }
}

export default Locations;
