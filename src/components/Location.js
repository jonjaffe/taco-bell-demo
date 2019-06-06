import React, { Component } from "react";
import * as contentful from 'contentful';
const contentfulClient = contentful.createClient({
  space: 'mv79s9r86hsh',
  accessToken: 'jgYg8-y4KHK5M_eYYeobyJ8i70cr9vk3QSqrZgp_dOc'
});

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLocation: null,
      mealParts: null
    }

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.simulateOptionChange = this.simulateOptionChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    let pathArr = this.props.location.pathname.split('/');
    contentfulClient.getEntries({content_type: 'storeLocation', 'fields.id': pathArr[pathArr.length-1], include: 10}).then(data => {
      var notSelected = []
      data.items[0].fields.mealDayPartsServedHere.forEach((mealPart, i) => {
        if(i === 0) {
          return
        }
        notSelected.push(mealPart.fields.name)
      })
      this.setState({selectedLocation: data.items[0], selectedOption: data.items[0].fields.mealDayPartsServedHere[0].fields.name, notSelected: notSelected})
      var obj = {}
      this.state.selectedLocation.fields.mealDayPartsServedHere.forEach((el) => {
        obj[el.fields.name] = el.fields.menuItems
      })
      this.setState({mealParts: obj}, () => {
        var arr = []
        // for (var mealPart in this.state.mealParts) {
        //   this.state.mealParts[mealPart].forEach((meal) => {
        //     arr.push({[meal.fields.name]: meal.fields})
        //   })
        // }
        this.state.mealParts[this.state.selectedOption].forEach((meal) => {
          arr.push({[meal.fields.name]: meal.fields})
        })
        this.setState({allMeals: arr}, () => {
          console.log(this.state);
        })
      })
    })
    // setInterval(this.simulateOptionChange, 3000)

  }

  handleOptionChange(changeEvent) {
    var arr = this.state.notSelected.slice()
    var idx = arr.indexOf(changeEvent.target.value)
    arr.splice(idx, 1, this.state.selectedOption)
    this.setState({
      selectedOption: changeEvent.target.value, notSelected: arr
    }, () => {
      console.log(this.state);
      var arr = []
      this.state.mealParts[this.state.selectedOption].forEach((meal) => {
        arr.push({[meal.fields.name]: meal.fields})
      })
      this.setState({allMeals: arr}, () => {
        console.log(this.state);
      })
    });
  }

  simulateOptionChange() {
    var arr = this.state.notSelected.slice()
    var randomOption = arr[Math.floor(Math.random() * arr.length)]
    var randomIdx = arr.indexOf(randomOption)
    arr.splice(randomIdx, 1, this.state.selectedOption)
    this.setState({selectedOption: randomOption, notSelected: arr}, () => {
      console.log(this.state);
      var arr2 = []
      this.state.mealParts[this.state.selectedOption].forEach((meal) => {
        arr2.push({[meal.fields.name]: meal.fields})
      })
      this.setState({allMeals: arr2}, () => {
        console.log(this.state);
      })
    });
  }

  removeItem(changeEvent) {
    console.log(changeEvent.target.id);
    var arr = []
    var currentMeals = this.state.allMeals.slice()
    console.log(currentMeals);
    // currentMeals.forEach(el => {
    //   console.log(el[Object.keys(el)].name);
    // })
    var resultingMeals = currentMeals.filter(el => el[Object.keys(el)].name !== changeEvent.target.id)
    this.setState({allMeals: resultingMeals})
  }

  render() {
    if(!this.state.allMeals) {
      return (
        <div></div>
      )
    }

    var meals = this.state.allMeals.map((meal, i) => {
      return (
        <div key={i} style={{backgroundImage: `url(${Object.values(meal)[0].heroImage.fields.file.url + "?h=300"})`}} className='product-index-item' id={Object.values(meal)[0].name} onClick={this.removeItem}>
          <button className='favorite-button animated rubberBand'><i className="fas fa-heart fa-2x"></i></button>
          <div className='product-index-item-text'>
            <p className='product-index-item-text-title'>{Object.values(meal)[0].name}</p>
            <p className='product-index-item-text-details'>
            {"$" + Object.values(meal)[0].price} <span>|</span> {Object.values(meal)[0].calories} cal
            </p>
          </div>
        </div>
      )
    })

    var todOptions = Object.keys(this.state.mealParts).map((tod, i) => {
      return (
        <div className="radio" key={i}>
          <label>
            <input type="radio" value={tod} checked={this.state.selectedOption === tod} onChange={this.handleOptionChange} />
            {tod}
          </label>
        </div>
      )
    })


    return (
        <div style={{ textAlign: "center",marginTop:'10rem' }}>
          <h1>{this.state.selectedLocation.fields.city}</h1>
          <h2>{this.state.selectedOption}</h2>
          <div className='checkbox-and-products-container'>
            <form className='checkbox'>
            <h2>Times of Day</h2>
            {todOptions}
            </form>
            <div className='product-index-items-container'>
              {meals}
            </div>
          </div>
        </div>
    );
  }
}

export default Location;
