import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          selectedOption: 'option3',
          highlight: '',
          journalEntry: ''
          
        };
    }

    handleOptionChange = e => {
        this.setState({
          selectedOption: e.target.value
        });
      }

      handleInputChange = e => {
        // Getting the value and name of the input which triggered the change
        const {value, name} = e.target;
    
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };
    
    handleSubmit = e => {
        e.preventDefault();
        
        fetch('http://localhost:3000/formtest',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
    }

      render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return (
          <div>
            
            <form>
            <div>
                <p>
                    <label>
                        <input 
                        type="radio" 
                        value="option1" 
                        name="group1" 
                        checked={this.state.selectedOption === 'option1'} 
                        onChange={this.handleOptionChange}/>
                        <span>Option 1</span>
                    </label>
                </p>

                <p className="radio">
                    <label>
                        <input 
                        type="radio" 
                        value="option2"
                        name="group1" 
                        checked={this.state.selectedOption === 'option2'} 
                        onChange={this.handleOptionChange}/>
                        <span>Option 2</span>
                    </label>
                </p>

                <p className="radio">
                    <label>
                        <input 
                        type="radio" 
                        value="option3"
                        name="group1" 
                        checked={this.state.selectedOption === 'option3'} 
                        onChange={this.handleOptionChange}/>
                        
                        <span>Option 3</span>
                    </label>
                </p>

                <p className="radio">
                    <label>
                        <input 
                        type="radio" 
                        value="option4"
                        name="group1" 
                        checked={this.state.selectedOption === 'option4'} 
                        onChange={this.handleOptionChange}/>
                        <span>Option 4</span>
                    </label>
                </p>

                <div className="radio">
                    <label>
                        <input 
                        type="radio" 
                        value="option5"
                        name="group1" 
                        checked={this.state.selectedOption === 'option5'} 
                        onChange={this.handleOptionChange}/>
                        <span>Option 5</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <input 
                type="text" 
                name="hightlight" 
                value={this.state.highlight} 
                placeholder="Tell us what's good." 
                onChange={this.handleInputChange}
                />
            </div>

            <div className="form-group">
                <input 
                type="text" 
                name="journalEntry" 
                value={this.state.journalEntry} 
                placeholder="Tell us how you feel." 
                onChange={this.handleInputChange}
                />
            </div>
            <button onClick={this.handleFormSubmit}>Submit</button>

            </form>
          </div>
        );
      }


}

export default Form;