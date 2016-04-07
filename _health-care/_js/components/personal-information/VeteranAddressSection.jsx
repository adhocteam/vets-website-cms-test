import React from 'react';
import { connect } from 'react-redux';

import Address from '../questions/Address';
import Email from '../questions/Email';
import ErrorableCheckbox from '../form-elements/ErrorableCheckbox';
import ErrorableTextInput from '../form-elements/ErrorableTextInput';
import Phone from '../questions/Phone';
import { veteranUpdateField } from '../../actions';

/**
 * Props:
 * `sectionComplete` - Boolean. Marks the section as completed. Provides styles for completed sections.
 * `reviewSection` - Boolean. Hides components that are only needed for ReviewAndSubmitSection.
 */
class VeteranAddressSection extends React.Component {
  constructor() {
    super();
    this.confirmEmail = this.confirmEmail.bind(this);
  }

  confirmEmail() {
    if (this.props.data.email !== this.props.data.emailConfirmation) {
      return 'Please ensure your entries match';
    }

    return undefined;
  }

  render() {
    let content;
    let editButton;

    if (this.props.data.sectionComplete) {
      content = (<div>
        <p>Street: {this.props.data.address.street}</p>
        <p>City: {this.props.data.address.city}</p>
        <p>Country: {this.props.data.address.country}</p>
        <p>State: {this.props.data.address.state}</p>
        <p>Zip: {this.props.data.address.zip}</p>
        <p>County: {this.props.data.address.county}</p>
        <p>Email Address: {this.props.data.email}</p>
        <p>Re-enter Email address: {this.props.data.emailConfirmation}</p>
        <p>Home telephone number: {this.props.data.homePhone}</p>
        <p>Mobile telephone number: {this.props.data.mobilePhone}</p>
      </div>
        );
    } else {
      content = (<div>
        <p>For locations outside the U.S., enter "City,Country" in the City field
            (e.g., "Paris,France"), and select Foreign Country for State.
        </p>

        <Address value={this.props.data.address}
            onUserInput={(update) => {this.props.onStateChange('address', update);}}/>

        <ErrorableTextInput label="County"
            value={this.props.data.county}
            onValueChange={(update) => {this.onStateChange('county', update);}}/>

        <Email label="Email address"
            value={this.props.data.email}
            onValueChange={(update) => {this.props.onStateChange('email', update);}}/>

        <Email error={this.confirmEmail()}
            label="Re-enter Email address"
            value={this.props.data.emailConfirmation}
            onValueChange={(update) => {this.props.onStateChange('emailConfirmation', update);}}/>

        <Phone required
            label="Home telephone number"
            value={this.props.data.homePhone}
            onValueChange={(update) => {this.props.onStateChange('homePhone', update);}}/>

        <Phone required
            label="Mobile telephone number"
            value={this.props.data.mobilePhone}
            onValueChange={(update) => {this.props.onStateChange('mobilePhone', update);}}/>
      </div>);
    }

    if (this.props.reviewSection) {
      editButton = (<ErrorableCheckbox
          label={`${this.props.data.sectionComplete ? 'Edit' : 'Update'}`}
          checked={this.props.data.sectionComplete}
          className="edit-checkbox"
          onValueChange={(update) => {this.props.onStateChange('sectionComplete', update);}}/>
      );
    }

    return (
      <fieldset >
        <div className={`input-section ${this.props.data.sectionComplete ? 'review-view' : 'edit-view'}`}>
          <h4>Permanent Address</h4>
          {editButton}
          {content}
        </div>
      </fieldset>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.veteranAddress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStateChange: (field, update) => {
      dispatch(veteranUpdateField(['veteranAddress', field], update));
    }
  };
}

// TODO(awong): Remove the pure: false once we start using ImmutableJS.
export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(VeteranAddressSection);
export { VeteranAddressSection };
