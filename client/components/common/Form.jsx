import React, { Component } from 'react';
import Input from './Input';

/*
This component doesn't directly render anything. It's a wrapper component
for any other component that you want to use a form. Any of the form elements
you choose to render via the functions included will be sharing the same
component state via inheritance.
ie: component Banana extends Form.
In Banana you render two inputs and a select. 
The state referred to in Form is inherited from Banana and therefore
your two inputs and select are all using Banana's state to track their values.
*/

class Form extends Component {
  // Any child of this class (ie: Banana) must have data in its state.
  state = {
    data: {},
  }

  /*
   Will update local state with user input for the field passed on the 
   event object to this function. The value for the field will be given
   a property on state.data that is associated with the name attribute given 
   to the field via props when the field is created.
   ie: <input name='bananaSplit' /> value will be at state.data.bananaSplit
   */
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  // Any child of this component (ie: Banana) must have a doSubmit method
  handleSubmit = eventObj => {
    eventObj.preventDefault();
    this.doSubmit();
  };

  // Optional fields for form. Call these functions in your child component
  renderInput(name, label, type = 'text', placeholder, instructions) {
    const { data } = this.state;
    return (<Input
      name={name}
      label={label}
      onChange={this.handleChange}
      type={type}
      instructions={instructions}
      value={data[name]}
      placeholder={placeholder}
    />)
  };

  renderButton(label, classString) {
    return (
      <button
        className={classString}>
        {label}
      </button>
    )
  }
};


export default Form;
