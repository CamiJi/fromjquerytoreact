// From this nice tutorial:
// https://www.freecodecamp.org/news/react-introduction-for-people-who-know-just-enough-jquery-to-get-by-2019-version-28a4b4316d1a/

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';



class TweetBox extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            text: '',
            photoAdded: false        
        };
    }
    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ text: e.target.value
                            });
    }

    togglePhoto = () => {
        this.setState((prevState) => ({ photoAdded: !prevState.photoAdded }));
    }

    getRemainingChars = () => {
        let chars = 280 - this.state.text.length;
        if (this.state.photoAdded) chars = chars - 23;
        return chars;
    }

    renderOverflowAlert = () => {
        if (this.getRemainingChars() < 0) {
          const imageLength = this.state.photoAdded ? 23 : 0;
          const beforeOverflowText = this.state.text.substring(
            280 - imageLength - 10,
            280 - imageLength,
          );
          const overflowText = this.state.text.substring(280 - imageLength);

            return (
                <div className="alert alert-warning text-left">
                <strong>Oops! Too Long:</strong>
                &nbsp; &#8230;
                {beforeOverflowText}
                <strong className="bg-danger text-light">{overflowText}</strong>
                </div>
            );
        }
        
        return '';
    };

    render() {

        const isTweetButtonDisabled = this.state.text.length === 0 && !this.state.photoAdded;

        return (
            <div className="card bg-light">
                <div className="card-body text-right">
                    {this.renderOverflowAlert()}
                    <textarea className="form-control"  onChange={this.handleChange} />
                    <br />
                    <button className='btn btn-link'>
                        <i className="bi bi-camera"></i>
                    </button>
                    <span>{this.getRemainingChars()}</span>
                    <button className="btn btn-primary" disabled={isTweetButtonDisabled}>Tweet</button>
                    <button className="btn btn-secondary" onClick={this.togglePhoto}>
                        {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
                    </button>
                </div>
            </div>
        );
    }
}

export default TweetBox;

// Clicking this button toggles an ON/OFF state.
// If the button is ON, it will say ✓ Photo Added and the number of available characters decreases by 23.
// Also, if the button is ON, even if there’s no text entered, the “Tweet” button remains enabled.