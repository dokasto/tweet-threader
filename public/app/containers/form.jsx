import React, { PropTypes } from 'react';
import { render } from 'react-dom';

class Form extends React.Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		formCount: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		onRemove: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	state = {
		charCount: 140,
	};

	componentDidMount() {
		if (this.props.formCount - 1 === this.props.index) {
			document.querySelector(`#tf-${this.props.id}`).focus();
		}
	}

	onChange = e => {
		this.props.onChange(this.props.id, e.target.value);
	};

	handleCount = e => {
		const charsLength = e.target.value.length;
		if (charsLength < 141) {
			this.setState({ charCount: 140 - charsLength });
		}
	};

	removeForm = () => {
		this.props.onRemove(this.props.id);
	};

	render() {
		return (
			<form className="form" id={this.props.id}>
				<textarea
					ref={this.props.id}
					onChange={this.onChange}
					id={`tf-${this.props.id}`}
					onKeyUp={this.handleCount}
					maxLength="140"
					value={this.props.text}
				/>
				<span className="counter">
					{this.state.charCount}
				</span>
				<a className="remove" tabIndex="0" role="button" onClick={this.removeForm}>
					&#215;
				</a>
			</form>
		);
	}
}

export default Form;
