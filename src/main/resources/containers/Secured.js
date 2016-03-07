import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Secured extends Component {
    componentWillMount() {
        const {history, user} = this.props;
        const { router } = this.context;
        if (!user) {
            router.push('/login');
        }
    }

    render() {
        const {user} = this.props;
        if (user) {
            return this.props.children;
        }

        return null;
    }
}

Secured.propTypes = {
    user: PropTypes.string,
    history: PropTypes.object.isRequired,
    children: PropTypes.object
};
Secured.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {user: state.auth.user};
}

export default connect(mapStateToProps)(Secured);
